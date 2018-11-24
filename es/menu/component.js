function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { store, setEntities } from "../";
import axios from "axios";
import model from "../../demo/src/model-example";
import model1 from "../../demo/src/data/modelexample.json";
import model2 from "../../demo/src/model-example2";
import model3 from "../../demo/src/model-example3";
import model4 from "../../demo/src/model-example4";
import model5 from "../../demo/src/model-example5";
import model6 from "../../demo/src/model-example6";

var MenuNav = function (_React$Component) {
  _inherits(MenuNav, _React$Component);

  function MenuNav() {
    var _temp, _this, _ret;

    _classCallCheck(this, MenuNav);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      workflows: []
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MenuNav.prototype.changeWorkfow = function changeWorkfow(item) {
    store.dispatch(setEntities(item));
  };

  MenuNav.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    axios.get("./demo/src/data").then(function (res) {
      // for (let i in res.data) {
      //   console.log(res.data[i]);
      // }
      _this2.setState({ workflows: res.data });
      console.log("workflow init");
    }).catch(function (err) {
      console.log(err);
    });
  };

  MenuNav.prototype.render = function render() {
    var _this3 = this;

    // This syntax ensures `this` is bound within handleClick
    return React.createElement(
      "div",
      null,
      React.createElement(
        Menu,
        { vertical: true },
        React.createElement(
          Dropdown,
          { item: true, text: "All models" },
          React.createElement(
            Dropdown.Menu,
            null,
            React.createElement(
              Dropdown.Item,
              { onClick: function onClick() {
                  return _this3.changeWorkfow(model);
                } },
              "Model 1"
            ),
            React.createElement(
              Dropdown.Item,
              { onClick: function onClick() {
                  return _this3.changeWorkfow(model2);
                } },
              "Model 2"
            ),
            React.createElement(
              Dropdown.Item,
              { onClick: function onClick() {
                  return _this3.changeWorkfow(model3);
                } },
              "Model 3"
            ),
            React.createElement(
              Dropdown.Item,
              { onClick: function onClick() {
                  return _this3.changeWorkfow(model4);
                } },
              "Model 4"
            ),
            React.createElement(
              Dropdown.Item,
              { onClick: function onClick() {
                  return _this3.changeWorkfow(model5);
                } },
              "Model 5"
            ),
            React.createElement(
              Dropdown.Item,
              { onClick: function onClick() {
                  return _this3.changeWorkfow(model6);
                } },
              "Model 6"
            )
          )
        )
      )
    );
  };

  return MenuNav;
}(React.Component);

export default MenuNav;