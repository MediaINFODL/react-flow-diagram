// @flow
import "semantic-ui-css/semantic.min.css";
import Diagram, { store } from "./diagram/component";
import {
  setEntities,
  setCustom,
  setEntityCross,
  addLabel,
  removeEntity,
  removeLabel,
  setLabel,
  setName
} from "./entity/reducer";
import { setConfig } from "./config/reducer";
import diagramOn from "./diagramOn/";
import { assignEmptyLabelToStore, assignEmptyStatusToStore } from "./history/reducer";

export {
  Diagram,
  diagramOn,
  store,
  setEntities,
  setEntityCross,
  setConfig,
  setCustom,
  assignEmptyLabelToStore,
  assignEmptyStatusToStore,
  addLabel,
  removeEntity,
  removeLabel,
  setLabel,
  setName
};
