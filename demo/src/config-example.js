// @flow

import Task from "./task/component";
import taskIcon from "./task/icon";
import Event from "./event/component";
import eventIcon from "./event/icon";
import type { ConfigState, CustomEntities } from "react-flow-diagram";

const config: ConfigState = {
  entityTypes: {
    Task: {
      width: 100,
      height: 60
    },
    Event:{
      width: 5,
      height: 5
    }
  },
  gridSize: 1
};

const customEntities: CustomEntities = {
  Task: {
    component: Task,
    icon: taskIcon
  },
  Event: {
    component: Event,
    icon: eventIcon
  }
};

export { config, customEntities };
