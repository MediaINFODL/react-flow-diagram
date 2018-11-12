// @flow

import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import { Diagram, store, setEntities, setConfig, diagramOn } from '../../src';
import { config, customEntities } from './config-example';
import './menu.css';
import { assignEmptyLabelToStore, assignEmptyStatusToStore } from '../../src/history/reducer';

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

class Demo extends React.PureComponent<{}> {
  constructor(props) {
    super(props);
    this.state = { newModel: {}, entity: this.props.entity };
    this.saveChanges = this.saveChanges.bind(this);
    // this.onWorkflowSelect = this.onWorkflowSelect.bind(this);

  }

  updateModel(item) {
    this.setState({
      newModel: item
    });
  }

  onWorkflowSelect = model => {
    store.dispatch(setEntities(model));
  };

  saveChanges(item) {
    console.log(JSON.stringify(this.state.newModel));
    console.log('this is an object that will go to Future API');
  }

  componentDidUpdate() {
    console.log('this.props.workflow0', this.props.workflow);
    store.dispatch(setEntities(this.props.workflow));
  }

  componentWillMount() {
    store.dispatch(setConfig(config));
    store.subscribe(() => {
      const state = store.getState();
      this.props.emitOnWorkflowChange(state.entity);
      if (state.status.id) {
        this.props.emitOnEntityClick(state.status);
        store.dispatch(assignEmptyStatusToStore());
      }
      if (state.label.id) {
        this.props.emitOnLabelClick(state.label);
        store.dispatch(assignEmptyLabelToStore());
      }
    });
  }

  render() {
    return (
      <Main>
        <Diagram customEntities={customEntities}/>
      </Main>
    );
  }
}

// $FlowFixMe
// render(<Demo/>, document.querySelector('#demo'));

export default Demo;
