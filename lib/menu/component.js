"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require("semantic-ui-react");

var _src = require("../../src");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _modelExample = require("../../demo/src/model-example");

var _modelExample2 = _interopRequireDefault(_modelExample);

var _modelexample = require("../../demo/src/data/modelexample.json");

var _modelexample2 = _interopRequireDefault(_modelexample);

var _modelExample3 = require("../../demo/src/model-example2");

var _modelExample4 = _interopRequireDefault(_modelExample3);

var _modelExample5 = require("../../demo/src/model-example3");

var _modelExample6 = _interopRequireDefault(_modelExample5);

var _modelExample7 = require("../../demo/src/model-example4");

var _modelExample8 = _interopRequireDefault(_modelExample7);

var _modelExample9 = require("../../demo/src/model-example5");

var _modelExample10 = _interopRequireDefault(_modelExample9);

var _modelExample11 = require("../../demo/src/model-example6");

var _modelExample12 = _interopRequireDefault(_modelExample11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    _src.store.dispatch((0, _src.setEntities)(item));
  };

  MenuNav.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    _axios2.default.get("./demo/src/data").then(function (res) {
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
    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        _semanticUiReact.Menu,
        { vertical: true },
        _react2.default.createElement(
          _semanticUiReact.Dropdown,
          { item: true, text: "All models" },
          _react2.default.createElement(
            _semanticUiReact.Dropdown.Menu,
            null,
            _react2.default.createElement(
              _semanticUiReact.Dropdown.Item,
              { onClick: function onClick() {
                  return _this3.changeWorkfow(_modelExample2.default);
                } },
              "Model 1"
            ),
            _react2.default.createElement(
              _semanticUiReact.Dropdown.Item,
              { onClick: function onClick() {
                  return _this3.changeWorkfow(_modelExample4.default);
                } },
              "Model 2"
            ),
            _react2.default.createElement(
              _semanticUiReact.Dropdown.Item,
              { onClick: function onClick() {
                  return _this3.changeWorkfow(_modelExample6.default);
                } },
              "Model 3"
            ),
            _react2.default.createElement(
              _semanticUiReact.Dropdown.Item,
              { onClick: function onClick() {
                  return _this3.changeWorkfow(_modelExample8.default);
                } },
              "Model 4"
            ),
            _react2.default.createElement(
              _semanticUiReact.Dropdown.Item,
              { onClick: function onClick() {
                  return _this3.changeWorkfow(_modelExample10.default);
                } },
              "Model 5"
            ),
            _react2.default.createElement(
              _semanticUiReact.Dropdown.Item,
              { onClick: function onClick() {
                  return _this3.changeWorkfow(_modelExample12.default);
                } },
              "Model 6"
            )
          )
        )
      )
    );
  };

  return MenuNav;
}(_react2.default.Component);

exports.default = MenuNav;
module.exports = exports["default"];