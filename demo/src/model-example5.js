// @flow

import type { EntityState } from '../../src/entity/reducer';

const model5: EntityState = [{
  'id': 'dataentry',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 225,
  'y': 275,
  'name': 'Data Entry on nubmer one',
  'linksTo': [{
    'target': 'dataentryinprogress',
    'edited': false,
    'label': 'In progress',
    'points': [{ 'x': 267, 'y': 275 }, { 'y': 112.5, 'x': 267 }, { 'y': 112.5, 'x': 375 }]
  }, {
    'target': 'index',
    'edited': false,
    'points': [{ 'x': 350, 'y': 312.5 }, { 'x': 587.5, 'y': 312.5 }, { 'x': 587.5, 'y': 400 }]
  }, {
    'target': 'dataentered',
    'edited': false,
    'points': [{ 'x': 309, 'y': 275 }, { 'y': 87.5, 'x': 309 }, { 'y': 87.5, 'x': 200 }]
  }, {
    'target': 'jnns0i8n',
    'edited': false,
    'points': [{ 'x': 267, 'y': 350 }, { 'y': 450, 'x': 267 }, { 'y': 450, 'x': 200 }]
  }, {
    'target': 'jnns0g1n',
    'edited': false,
    'points': [{ 'x': 309, 'y': 350 }, { 'y': 550, 'x': 309 }, { 'y': 550, 'x': 100 }]
  }]
}, {
  'id': 'dataentryinprogress',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 375,
  'y': 75,
  'name': 'Data Entry In Progress',
  'linksTo': []
}, {
  'id': 'dataentered',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 75,
  'y': 50,
  'name': 'Data Entered',
  'linksTo': []
}, {
  'id': 'index',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 525,
  'y': 400,
  'name': 'Index',
  'linksTo': []
}, {
  'id': 'jnns0g1n',
  'type': 'Event',
  'width': 50,
  'height': 50,
  'x': 50,
  'y': 525,
  'name': 'end #2'
}, { 'id': 'jnns0i8n', 'type': 'Event', 'width': 50, 'height': 50, 'x': 150, 'y': 425, 'name': 'end #1' }];

export default model5;
