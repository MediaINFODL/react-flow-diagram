'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n  fill: black;\n'], ['\n  fill: black;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

/*
 * Presentational
 * ==================================== */

var Circle = _styledComponents2.default.circle(_templateObject);

var CircleMarker = function (_Component) {
  _inherits(CircleMarker, _Component);

  function CircleMarker(props) {
    _classCallCheck(this, CircleMarker);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.getInitXPosition = function () {
      return 5;
    };

    _this.getInitYPosition = function () {
      return 5;
    };

    _this.state = {};
    return _this;
  }

  CircleMarker.prototype.render = function render() {
    return _react2.default.createElement(
      'marker',
      {
        id: 'circle-start',
        viewBox: '0 0 10 10',
        refX: this.getInitXPosition(),
        refY: this.getInitYPosition(),
        markerWidth: '5',
        markerHeight: '5'
      },
      _react2.default.createElement(Circle, { cx: '5', cy: '5', r: '5' })
    );
  };

  return CircleMarker;
}(_react.Component);

exports.default = CircleMarker;
module.exports = exports['default'];