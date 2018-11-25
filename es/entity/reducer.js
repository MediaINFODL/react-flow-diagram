var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import calcLinkPoints from "../links/calcLinkPoints";
import positionAdjustedToGrid from "../canvas/positionAdjustedToGrid";

export var EntityActionTypeOpen = "rd/entity/SET";
export var EntityActionTypesModify = ["rd/entity/ADD", "rd/entity/LINK_TO", "rd/entity/ADD_LINKED", "rd/entity/REMOVE", "rd/entity/MOVE", "rd/entity/SET_NAME", "rd/entity/SET_LABEL", "rd/entity/SET_CUSTOM", "rd/label/REMOVE_LABEL"];

var entityReducer = function entityReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];
  var metaEntity = arguments[2];
  var canvas = arguments[3];

  switch (action.type) {
    case "rd/entity/SET":
      return action.payload;

    case "rd/config/SET":
      {
        var configs = action.payload;
        return state.map(function (entity) {
          var relevantConfig = configs.entityTypes[entity.type];
          return relevantConfig ? _extends({}, entity, {
            width: relevantConfig.width,
            height: relevantConfig.height
          }) : entity;
        });
      }

    case "rd/entity/SET_ENTITY_CROSS":
      var data = action.payload;
      // console.log(data, "WE GOOD");
      break;

    case "rd/entity/ADD":
      return [].concat(state, [{
        id: action.payload.id,
        type: action.payload.type,
        width: action.payload.width,
        height: action.payload.height,
        x: action.payload.x,
        y: action.payload.y,
        name: action.payload.name
      }]);

    case "rd/entity/LINK_TO":
      {
        // console.log("rd/entity/LINK_POINTS", action);
        var payload = action.payload;

        return state.map(function (entity) {
          return entity.id === canvas.connecting.from ? _extends({}, entity, {
            linksTo: [].concat(entity.linksTo ? entity.linksTo : [], entity.linksTo && entity.linksTo.some(function (link) {
              return link.target === payload;
            }) ? [] : [{
              target: payload,
              uid: new Date().valueOf(),
              edited: false,
              points: calcLinkPoints(entity, state.find(function (ent) {
                return ent.id === payload;
              }), "rd/entity/LINK_TO")
            }])
          }) : entity;
        });
      }

    case "rd/entity/ADD_LINKED":
      {
        // console.log("rd/entity/LINK_POINTS", action);
        var _action$payload = action.payload,
            _entity = _action$payload.entity,
            _id2 = _action$payload.id;

        return [].concat(state.map(function (existingEntity) {
          return existingEntity.id === _id2 ? _extends({}, existingEntity, {
            linksTo: [].concat(existingEntity.linksTo ? existingEntity.linksTo : [], [{ target: _entity.id, edited: false, uid: new Date().valueOf() }])
          }) : existingEntity;
        }), [{
          id: _entity.id,
          type: _entity.type,
          width: _entity.width,
          height: _entity.height,
          x: _entity.x,
          y: _entity.y,
          name: _entity.name
        }]);
      }

    case "rd/entity/REMOVE":
      // console.log("pass");
      return state.filter(function (entity) {
        return entity.id !== action.payload;
      }).map(function (entity) {
        return entity.linksTo ? _extends({}, entity, {
          linksTo: entity.linksTo.filter(function (link) {
            return link.target !== action.payload;
          })
        }) : entity;
      });

    case "rd/canvas/TRACK":
      {
        if (canvas.anchoredEntity.isAnchored) {
          var _id3 = canvas.anchoredEntity.id;

          var mEntity = metaEntity.find(function (e) {
            return e.id === _id3;
          }) || {
            anchor: { x: 0, y: 0 }
          };
          var _x2 = canvas.cursor.x - mEntity.anchor.x;
          var _y = canvas.cursor.y - mEntity.anchor.y;
          var gridX = positionAdjustedToGrid(_x2, canvas.gridSize);
          var gridY = positionAdjustedToGrid(_y, canvas.gridSize);
          // console.log(mEntity, canvas.cursor, 'ENTITET I KURSOR', gridX, gridY);
          return state.map(function (entity) {
            if (entity.linksTo && entity.id === _id3) {
              return _extends({}, entity, {
                x: gridX,
                y: gridY,
                linksTo: entity.linksTo.map(function (link) {
                  return _extends({}, link, {
                    points: calcLinkPoints(entity, state.find(function (ent) {
                      return ent.id === link.target;
                    }), link, "rd/canvas/TRACK #1")
                  });
                })
              });
            } else if (entity.id === _id3) {
              return _extends({}, entity, {
                x: gridX,
                y: gridY
              });
            } else if (entity.linksTo && entity.linksTo.some(function (link) {
              return link.target === _id3;
            })) {
              return _extends({}, entity, {
                linksTo: entity.linksTo.map(function (link) {
                  return link.target === _id3 ? _extends({}, link, {
                    points: calcLinkPoints(entity, state.find(function (ent) {
                      return ent.id === _id3;
                    }), link, "rd/canvas/TRACK #2")
                  }) : link;
                })
              });
            } else {
              return entity;
            }
          });
        } else {
          return state;
        }
      }

    // All this logic can be potentially removed, research if I'll still use
    // the MOVE action... or perhaps put all this into its own function and
    // reuse :shrug:
    case "rd/entity/MOVE":
      {
        var _action$payload2 = action.payload,
            _id4 = _action$payload2.id,
            _x3 = _action$payload2.x,
            _y2 = _action$payload2.y;

        var _gridX = positionAdjustedToGrid(_x3, canvas.gridSize);
        var _gridY = positionAdjustedToGrid(_y2, canvas.gridSize);
        return state.map(function (entity) {
          if (entity.linksTo && entity.id === _id4) {
            return _extends({}, entity, {
              x: _gridX,
              y: _gridY,
              linksTo: entity.linksTo.map(function (link) {
                return _extends({}, link, {
                  points: calcLinkPoints(entity, state.find(function (ent) {
                    return ent.id === link.target;
                  }), link, "rd/entity/MOVE #1")
                });
              })
            });
          } else if (entity.id === _id4) {
            return _extends({}, entity, {
              x: _gridX,
              y: _gridY
            });
          } else if (entity.linksTo && entity.linksTo.some(function (link) {
            return link.target === _id4;
          })) {
            return _extends({}, entity, {
              linksTo: entity.linksTo.map(function (link) {
                return link.target === _id4 ? _extends({}, link, {
                  points: calcLinkPoints(entity, state.find(function (ent) {
                    return ent.id === _id4;
                  }), link, "rd/entity/MOVE #2")
                }) : link;
              })
            });
          } else {
            return entity;
          }
        });
      }

    case "rd/entity/SET_NAME":
      {
        var _action$payload3 = action.payload,
            _id5 = _action$payload3.id,
            _name = _action$payload3.name;

        return state.map(function (entity) {
          return entity.id === _id5 ? _extends({}, entity, {
            name: _name
          }) : entity;
        });
      }

    case "rd/entity/SET_LABEL":
      {
        var _action$payload4 = action.payload,
            _id6 = _action$payload4.id,
            _label2 = _action$payload4.label,
            _uid2 = _action$payload4.uid;
        // console.log(action.payload, "PAYLOAD");

        return state.map(function (entity) {
          return _extends({}, entity, {
            linksTo: entity.linksTo ? entity.linksTo.map(function (link) {
              return link.uid === _uid2 ? _extends({}, link, { label: _label2 }) : link;
            }) : [{ target: _id6, label: _label2, uid: _uid2 }]
          });
        });
      }

    case "rd/label/REMOVE_LABEL":
      var _action$payload5 = action.payload,
          _id = _action$payload5.id,
          _uid = _action$payload5.uid,
          _label = _action$payload5.label;

      return state.map(function (entity) {
        return _extends({}, entity, {
          linksTo: entity.linksTo ? entity.linksTo.filter(function (link) {
            return link.uid !== _uid;
          }) : [{
            target: _id,
            uid: _uid,
            label: _label
          }]
        });
      });

    case "rd/entity/LINK_POINTS":
      {
        // console.log("rd/entity/LINK_POINTS", action);
        var _action$payload6 = action.payload,
            from = _action$payload6.from,
            to = _action$payload6.to,
            _points = _action$payload6.points;

        return state.map(function (entity) {
          return entity.id === from ? _extends({}, entity, {
            linksTo: entity.linksTo ? entity.linksTo.map(function (link) {
              return link.target === to ? _extends({}, link, {
                uid: new Date().valueOf(),
                points: _points
              }) : link;
            }) : [{ target: to, points: _points }]
          }) : entity;
        });
      }

    case "rd/entity/SET_CUSTOM":
      {
        var _action$payload7 = action.payload,
            _id7 = _action$payload7.id,
            _custom = _action$payload7.custom;

        return state.map(function (entity) {
          return entity.id === _id7 ? _extends({}, entity, {
            custom: _custom
          }) : entity;
        });
      }
    default:
      return state;
  }
};

var deselectMetaEntity = function deselectMetaEntity(metaEntity) {
  return _extends({}, metaEntity, { isSelected: false });
};

export var metaEntityReducer = function metaEntityReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];
  var entity = arguments[2];
  var canvas = arguments[3];

  switch (action.type) {
    case "rd/entity/SET":
      return action.payload.map(function (ent) {
        return {
          id: ent.id,
          isAnchored: false,
          isSelected: false,
          anchor: {
            x: ent.width / 2,
            y: ent.height / 2
          }
        };
      });
    case "rd/entity/ADD":
      return [].concat(state, [{
        id: action.payload.id,
        isAnchored: action.payload.isAnchored,
        isSelected: action.payload.isSelected,
        anchor: {
          x: action.payload.width / 2,
          y: action.payload.height / 2
        }
      }]);
    case "rd/entity/ADD_LINKED":
      return [].concat(state.map(deselectMetaEntity), [{
        id: action.payload.entity.id,
        isAnchored: action.payload.entity.isAnchored,
        isSelected: action.payload.entity.isSelected,
        anchor: {
          x: action.payload.entity.width / 2,
          y: action.payload.entity.height / 2
        }
      }]);
    case "rd/metaentity/SELECT":
      {
        var _action$payload8 = action.payload,
            _id8 = _action$payload8.id,
            _isSelected = _action$payload8.isSelected;

        return state.map(function (metaEntity) {
          return metaEntity.id === _id8 ? _extends({}, metaEntity, { isSelected: _isSelected }) : _extends({}, metaEntity, { isSelected: false });
        });
      }
    case "rd/canvas/ANCHOR_ENTITY":
      {
        var _id9 = action.payload.id;

        return state.map(function (metaEntity) {
          return metaEntity.id === _id9 ? _extends({}, metaEntity, {
            isAnchored: true,
            anchor: {
              x: canvas.cursor.x - (entity.find(function (e) {
                return e.id === _id9;
              }) || { x: 0 }).x,
              y: canvas.cursor.y - (entity.find(function (e) {
                return e.id === _id9;
              }) || { y: 0 }).y
            }
          }) : _extends({}, metaEntity, { isAnchored: false });
        });
      }
    case "rd/entity/REMOVE":
      return state.filter(function (ent) {
        return ent.id !== action.payload;
      });
    case "rd/entity/CONNECT":
    case "rd/metaentity/UNSELECTALL":
    case "rd/canvas/ANCHOR_CANVAS":
      return state.map(deselectMetaEntity);
    default:
      return state;
  }
};

export var setEntities = function setEntities(payload) {
  return {
    type: "rd/entity/SET",
    payload: payload
  };
};

export var addEntity = function addEntity(payload) {
  return { type: "rd/entity/ADD", payload: payload };
};

export var linkTo = function linkTo(payload) {
  return {
    type: "rd/entity/LINK_TO",
    payload: payload
  };
};

export var addLinkedEntity = function addLinkedEntity(payload) {
  return { type: "rd/entity/ADD_LINKED", payload: payload };
};

export var removeEntity = function removeEntity(payload) {
  return {
    type: "rd/entity/REMOVE",
    payload: payload
  };
};

export var move = function move(payload) {
  return {
    type: "rd/entity/MOVE",
    payload: payload
  };
};

export var setName = function setName(payload) {
  return {
    type: "rd/entity/SET_NAME",
    payload: payload
  };
};

export var setCurrentStatus = function setCurrentStatus(payload) {
  return {
    type: "rd/entity/SET_STATUS",
    payload: payload
  };
};

export var setLabel = function setLabel(payload) {
  return {
    type: "rd/entity/SET_LABEL",
    payload: payload
  };
};

export var removeLabel = function removeLabel(payload) {
  return {
    type: "rd/label/REMOVE_LABEL",
    payload: payload
  };
};

export var setCustom = function setCustom(payload) {
  return {
    type: "rd/entity/SET_CUSTOM",
    payload: payload
  };
};

export var setEntityCross = function setEntityCross(payload) {
  return {
    type: "rd/entity/SET_ENTITY_CROSS",
    payload: payload
  };
};

export var selectEntity = function selectEntity(id) {
  var isSelected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return {
    type: "rd/metaentity/SELECT",
    payload: { id: id, isSelected: isSelected }
  };
};

export var unselectAll = function unselectAll() {
  return {
    type: "rd/metaentity/UNSELECTALL",
    payload: null
  };
};

export default entityReducer;