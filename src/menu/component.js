import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { store, setEntities } from "../../src";
import axios from "axios";
import model from "../../demo/src/model-example";
import model1 from "../../demo/src/data/modelexample.json";
import model2 from "../../demo/src/model-example2";
import model3 from "../../demo/src/model-example3";
import model4 from "../../demo/src/model-example4";
import model5 from "../../demo/src/model-example5";
import model6 from "../../demo/src/model-example6";

class MenuNav extends React.Component {

  state = {
    workflows: []
  };

  changeWorkfow(item) {
    store.dispatch(setEntities(item));
  }

  componentWillMount() {
    axios.get("./demo/src/data")
      .then(res => {
        // for (let i in res.data) {
        //   console.log(res.data[i]);
        // }
        this.setState({ workflows: res.data });
        console.log("workflow init");
      })
      .catch((err) => {
        console.log(err);
      });
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
              <Dropdown.Item onClick={() => this.changeWorkfow(model4)}>Model 4</Dropdown.Item>
              <Dropdown.Item onClick={() => this.changeWorkfow(model5)}>Model 5</Dropdown.Item>
              <Dropdown.Item onClick={() => this.changeWorkfow(model6)}>Model 6</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>

      </div>
    );
  }


}

export default MenuNav;
