"use strict";

exports.__esModule = true;
exports.store = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _component = require("../canvas/component");

var _component2 = _interopRequireDefault(_component);

var _component3 = require("../task/component");

var _component4 = _interopRequireDefault(_component3);

var _icon = require("../task/icon");

var _icon2 = _interopRequireDefault(_icon);

var _icon3 = require("../event/icon");

var _icon4 = _interopRequireDefault(_icon3);

var _component5 = require("../event/component");

var _component6 = _interopRequireDefault(_component5);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = exports.store = (0, _redux.createStore)(_reducer2.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-disable no-underscore-dangle */

var customEntities = {
  Task: {
    component: _component4.default,
    icon: _icon2.default
  },
  Event: {
    component: _component6.default,
    icon: _icon4.default
  }
};

var Diagram = function Diagram() {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_component2.default, { customEntities: customEntities })
  );
};

exports.default = Diagram;