// @flow

import type { EntityModel, Point, Link } from "../entity/reducer";
import { store } from "../../src";

type Rect = {|
  x: number,
  y: number,
  width: number,
  height: number,
|};

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
const calcDefaultPointsAccordingToMainAxis = (
  mainAxis: "x" | "y",
  from: EntityModel,
  to: Rect | EntityModel,
  fromMid: Point,
  toMid: Point
): Array<Point> => {
  const crossAxis = mainAxis === "x" ? "y" : "x";
  const mainDimension = mainAxis === "x" ? "width" : "height";
  const crossDimension = mainAxis === "x" ? "height" : "width";

  if (
    from[crossAxis] + from[crossDimension] > to[crossAxis] &&
    from[crossAxis] < to[crossAxis] + to[crossDimension]
  ) {
    // If From and To are too close in the crossAxis
    const distance = (fromMid[mainAxis] + toMid[mainAxis]) / 2;

    const midPntAlpha: Point = {
      [mainAxis]: distance,
      [crossAxis]: fromMid[crossAxis]
    };

    const midPntBeta: Point = {
      [mainAxis]: distance,
      [crossAxis]: toMid[crossAxis]
    };

    const lastPnt: Point = {
      [mainAxis]:
        from[mainAxis] > to[mainAxis]
          ? to[mainAxis] + to[mainDimension]
          : to[mainAxis],
      [crossAxis]: toMid[crossAxis]
    };

    return [fromMid, midPntAlpha, midPntBeta, lastPnt];
  } else {
    const midPoint: Point = {
      [mainAxis]: toMid[mainAxis],
      [crossAxis]: fromMid[crossAxis]
    };

    const lastPnt: Point = {
      [mainAxis]: toMid[mainAxis],
      [crossAxis]:
        from[crossAxis] > to[crossAxis]
          ? to[crossAxis] + to[crossDimension]
          : to[crossAxis]
    };

    return [fromMid, midPoint, lastPnt];
  }
};

// Takes four points
// First and second points represent the first line
// Third and fourth point represent second line
// If they intersect, returns point of intersection
// else it returns null
//
const linesIntersection = (
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point
): ?Point => {
  const s1x = p1.x - p0.x;
  const s1y = p1.y - p0.y;
  const s2x = p3.x - p2.x;
  const s2y = p3.y - p2.y;
  const s =
    (-s1y * (p0.x - p2.x) + s1x * (p0.y - p2.y)) / (-s2x * s1y + s1x * s2y);
  const t =
    (s2x * (p0.y - p2.y) - s2y * (p0.x - p2.x)) / (-s2x * s1y + s1x * s2y);
  return s >= 0 && s <= 1 && t >= 0 && t <= 1
    ? { x: p0.x + t * s1x, y: p0.y + t * s1y }
    : null;
};

// We have a Point A and an EntityModel (a fromBox with x, y, width, height)
// We make a line J from A to the center of EntityModel (toMid)
// This function finds the intersection between line J and the perimeter of EntityModel
//
// Function takes Point and EntityModel
// Calculates intersection between line J and all sides of EntityModel
// Returns intersection, or `from` in case there is no intersection to any sides
//
const pointEntityIntersection = (from: Point, to: EntityModel): Point => {
  const toMid: Point = {
    x: to.x + to.width / 2,
    y: to.y + to.height / 2
  };

  const upLeft: Point = {
    x: to.x,
    y: to.y
  };
  const upRight: Point = {
    x: to.x + to.width,
    y: to.y
  };
  const downRight: Point = {
    x: to.x + to.width,
    y: to.y + to.height
  };
  const downLeft: Point = {
    x: to.x,
    y: to.y + to.height
  };
  const interUp = linesIntersection(upLeft, upRight, from, toMid);
  const interRight = linesIntersection(upRight, downRight, from, toMid);
  const interDown = linesIntersection(downRight, downLeft, from, toMid);
  const interLeft = linesIntersection(downLeft, upLeft, from, toMid);
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
const newPointTwins = (
  inContact: Point,
  wanderer: Point,
  entity: EntityModel
): [Point, Point] => {
  if (inContact.x === wanderer.x) {
    //  ·
    //  |
    // ent
    //  |
    //  ·
    if (inContact.y > wanderer.y) {
      //  |
      // ent
      return [
        {
          x: entity.x + entity.width / 2,
          y: entity.y
        },
        {
          x: entity.x + entity.width / 2,
          y: wanderer.y
        }
      ];
    } else {
      // ent
      //  |
      return [
        {
          x: entity.x + entity.width / 2,
          y: entity.y + entity.height
        },
        {
          x: entity.x + entity.width / 2,
          y: wanderer.y
        }
      ];
    }
  }
  if (inContact.y === wanderer.y) {
    // · - ent - ·
    if (inContact.x > wanderer.x) {
      // - ent
      return [
        {
          x: entity.x,
          y: entity.y + entity.height / 2
        },
        {
          x: wanderer.x,
          y: entity.y + entity.height / 2
        }
      ];
    } else {
      // ent -
      return [
        {
          x: entity.x + entity.width,
          y: entity.y + entity.height / 2
        },
        {
          x: wanderer.x,
          y: entity.y + entity.height / 2
        }
      ];
    }
  }

  const nonOrthogonalInContact = pointEntityIntersection(wanderer, entity);

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
const calcPointsOfEdited = (
  from: EntityModel,
  to: EntityModel,
  link: ?Link
): Array<Point> => {
  if (link == null || link.points == null) {
    return [{ x: 0, y: 0 }, { x: 100, y: 100 }];
  }

  const points = link.points;

  const [inContactFrom, wandererFrom] = newPointTwins(
    points[0],
    points[1],
    from
  );
  const [inContactTo, wandererTo] = newPointTwins(
    points[points.length - 1],
    points[points.length - 2],
    to
  );

  if (points.length <= 1) {
    return [{ x: 0, y: 0 }, { x: 100, y: 100 }];
  } else if (points.length === 2) {
    const fromMid: Point = {
      x: from.x + from.width / 2,
      y: from.y + from.height / 2
    };
    const fromMidToIntersection = pointEntityIntersection(fromMid, to);
    return [fromMid, fromMidToIntersection];
  } else if (points.length === 3) {
    if (inContactFrom.x === wandererFrom.x) {
      return [
        inContactFrom,
        { x: inContactFrom.x, y: inContactTo.y },
        inContactTo
      ];
    } else if (inContactFrom.y === wandererFrom.y) {
      return [
        inContactFrom,
        { x: inContactTo.x, y: inContactFrom.y },
        inContactTo
      ];
    } else {
      return [inContactFrom, points[1], inContactTo];
    }
  }

  return [
    inContactFrom,
    wandererFrom,
    ...points.slice(2, points.length - 2),
    wandererTo,
    inContactTo
  ];
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
const calcLinkPoints = (
  from: ?EntityModel,
  to: ?(Rect | EntityModel),
  linky?: Link,
  src?: any
): Array<Point> => {
  if (from == null || to == null) {
    return [{ x: 0, y: 0 }, { x: 100, y: 100 }];
  }
  if (to.id) {
    const toEnt: EntityModel = to;
    if (
      from.linksTo &&
      from.linksTo.some(
        link => link.edited === true && link.target === toEnt.id
      )
    ) {
      const link = from.linksTo.find(lnk => lnk.target === toEnt.id);
      return calcPointsOfEdited(from, toEnt, link);
    }
  }

  const fromBox = {
    x1: from.x,
    y1: from.y,
    x2: from.x + from.width,
    y2: from.y + from.height
  };
  const toBox = {
    x1: to.x,
    y1: to.y,
    x2: to.x + to.width,
    y2: to.y + to.height
  };

  const mainCross = {
    left: [],
    right: [],
    top: [],
    bottom: [],
    index: -1
  };
  const inCross = {
    top: [],
    right: [],
    bottom: [],
    left: []
  };
  const toCross = {
    left: [],
    right: [],
    top: [],
    bottom: []
  };
  const fromData = {};
  let toDirection = "";

  if (linky.points && linky.points.length > 1) {
    const start = linky.points[0];
    const joint = linky.points[1];

    const endJoint = linky.points[linky.points.length - 2];
    const end = linky.points[linky.points.length - 1];

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
    from.linksTo.map((l: Link, index) => {
      if (l.points && l.points.length > 1) {
        const start = l.points[0];
        const joint = l.points[1];

        if (start.x > joint.x) {
          mainCross.left.push(l);
        } else if (start.x < joint.x) {
          mainCross.right.push(l);
        }
        if (start.y > joint.y) {
          mainCross.top.push(l);
        } else if (start.y < joint.y) {
          mainCross.bottom.push(l);
        }
        if (l.target === fromData.name) {
          mainCross.index = index;
        }
      }
    });
  }

  const entityStore = store.getState();

  /**
   * Links entering From entity (dragged one)
   * @type {Array}
   */
  let linksInFromEntity = [];
  /**
   * Links entering To entity
   * @type {Array}
   */
  let linksInToEntity = [];
  /**
   * Links leaving To entity
   * @type {Array}
   */
  let linksOutToEntity = [];
  entityStore.entity.map((en: EntityModel) => {
    if (en.linksTo && en.linksTo.length) {
      if (en.id === to.id) {
        en.linksTo.map((link: Link) => {
          linksOutToEntity.push(link);
        });
      }
      if (en.id !== from.id) {
        en.linksTo.map((link: Link) => {
          if (link.target === from.id) {
            linksInFromEntity.push(link);
          }
        });
      }
      en.linksTo.map((link: Link) => {
        if (to.id === link.target) {
          linksInToEntity.push({ ...link, id: en.id });
        }
      });
    }
  });
  linksInFromEntity.map(i => {
    const start = i.points[i.points.length - 2];
    const joint = i.points[i.points.length - 1];

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
  linksOutToEntity.map(i => {
    const start = i.points[0];
    const joint = i.points[1];

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
  linksInToEntity.map((i: Link) => {
    if (i.points && i.points.length) {
      const joint = i.points[i.points.length - 2];
      const end = i.points[i.points.length - 1];

      if (joint.x > end.x) {
        inCross.right.push(i);
      } else if (joint.x < end.x) {
        inCross.left.push(i);
      }
      if (joint.y > end.y) {
        inCross.bottom.push(i);
      } else if (joint.y < end.y) {
        inCross.top.push(i);
      }
    }
  });

  const merge = {
    top: [...inCross.top, ...toCross.top],
    right: [...inCross.right, ...toCross.right],
    bottom: [...inCross.bottom, ...toCross.bottom],
    left: [...inCross.left, ...toCross.left]
  };
  const main_arr = mainCross[fromData.direction];
  const merge_arr = merge[toDirection];
  let fromX = 0;
  let fromY = 0;
  let toX = 0;
  let toY = 0;

  if (main_arr && main_arr.length > 1) {
    const len = main_arr.length;
    main_arr.map((i, index) => {
      if (i.target === fromData.name) {
        if (fromData.direction === "top" || fromData.direction === "bottom") {
          const step = Math.round(Math.abs((fromBox.x1 - fromBox.x2) / (len + 1)));
          fromX = step * (index + 1);
        } else {
          const step = Math.round(Math.abs((fromBox.y1 - fromBox.y2) / (len + 1)));
          fromY = step * (index + 1);
        }
      }
    });
  }
  if (merge_arr && merge_arr.length > 1) {
    const len = merge_arr.length;
    merge_arr.map((i, index) => {
      if (i.id === from.id) {
        if (toDirection === "top" || toDirection === "bottom") {
          const step = Math.round(Math.abs((toBox.x1 - toBox.x2) / (len + 1)));
          toX = step * (len - index);
        } else {
          const step = Math.round(Math.abs((toBox.y1 - toBox.y2) / (len + 1)));
          toY = step * (len - index);
        }
      }
    });
  }

  const fromMid: Point = {
    x: from.x + (fromX ? fromX : from.width / 2),
    y: from.y + (fromY ? fromY : from.height / 2)
  };
  const toMid: Point = {
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

export default calcLinkPoints;
