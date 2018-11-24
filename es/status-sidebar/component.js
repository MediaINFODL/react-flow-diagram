function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Sidebar, Menu, Form, Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { removeEntity, setName } from '../entity/reducer';
import { assignEmptyStatusToStore, assignNewStatusToStore } from '../history/reducer';

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

    return React.createElement(
      Sidebar,
      {
        as: Menu,
        animation: 'overlay',
        icon: 'labeled',
        vertical: true,
        visible: !!this.props.status.id,
        direction: 'right',
        style: { width: 400 }
      },
      React.createElement(
        'div',
        null,
        React.createElement(
          Form.Field,
          null,
          React.createElement(
            'label',
            null,
            'Selected state title:'
          )
        ),
        React.createElement(
          Form.Group,
          { inline: true },
          React.createElement(Input, { style: { width: '85%' },
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
      React.createElement(
        Form,
        null,
        React.createElement(
          Form.Field,
          null,
          React.createElement(
            Button,
            { type: 'button',
              onClick: this.onClose,
              negative: true },
            'Cancel'
          ),
          React.createElement(
            Button,
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
}(Component);

var mapStateToProps = function mapStateToProps(state) {
  return { status: state.status };
};

export default connect(mapStateToProps, {
  setName: setName,
  removeEntity: removeEntity,
  assignNewStatusToStore: assignNewStatusToStore,
  assignEmptyStatusToStore: assignEmptyStatusToStore
})(StatusSidebar);