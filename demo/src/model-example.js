// @flow

import type { EntityState } from "../../src/entity/reducer";

// TODO: I could potentially have a situation where the model for a link only
// has a `target` property and the entity reducer figures out the proper values
// of `points` when SETting the diagram. In this way I'd had a mix of
// declarative in the inital model and then switch to explicit after load.

const model: EntityState = [{
  "id": "dataentry",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 101,
  "y": 88,
  "name": "init",
  "linksTo": [{
    "target": "dataentryinprogress",
    "edited": false,
    "label": "In progress",
    "points": [{ "x": 201, "y": 109 }, { "x": 305.5, "y": 109 }, { "x": 305.5, "y": 65 }, { "x": 410, "y": 65 }]
  }]
}, {
  "id": "dataentryinprogress",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 410,
  "y": 35,
  "name": "Data Entry In Progress",
  "linksTo": [{
    "target": "dataentryreview",
    "edited": false,
    "label": "Done",
    "points": [{ "x": 510, "y": 65 }, { "x": 556, "y": 65 }, { "x": 556, "y": 128 }]
  }]
}, {
  "id": "dataentryreview",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 502,
  "y": 128,
  "name": "Data Entry Review",
  "linksTo": [{
    "target": "dataentry",
    "edited": false,
    "label": "Review",
    "points": [{ "x": 502, "y": 158 }, { "x": 353.5, "y": 158 }, { "x": 353.5, "y": 128 }, { "x": 201, "y": 128 }]
  }, {
    "target": "dataentered",
    "edited": false,
    "label": "Approve",
    "points": [{ "x": 602, "y": 158 }, { "x": 736, "y": 158 }, { "x": 736, "y": 113 }]
  }]
}, {
  "id": "dataentered",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 685,
  "y": 53,
  "name": "Data Entered",
  "linksTo": [{
    "target": "published",
    "edited": false,
    "label": "Publish",
    "points": [{ "x": 785, "y": 83 }, { "x": 881, "y": 83 }, { "x": 881, "y": 191 }]
  }]
}, {
  "id": "index",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 102,
  "y": 220,
  "name": "init #2",
  "linksTo": [{
    "target": "indexinprogress",
    "edited": false,
    "label": "In Progress",
    "points": [{ "x": 202, "y": 250 }, { "x": 261, "y": 250 }, { "x": 261, "y": 293 }, { "x": 320, "y": 293 }]
  }]
}, {
  "id": "indexinprogress",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 319,
  "y": 264,
  "name": "Index In Progress",
  "linksTo": [{
    "target": "indexreview",
    "edited": false,
    "label": "Done",
    "points": [{ "x": 419, "y": 294 }, { "x": 491, "y": 294 }, { "x": 491, "y": 360 }]
  }]
}, {
  "id": "indexreview",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 440,
  "y": 360,
  "name": "Index Review",
  "linksTo": [{
    "target": "indexdone",
    "edited": false,
    "label": "Approve",
    "points": [{ "x": 540, "y": 390 }, { "x": 648, "y": 390 }, { "x": 648, "y": 305 }]
  }, {
    "target": "index",
    "edited": false,
    "label": "Reject",
    "points": [{ "x": 440, "y": 390 }, { "x": 152, "y": 390 }, { "x": 152, "y": 280 }]
  }]
}, {
  "id": "indexdone",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 604,
  "y": 245,
  "name": "Index Done",
  "linksTo": [{
    "target": "published",
    "edited": false,
    "label": "Publish",
    "points": [{ "x": 704, "y": 275 }, { "x": 767.5, "y": 275 }, { "x": 767.5, "y": 231 }, { "x": 831, "y": 231 }]
  }]
}, {
  "id": "published",
  "type": "Task",
  "width": 100,
  "height": 60,
  "x": 830,
  "y": 191,
  "name": "Published",
  "linksTo": [{
    "target": "dataentry",
    "edited": false,
    "label": "Re-Enter",
    "points": [{ "x": 830, "y": 211 }, { "x": 151, "y": 211 }, { "x": 151, "y": 148 }]
  }]
}];

export default model;
