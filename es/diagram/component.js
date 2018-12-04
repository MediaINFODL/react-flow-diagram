
/* eslint-disable no-underscore-dangle */

import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";
import Canvas from "../canvas/component";

import Task from "../task/component";
import taskIcon from "../task/icon";

export var store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

var customEntities = {
  Task: {
    component: Task,
    icon: taskIcon
  }
};

var Diagram = function Diagram() {
  return React.createElement(
    Provider,
    { store: store },
    React.createElement(Canvas, { customEntities: customEntities })
  );
};

export default Diagram;