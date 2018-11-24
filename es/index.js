import 'semantic-ui-css/semantic.min.css';
import Diagram, { store } from './diagram/component';
import { setEntities, setCustom, setEntityCross } from './entity/reducer';
import { setConfig } from './config/reducer';
import diagramOn from './diagramOn/';

export { Diagram, diagramOn, store, setEntities, setEntityCross, setConfig, setCustom };