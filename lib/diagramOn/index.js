"use strict";

exports.__esModule = true;

var _component = require("../diagram/component");

var _reducer = require("../entity/reducer");

// ['a','b','c'].indexOf('a') > -1 === ['a','b','c'].includes('a')
//
var isLastAction = function isLastAction(lastAction, action) {
  return typeof action === "string" ? lastAction === action : action.indexOf(lastAction) > -1;
};

// Here we respond to two custom events, 'anyChange' and 'open', both related
// just to entity reducer actions (since what we return is just the entity
// reducer state).
//
// 'open' will respond to setting a completely new diagram ('rd/entity/SET')
// 'anyChange' will respond to any other change except opening a new diagram
//
var lastActionMatchesAction = function lastActionMatchesAction(lastAction, action) {
  switch (action) {
    case "anyChange":
      return _reducer.EntityActionTypesModify.indexOf(lastAction) > -1;
    case "open":
      return lastAction === _reducer.EntityActionTypeOpen;
    default:
      return isLastAction(lastAction, action);
  }
};

var checkForProperAction = function checkForProperAction(action) {
  var flag = void 0;
  switch (action) {
    case "rd/canvas/TRACK":
      flag = false;
      break;
    case "rd/canvas/ANCHOR_ENTITY":
      flag = false;
      break;
    case "rd/canvas/ANCHOR_CANVAS":
      flag = false;
      break;
    default:
      flag = true;
  }
  return flag;
};

// diagramOn will return a function
// that allows you to unsubscribe from the store
// http://redux.js.org/docs/api/Store.html#subscribelistener
//
var diagramOn = function diagramOn(action, fn) {
  return _component.store.subscribe(function () {
    var state = _component.store.getState();
    if (checkForProperAction(state.lastAction)) {
      // console.log(state.lastAction, action);
      fn(state.entity);
    }
  });
};

exports.default = diagramOn;
module.exports = exports["default"];