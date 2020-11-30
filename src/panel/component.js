// @flow

import React from "react";
import style from "styled-components";
import { connect } from "react-redux";
import Icon from "../icon/component";
import { addEntity } from "../entity/reducer";
import { undo, redo } from "../history/reducer";
import defaultEntity from "../entity/defaultEntity";

import type {
  EntityModel,
  MetaEntityModel,
  EntityAction,
  EntityType
} from "../entity/reducer";
import type { DefaultEntityProps } from "../entity/defaultEntity";
import type { State } from "../diagram/reducer";
import type { ConfigEntityTypes } from "../config/reducer";

/*
 * Presentational
 * ==================================== */

const PanelStyle = style.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const PanelTools = style.ul`
`;

const PanelTool = style.li`
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  padding: .6em;
  display: flex;
  ${props =>
    props.separator ? "border-top: 1px solid rgba(0, 0, 0, .05);" : ""}
  background-color: white;
  transition: background-color ease-in 80ms;
  cursor: pointer;
  -webkit-box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.15);
-moz-box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.15);
box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.15);
&:hover {
  background-color: #ccc;
}

.tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  left: 105%;
}

&:hover .tooltiptext { 
  visibility: visible;
  padding: 3px;
}

  & > svg {
    display: block;
    width: 100%;

  }
`;

type PanelProps = {
  addEntityHelper: EntityType => void,
  entityTypeNames: Array<EntityType>,
  toolWidth(): number,
  zoomIn: () => void,
  zoomOut: () => void,
};

const Panel = (props: PanelProps) => (
  <PanelStyle>
    <PanelTools>
      {props.entityTypeNames.map(entityTypeName => (
        <PanelTool
          className="tooltip"
          width={props.toolWidth()}
          key={entityTypeName}
          onMouseDown={() => props.addEntityHelper(entityTypeName)}
        >
          <Icon name={entityTypeName} label={entityTypeName == 'Task' ? `Add status` : 'Add starting status'} />
          <span key={entityTypeName} className="tooltiptext">{entityTypeName == 'Task' ? `Add status` : 'Add starting status'}</span>
        </PanelTool>
      ))}
      <PanelTool
        separator
        width={props.toolWidth()}
        onMouseDown={() => props.zoomIn()}
      >
        <Icon name="zoomIn" label="Zoom in" />
        <span key={"zoomIn"} className="tooltiptext">{'Zoom in'}</span>
      </PanelTool>
      <PanelTool width={props.toolWidth()} onMouseDown={() => props.zoomOut()}>
        <Icon name="zoomOut" label="Zoom out" />
        <span key={"zoomIn"} className="tooltiptext">{'Zoom out'}</span>
      </PanelTool>
      <PanelTool width={props.toolWidth()} onMouseDown={() => props.undo()}>
        <Icon name="undo" label="Undo" />
        <span key={"zoomIn"} className="tooltiptext">{'Undo'}</span>
      </PanelTool>
      <PanelTool width={props.toolWidth()} onMouseDown={() => props.redo()}>
        <Icon name="redo" label="Redo" />
        <span key={"zoomIn"} className="tooltiptext">{'Redo'}</span>
      </PanelTool>
    </PanelTools>
  </PanelStyle>
);

/*
 * Container
 * ==================================== */

type PanelContainerProps = {
  entityTypes: ConfigEntityTypes,
  addEntity: (EntityModel & MetaEntityModel) => EntityAction,
  defaultEntity: DefaultEntityProps => EntityModel & MetaEntityModel,
    zoomIn: () => void,
      zoomOut: () => void,
        gridSize: ?number,
};

class PanelContainer extends React.PureComponent<PanelContainerProps> {
  entityTypeNames = Object.keys(this.props.entityTypes);
  minToolSize = 40;
  niceToolSize = 50;

  addEntityHelper = (entityType: EntityType = "Task") => {
    this.props.addEntity(this.props.defaultEntity({ entityType }));
  };

  toolWidth = (): number => {
    if (typeof this.props.gridSize === "number") {
      const gridSize = this.props.gridSize;
      const howManyFit = parseInt(this.minToolSize / this.props.gridSize, 10);
      const theRest = (this.minToolSize * howManyFit) % gridSize;
      const fittingSize =
        theRest === 0 ? howManyFit * gridSize : (howManyFit + 1) * gridSize;
      return fittingSize === 0 ? gridSize : fittingSize;
    } else {
      return this.niceToolSize;
    }
  };
  render() {
    return (
      <Panel
        addEntityHelper={this.addEntityHelper}
        entityTypeNames={this.entityTypeNames}
        toolWidth={this.toolWidth}
        zoomIn={this.props.zoomIn}
        undo={this.props.undo}
        redo={this.props.redo}
        zoomOut={this.props.zoomOut}
      />
    );
  }
}

const mapStateToProps = (state: State) => ({
  entityTypes: state.config.entityTypes,
  defaultEntity: defaultEntity(state),
  gridSize: state.canvas.gridSize
});

export default connect(mapStateToProps, { addEntity, undo, redo })(PanelContainer);
