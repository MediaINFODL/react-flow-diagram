"use strict";

exports.__esModule = true;
exports.setName = exports.setLabel = exports.removeLabel = exports.removeEntity = exports.addLabel = exports.assignEmptyStatusToStore = exports.assignEmptyLabelToStore = exports.setCustom = exports.setConfig = exports.setEntityCross = exports.setEntities = exports.store = exports.resetCanvas = exports.diagramOn = exports.Diagram = undefined;

var _component = require("./diagram/component");

var _component2 = _interopRequireDefault(_component);

var _reducer = require("./entity/reducer");

var _reducer2 = require("./config/reducer");

var _diagramOn = require("./diagramOn/");

var _diagramOn2 = _interopRequireDefault(_diagramOn);

var _reducer3 = require("./history/reducer");

var _reducer4 = require("./canvas/reducer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Diagram = _component2.default;
exports.diagramOn = _diagramOn2.default;
exports.resetCanvas = _reducer4.resetCanvas;
exports.store = _component.store;
exports.setEntities = _reducer.setEntities;
exports.setEntityCross = _reducer.setEntityCross;
exports.setConfig = _reducer2.setConfig;
exports.setCustom = _reducer.setCustom;
exports.assignEmptyLabelToStore = _reducer3.assignEmptyLabelToStore;
exports.assignEmptyStatusToStore = _reducer3.assignEmptyStatusToStore;
exports.addLabel = _reducer.addLabel;
exports.removeEntity = _reducer.removeEntity;
exports.removeLabel = _reducer.removeLabel;
exports.setLabel = _reducer.setLabel;
exports.setName = _reducer.setName;