// @flow

import type { EntityState } from '../../src/entity/reducer';

// TODO: I could potentially have a situation where the model for a link only
// has a `target` property and the entity reducer figures out the proper values
// of `points` when SETting the diagram. In this way I'd had a mix of
// declarative in the inital model and then switch to explicit after load.

const model3: EntityState = [{
  'id': 'dataentry',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 100,
  'y': 75,
  'name': 'Data Entry on nubmer one',
  'linksTo': [{
    'target': 'dataentryinprogress',
    'edited': false,
    'label': 'In progress',
    'points': [{ 'x': 225, 'y': 112.5 }, { 'x': 321, 'y': 112.5 }, { 'x': 321, 'y': 64.5 }, { 'x': 417, 'y': 64.5 }]
  }]
}, {
  'id': 'dataentryinprogress',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 417,
  'y': 26,
  'name': 'Data Entry In Progress',
  'linksTo': [{
    'target': 'dataentryreview',
    'edited': false,
    'label': 'Done',
    'points': [{ 'x': 542, 'y': 64.5 }, { 'x': 712.5, 'y': 64.5 }, { 'x': 712.5, 'y': 150 }]
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
    'points': [{ 'x': 650, 'y': 187.5 }, { 'x': 162.5, 'y': 187.5 }, { 'x': 162.5, 'y': 150 }]
  }, {
    'target': 'dataentered',
    'edited': false,
    'label': 'Approve',
    'points': [{ 'x': 712.5, 'y': 225 }, { 'y': 463, 'x': 712.5 }, { 'y': 463, 'x': 717.5 }, { 'y': 701, 'x': 717.5 }]
  }]
}, {
  'id': 'dataentered',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 655,
  'y': 700,
  'name': 'Data Entered',
  'linksTo': []
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
    'points': [{ 'x': 225, 'y': 287.5 }, { 'x': 375.5, 'y': 287.5 }]
  }]
}, {
  'id': 'indexinprogress',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 375,
  'y': 250,
  'name': 'Index In Progress',
  'linksTo': [{
    'target': 'indexreview',
    'edited': false,
    'label': 'Done',
    'points': [{ 'x': 437.5, 'y': 325 }, { 'y': 407.5, 'x': 437.5 }, { 'y': 407.5, 'x': 493.5 }, {
      'y': 490,
      'x': 493.5
    }]
  }]
}, {
  'id': 'indexreview',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 434,
  'y': 491,
  'name': 'Index Review',
  'linksTo': [{
    'target': 'index',
    'edited': false,
    'label': 'Reject',
    'points': [{ 'x': 434, 'y': 527.5 }, { 'x': 162.5, 'y': 527.5 }, { 'x': 162.5, 'y': 325 }]
  }]
}];

export default model3;
