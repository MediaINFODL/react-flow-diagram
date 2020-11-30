"use strict";

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(["\n  position: absolute;\n  left: 0;\n  top: 0;\n"], ["\n  position: absolute;\n  left: 0;\n  top: 0;\n"]),
    _templateObject2 = _taggedTemplateLiteralLoose(["\n"], ["\n"]),
    _templateObject3 = _taggedTemplateLiteralLoose(["\n  width: ", "px;\n  height: ", "px;\n  padding: .6em;\n  display: flex;\n  ", "\n  background-color: white;\n  transition: background-color ease-in 80ms;\n  cursor: pointer;\n  -webkit-box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.15);\n-moz-box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.15);\nbox-shadow: 4px 4px 5px 0px rgba(0,0,0,0.15);\n&:hover {\n  background-color: #ccc;\n}\n\n.tooltiptext {\n  visibility: hidden;\n  width: 120px;\n  background-color: black;\n  color: #fff;\n  text-align: center;\n  border-radius: 6px;\n  padding: 5px 0;\n  \n  /* Position the tooltip */\n  position: absolute;\n  z-index: 1;\n  left: 105%;\n}\n\n&:hover .tooltiptext { \n  visibility: visible;\n  padding: 3px;\n}\n\n  & > svg {\n    display: block;\n    width: 100%;\n\n  }\n"], ["\n  width: ", "px;\n  height: ", "px;\n  padding: .6em;\n  display: flex;\n  ", "\n  background-color: white;\n  transition: background-color ease-in 80ms;\n  cursor: pointer;\n  -webkit-box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.15);\n-moz-box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.15);\nbox-shadow: 4px 4px 5px 0px rgba(0,0,0,0.15);\n&:hover {\n  background-color: #ccc;\n}\n\n.tooltiptext {\n  visibility: hidden;\n  width: 120px;\n  background-color: black;\n  color: #fff;\n  text-align: center;\n  border-radius: 6px;\n  padding: 5px 0;\n  \n  /* Position the tooltip */\n  position: absolute;\n  z-index: 1;\n  left: 105%;\n}\n\n&:hover .tooltiptext { \n  visibility: visible;\n  padding: 3px;\n}\n\n  & > svg {\n    display: block;\n    width: 100%;\n\n  }\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRedux = require("react-redux");

var _component = require("../icon/component");

var _component2 = _interopRequireDefault(_component);

var _reducer = require("../entity/reducer");

var _reducer2 = require("../history/reducer");

var _defaultEntity = require("../entity/defaultEntity");

var _defaultEntity2 = _interopRequireDefault(_defaultEntity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

/*
 * Presentational
 * ==================================== */

var PanelStyle = _styledComponents2.default.div(_templateObject);

var PanelTools = _styledComponents2.default.ul(_templateObject2);

var PanelTool = _styledComponents2.default.li(_templateObject3, function (props) {
  return props.width;
}, function (props) {
  return props.width;
}, function (props) {
  return props.separator ? "border-top: 1px solid rgba(0, 0, 0, .05);" : "";
});

var Panel = function Panel(props) {
  return _react2.default.createElement(
    PanelStyle,
    null,
    _react2.default.createElement(
      PanelTools,
      null,
      props.entityTypeNames.map(function (entityTypeName) {
        return _react2.default.createElement(
          PanelTool,
          {
            className: "tooltip",
            width: props.toolWidth(),
            key: entityTypeName,
            onMouseDown: function onMouseDown() {
              return props.addEntityHelper(entityTypeName);
            }
          },
          _react2.default.createElement(_component2.default, { name: entityTypeName, label: entityTypeName == 'Task' ? "Add status" : 'Add starting status' }),
          _react2.default.createElement(
            "span",
            { key: entityTypeName, className: "tooltiptext" },
            entityTypeName == 'Task' ? "Add status" : 'Add starting status'
          )
        );
      }),
      _react2.default.createElement(
        PanelTool,
        {
          separator: true,
          width: props.toolWidth(),
          onMouseDown: function onMouseDown() {
            return props.zoomIn();
          }
        },
        _react2.default.createElement(_component2.default, { name: "zoomIn", label: "Zoom in" }),
        _react2.default.createElement(
          "span",
          { key: "zoomIn", className: "tooltiptext" },
          'Zoom in'
        )
      ),
      _react2.default.createElement(
        PanelTool,
        { width: props.toolWidth(), onMouseDown: function onMouseDown() {
            return props.zoomOut();
          } },
        _react2.default.createElement(_component2.default, { name: "zoomOut", label: "Zoom out" }),
        _react2.default.createElement(
          "span",
          { key: "zoomIn", className: "tooltiptext" },
          'Zoom out'
        )
      ),
      _react2.default.createElement(
        PanelTool,
        { width: props.toolWidth(), onMouseDown: function onMouseDown() {
            return props.undo();
          } },
        _react2.default.createElement(_component2.default, { name: "undo", label: "Undo" }),
        _react2.default.createElement(
          "span",
          { key: "zoomIn", className: "tooltiptext" },
          'Undo'
        )
      ),
      _react2.default.createElement(
        PanelTool,
        { width: props.toolWidth(), onMouseDown: function onMouseDown() {
            return props.redo();
          } },
        _react2.default.createElement(_component2.default, { name: "redo", label: "Redo" }),
        _react2.default.createElement(
          "span",
          { key: "zoomIn", className: "tooltiptext" },
          'Redo'
        )
      )
    )
  );
};

/*
 * Container
 * ==================================== */

var PanelContainer = function (_React$PureComponent) {
  _inherits(PanelContainer, _React$PureComponent);

  function PanelContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, PanelContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.entityTypeNames = Object.keys(_this.props.entityTypes), _this.minToolSize = 40, _this.niceToolSize = 50, _this.addEntityHelper = function () {
      var entityType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Task";

      _this.props.addEntity(_this.props.defaultEntity({ entityType: entityType }));
    }, _this.toolWidth = function () {
      if (typeof _this.props.gridSize === "number") {
        var _gridSize = _this.props.gridSize;
        var howManyFit = parseInt(_this.minToolSize / _this.props.gridSize, 10);
        var theRest = _this.minToolSize * howManyFit % _gridSize;
        var fittingSize = theRest === 0 ? howManyFit * _gridSize : (howManyFit + 1) * _gridSize;
        return fittingSize === 0 ? _gridSize : fittingSize;
      } else {
        return _this.niceToolSize;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PanelContainer.prototype.render = function render() {
    return _react2.default.createElement(Panel, {
      addEntityHelper: this.addEntityHelper,
      entityTypeNames: this.entityTypeNames,
      toolWidth: this.toolWidth,
      zoomIn: this.props.zoomIn,
      undo: this.props.undo,
      redo: this.props.redo,
      zoomOut: this.props.zoomOut
    });
  };

  return PanelContainer;
}(_react2.default.PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  return {
    entityTypes: state.config.entityTypes,
    defaultEntity: (0, _defaultEntity2.default)(state),
    gridSize: state.canvas.gridSize
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { addEntity: _reducer.addEntity, undo: _reducer2.undo, redo: _reducer2.redo })(PanelContainer);
module.exports = exports["default"];