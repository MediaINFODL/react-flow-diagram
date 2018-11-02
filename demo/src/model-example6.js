// @flow

import type { EntityState } from '../../src/entity/reducer';

const model6: EntityState = [{
  'id': 'dataentry',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 580,
  'y': 375,
  'name': 'main',
  'linksTo': [{
    'target': 'dataentryinprogress',
    'edited': false,
    'label': 'in progress',
    'points': [{ 'x': 622, 'y': 375 }, { 'y': 112.5, 'x': 622 }, { 'y': 112.5, 'x': 500 }]
  }, {
    'target': 'index',
    'edited': false,
    'label': 'out',
    'points': [{ 'x': 580, 'y': 394 }, { 'x': 217.5, 'y': 394 }, { 'x': 217.5, 'y': 260 }]
  }, {
    'target': 'jnsq95t6',
    'edited': false,
    'points': [{ 'x': 642.5, 'y': 450 }, { 'y': 497.5, 'x': 642.5 }, { 'y': 497.5, 'x': 537.5 }, {
      'y': 545,
      'x': 537.5
    }]
  }, {
    'target': 'jnsqasp1',
    'edited': false,
    'points': [{ 'x': 580, 'y': 413 }, { 'x': 242.5, 'y': 413 }, { 'x': 242.5, 'y': 550 }]
  }, {
    'target': 'jnuw24k8',
    'edited': false,
    'points': [{ 'x': 664, 'y': 375 }, { 'y': 182.5, 'x': 664 }, { 'y': 182.5, 'x': 775 }]
  }]
}, {
  'id': 'dataentryinprogress',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 375,
  'y': 75,
  'name': 'swap',
  'linksTo': [{
    'target': 'dataentry',
    'edited': false,
    'points': [{ 'x': 437.5, 'y': 150 }, { 'y': 432, 'x': 437.5 }, { 'y': 432, 'x': 580 }]
  }]
}, {
  'id': 'index',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 155,
  'y': 185,
  'name': 'out #3',
  'linksTo': []
}, {
  'id': 'jnsq799s',
  'type': 'Event',
  'width': 50,
  'height': 50,
  'x': 895,
  'y': 360,
  'name': 'in #2',
  'linksTo': [{
    'target': 'dataentry',
    'edited': false,
    'points': [{ 'x': 895, 'y': 385 }, { 'x': 762.5, 'y': 385 }, { 'x': 762.5, 'y': 425 }, { 'x': 705, 'y': 425 }]
  }]
}, {
  'id': 'jnsq95t6',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 470,
  'y': 545,
  'name': 'out #1'
}, {
  'id': 'jnsqasp1',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 180,
  'y': 550,
  'name': 'out #2'
}, {
  'id': 'jnsqpgdf',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 930,
  'y': 435,
  'name': 'in #1',
  'linksTo': [{
    'target': 'dataentry',
    'edited': false,
    'points': [{ 'x': 930, 'y': 472.5 }, { 'x': 817.5, 'y': 472.5 }, { 'x': 817.5, 'y': 400 }, { 'x': 705, 'y': 400 }]
  }]
}, { 'id': 'jnuw24k8', 'type': 'Task', 'width': 125, 'height': 75, 'x': 775, 'y': 145, 'name': 'out #4' }];

export default model6;
