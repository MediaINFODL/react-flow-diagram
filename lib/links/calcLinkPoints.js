"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ = require("../");

// TODO: the bend when the elements are close to each other (vertically or
// horizontally) takes the center of each element as the distance to be divided
// by two. It should take the distance between the edges of each element to be
// divided by two.
//
// Imagine you have a wide element connecting to a slim element. The bend would
// be too close to the wide element in relationship to the slim element.
//

// Calculates Points according to `from`, `to` and the main axis (`x` or `y`)
// This function does not take into account previous state of links, it assumes
// the user has never edited the link and expects a declarative arrow behaviour
//
var calcDefaultPointsAccordingToMainAxis = function calcDefaultPointsAccordingToMainAxis(mainAxis, from, to, fromMid, toMid) {
  var crossAxis = mainAxis === "x" ? "y" : "x";
  var mainDimension = mainAxis === "x" ? "width" : "height";
  var crossDimension = mainAxis === "x" ? "height" : "width";

  if (from[crossAxis] + from[crossDimension] > to[crossAxis] && from[crossAxis] < to[crossAxis] + to[crossDimension]) {
    var _midPntAlpha, _midPntBeta, _lastPnt;

    // If From and To are too close in the crossAxis
    var distance = (fromMid[mainAxis] + toMid[mainAxis]) / 2;

    var midPntAlpha = (_midPntAlpha = {}, _midPntAlpha[mainAxis] = distance, _midPntAlpha[crossAxis] = fromMid[crossAxis], _midPntAlpha);

    var midPntBeta = (_midPntBeta = {}, _midPntBeta[mainAxis] = distance, _midPntBeta[crossAxis] = toMid[crossAxis], _midPntBeta);

    var lastPnt = (_lastPnt = {}, _lastPnt[mainAxis] = from[mainAxis] > to[mainAxis] ? to[mainAxis] + to[mainDimension] : to[mainAxis], _lastPnt[crossAxis] = toMid[crossAxis], _lastPnt);

    return [fromMid, midPntAlpha, midPntBeta, lastPnt];
  } else {
    var _midPoint, _lastPnt3;

    var midPoint = (_midPoint = {}, _midPoint[mainAxis] = toMid[mainAxis], _midPoint[crossAxis] = fromMid[crossAxis], _midPoint);

    var _lastPnt2 = (_lastPnt3 = {}, _lastPnt3[mainAxis] = toMid[mainAxis], _lastPnt3[crossAxis] = from[crossAxis] > to[crossAxis] ? to[crossAxis] + to[crossDimension] : to[crossAxis], _lastPnt3);

    return [fromMid, midPoint, _lastPnt2];
  }
};

// Takes four points
// First and second points represent the first line
// Third and fourth point represent second line
// If they intersect, returns point of intersection
// else it returns null
//
var linesIntersection = function linesIntersection(p0, p1, p2, p3) {
  var s1x = p1.x - p0.x;
  var s1y = p1.y - p0.y;
  var s2x = p3.x - p2.x;
  var s2y = p3.y - p2.y;
  var s = (-s1y * (p0.x - p2.x) + s1x * (p0.y - p2.y)) / (-s2x * s1y + s1x * s2y);
  var t = (s2x * (p0.y - p2.y) - s2y * (p0.x - p2.x)) / (-s2x * s1y + s1x * s2y);
  return s >= 0 && s <= 1 && t >= 0 && t <= 1 ? { x: p0.x + t * s1x, y: p0.y + t * s1y } : null;
};

// We have a Point A and an EntityModel (a fromBox with x, y, width, height)
// We make a line J from A to the center of EntityModel (toMid)
// This function finds the intersection between line J and the perimeter of EntityModel
//
// Function takes Point and EntityModel
// Calculates intersection between line J and all sides of EntityModel
// Returns intersection, or `from` in case there is no intersection to any sides
//
var pointEntityIntersection = function pointEntityIntersection(from, to) {
  var toMid = {
    x: to.x + to.width / 2,
    y: to.y + to.height / 2
  };

  var upLeft = {
    x: to.x,
    y: to.y
  };
  var upRight = {
    x: to.x + to.width,
    y: to.y
  };
  var downRight = {
    x: to.x + to.width,
    y: to.y + to.height
  };
  var downLeft = {
    x: to.x,
    y: to.y + to.height
  };
  var interUp = linesIntersection(upLeft, upRight, from, toMid);
  var interRight = linesIntersection(upRight, downRight, from, toMid);
  var interDown = linesIntersection(downRight, downLeft, from, toMid);
  var interLeft = linesIntersection(downLeft, upLeft, from, toMid);
  return interUp || interRight || interDown || interLeft || from;
};

// Takes two contiguous Point and an EntityModel and returns two Point.
//
// The points are "inContact" and "wanderer".
// "inContact" is the point that is directly in contact to the entity.
// "wanderer" is the potentially orthogonally positioned point closest to the
// "inContact" point.
//
// And we need the actual entity for new values of inContact and wanderer.
// The function returns an array with two points, being the first one the new
// "inContact" and the second one the new "wanderer".
//
var newPointTwins = function newPointTwins(inContact, wanderer, entity) {
  if (inContact.x === wanderer.x) {
    //  ·
    //  |
    // ent
    //  |
    //  ·
    if (inContact.y > wanderer.y) {
      //  |
      // ent
      return [{
        x: entity.x + entity.width / 2,
        y: entity.y
      }, {
        x: entity.x + entity.width / 2,
        y: wanderer.y
      }];
    } else {
      // ent
      //  |
      return [{
        x: entity.x + entity.width / 2,
        y: entity.y + entity.height
      }, {
        x: entity.x + entity.width / 2,
        y: wanderer.y
      }];
    }
  }
  if (inContact.y === wanderer.y) {
    // · - ent - ·
    if (inContact.x > wanderer.x) {
      // - ent
      return [{
        x: entity.x,
        y: entity.y + entity.height / 2
      }, {
        x: wanderer.x,
        y: entity.y + entity.height / 2
      }];
    } else {
      // ent -
      return [{
        x: entity.x + entity.width,
        y: entity.y + entity.height / 2
      }, {
        x: wanderer.x,
        y: entity.y + entity.height / 2
      }];
    }
  }

  var nonOrthogonalInContact = pointEntityIntersection(wanderer, entity);

  return [nonOrthogonalInContact, wanderer];
};

// In the case Link has been edited, we have to take into account the previous
// state of the Link and return modified points only for the endpoints of the
// Link.
//
// Takes a from and to EntityModel and the actual Link connecting them
//
// Returns an Array<Point> representing the new Points of the Link
//
var calcPointsOfEdited = function calcPointsOfEdited(from, to, link) {
  if (link == null || link.points == null) {
    return [{ x: 0, y: 0 }, { x: 100, y: 100 }];
  }

  var points = link.points;

  var _newPointTwins = newPointTwins(points[0], points[1], from),
      inContactFrom = _newPointTwins[0],
      wandererFrom = _newPointTwins[1];

  var _newPointTwins2 = newPointTwins(points[points.length - 1], points[points.length - 2], to),
      inContactTo = _newPointTwins2[0],
      wandererTo = _newPointTwins2[1];

  if (points.length <= 1) {
    return [{ x: 0, y: 0 }, { x: 100, y: 100 }];
  } else if (points.length === 2) {
    var fromMid = {
      x: from.x + from.width / 2,
      y: from.y + from.height / 2
    };
    var fromMidToIntersection = pointEntityIntersection(fromMid, to);
    return [fromMid, fromMidToIntersection];
  } else if (points.length === 3) {
    if (inContactFrom.x === wandererFrom.x) {
      return [inContactFrom, { x: inContactFrom.x, y: inContactTo.y }, inContactTo];
    } else if (inContactFrom.y === wandererFrom.y) {
      return [inContactFrom, { x: inContactTo.x, y: inContactFrom.y }, inContactTo];
    } else {
      return [inContactFrom, points[1], inContactTo];
    }
  }

  return [inContactFrom, wandererFrom].concat(points.slice(2, points.length - 2), [wandererTo, inContactTo]);
};

// Takes a from and to EntityModel and returns an Array<Point> that represents
// the points of the link connecting them
//
// We have two distinctive cases:
// When the link has been edited (the user interacted with the link) we need to
// take into account the previous state of links. The function
// calcPointsOfEdited will take care of this condition
//
// When the link has not been edited, we declaratively generate a new only
// taking into account the position and dimentions of from and to. The function
// calcDefaultPointsAccordingToMainAxis will take care of this
//
var calcLinkPoints = function calcLinkPoints(from, to, linky, src) {
  if (from == null || to == null) {
    return [{ x: 0, y: 0 }, { x: 100, y: 100 }];
  }
  if (to.id) {
    var toEnt = to;
    if (from.linksTo && from.linksTo.some(function (link) {
      return link.edited === true && link.target === toEnt.id;
    })) {
      var link = from.linksTo.find(function (lnk) {
        return lnk.target === toEnt.id;
      });
      return calcPointsOfEdited(from, toEnt, link);
    }
  }

  var fromBox = {
    x1: from.x,
    y1: from.y,
    x2: from.x + from.width,
    y2: from.y + from.height
  };
  var toBox = {
    x1: to.x,
    y1: to.y,
    x2: to.x + to.width,
    y2: to.y + to.height
  };

  var mainCross = {
    left: [],
    right: [],
    top: [],
    bottom: [],
    index: -1
  };
  var inCross = {
    top: [],
    right: [],
    bottom: [],
    left: []
  };
  var toCross = {
    left: [],
    right: [],
    top: [],
    bottom: []
  };
  var fromData = {};
  var toDirection = "";

  if (linky.points && linky.points.length > 1) {
    var start = linky.points[0];
    var joint = linky.points[1];

    var endJoint = linky.points[linky.points.length - 2];
    var end = linky.points[linky.points.length - 1];

    fromData.name = linky.target;

    if (start.x > joint.x) {
      fromData.direction = "left";
    } else if (start.x < joint.x) {
      fromData.direction = "right";
    }
    if (start.y > joint.y) {
      fromData.direction = "top";
    } else if (start.y < joint.y) {
      fromData.direction = "bottom";
    }

    if (endJoint.x > end.x) {
      toDirection = "right";
    } else if (endJoint.x < end.x) {
      toDirection = "left";
    }
    if (endJoint.y > end.y) {
      toDirection = "bottom";
    } else if (endJoint.y < end.y) {
      toDirection = "top";
    }
  }
  if (from && from.linksTo) {
    from.linksTo.map(function (l, index) {
      if (l.points && l.points.length > 1) {
        var _start = l.points[0];
        var _joint = l.points[1];

        if (_start.x > _joint.x) {
          mainCross.left.push(l);
        } else if (_start.x < _joint.x) {
          mainCross.right.push(l);
        }
        if (_start.y > _joint.y) {
          mainCross.top.push(l);
        } else if (_start.y < _joint.y) {
          mainCross.bottom.push(l);
        }
        if (l.target === fromData.name) {
          mainCross.index = index;
        }
      }
    });
  }

  var entityStore = _.store.getState();

  /**
   * Links entering From entity (dragged one)
   * @type {Array}
   */
  var linksInFromEntity = [];
  /**
   * Links entering To entity
   * @type {Array}
   */
  var linksInToEntity = [];
  /**
   * Links leaving To entity
   * @type {Array}
   */
  var linksOutToEntity = [];
  entityStore.entity.map(function (en) {
    if (en.linksTo && en.linksTo.length) {
      if (en.id === to.id) {
        en.linksTo.map(function (link) {
          linksOutToEntity.push(link);
        });
      }
      if (en.id !== from.id) {
        en.linksTo.map(function (link) {
          if (link.target === from.id) {
            linksInFromEntity.push(link);
          }
        });
      }
      en.linksTo.map(function (link) {
        if (to.id === link.target) {
          linksInToEntity.push(_extends({}, link, { id: en.id }));
        }
      });
    }
  });
  linksInFromEntity.map(function (i) {
    var start = i.points[i.points.length - 2];
    var joint = i.points[i.points.length - 1];

    if (start.x > joint.x) {
      mainCross.right.push(i);
    } else if (start.x < joint.x) {
      mainCross.left.push(i);
    }
    if (start.y > joint.y) {
      mainCross.bottom.push(i);
    } else if (start.y < joint.y) {
      mainCross.top.push(i);
    }
  });
  linksOutToEntity.map(function (i) {
    var start = i.points[0];
    var joint = i.points[1];

    if (start.x > joint.x) {
      toCross.left.push(i);
    } else if (start.x < joint.x) {
      toCross.right.push(i);
    }
    if (start.y > joint.y) {
      toCross.top.push(i);
    } else if (start.y < joint.y) {
      toCross.bottom.push(i);
    }
  });
  linksInToEntity.map(function (i) {
    if (i.points && i.points.length) {
      var _joint2 = i.points[i.points.length - 2];
      var _end = i.points[i.points.length - 1];

      if (_joint2.x > _end.x) {
        inCross.right.push(i);
      } else if (_joint2.x < _end.x) {
        inCross.left.push(i);
      }
      if (_joint2.y > _end.y) {
        inCross.bottom.push(i);
      } else if (_joint2.y < _end.y) {
        inCross.top.push(i);
      }
    }
  });

  var merge = {
    top: [].concat(inCross.top, toCross.top),
    right: [].concat(inCross.right, toCross.right),
    bottom: [].concat(inCross.bottom, toCross.bottom),
    left: [].concat(inCross.left, toCross.left)
  };
  var main_arr = mainCross[fromData.direction];
  var merge_arr = merge[toDirection];
  var fromX = 0;
  var fromY = 0;
  var toX = 0;
  var toY = 0;

  if (main_arr && main_arr.length > 1) {
    var len = main_arr.length;
    main_arr.map(function (i, index) {
      if (i.target === fromData.name) {
        if (fromData.direction === "top" || fromData.direction === "bottom") {
          var step = Math.round(Math.abs((fromBox.x1 - fromBox.x2) / (len + 1)));
          fromX = step * (index + 1);
        } else {
          var _step = Math.round(Math.abs((fromBox.y1 - fromBox.y2) / (len + 1)));
          fromY = _step * (index + 1);
        }
      }
    });
  }
  if (merge_arr && merge_arr.length > 1) {
    var _len = merge_arr.length;
    merge_arr.map(function (i, index) {
      if (i.id === from.id) {
        if (toDirection === "top" || toDirection === "bottom") {
          var step = Math.round(Math.abs((toBox.x1 - toBox.x2) / (_len + 1)));
          toX = step * (_len - index);
        } else {
          var _step2 = Math.round(Math.abs((toBox.y1 - toBox.y2) / (_len + 1)));
          toY = _step2 * (_len - index);
        }
      }
    });
  }

  var fromMid = {
    x: from.x + (fromX ? fromX : from.width / 2),
    y: from.y + (fromY ? fromY : from.height / 2)
  };
  var toMid = {
    x: to.x + (toX ? toX : to.width / 2),
    y: to.y + (toY ? toY : to.height / 2)
  };

  /**
   * console.log
   */
  // console.log(from.name, main_arr, merge_arr, to.name);

  if (Math.abs(fromMid.x - toMid.x) >= Math.abs(fromMid.y - toMid.y)) {
    // If horizontal distance is greater than vertical distance
    return calcDefaultPointsAccordingToMainAxis("x", from, to, fromMid, toMid);
  } else {
    return calcDefaultPointsAccordingToMainAxis("y", from, to, fromMid, toMid);
  }
};

exports.default = calcLinkPoints;
module.exports = exports["default"];