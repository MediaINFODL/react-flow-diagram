// @flow

import type { EntityState } from '../../src/entity/reducer';

const model4: EntityState = [{
  'id': 'dataentry',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 430,
  'y': 315,
  'name': 'main',
  'linksTo': [{
    'target': 'dataentryinprogress',
    'edited': false,
    'label': 'In progress',
    'points': [{ 'x': 461, 'y': 315 }, { 'y': 260, 'x': 461 }, { 'y': 260, 'x': 372.5 }, { 'y': 205, 'x': 372.5 }]
  }, {
    'target': 'index',
    'edited': false,
    'label': 'to-index',
    'points': [{ 'x': 430, 'y': 328 }, { 'x': 162.5, 'y': 328 }, { 'x': 162.5, 'y': 225 }]
  }, {
    'target': 'dataentered',
    'label': 'to-data-entity',
    'edited': false,
    'points': [{ 'x': 492, 'y': 315 }, { 'y': 62.5, 'x': 492 }, { 'y': 62.5, 'x': 350 }]
  }, {
    'target': 'jnns0i8n',
    'edited': false,
    'points': [{ 'x': 430, 'y': 341 }, { 'x': 175, 'y': 341 }, { 'x': 175, 'y': 500 }]
  }, {
    'target': 'jnns0g1n',
    'edited': false,
    'points': [{ 'x': 430, 'y': 354 }, { 'x': 75, 'y': 354 }, { 'x': 75, 'y': 525 }]
  }, {
    'target': 'jnokb74a',
    'edited': false,
    'points': [{ 'x': 430, 'y': 367 }, { 'x': 250, 'y': 367 }, { 'x': 250, 'y': 400 }]
  }, {
    'target': 'jnsq95t6',
    'edited': false,
    'points': [{ 'x': 461, 'y': 390 }, { 'y': 592.5, 'x': 461 }, { 'y': 592.5, 'x': 420 }]
  }, {
    'target': 'jnsqasp1',
    'edited': false,
    'points': [{ 'x': 430, 'y': 380 }, { 'x': 112.5, 'y': 380 }, { 'x': 112.5, 'y': 625 }]
  }]
}, {
  'id': 'dataentryinprogress',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 310,
  'y': 130,
  'name': 'entity in',
  'linksTo': []
}, {
  'id': 'dataentered',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 225,
  'y': 25,
  'name': 'Data Entered',
  'linksTo': []
}, {
  'id': 'index',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 100,
  'y': 150,
  'name': 'Index',
  'linksTo': []
}, {
  'id': 'jnns0g1n',
  'type': 'Event',
  'width': 50,
  'height': 50,
  'x': 50,
  'y': 525,
  'name': 'out #2'
}, {
  'id': 'jnns0i8n',
  'type': 'Event',
  'width': 50,
  'height': 50,
  'x': 150,
  'y': 500,
  'name': 'out #1'
}, {
  'id': 'jnokb74a',
  'type': 'Event',
  'width': 50,
  'height': 50,
  'x': 225,
  'y': 400,
  'name': 'event'
}, {
  'id': 'jnq5548c',
  'type': 'Event',
  'width': 50,
  'height': 50,
  'x': 710,
  'y': 400,
  'name': 'in #1',
  'linksTo': [{
    'target': 'dataentry',
    'edited': false,
    'points': [{ 'x': 710, 'y': 425 }, { 'x': 523, 'y': 425 }, { 'x': 523, 'y': 390 }]
  }]
}, {
  'id': 'jnsq799s',
  'type': 'Event',
  'width': 50,
  'height': 50,
  'x': 550,
  'y': 500,
  'name': 'in #2',
  'linksTo': [{
    'target': 'dataentry',
    'edited': false,
    'points': [{ 'x': 575, 'y': 500 }, { 'y': 438.75, 'x': 575 }, { 'y': 438.75, 'x': 492 }, { 'y': 390, 'x': 492 }]
  }]
}, {
  'id': 'jnsq95t6',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 295,
  'y': 555,
  'name': 'square #1'
}, {
  'id': 'jnsqasp1',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 50,
  'y': 625,
  'name': 'square #2'
}, {
  'id': 'jnsqpgdf',
  'type': 'Task',
  'width': 125,
  'height': 75,
  'x': 690,
  'y': 180,
  'name': 'upper entity',
  'linksTo': [{
    'target': 'dataentry',
    'edited': false,
    'points': [{ 'x': 690, 'y': 212.5 }, { 'x': 523, 'y': 212.5 }, { 'x': 523, 'y': 315 }]
  }]
}];

export default model4;
