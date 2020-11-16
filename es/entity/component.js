var _templateObject = _taggedTemplateLiteralLoose(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  text-align: center;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  user-select: none;\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  text-align: center;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  user-select: none;\n"]);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from "react";
import style from "styled-components";
import { connect } from "react-redux";
import { move, linkTo, addLinkedEntity, removeEntity, selectEntity } from "./reducer";
import { connecting, anchorEntity } from "../canvas/reducer";
import defaultEntity from "./defaultEntity";
import ContextMenu from "../contextMenu/component";

// eslint-disable-next-line import/first

import { assignStatusToStore } from "../history/reducer";

/*
 * Presentational
 * ==================================== */

var contextMenuActions = function contextMenuActions(props) {
  if (props.model.type == 'Event' && props.model.linksTo != undefined) {
    if (props.model.linksTo.length > 0) {
      var _remove = {
        action: function action() {
          return props.removeEntity(props.model.id);
        },
        iconVariety: "delete",
        label: "Add Starting status1"
      };

      var _connectAction = {
        action: function action() {
          return props.connecting({ currently: true, from: props.model.id });
        },
        iconVariety: "arrow",
        label: "Add Starting status2"
      };

      var _addEntities = props.entityTypeNames.map(function (entityTypeName) {
        return {
          action: function action() {
            return props.addLinkedEntity({
              entity: props.defaultEntity({ entityType: entityTypeName }),
              id: props.model.id
            });
          },
          iconVariety: entityTypeName,
          label: entityTypeName == 'Task' ? "Add Starting status4" : "Add Starting status3"
        };
      });

      return [].concat(_addEntities, [_connectAction, _remove]);
    }
  }
  var remove = {
    action: function action() {
      return props.removeEntity(props.model.id);
    },
    iconVariety: "delete",
    label: "Remove"
  };

  var connectAction = {
    action: function action() {
      return props.connecting({ currently: true, from: props.model.id });
    },
    iconVariety: "arrow",
    label: "Connect"
  };

  var addEntities = props.entityTypeNames.map(function (entityTypeName) {
    return {
      action: function action() {
        return props.addLinkedEntity({
          entity: props.defaultEntity({ entityType: entityTypeName }),
          id: props.model.id
        });
      },
      iconVariety: entityTypeName,
      label: entityTypeName == 'Task' ? "Add status" : "Add Starting status"
    };
  });

  return [].concat(addEntities, [connectAction]);
};

var EntityStyle = style.div(_templateObject);

var Entity = function Entity(props) {
  return React.createElement(
    EntityStyle,
    {
      style: {
        transform: "translate(" + props.model.x + "px, " + props.model.y + "px)",
        zIndex: props.isAnchored || props.isSelected ? "100" : "10",
        cursor: props.toBeConnected ? "pointer" : "move"
      }
    },
    React.createElement(
      "div",
      {
        onMouseDown: props.onMouseDown,
        onMouseLeave: props.onMouseLeave,
        onMouseUp: props.onMouseUp,
        role: "presentation"
      },
      props.children
    ),
    props.isSelected && React.createElement(ContextMenu, { actions: contextMenuActions(props) })
  );
};

/*
 * Container
 * ==================================== */

// TODO: These signatures are probably wrong. The original action does return
// an EntityAction, but after we connect we're dispatching the action, so this
// signature is probably incorrect. Gotta research what's the proper signature
// after connecting the component.
//
// NOTE: I tried wrapping them in Dispatch<> (e.g. Dispatch<Id => EntityAction>)
// which seemed correct, but doing so eliminates type checking in practice
// (i.e. I could name a method whatever or pass another type to an action and
// the checked wouldn't complain). I need to research this. I also haven't
// found any discussion about this or code examples. I'm either doing something
// fundamentally wrong or being innovative :P
//
// Also notice I used both i.e. and e.g. in the same paragraph. Just bask in
// that fact. Cherish it. Savour it. Ok, now keep reading code :D
//

var EntityContainerHOC = function EntityContainerHOC(WrappedComponent) {
  return function (_React$PureComponent) {
    _inherits(_class2, _React$PureComponent);

    function _class2() {
      var _temp, _this, _ret;

      _classCallCheck(this, _class2);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
        onMouseUpWouldBeClick: true,
        entityCoordinates: { x: _this.props.canvas.cursor.x, y: _this.props.canvas.cursor.y }
      }, _this.entityTypeNames = Object.keys(_this.props.entityTypes), _this.onMouseDown = function (ev) {
        ev.stopPropagation();
        var _this$props$model = _this.props.model,
            x = _this$props$model.x,
            y = _this$props$model.y;

        _this.setState({ entityCoordinates: { x: x, y: y } });
        if (_this.props.canvas.connecting.currently) {
          // In this case we want to select an entity to be connected to a
          // previously selected entity to connect from
          _this.props.linkTo(_this.props.model.id);
          _this.props.move({
            x: _this.props.model.x + 0.000001,
            y: _this.props.model.y,
            id: _this.props.model.id
          });
        } else {
          // Most common behavior is that when you click on an entity, your
          // intention is to start dragging the entity
          //
          // The new thing is that now the anchor info is on metaenttiy, cursor
          // position is on canvas, and what I actually need to do is set that
          // this entity is starting to be selected for movement, passing the id
          // of the entitiy. This will "ripple" down to canvas and metaentity.
          // meow.
          // so I have to create a new action for this...
          _this.props.anchorEntity({ id: _this.props.model.id, isAnchored: true });
        }
      }, _this.onMouseLeave = function (ev) {
        // If this magic below proves to be a hinderance, remove it.
        // Now that I'm tracking mouse movement on canvas, Entity mouseMove
        // jailbreak is not such a problem.
        if (_this.props.meta.isAnchored) {
          // If the entity is still being dragged while leaving (mouse movement
          // faster than state refresh on DOM) then (discussing only X
          // coordinate, calculations the same with Y):
          //
          // This is where the anchor point was (in relation to diagram coordinates):
          // this.state.anchorX + this.props.model.x
          //
          // This is where the mouse was (in relation to diagram coordinates)
          // this.props.canvas.cursor.x
          //
          // This is the difference:
          // (this.props.canvas.cursor.x) - (this.state.anchorX + this.props.model.x)
          // (this.props.canvas.cursor.x) - (this.state.anchorX + this.props.model.x)
          //
          // The above number signifies by how much has the mouse left the original
          // anchor point. If we add this difference to where we would have
          // calculated our original location, we're left with:
          // (this.props.canvas.cursor.x - this.state.anchorX) +
          // ((this.props.canvas.cursor.x) - (this.state.anchorX + this.props.model.x))
          //
          // Which simplified leaves us with:
          // 2 * (this.props.canvas.cursor.x - this.state.anchorX) - this.props.model.x
          //
          _this.props.move({
            x: 2 * (_this.props.canvas.cursor.x - _this.props.meta.anchor.x) - _this.props.model.x,
            y: 2 * (_this.props.canvas.cursor.y - _this.props.meta.anchor.y) - _this.props.model.y,
            id: _this.props.model.id
          });
        }
      }, _this.onMouseUp = function (ev) {
        ev.stopPropagation();
        if (_this.state.entityCoordinates.x === _this.props.model.x && _this.state.entityCoordinates.y === _this.props.model.y) {
          _this.props.assignStatusToStore(_this.props.model);
          // console.log("ENTITY CLICK", this.props.model);
        } else {
            // console.log("ENTITY DRAGGED", this.props.entityData);
          }
        if (!_this.state.onMouseUpWouldBeClick) {
          // Behaves as if it was spawned with a mouse drag
          // meaning that when you release the mouse button,
          // the element will de-anchor
          _this.props.anchorEntity({ id: "", isAnchored: false });
          _this.props.selectEntity(_this.props.model.id);
        }
        // else it behaves as if it was spawned with a mouse click
        // meaning it needs another click to de-anchor from mouse
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _class2.prototype.componentDidMount = function componentDidMount() {
      var _this2 = this;

      var wouldBeClick = function wouldBeClick() {
        return _this2.setState({ onMouseUpWouldBeClick: false });
      };
      if (this.props.meta.isAnchored) {
        setTimeout(wouldBeClick, 16 * 12);
      } else {
        wouldBeClick();
      }
    };

    _class2.prototype.render = function render() {
      return React.createElement(
        Entity,
        {
          model: this.props.model,
          entityTypeNames: this.entityTypeNames,
          isAnchored: this.props.meta.isAnchored,
          isSelected: this.props.meta.isSelected,
          toBeConnected: this.props.canvas.connecting.currently,
          addLinkedEntity: this.props.addLinkedEntity,
          removeEntity: this.props.removeEntity,
          connecting: this.props.connecting,
          defaultEntity: this.props.defaultEntity,
          onMouseDown: this.onMouseDown,
          onMouseLeave: this.onMouseLeave,
          onMouseUp: this.onMouseUp
        },
        React.createElement(WrappedComponent, { model: this.props.model, meta: this.props.meta })
      );
    };

    return _class2;
  }(React.PureComponent);
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    entityData: state.entity,
    canvas: state.canvas,
    meta: state.metaEntity.find(function (metaEntity) {
      return metaEntity.id === ownProps.model.id;
    }),
    entityTypes: state.config.entityTypes,
    defaultEntity: defaultEntity(state)
  };
};

export default (function (WrappedComponent) {
  return connect(mapStateToProps, {
    move: move,
    linkTo: linkTo,
    addLinkedEntity: addLinkedEntity,
    removeEntity: removeEntity,
    selectEntity: selectEntity,
    connecting: connecting,
    anchorEntity: anchorEntity,
    assignStatusToStore: assignStatusToStore
  })(EntityContainerHOC(WrappedComponent));
});