// @flow

import type { EntityState } from '../../src/entity/reducer';

// TODO: I could potentially have a situation where the model for a link only
// has a `target` property and the entity reducer figures out the proper values
// of `points` when SETting the diagram. In this way I'd had a mix of
// declarative in the inital model and then switch to explicit after load.

const model: EntityState = [
  {
    'id': 'dataentry',
    'type': 'Task',
    'width': 125,
    'height': 75,
    'x': 100,
    'y': 75,
    'name': 'init',
    'linksTo': [{
      'target': 'dataentryinprogress',
      'edited': false,
      'label': 'In progress',
      'points': [{ 'x': 225, 'y': 100 }, { 'x': 317.5, 'y': 100 }, { 'x': 317.5, 'y': 72.5 }, { 'x': 410, 'y': 72.5 }]
    }]
  }, {
    'id': 'dataentryinprogress',
    'type': 'Task',
    'width': 125,
    'height': 75,
    'x': 410,
    'y': 35,
    'name': 'Data Entry In Progress',
    'linksTo': [{
      'target': 'dataentryreview',
      'edited': false,
      'label': 'Done',
      'points': [{ 'x': 535, 'y': 72.5 }, { 'x': 652.5, 'y': 72.5 }, { 'x': 652.5, 'y': 120 }]
    }]
  }, {
    'id': 'dataentryreview',
    'type': 'Task',
    'width': 125,
    'height': 75,
    'x': 590,
    'y': 120,
    'name': 'Data Entry Review',
    'linksTo': [{
      'target': 'dataentry',
      'edited': false,
      'label': 'Review',
      'points': [{ 'x': 590, 'y': 157.5 }, { 'x': 407.5, 'y': 157.5 }, { 'x': 407.5, 'y': 125 }, { 'x': 225, 'y': 125 }]
    }, {
      'target': 'dataentered',
      'edited': false,
      'label': 'Approve',
      'points': [{ 'x': 715, 'y': 157.5 }, { 'x': 797.5, 'y': 157.5 }, { 'x': 797.5, 'y': 87.5 }, {
        'x': 880,
        'y': 87.5
      }]
    }]
  }, {
    'id': 'dataentered',
    'type': 'Task',
    'width': 125,
    'height': 75,
    'x': 880,
    'y': 50,
    'name': 'Data Entered',
    'linksTo': [{
      'target': 'published',
      'edited': false,
      'label': 'Publish',
      'points': [{ 'x': 1005, 'y': 87.5 }, { 'x': 1142.5, 'y': 87.5 }, { 'x': 1142.5, 'y': 190 }]
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
      'points': [{ 'x': 225, 'y': 287.5 }, { 'x': 312.5, 'y': 287.5 }, { 'x': 312.5, 'y': 277.5 }, {
        'x': 400,
        'y': 277.5
      }]
    }]
  }, {
    'id': 'indexinprogress',
    'type': 'Task',
    'width': 125,
    'height': 75,
    'x': 400,
    'y': 240,
    'name': 'Index In Progress',
    'linksTo': [{
      'target': 'indexreview',
      'edited': false,
      'label': 'Done',
      'points': [{ 'x': 525, 'y': 277.5 }, { 'x': 722.5, 'y': 277.5 }, { 'x': 722.5, 'y': 330 }]
    }]
  }, {
    'id': 'indexreview',
    'type': 'Task',
    'width': 125,
    'height': 75,
    'x': 665,
    'y': 330,
    'name': 'Index Review',
    'linksTo': [{
      'target': 'indexdone',
      'edited': false,
      'label': 'Approve',
      'points': [{ 'x': 790, 'y': 367.5 }, { 'x': 872.5, 'y': 367.5 }, { 'x': 872.5, 'y': 310 }]
    }, {
      'target': 'index',
      'edited': false,
      'label': 'Reject',
      'points': [{ 'x': 665, 'y': 367.5 }, { 'x': 162.5, 'y': 367.5 }, { 'x': 162.5, 'y': 325 }]
    }]
  }, {
    'id': 'indexdone',
    'type': 'Task',
    'width': 125,
    'height': 75,
    'x': 810,
    'y': 235,
    'name': 'Index Done',
    'linksTo': [{
      'target': 'published',
      'edited': false,
      'label': 'Publish',
      'points': [{ 'x': 935, 'y': 272.5 }, { 'x': 1007.5, 'y': 272.5 }, { 'x': 1007.5, 'y': 240 }, {
        'x': 1080,
        'y': 240
      }]
    }]
  }, {
    'id': 'published',
    'type': 'Task',
    'width': 125,
    'height': 75,
    'x': 1080,
    'y': 190,
    'name': 'Published',
    'linksTo': [{
      'target': 'dataentry',
      'edited': false,
      'label': 'Re-Enter',
      'points': [{ 'x': 1080, 'y': 215 }, { 'x': 162.5, 'y': 215 }, { 'x': 162.5, 'y': 150 }]
    }]
  }];

export default model;
