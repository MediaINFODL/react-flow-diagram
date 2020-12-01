"use strict";

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(["\n  fill: none;\n  stroke-width: ", ";\n  stroke: ", ";\n  stroke-linejoin: round;\n  marker-start: url(\"#circle-start\");\n  marker-end: url(\"#arrow-end\");\n"], ["\n  fill: none;\n  stroke-width: ", ";\n  stroke: ", ";\n  stroke-linejoin: round;\n  marker-start: url(\"#circle-start\");\n  marker-end: url(\"#arrow-end\");\n"]),
    _templateObject2 = _taggedTemplateLiteralLoose(["\n  fill: none;\n  stroke-width: 1em;\n  stroke: transparent;\n  stroke-linejoin: round;\n"], ["\n  fill: none;\n  stroke-width: 1em;\n  stroke: transparent;\n  stroke-linejoin: round;\n"]),
    _templateObject3 = _taggedTemplateLiteralLoose(["\n  background: #444;\n  border-radius: 3px;\n  color: #fff;\n  display: inline-block;\n  font-size: 11px;\n  padding: 2px 5px;\n  cursor: pointer;\n"], ["\n  background: #444;\n  border-radius: 3px;\n  color: #fff;\n  display: inline-block;\n  font-size: 11px;\n  padding: 2px 5px;\n  cursor: pointer;\n"]),
    _templateObject4 = _taggedTemplateLiteralLoose(["\n  background: #444;\n  border-radius: 3px;\n  color: #fff;\n  display: none;\n  font-size: 11px;\n  line-height: 15px;\n  padding: 2px 5px;\n  cursor: pointer;\n  transform: translate(-50%, -50%);\n"], ["\n  background: #444;\n  border-radius: 3px;\n  color: #fff;\n  display: none;\n  font-size: 11px;\n  line-height: 15px;\n  padding: 2px 5px;\n  cursor: pointer;\n  transform: translate(-50%, -50%);\n"]),
    _templateObject5 = _taggedTemplateLiteralLoose(["\n    span {\n      display: initial;\n    }\n"], ["\n    span {\n      display: initial;\n    }\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _ = require("../");

var _reducer = require("../history/reducer");

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

/*
 * Presentational
 * ==================================== */

var Line = _styledComponents2.default.path(_templateObject, function (props) {
  return props.strokeWidth;
}, function (props) {
  return props.strokeColor;
});

var InteractionLine = _styledComponents2.default.path(_templateObject2);

var Label = _styledComponents2.default.p(_templateObject3);

var Plus = _styledComponents2.default.span(_templateObject4);

var Group = _styledComponents2.default.g(_templateObject5);

var ArrowBody = function (_React$PureComponent) {
  _inherits(ArrowBody, _React$PureComponent);

  function ArrowBody(props) {
    _classCallCheck(this, ArrowBody);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.checkIfZigZagLine = function (points) {
      var start = points[0];
      var startJoint = points[1];
      var endJoint = points[2];
      var end = points[3];
      var startDirection = void 0;
      var endDirection = void 0;

      if (start.x > startJoint.x) {
        startDirection = "left";
      } else if (start.x < startJoint.x) {
        startDirection = "right";
      }

      if (start.y > startJoint.y) {
        startDirection = "up";
      } else if (start.y < startJoint.y) {
        startDirection = "down";
      }

      if (end.x < endJoint.x) {
        endDirection = "left";
      } else if (end.x > endJoint.x) {
        endDirection = "right";
      }

      if (end.y < endJoint.y) {
        endDirection = "up";
      } else if (end.y > endJoint.y) {
        endDirection = "down";
      }

      return startDirection && endDirection && startDirection === endDirection;
    };

    _this.getMethodForLabelPosition = function () {
      var points = _this.props.rawPoints;
      var maxDistance = -1;
      var pt = [];
      for (var i = 0; i < points.length; i++) {
        if (points[i + 1]) {
          var d = Math.sqrt(Math.pow(points[i + 1].x - points[i].x, 2) + Math.pow(points[i + 1].y - points[i].y, 2));
          if (d >= maxDistance) {
            if (points.length === 4 && _this.checkIfZigZagLine(points)) {
              pt = [];
              pt.push(points[0]);
              pt.push(points[points.length - 1]);
              return { x: (pt[0].x + pt[1].x) / 2, y: (pt[0].y + pt[1].y) / 2 };
            }
            maxDistance = d;
            pt = [];
            pt.push(points[i]);
            pt.push(points[i + 1]);
          }
        }
      }
      return { x: (pt[0].x + pt[1].x) / 2, y: (pt[0].y + pt[1].y) / 2 };
    };

    _this.getLabelX = function () {
      return _this.getMethodForLabelPosition().x - _this.state.width / 2;
    };

    _this.getLabelY = function () {
      return _this.getMethodForLabelPosition().y - _this.state.height / 2;
    };

    _this.emitLabelData = function (data) {
      // console.log("LABEL CLICK", data);
      _.store.dispatch((0, _reducer.assignLabelToStore)(data));
    };

    _this.handleLineLabelClick = function (id) {
      var _this$props = _this.props,
          links = _this$props.links,
          isEntitySelected = _this$props.isEntitySelected;

      if (isEntitySelected) {
        links.map(function (link) {
          var lineElement = document.getElementById("line" + link.uid);
          lineElement.style.stroke = 'black';
          lineElement.style.strokeWidth = '.1em';
        });
      } else {
        links.map(function (link) {
          var lineElement = document.getElementById("line" + link.uid);
          if (id === link.uid) {
            lineElement.style.stroke = lineElement.style.stroke === 'black' || lineElement.style.stroke === '' ? 'rgb(219, 40, 40)' : 'black';
            lineElement.style.strokeWidth = lineElement.style.stroke === 'black' ? '.1em' : '.2em';
          } else {
            lineElement.style.stroke = 'black';
            lineElement.style.strokeWidth = '.1em';
          }
        });
      }
    };

    _this.state = {
      label: _this.props.label,
      width: 150,
      height: 50
    };
    return _this;
  }

  ArrowBody.prototype.componentDidMount = function componentDidMount() {
    if (this.el) {
      var _el$getBoundingClient = this.el.getBoundingClientRect(),
          height = _el$getBoundingClient.height,
          width = _el$getBoundingClient.width;

      this.setState({ width: width, height: height });
    }
  };

  ArrowBody.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.isEntitySelected !== this.props.isEntitySelected) {
      this.handleLineLabelClick();
    }
    if (this.el) {
      var _el$getBoundingClient2 = this.el.getBoundingClientRect(),
          height = _el$getBoundingClient2.height,
          width = _el$getBoundingClient2.width;

      this.setState({ width: width, height: height });
    }
  };

  ArrowBody.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      Group,
      null,
      _react2.default.createElement(Line, {
        strokeWidth: this.props.id === 'will_connect' ? '.2em' : '.1em',
        strokeColor: this.props.id === 'will_connect' ? '#db2828' : 'black',
        d: this.props.points,
        id: "line" + this.props.uid
      }),
      _react2.default.createElement(InteractionLine, { d: this.props.points }),
      this.props.label && _react2.default.createElement(
        "foreignObject",
        {
          x: this.getLabelX(),
          y: this.getLabelY(),
          width: this.state.width,
          height: this.state.height
        },
        _react2.default.createElement(
          Label,
          {
            innerRef: function innerRef(el) {
              return _this2.el = el;
            },
            xlinkHref: "#line" + this.props.id,
            onClick: function onClick() {
              _this2.handleLineLabelClick(_this2.props.uid, _this2.props);
              _this2.emitLabelData(_this2.props);
            }
          },
          this.props.label
        )
      ),
      !this.props.label && _react2.default.createElement(
        "foreignObject",
        {
          x: this.getLabelX(),
          y: this.getLabelY(),
          width: this.state.width,
          height: this.state.height
        },
        _react2.default.createElement(
          Plus,
          {
            innerRef: function innerRef(el) {
              return _this2.el = el;
            },
            onClick: function onClick() {
              _this2.emitLabelData(_this2.props);
            }
          },
          "+"
        )
      )
    );
  };

  return ArrowBody;
}(_react2.default.PureComponent);

/*
 * Container
 * ==================================== */

var pointsToString = function pointsToString(points) {
  var str = points.reduce(function (acc, curr) {
    return acc + " " + curr.x + "," + curr.y + " L";
  }, "M").replace(/ L$/, "");
  return str;
};

var positionStartOfPath = function positionStartOfPath(points, entity) {
  if (!entity) {
    return pointsToString(points);
  }
  var start = points[0];
  var joint = points[1];

  var direction = "";

  if (start.x > joint.x) {
    direction = "left";
  } else if (start.x < joint.x) {
    direction = "right";
  }

  if (start.y > joint.y) {
    direction = "up";
  } else if (start.y < joint.y) {
    direction = "down";
  }

  var connect = void 0;
  switch (direction) {
    case "left":
      connect = entity.x;
      points[0].x = connect;
      break;
    case "right":
      connect = entity.x + entity.width;
      points[0].x = connect;
      break;
    case "up":
      connect = entity.y;
      points[0].y = connect;
      break;
    case "down":
      connect = entity.y + entity.height;
      points[0].y = connect;
      break;
  }

  return pointsToString(points);
};

var getBoxPoints = function getBoxPoints(points) {
  var max_x = points[0].x;
  var max_y = points[0].y;
  var min_x = points[0].x;
  var min_y = points[0].y;
  points.map(function (point) {
    if (point.x > max_x) {
      max_x = point.x;
    }
    if (point.y > max_y) {
      max_y = point.y;
    }
    if (point.x < max_x) {
      min_x = point.x;
    }
    if (point.y < max_y) {
      min_y = point.y;
    }
  });
  return { min: { x: min_x, y: min_y }, max: { x: max_x, y: max_y } };
};

var ArrowBodyContainer = function (_React$PureComponent2) {
  _inherits(ArrowBodyContainer, _React$PureComponent2);

  function ArrowBodyContainer() {
    _classCallCheck(this, ArrowBodyContainer);

    return _possibleConstructorReturn(this, _React$PureComponent2.apply(this, arguments));
  }

  ArrowBodyContainer.prototype.render = function render() {
    var _this4 = this;

    return _react2.default.createElement(
      "g",
      null,
      this.props.links.map(function (link) {
        return link.points && _react2.default.createElement(ArrowBody, {
          key: link.target,
          id: link.target,
          isEntitySelected: _this4.props.isSelected,
          uid: link.uid,
          links: _this4.props.connectinLinks,
          label: link.label,
          points: positionStartOfPath(link.points, _this4.props.entity),
          rawPoints: link.points,
          handleSidebarChange: _this4.props.handleSidebarChange
        });
      })
    );
  };

  return ArrowBodyContainer;
}(_react2.default.PureComponent);

var mapStateToProps = function mapStateToProps(state) {
  return {
    entities: state.entity,
    connectinLinks: state.entity.reduce(function (prev, next) {
      return prev.concat(next.linksTo);
    }, []).filter(function (link) {
      return link !== undefined;
    }),
    isSelected: state.metaEntity.find(function (entity) {
      return entity.isSelected === true;
    }) !== undefined
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(ArrowBodyContainer);
module.exports = exports["default"];