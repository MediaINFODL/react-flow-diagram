var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(["\n  background-color: #fff;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  width: ", "px;\n  height: ", "px;\n  border-radius: 77rem;\n  border: 2px solid #888;\n justify-content: center;\n font-size: .5rem\n"], ["\n  background-color: #fff;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  width: ", "px;\n  height: ", "px;\n  border-radius: 77rem;\n  border: 2px solid #888;\n justify-content: center\n font-size: .5rem\n"]),
    _templateObject2 = _taggedTemplateLiteralLoose(["\n  position: absolute;\n top: 100%;\n width: 200%;\n  padding: .5em;\n  font-size: .8rem;\n"], ["\n  position: absolute;\n top: 100%;\n width: 200%;\n  padding: .5em;\n  font-size: .8rem;\n"]),
    _templateObject3 = _taggedTemplateLiteralLoose(["\n  position: absolute;\n top: 100%\n width: 200%;\n padding: .5em;\n  font-size: .8rem;\n  text-align: center;\n  resize: none;\n  border: none;\n  border-radius: .1rem;\n z-index: 10;\n background-color: rgba(255, 255, 255, 0.8);\n"], ["\n  position: absolute;\n top: 100%\n width: 200%;\n padding: .5em;\n  font-size: .8rem;\n  text-align: center;\n  resize: none;\n  border: none;\n  border-radius: .1rem;\n z-index: 10;\n background-color: rgba(255, 255, 255, 0.8);\n"]);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }
import React from 'react';
import style from 'styled-components';

/*
 * Presentational
 * ==================================== */

var EventStyle = style.div(_templateObject,  function (props) {
  return props.width;
}, function (props) {
  return props.height;
});

var Name = style.span(_templateObject2);

var EditName = style.textarea(_templateObject3);

var Event = function Event(props) {
  return React.createElement(
    EventStyle,
    {
      width: props.model.width,
      height: props.model.height,
      isEditing: props.isEditing
    },
    React.createElement(EditName, {
      value: props.name,
      onChange: props.refreshName,
      onKeyDown: props.handleKeyPress,
      innerRef: function innerRef(textarea) {
        return props.handleRef(textarea);
      },
      style: { display: props.isEditing ? "block" : "none" }
    }),
    React.createElement(
      Name,
      {
        onDoubleClick: function onDoubleClick() {
          return props.toggleEdit(true);
        },
        style: { display: !props.isEditing ? "block" : "none" }
      },
      props.model.name
    )
  );
};

/*
 * Container
 * ==================================== */

var EventComponent = function (_React$PureComponent) {
  _inherits(EventComponent, _React$PureComponent);

  function EventComponent() {
    var _temp, _this, _ret;

    _classCallCheck(this, EventComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
      isEditing: false,
      name: _this.props.model.name
    }, _this.handleRef = function (textarea) {
      if (!_this.textarea) {
        _this.textarea = textarea;
      }
    }, _this.toggleEdit = function (isEditing) {
      var _this2 = _this,
        textarea = _this2.textarea;

      if (isEditing && textarea) {
        setTimeout(function () {
          return textarea.focus();
        }, 16 * 4);
      }
      _this.setState({ isEditing: isEditing });
    }, _this.refreshName = function (ev) {
      _this.setState({ name: ev.currentTarget.value });
    }, _this.handleKeyPress = function (ev) {
      switch (ev.key) {
        case "Enter":
          _this.toggleEdit(false);
          _this.props.setName({ id: _this.props.model.id, name: _this.state.name });
          break;
        case "Escape":
          _this.toggleEdit(false);
          _this.setState({ name: _this.props.model.name });
          break;
        // no default
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  EventComponent.prototype.componentWillUnmount = function componentWillUnmount() {
    this.textarea = null;
  };

  EventComponent.prototype.render = function render() {
    return React.createElement(Event, _extends({}, this.props, {
      isEditing: this.state.isEditing,
      name: this.state.name,
      toggleEdit: this.toggleEdit,
      refreshName: this.refreshName,
      handleKeyPress: this.handleKeyPress,
      handleRef: this.handleRef
    }));
  };

  return EventComponent;
}(React.PureComponent);

export default EventComponent;