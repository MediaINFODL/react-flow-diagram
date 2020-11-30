function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Diagram, store, setEntities, setConfig, diagramOn } from '../';
import { Sidebar, Menu, Form, Button, Input } from 'semantic-ui-react';

var EditSidebar = function (_React$Component) {
  _inherits(EditSidebar, _React$Component);

  function EditSidebar(props) {
    _classCallCheck(this, EditSidebar);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      selectedLabel: _this.props.selectedLabel,
      initLabel: _this.props.selectedLabel,
      selectedLinkId: _this.props.selectedLinkId,
      model: {}
    };
    return _this;
  }

  EditSidebar.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    if (this.props.selectedLinkId != nextProps.selectedLinkId) {
      // console.log('to rerender false')
      return false;
    } else {
      // console.log('to rerender true')
      return true;
    }
  };

  EditSidebar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props == nextProps) {
      this.setState({
        initLabel: nextProps.selectedLabel,
        selectedLabel: nextProps.selectedLabel,
        selectedLinkId: nextProps.selectedLinkId
      });
    }
  };

  EditSidebar.prototype.componentWillMount = function componentWillMount() {
    this.setState({
      model: store.getState()
    });
  };

  EditSidebar.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      Sidebar,
      {
        as: Menu,
        animation: 'overlay',
        icon: 'labeled',
        vertical: true,
        visible: this.props.opened,
        direction: 'right',
        style: { width: 412 }
      },
      this.props.selectedLabel && React.createElement(
        'div',
        null,
        React.createElement(
          Form.Field,
          null,
          React.createElement(
            'label',
            null,
            'Selected link label:'
          )
        ),
        React.createElement(
          Form.Group,
          { inline: true },
          React.createElement(Input, {
            style: { width: '85%' },
            action: { color: 'red', icon: 'trash alternate',
              onClick: function onClick(e) {
                _this2.onRemoveLabel(e, selectedEditLink);
              } },
            value: this.state.selectedLabel,
            onChange: function onChange(e) {
              _this2.onSelectedLinkLabel(e);
            }
          })
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
            { type: 'button', onClick: function onClick(e) {
                _this2.props.handleSidebarChange(false, '');
              }, negative: true },
            'Cancel'
          ),
          React.createElement(
            Button,
            { type: 'button', onClick: function onClick(e) {
                _this2.props.onSaveLabel(_this2.state.selectedLinkId, _this2.state.initLabel, _this2.state.selectedLabel);
              }, positive: true },
            'Save'
          )
        )
      )
    );
  };

  EditSidebar.prototype.onSelectedLinkLabel = function onSelectedLinkLabel(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ selectedLabel: e.target.value });
  };

  EditSidebar.prototype.onRemoveLabel = function onRemoveLabel(e) {
    this.setState({ selectedLabel: '' });
    var state = store.getState();
  };

  return EditSidebar;
}(React.Component);

export default EditSidebar;