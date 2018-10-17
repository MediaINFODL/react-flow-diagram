import React from 'react'
import { Dropdown, Menu, Select } from 'semantic-ui-react';
import {  store, setEntities  } from '../../src'
import model2 from '../../demo/src//model-example2';
import model from '../../demo/src/model-example';
import model3 from '../../demo/src//model-example3';

class MenuNav extends React.Component {

changeWorkfow(item){
    store.dispatch(setEntities(item));
}

render() {
  // This syntax ensures `this` is bound within handleClick
  return (
    <div>
    <Menu vertical>
    <Dropdown item text='All models'>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => this.changeWorkfow(model)}>Model 1</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeWorkfow(model2)}>Model 2</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeWorkfow(model3)}>Model 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu>
  <Select 
    placeholder='Select workflow' 
    options={workflowOptions} />
  </div>
  );
}


  
}

export default MenuNav