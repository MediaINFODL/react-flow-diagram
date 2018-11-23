// @flow

import React from "react";
import { render } from "react-dom";
import styled, { injectGlobal } from "styled-components";
import { Diagram, store, setEntities, setConfig, diagramOn } from "../../src";
import { config, customEntities } from "./config-example";
import "./menu.css";
import { removeLabel } from "../../src/entity/reducer";

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

const model = [{
  "id": "joumgb30",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 208,
  "y": 259,
  "name": "init #1",
  "linksTo": [{
    "target": "joumgdnv",
    "label": "1",
    "edited": false,
    "uid": 1543013594927,
    "points": [{ "x": 308, "y": 289 }, { "x": 531, "y": 289 }, { "x": 531, "y": 356 }]
  }]
}, {
  "id": "joumgdnv",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 482,
  "y": 357,
  "name": "init #2",
  "linksTo": [{
    "target": "joumgb30",
    "label": "2",
    "uid": 1543013597371,
    "edited": false,
    "points": [{ "x": 482, "y": 376 }, { "x": 258, "y": 376 }, { "x": 258, "y": 319 }]
  }, {
    "target": "joumgj94",
    "edited": false,
    "label": "3",
    "uid": 1543013602169,
    "points": [{ "x": 482, "y": 396 }, { "x": 353, "y": 396 }, { "x": 353, "y": 514 }]
  }]
}, {
  "id": "joumgj94",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 303,
  "y": 514,
  "name": "init #3"
}, {
  "id": "joumy8gb",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 698,
  "y": 302,
  "name": "end",
  "linksTo": [{
    "target": "joumgdnv",
    "uid": 1543014431617,
    "label": "1",
    "edited": false,
    "points": [{ "x": 698, "y": 321 }, { "x": 640, "y": 321 }, { "x": 640, "y": 387 }, { "x": 582, "y": 387 }]
  }, {
    "target": "jouogddm",
    "edited": false,
    "label": "new",
    "uid": 1543016953787,
    "points": [{ "x": 698, "y": 341 }, { "x": 571, "y": 341 }, { "x": 571, "y": 224 }]
  }]
}, { "id": "jouogddm", "type": "Task", "width": 100, "height": 60, "x": 521, "y": 164, "name": "test" }];

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
    console.log(data.label);
    store.dispatch(removeLabel(data.label));
  };

  render() {
    return (
      <Main>
        <p onClick={this.getWorkflowData}>PRINT</p>
        <button onClick={this.deleteLabel}>Delete</button>
        <Diagram customEntities={customEntities}/>
      </Main>
    );
  }
}

render(<Demo/>, document.querySelector("#demo"));
