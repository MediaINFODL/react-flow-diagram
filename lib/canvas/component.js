"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(["\n  min-height: 10em;\n  flex: 1 0 auto;\n  position: relative;\n  overflow: hidden;\n  background-color: #fefefe;\n\n  & * {\n    box-sizing: border-box;\n  }\n  & ul,\n  & ol {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n  }\n"], ["\n  min-height: 10em;\n  flex: 1 0 auto;\n  position: relative;\n  overflow: hidden;\n  background-color: #fefefe;\n\n  & * {\n    box-sizing: border-box;\n  }\n  & ul,\n  & ol {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n  }\n"]),
    _templateObject2 = _taggedTemplateLiteralLoose(["\n  position: relative;\n  transform-origin: 0 0;\n  background-color: white;\n  overflow: hidden;\n"], ["\n  position: relative;\n  transform-origin: 0 0;\n  background-color: white;\n  overflow: hidden;\n"]),
    _templateObject3 = _taggedTemplateLiteralLoose(["\n  position: absolute;\n  top: 0;\n  left: 0;\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRedux = require("react-redux");

var _reducer = require("./reducer");

var _ = require("../");

var _reducer2 = require("../history/reducer");

var _reducer3 = require("../entity/reducer");

var _component = require("../icon/component");

var _component2 = require("../entity/component");

var _component3 = _interopRequireDefault(_component2);

var _component4 = require("../panel/component");

var _component5 = _interopRequireDefault(_component4);

var _component6 = require("../links/component");

var _component7 = _interopRequireDefault(_component6);

var _component8 = require("../arrowMarker/component");

var _component9 = _interopRequireDefault(_component8);

var _component10 = require("../sidebar/component");

var _component11 = _interopRequireDefault(_component10);

var _component12 = require("../debug/component");

var _component13 = _interopRequireDefault(_component12);

var _calcLinkPoints = require("../links/calcLinkPoints");

var _calcLinkPoints2 = _interopRequireDefault(_calcLinkPoints);

var _elemLayout = require("./elemLayout");

var _elemLayout2 = _interopRequireDefault(_elemLayout);

var _semanticUiReact = require("semantic-ui-react");

var _component14 = require("../status-sidebar/component");

var _component15 = _interopRequireDefault(_component14);

var _component16 = require("../circleMarker/component");

var _component17 = _interopRequireDefault(_component16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

/*
 * Presentational
 * ==================================== */

var CanvasViewport = _styledComponents2.default.div(_templateObject);

var CanvasArtboard = _styledComponents2.default.div.attrs({
  style: function style(props) {
    var restPercentage = 100 - 100 / props.gridSize;
    var defaultStyles = {
      transform: "translate(" + props.artboard.x + "px, " + props.artboard.y + "px) scale(" + props.zoomLevel + ")",
      width: props.artboard.width + "px",
      height: props.artboard.height + "px"
    };
    var gridStyle = {
      backgroundImage: "linear-gradient(0deg, transparent 0%, transparent " + restPercentage + "%, rgba(0, 0, 0, .05) 100%),\nlinear-gradient(90deg, transparent 0%, transparent " + restPercentage + "%, rgba(0, 0, 0, .05) 100%)",
      backgroundSize: props.gridSize + "px " + props.gridSize + "px"
    };
    return props.gridSize ? _extends({}, defaultStyles, gridStyle) : defaultStyles;
  }
})(_templateObject2);

var SvgLand = _styledComponents2.default.svg(_templateObject3);

var Canvas = function (_React$PureComponent) {
  _inherits(Canvas, _React$PureComponent);

  function Canvas(props) {
    _classCallCheck(this, Canvas);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.state = {
      sidebarOpened: false,
      selectedLinkId: "",
      selectedLabel: "",
      editedLabel: "",
      model: {},
      statusSidebarOpen: true,
      statusId: "",
      currentStatus: "my",
      newStatus: ""
    };
    _this.handleSidebarChange = _this.handleSidebarChange.bind(_this);
    _this.onSaveLabel = _this.onSaveLabel.bind(_this);
    _this.onRemoveLabel = _this.onRemoveLabel.bind(_this);
    _this.onSelectedLinkLabel = _this.onSelectedLinkLabel.bind(_this);
    // this.handleEmitSidebarChange = this.handleEmitSidebarChange(this);
    return _this;
  }

  Canvas.prototype.render = function render() {
    var _this2 = this;

    var view = this.props.view;

    return _react2.default.createElement(
      CanvasViewport,
      {
        onMouseMove: this.props.onMouseMove,
        innerRef: function innerRef(div) {
          return _this2.props.handleRef(div);
        }
      },
      _react2.default.createElement(
        CanvasArtboard,
        {
          onMouseDown: this.props.onMouseDown,
          onMouseUp: this.props.onMouseUp,
          gridSize: this.props.gridSize,
          artboard: this.props.artboard,
          zoomLevel: this.props.zoomLevel
        },
        _react2.default.createElement(
          SvgLand,
          {
            width: "100%",
            height: "100%",
            onMouseMove: this.props.onMouseMove
          },
          _react2.default.createElement(_component17.default, null),
          this.props.entities.filter(function (entity) {
            return "linksTo" in entity;
          })
          // $FlowFixMe
          .map(function (entity) {
            return _react2.default.createElement(_component7.default, {
              key: entity.id,
              links: entity.linksTo,
              entity: entity,
              handleSidebarChange: _this2.handleSidebarChange });
          }),
          this.props.isConnecting && _react2.default.createElement(_component7.default, { links: this.props.connectingLink }),
          _react2.default.createElement(_component9.default, null)
        ),
        this.props.entities.map(function (entity) {
          return {
            entity: entity,
            CustomEntity: _this2.props.wrappedCustomEntities[entity.type]
          };
        }).map(function (Combo) {
          return _react2.default.createElement(Combo.CustomEntity, { key: Combo.entity.id, model: Combo.entity });
        })
      ),
      !view && _react2.default.createElement(_component5.default, { zoomIn: this.props.zoomIn, zoomOut: this.props.zoomOut }),
      this.state.sidebarOpened && _react2.default.createElement(_component11.default, {
        handleSidebarChange: this.handleSidebarChange,
        opened: this.state.sidebarOpened,
        selectedLabel: this.state.selectedLabel,
        selectedLinkId: this.state.selectedLinkId
        // onSelectedLinkLabel={this.onSelectedLinkLabel}
        , onSaveLabel: this.onSaveLabel })
    );
  };

  Canvas.prototype.handleSidebarChange = function handleSidebarChange(sidebarOpened, selectedLink) {
    // Sidebar can be opened by selecting a link entity
    // Sidebar can be closed by cancel button from the sidebar component 
    this.setState({
      selectedLabel: selectedLink.label ? selectedLink.label : "",
      selectedLinkId: selectedLink.id ? selectedLink.id : "",
      sidebarOpened: sidebarOpened
    });
  };

  Canvas.prototype.onSelectedLinkLabel = function onSelectedLinkLabel(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ editedLabel: e.target.value });
  };

  Canvas.prototype.onSaveLabel = function onSaveLabel(id, initLabel, newLabel) {
    // The initLabel is the starting value of the label
    // The newLabel is the changed value of the label that should be updated
    // The id is the linksTo statusId
    // Find the link from statuses that contains the label and update the model entity
    this.props.entities.map(function (status) {
      if (status.linksTo) {
        var foundEntity = status.linksTo.find(function (x) {
          return x.target == id && x.label == initLabel;
        });

        if (foundEntity) {
          foundEntity.label = newLabel;
          _.store.dispatch((0, _reducer3.setLabel)({ id: status.id, to: id, label: newLabel }));
        }
      }
    });
    this.setState({ sidebarOpened: false });
  };

  Canvas.prototype.onRemoveLabel = function onRemoveLabel() {};

  return Canvas;
}(_react2.default.PureComponent);

/*
 * Container
 * ==================================== */

var CanvasContainer = function (_React$PureComponent2) {
  _inherits(CanvasContainer, _React$PureComponent2);

  function CanvasContainer() {
    var _temp, _this3, _ret;

    _classCallCheck(this, CanvasContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, _React$PureComponent2.call.apply(_React$PureComponent2, [this].concat(args))), _this3), _this3.zoomSteps = [0.25, 0.5, 0.75, 1, 1.5, 2, 4], _this3.state = {
      zoomStep: 3
    }, _this3.handleRightClick = function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      _this3.props.connecting({
        currently: false,
        from: ''
      });
    }, _this3.wrappedCustomEntities = Object.assign.apply(Object, [{}].concat(Object.keys(_this3.props.customEntities).map(function (type) {
      var _ref;

      return _ref = {}, _ref[type] = (0, _component3.default)((0, _reactRedux.connect)(null, { setName: _reducer3.setName })(_this3.props.customEntities[type].component)), _ref;
    }))), _this3.handleKey = function (ev) {
      if (ev.key === 'Escape') {
        ev.preventDefault();
        ev.stopPropagation();
        _this3.props.connecting({
          currently: false,
          from: ''
        });
      }
      if (ev.getModifierState("Meta") || ev.getModifierState("Control")) {
        switch (ev.key) {
          case "z":
            ev.preventDefault();
            _this3.props.undo();
            break;
          case "y":
            ev.preventDefault();
            _this3.props.redo();
            break;
          // no default
        }
      }
    }, _this3.onMouseDown = function (ev) {
      _this3.props.anchorCanvas(true);
    }, _this3.onMouseMove = function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      _this3.props.trackMovement({
        x: ev.pageX,
        y: ev.pageY
      });
    }, _this3.onMouseUp = function () {
      _this3.props.anchorCanvas(false);
    }, _this3.zoomIn = function () {
      _this3.traverseZoomLevels(1);
    }, _this3.zoomOut = function () {
      _this3.traverseZoomLevels(-1);
    }, _this3.handleRef = function (div) {
      if (_this3.canvasDOM === undefined) {
        _this3.canvasDOM = div;
        _this3.setOffset();
      }
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  CanvasContainer.prototype.componentDidMount = function componentDidMount() {
    var _this4 = this;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.document.addEventListener('contextmenu', this.handleRightClick);
    window.document.addEventListener("keydown", this.handleKey);

    Object.keys(this.props.customEntities).forEach(function (entityType) {
      var _icons$addIcon;

      _component.icons.addIcon((_icons$addIcon = {}, _icons$addIcon[entityType] = _this4.props.customEntities[entityType].icon, _icons$addIcon));
    });
  };

  CanvasContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    window.document.removeEventListener("keydown", this.handleKey);
    window.document.removeEventListener('contextmenu', this.handleRightClick);

    this.canvasDOM = undefined;
    _elemLayout2.default.gc();
  };

  CanvasContainer.prototype.setOffset = function setOffset() {
    if (this.canvasDOM) {
      var cd = this.canvasDOM;
      _elemLayout2.default.set(cd);
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
      this.props.configViewport();
    }
  };

  CanvasContainer.prototype.traverseZoomLevels = function traverseZoomLevels(i) {
    var _this5 = this;

    var min = 0;
    var max = this.zoomSteps.length - 1;
    var potential = this.state.zoomStep + i;

    var determineZoomLevel = function determineZoomLevel(prevIndex) {
      if (potential > max) {
        return max;
      } else if (potential < min) {
        return min;
      } else {
        return prevIndex + i;
      }
    };
    this.setState(function (prevState) {
      return {
        zoomStep: determineZoomLevel(prevState.zoomStep)
      };
    }, function () {
      return _this5.props.zoom(_this5.zoomSteps[_this5.state.zoomStep]);
    });
  };

  CanvasContainer.prototype.render = function render() {
    return _react2.default.createElement(Canvas, {
      entities: this.props.entities,
      view: this.props.view,
      connecting: this.props.connecting,
      wrappedCustomEntities: this.wrappedCustomEntities,
      handleRef: this.handleRef,
      onMouseDown: this.onMouseDown,
      onMouseMove: this.onMouseMove,
      onMouseUp: this.onMouseUp,
      isConnecting: this.props.isConnecting,
      connectingLink: this.props.connectingLink,
      zoomLevel: this.props.zoomLevel,
      zoomIn: this.zoomIn,
      zoomOut: this.zoomOut,
      artboard: this.props.artboard,
      gridSize: this.props.gridSize
    });
  };

  return CanvasContainer;
}(_react2.default.PureComponent);

var makeConnectingLinks = function makeConnectingLinks(state) {
  if (state.canvas.connecting.currently) {
    var points = (0, _calcLinkPoints2.default)(state.entity.find(function (entity) {
      return entity.id === state.canvas.connecting.from;
    }), {
      x: state.canvas.cursor.x,
      y: state.canvas.cursor.y,
      width: 0,
      height: 0
    }, "makeConnectingLinks");
    return [{
      target: "will_connect",
      edited: false,
      points: points
    }];
  } else {
    return [{ target: "noop", edited: false }];
  }
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    entities: state.entity,
    isConnecting: state.canvas.connecting.currently,
    connectingLink: makeConnectingLinks(state),
    gridSize: state.canvas.gridSize,
    artboard: state.canvas.canvasArtboard,
    zoomLevel: state.canvas.zoom
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  configViewport: _reducer.configViewport,
  trackMovement: _reducer.trackMovement,
  anchorCanvas: _reducer.anchorCanvas,
  connecting: _reducer.connecting,
  resetCanvas: _reducer.resetCanvas,
  zoom: _reducer.zoom,
  undo: _reducer2.undo,
  redo: _reducer2.redo
})(CanvasContainer);
module.exports = exports["default"];