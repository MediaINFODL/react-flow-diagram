'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var historyLimit = 50;

var history = function history(reducer) {
  return function (state, action) {
    var nextState = reducer(state, action);
    switch (action.type) {
      case 'rd/canvas/TRACK':
      case '@@INIT':
      case '@@redux/INIT':
        return nextState;
      case 'rd/history/UNDO':
        {
          var pastStep = nextState.history.past[nextState.history.past.length - 1];
          return pastStep ? _extends({}, nextState, {
            entity: pastStep.entity,
            metaEntity: pastStep.metaEntity,
            history: {
              past: nextState.history.past.slice(0, nextState.history.past.length - 1),
              future: [{
                entity: nextState.entity,
                metaEntity: nextState.metaEntity
              }].concat(nextState.history.future),
              lastAction: nextState.history.lastAction
            }
          }) : nextState;
        }
      case 'rd/history/REDO':
        {
          var futureStep = nextState.history.future[0];
          return futureStep ? _extends({}, nextState, {
            entity: futureStep.entity,
            metaEntity: futureStep.metaEntity,
            history: {
              past: [].concat(nextState.history.past, [{
                entity: state.entity,
                metaEntity: state.metaEntity
              }]),
              future: nextState.history.future.slice(1),
              lastAction: nextState.history.lastAction
            }
          }) : nextState;
        }
      case 'STATUS/SET':
        {
          if (action.payload.id !== state.status.id) {
            // console.log('status-selected');
            return Object.assign({}, state, { status: action.payload });
          }
          return state;
        }
      case 'STATUS/UPDATE':
        {
          if (state.status.name !== action.payload) {
            console.log('update');
            var new_status = Object.assign({}, state.status, { name: action.payload });
            return Object.assign({}, state, { status: new_status });
          }
          return state;
        }
      case 'STATUS/REMOVE':
        {
          return Object.assign({}, state, { status: { id: '', name: '' } });
        }
      case 'LABEL/SET':
        if (action.payload.id !== state.label.id) {
          return Object.assign({}, state, { label: action.payload });
        }
        return state;
      case 'LABEL/REMOVE':
        return Object.assign({}, state, { label: {} });
      default:
        if (action.type === state.history.lastAction) {
          return nextState;
        } else {
          var newPast = [].concat(nextState.history.past, [{
            entity: state.entity,
            metaEntity: state.metaEntity
          }]);
          return _extends({}, nextState, {
            history: {
              past: newPast.length > historyLimit ? newPast.slice(1) : newPast,
              future: [],
              lastAction: action.type
            }
          });
        }
    }
  };
};

var undo = exports.undo = function undo() {
  return {
    type: 'rd/history/UNDO',
    payload: undefined
  };
};

var redo = exports.redo = function redo() {
  return {
    type: 'rd/history/REDO',
    payload: undefined
  };
};

var assignStatusToStore = exports.assignStatusToStore = function assignStatusToStore(payload) {
  return {
    type: 'STATUS/SET',
    payload: payload
  };
};

var assignNewStatusToStore = exports.assignNewStatusToStore = function assignNewStatusToStore(payload) {
  return {
    type: 'STATUS/UPDATE',
    payload: payload
  };
};

var assignEmptyStatusToStore = exports.assignEmptyStatusToStore = function assignEmptyStatusToStore() {
  return {
    type: 'STATUS/REMOVE',
    payload: undefined
  };
};

var assignLabelToStore = exports.assignLabelToStore = function assignLabelToStore(payload) {
  return {
    type: 'LABEL/SET',
    payload: payload
  };
};

var assignEmptyLabelToStore = exports.assignEmptyLabelToStore = function assignEmptyLabelToStore() {
  return {
    type: 'LABEL/REMOVE',
    payload: undefined
  };
};

exports.default = history;