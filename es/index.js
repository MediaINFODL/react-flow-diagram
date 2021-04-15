import Diagram, { store } from "./diagram/component";
import { setEntities, setCustom, setEntityCross, addLabel, removeEntity, removeLabel, setLabel, setName } from "./entity/reducer";
import { setConfig } from "./config/reducer";
import diagramOn from "./diagramOn/";
import { assignEmptyLabelToStore, assignEmptyStatusToStore } from "./history/reducer";
import { resetCanvas } from './canvas/reducer';

export { Diagram, diagramOn, resetCanvas, store, setEntities, setEntityCross, setConfig, setCustom, assignEmptyLabelToStore, assignEmptyStatusToStore, addLabel, removeEntity, removeLabel, setLabel, setName };