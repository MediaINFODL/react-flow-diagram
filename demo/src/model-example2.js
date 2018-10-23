// @flow

import type { EntityState } from '../../src/entity/reducer';

// TODO: I could potentially have a situation where the model for a link only
// has a `target` property and the entity reducer figures out the proper values
// of `points` when SETting the diagram. In this way I'd had a mix of
// declarative in the inital model and then switch to explicit after load.

const model2: EntityState = [{
  'id': 'dataentry',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 112,
  'y': 122,
  'name': 'Data Entry on nubmer one',
  'linksTo': [{
    'target': 'dataentryinprogress',
    'edited': false,
    'label': 'In progress',
    'points': [{ 'x': 237, 'y': 160.5 }, { 'x': 331, 'y': 160.5 }, { 'x': 331, 'y': 112.5 }, { 'x': 425, 'y': 112.5 }]
  }]
}, {
  'id': 'dataentryinprogress',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 425,
  'y': 75,
  'name': 'Data Entry In Progress',
  'linksTo': [{
    'target': 'dataentryreview',
    'edited': false,
    'label': 'Done',
    'points': [{ 'x': 550, 'y': 112.5 }, { 'x': 687.5, 'y': 112.5 }, { 'x': 687.5, 'y': 150 }]
  }]
}, {
  'id': 'dataentryreview',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 650,
  'y': 150,
  'name': 'Data Entry Review',
  'linksTo': [{
    'target': 'dataentry',
    'edited': false,
    'label': 'Review',
    'points': [{ 'x': 650, 'y': 187.5 }, { 'x': 443.5, 'y': 187.5 }, { 'x': 443.5, 'y': 160.5 }, {
      'x': 237,
      'y': 160.5
    }]
  }, {
    'target': 'dataentered',
    'edited': false,
    'label': 'Approve',
    'points': [{ 'x': 712.5, 'y': 150 }, { 'y': 131.5, 'x': 712.5 }, { 'y': 131.5, 'x': 801.5 }, {
      'y': 113,
      'x': 801.5
    }]
  }]
}, {
  'id': 'dataentered',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 739,
  'y': 39,
  'name': 'Data Entered',
  'linksTo': [{
    'target': 'published',
    'edited': false,
    'label': 'Publish',
    'points': [{ 'x': 739, 'y': 75.5 }, { 'x': 583.5, 'y': 75.5 }, { 'x': 583.5, 'y': 45.5 }, { 'x': 428, 'y': 45.5 }]
  }]
}, {
  'id': 'index',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 100,
  'y': 250,
  'name': 'Index',
  'linksTo': [{
    'target': 'indexinprogress',
    'edited': false,
    'label': 'In Progress',
    'points': [{ 'x': 225, 'y': 287.5 }, { 'x': 354, 'y': 287.5 }, { 'x': 354, 'y': 341.5 }, { 'x': 483, 'y': 341.5 }]
  }]
}, {
  'id': 'indexinprogress',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 482,
  'y': 304,
  'name': 'Index In Progress',
  'linksTo': [{
    'target': 'indexreview',
    'edited': false,
    'label': 'Done',
    'points': [{ 'x': 545.5, 'y': 379 }, { 'y': 435, 'x': 545.5 }, { 'y': 435, 'x': 620.5 }, { 'y': 491, 'x': 620.5 }]
  }]
}, {
  'id': 'indexreview',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 558,
  'y': 491,
  'name': 'Index Review',
  'linksTo': [{
    'target': 'indexdone',
    'edited': false,
    'label': 'Approve',
    'points': [{ 'x': 683, 'y': 528.5 }, { 'x': 859.5, 'y': 528.5 }, { 'x': 859.5, 'y': 330 }]
  }, {
    'target': 'index',
    'edited': false,
    'label': 'Reject',
    'points': [{ 'x': 558, 'y': 527.5 }, { 'x': 162.5, 'y': 527.5 }, { 'x': 162.5, 'y': 325 }]
  }]
}, {
  'id': 'indexdone',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 796,
  'y': 255,
  'name': 'Index Done',
  'linksTo': [{
    'target': 'published',
    'edited': false,
    'label': 'Publish',
    'points': [{ 'x': 796, 'y': 292.5 }, { 'x': 365.5, 'y': 292.5 }, { 'x': 365.5, 'y': 83 }]
  }]
}, {
  'id': 'published',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 303,
  'y': 8,
  'name': 'Published',
  'linksTo': [{
    'target': 'dataentry',
    'edited': false,
    'label': 'Re-Enter',
    'points': [{ 'x': 303, 'y': 45.5 }, { 'x': 174.5, 'y': 45.5 }, { 'x': 174.5, 'y': 123 }]
  }]
}];

export default model2;
