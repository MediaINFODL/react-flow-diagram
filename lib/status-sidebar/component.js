'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _reactRedux = require('react-redux');

var _reducer = require('../entity/reducer');

var _reducer2 = require('../history/reducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatusSidebar = function (_Component) {
  _inherits(StatusSidebar, _Component);

  function StatusSidebar(props) {
    _classCallCheck(this, StatusSidebar);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onSave = function () {
      console.log('save emmiter', _this.props.status.id, _this.props.status.name);
      if (_this.props.status.name) {
        _this.props.setName({
          id: _this.props.status.id, name: _this.props.status.name
        });
        _this.props.assignEmptyStatusToStore();
      }
    };

    _this.onClose = function () {
      _this.props.assignEmptyStatusToStore();
    };

    _this.onKeypress = function (e) {
      _this.props.assignNewStatusToStore(e.target.value);
    };

    _this.onRemove = function (e) {
      console.log('delete emmiter', e);
      _this.props.removeEntity(_this.props.status.id);
      _this.props.assignEmptyStatusToStore();
    };

    _this.state = {};
    return _this;
  }

  StatusSidebar.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      _semanticUiReact.Sidebar,
      {
        as: _semanticUiReact.Menu,
        animation: 'overlay',
        icon: 'labeled',
        vertical: true,
        visible: !!this.props.status.id,
        direction: 'right',
        style: { width: 400 }
      },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _semanticUiReact.Form.Field,
          null,
          _react2.default.createElement(
            'label',
            null,
            'Selected state title:'
          )
        ),
        _react2.default.createElement(
          _semanticUiReact.Form.Group,
          { inline: true },
          _react2.default.createElement(_semanticUiReact.Input, { style: { width: '85%' },
            action: {
              color: 'red',
              icon: 'trash alternate',
              onClick: function onClick(e) {
                return _this2.onRemove(e);
              }
            },
            value: this.props.status.name,
            onChange: this.onKeypress })
        )
      ),
      _react2.default.createElement(
        _semanticUiReact.Form,
        null,
        _react2.default.createElement(
          _semanticUiReact.Form.Field,
          null,
          _react2.default.createElement(
            _semanticUiReact.Button,
            { type: 'button',
              onClick: this.onClose,
              negative: true },
            'Cancel'
          ),
          _react2.default.createElement(
            _semanticUiReact.Button,
            { type: 'button',
              onClick: this.onSave,
              positive: true },
            'Save'
          )
        )
      )
    );
  };

  return StatusSidebar;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return { status: state.status };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  setName: _reducer.setName,
  removeEntity: _reducer.removeEntity,
  assignNewStatusToStore: _reducer2.assignNewStatusToStore,
  assignEmptyStatusToStore: _reducer2.assignEmptyStatusToStore
})(StatusSidebar);
module.exports = exports['default'];