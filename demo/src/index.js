// @flow

import React from "react";
import { render } from "react-dom";
import styled, { injectGlobal } from "styled-components";
import { Button } from "semantic-ui-react";
import { Diagram, store, setEntities, setConfig, diagramOn } from "../../src";
import { config } from "./config-example";
import "./demo.css";
import { addLabel, removeLabel, setLabel } from "../../src/entity/reducer";

injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
`;

const Main = styled.main`
  font-family: sans-serif;
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
`;

const model = [
  {
    "id": "joumgb30",
    "type": "Task",
    "width": 100,
    "height": 60,
    "x": 314,
    "y": 168,
    "name": "init #1",
    "linksTo": [{
      "target": "joumgdnv",
      "label": "1",
      "edited": false,
      "uid": 1543013594927,
      "points": [{ "x": 364, "y": 228 }, { "y": 398, "x": 364 }, { "y": 398, "x": 438 }]
    }]
  }, {
    "id": "joumgdnv",
    "type": "Task",
    "width": 100,
    "height": 60,
    "x": 437,
    "y": 368,
    "name": "init #2",
    "linksTo": [{
      "target": "joumgb30",
      "label": "2",
      "uid": 1543013597371,
      "edited": false,
      "points": [{ "x": 471, "y": 368 }, { "y": 198, "x": 471 }, { "y": 198, "x": 414 }]
    }, {
      "target": "joumgj94",
      "edited": false,
      "label": "3",
      "uid": 1543013602169,
      "points": [{ "x": 537, "y": 398 }, { "x": 793, "y": 398 }, { "x": 793, "y": 461 }]
    }]
  }, {
    "id": "joumgj94",
    "type": "Task",
    "width": 100,
    "height": 60,
    "x": 726,
    "y": 461,
    "name": "init #3"
  }, {
    "id": "joumy8gb",
    "type": "Task",
    "width": 100,
    "height": 60,
    "x": 736,
    "y": 237,
    "name": "end",
    "linksTo": [{
      "target": "joumgdnv",
      "uid": 1543014431617,
      "label": "1",
      "edited": false,
      "points": [{ "x": 736, "y": 268 }, { "x": 503, "y": 268 }, { "x": 503, "y": 368 }]
    }, {
      "target": "jouogddm",
      "edited": false,
      "label": "new",
      "uid": 1543016953787,
      "points": [{ "x": 786, "y": 237 }, { "y": 75, "x": 786 }, { "y": 75, "x": 689 }]
    }, {
      "target": "joumgj94",
      "uid": 1543061781796,
      "label": "0",
      "edited": false,
      "points": [{ "x": 786, "y": 297 }, { "y": 379.5, "x": 786 }, { "y": 379.5, "x": 759 }, { "y": 461, "x": 759 }]
    }]
  }, {
    "id": "jouogddm",
    "type": "Task",
    "width": 100,
    "height": 60,
    "x": 589,
    "y": 45,
    "name": "entity",
    "linksTo": [{
      "target": "jovf3yfi",
      "label": "#1",
      "edited": false,
      "uid": 1543061724174,
      "points": [{ "x": 639, "y": 105 }, { "y": 147, "x": 639 }, { "y": 147, "x": 566 }, { "y": 189, "x": 566 }]
    }, {
      "target": "joumgb30",
      "label": "#2",
      "uid": 1543061736390,
      "edited": false,
      "points": [{ "x": 589, "y": 85 }, { "x": 365, "y": 85 }, { "x": 365, "y": 168 }]
    }]
  }, { "id": "jovf3yfi", "type": "Task", "width": 100, "height": 60, "x": 515, "y": 189, "name": "007" }];

class Demo extends React.PureComponent<{}> {
  constructor(props) {
    super(props);
    this.state = { newModel: {}, entity: this.props.entity };
    this.saveChanges = this.saveChanges.bind(this);

  }

  componentWillMount() {
    store.dispatch(setConfig(config));
    store.dispatch(setEntities(model));
    // store.subscribe(() => {
    //   const d = store.getState();
    //   console.log(JSON.stringify(d.entity));
    // });
  }

  saveChanges(item) {
  }

  getWorkflowData = () => {
    console.log(JSON.stringify(store.getState().entity));
  };

  deleteLabel = () => {
    const data = store.getState();
    // console.log(data.label);
    store.dispatch(removeLabel(data.label));
  };

  updateLabel = () => {
    const data = store.getState();
    const obj = {
      ...data.label,
      label: "NEW!"
    };
    store.dispatch(setLabel(obj));
  };

  addLabel = () => {
    const data = store.getState();
    const { id, uid } = data.label;
    const obj = {
      id,
      uid,
      label: "ADD!"
    };
    store.dispatch(addLabel(obj));
  };

  render() {
    return (
      <Main>
        <div className="menu">
          <Button positive onClick={this.getWorkflowData}>Print workflow</Button>
          <Button negative onClick={this.deleteLabel}>Delete label</Button>
          <Button positive onClick={this.updateLabel}>Update label</Button>
          <Button positive onClick={this.addLabel}>Add label</Button>
        </div>
        <Diagram/>
      </Main>
    );
  }
}

render(<Demo/>, document.querySelector("#demo"));
