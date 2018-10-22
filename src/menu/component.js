import React from 'react'
import { Dropdown, Menu, Select } from 'semantic-ui-react';
import {  store, setEntities  } from '../../src'
import model2 from '../../demo/src/model-example2';
import modelexample from '../../demo/src/data/modelexample.json';
import model3 from '../../demo/src/model-example3';
import axios from 'axios';

class MenuNav extends React.Component {

state = {
  workflows:[]
}

changeWorkfow(item){
    store.dispatch(setEntities(item));
}

componentWillMount() {
  axios.get('./demo/src/data/' )
  .then(response => {
      let test = []
      for (let i in response.data){
       console.log(response.data[i].data)
        
      }
      this.setState({ workflows: response.data });
      console.log(this.state.workflows)
    })
  .catch((error) => {
console.log(error)  })
}

render() {
  // This syntax ensures `this` is bound within handleClick
  return (
    <div>
    <Menu vertical>
    <Dropdown item text='All models'>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => this.changeWorkfow(modelexample)}>Model 1</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeWorkfow(model2)}>Model 2</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeWorkfow(model3)}>Model 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu>

</div>
  );
}


  
}

export default MenuNav