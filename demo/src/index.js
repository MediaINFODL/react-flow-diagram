// @flow

import React from 'react';
import { render } from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import { Diagram, store, setEntities, setConfig, diagramOn } from '../../src';
import model2 from './model-example2';
import model from './model-example';
import { config, customEntities } from './config-example';
import MenuNav from '../../src/menu/component';
import { Button, button } from 'semantic-ui-react';


// eslint-disable-next-line no-unused-expressions
injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
`;
// max-width: 62em;
// padding: 1em;
// margin: 0 auto;
const Main = styled.main`
  font-family: sans-serif;
  display: flex;
  flex-flow: column nowrap;
  min-height: 150vh;
`;

class Demo extends React.PureComponent<{}> {
  constructor(props) {
    super(props);
    this.state = {newModel: {}};
    this.saveChanges = this.saveChanges.bind(this)

  }
  updateModel(item){
     this.setState({
       newModel: item,
    })
  }
  saveChanges(item){
    console.log(this.state.newModel)
    console.log("this is an object that will go to Future API")
  }
  componentWillMount() {
    store.dispatch(setEntities(model));
    store.dispatch(setConfig(config));
    diagramOn('anyChange', entityState =>
      // You can get the model back
      // after modifying the UI representation
      this.updateModel(entityState)
    );
  }
  render() {
    return (
      <Main>
        <h1>react-flow-diagram Demo</h1>
        <MenuNav />
        
        <Button onClick={this.saveChanges}>Save Changes</Button>
        <Diagram customEntities={customEntities} />
      </Main>
    );
  }
}

// $FlowFixMe
render(<Demo />, document.querySelector('#demo'));
