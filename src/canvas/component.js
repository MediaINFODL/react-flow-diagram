// @flow

import React from "react";
import style from "styled-components";
import { connect } from "react-redux";
import { configViewport, trackMovement, anchorCanvas, zoom, connecting, resetCanvas } from "./reducer";
import { store, setEntities } from "../";
import { undo, redo } from "../history/reducer";
import { setName, setLabel } from "../entity/reducer";
import { icons } from "../icon/component";
import EntityHOC from "../entity/component";
import Panel from "../panel/component";
import Links from "../links/component";
import ArrowMarker from "../arrowMarker/component";
import EditSidebar from "../sidebar/component";
import Debug, { Fairy } from "../debug/component";
import calcLinkPoints from "../links/calcLinkPoints";
import elemLayout from "./elemLayout";
import { Button, Popup } from "semantic-ui-react";
import type { ComponentType } from "React";
import type { Coords, CanvasAction } from "./reducer";
import type { EntityState, Point, Links as LinksType } from "../entity/reducer";
import type { CustomEntities } from "../diagram/component";
import type { State } from "../diagram/reducer";
import type { HistoryAction } from "../history/reducer";
import StatusSidebar from "../status-sidebar/component";
import CircleMarker from "../circleMarker/component";
/*
 * Presentational
 * ==================================== */

const CanvasViewport = style.div`
  min-height: 10em;
  flex: 1 0 auto;
  position: relative;
  overflow: hidden;
  background-color: #fefefe;

  & * {
    box-sizing: border-box;
  }
  & ul,
  & ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;

const CanvasArtboard = style.div.attrs({
  style: props => {
    const restPercentage = 100 - 100 / props.gridSize;
    const defaultStyles = {
      transform: `translate(${props.artboard.x}px, ${props.artboard
        .y}px) scale(${props.zoomLevel})`,
      width: `${props.artboard.width}px`,
      height: `${props.artboard.height}px`
    };
    const gridStyle = {
      backgroundImage: `linear-gradient(0deg, transparent 0%, transparent ${restPercentage}%, rgba(0, 0, 0, .05) 100%),
linear-gradient(90deg, transparent 0%, transparent ${restPercentage}%, rgba(0, 0, 0, .05) 100%)`,
      backgroundSize: `${props.gridSize}px ${props.gridSize}px`
    };
    return props.gridSize ? { ...defaultStyles, ...gridStyle } : defaultStyles;
  }
})`
  position: relative;
  transform-origin: 0 0;
  background-color: white;
  overflow: hidden;
`;

const SvgLand = style.svg`
  position: absolute;
  top: 0;
  left: 0;
`;

type CanvasProps = {
  entities: EntityState,
  wrappedCustomEntities: { [type: string]: ComponentType<*> },
  isConnecting: boolean,
  gridSize: ?number,
  connectingLink: LinksType,
  handleRef: HTMLElement => void,
  zoomLevel: number,
  zoomIn: () => void,
  zoomOut: () => void,
  artboard: { x: number, y: number, width: number, height: number },
  onMouseDown: (SyntheticMouseEvent<HTMLElement>) => void,
  onMouseMove: (SyntheticMouseEvent<HTMLElement>) => void,
  onMouseUp: () => void,
  handleSidebarChange?: () => void,
  view?: boolean
};

class Canvas extends React.PureComponent<CanvasProps,> {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpened: false,
      selectedLinkId: "",
      selectedLabel: "",
      editedLabel: "",
      model: {},
      statusSidebarOpen: true,
      statusId: "",
      currentStatus: "my",
      newStatus: ""
    };
    this.handleSidebarChange = this.handleSidebarChange.bind(this);
    this.onSaveLabel = this.onSaveLabel.bind(this);
    this.onRemoveLabel = this.onRemoveLabel.bind(this);
    this.onSelectedLinkLabel = this.onSelectedLinkLabel.bind(this);
    // this.handleEmitSidebarChange = this.handleEmitSidebarChange(this);
  }

  render() {
    const { view } = this.props
    return (
      <CanvasViewport
        onMouseMove={this.props.onMouseMove}
        innerRef={div => this.props.handleRef(div)}
      >

        <CanvasArtboard
          onMouseDown={this.props.onMouseDown}
          onMouseUp={this.props.onMouseUp}
          gridSize={this.props.gridSize}
          artboard={this.props.artboard}
          zoomLevel={this.props.zoomLevel}
        >
          <SvgLand
            width="100%"
            height="100%"
            onMouseMove={this.props.onMouseMove}
          >
            <CircleMarker />
            {this.props.entities
              .filter(entity => "linksTo" in entity)
              // $FlowFixMe
              .map(entity => <Links
                key={entity.id}
                links={entity.linksTo}
                entity={entity}
                handleSidebarChange={this.handleSidebarChange} />)}
            {/* https://github.com/facebook/flow/issues/1414 */}
            {this.props.isConnecting && <Links links={this.props.connectingLink} />}
            <ArrowMarker />
          </SvgLand>

          {this.props.entities
            .map(entity => ({
              entity,
              CustomEntity: this.props.wrappedCustomEntities[entity.type]
            }))
            .map(Combo => (
              <Combo.CustomEntity key={Combo.entity.id} model={Combo.entity} />
            ))}
        </CanvasArtboard>

        {!view && <Panel zoomIn={this.props.zoomIn} zoomOut={this.props.zoomOut} />}
        {/*<StatusSidebar/>*/}
        {this.state.sidebarOpened &&
          <EditSidebar
            handleSidebarChange={this.handleSidebarChange}
            opened={this.state.sidebarOpened}
            selectedLabel={this.state.selectedLabel}
            selectedLinkId={this.state.selectedLinkId}
            // onSelectedLinkLabel={this.onSelectedLinkLabel}
            onSaveLabel={this.onSaveLabel} />
        }
      </CanvasViewport>
    );
  }

  handleSidebarChange(sidebarOpened, selectedLink) {
    // Sidebar can be opened by selecting a link entity
    // Sidebar can be closed by cancel button from the sidebar component 
    this.setState({
      selectedLabel: selectedLink.label ? selectedLink.label : "",
      selectedLinkId: selectedLink.id ? selectedLink.id : "",
      sidebarOpened
    });

  }

  onSelectedLinkLabel(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ editedLabel: e.target.value });
  }

  onSaveLabel(id, initLabel, newLabel) {
    // The initLabel is the starting value of the label
    // The newLabel is the changed value of the label that should be updated
    // The id is the linksTo statusId
    // Find the link from statuses that contains the label and update the model entity
    this.props.entities.map(status => {
      if (status.linksTo) {
        let foundEntity = status.linksTo.find(x => x.target == id && x.label == initLabel);

        if (foundEntity) {
          foundEntity.label = newLabel;
          store.dispatch(setLabel({ id: status.id, to: id, label: newLabel }));
        }
      }
    });
    this.setState({ sidebarOpened: false });
  }

  onRemoveLabel() {

  }
}

/*
 * Container
 * ==================================== */

type CanvasContainerProps = {
  entities?: EntityState,
  customEntities: CustomEntities,
  isConnecting?: boolean,
  connectingLink?: LinksType,
  gridSize?: ?number,
  artboard?: { x: number, y: number, width: number, height: number },
  zoomLevel?: number,
  configViewport?: () => CanvasAction,
  connecting: () => void,
  trackMovement?: Coords => CanvasAction,
  anchorCanvas?: boolean => CanvasAction,
  zoom?: number => CanvasAction,
  undo?: () => HistoryAction,
  redo?: () => HistoryAction,
};
type CanvasContainerState = {
  zoomStep: number,
};

class CanvasContainer extends React.PureComponent<CanvasContainerProps,
  CanvasContainerState> {
  canvasDOM: ?HTMLElement;
  zoomSteps: Array<number> = [0.25, 0.5, 0.75, 1, 1.5, 2, 4];

  state = {
    zoomStep: 3
  };

  componentDidMount() {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.document.addEventListener('contextmenu', this.handleRightClick)
    window.document.addEventListener("keydown", this.handleKey);

    Object.keys(this.props.customEntities).forEach(entityType => {
      icons.addIcon({
        [entityType]: this.props.customEntities[entityType].icon
      });
    });
  }

  componentWillUnmount() {
    window.document.removeEventListener("keydown", this.handleKey);
    window.document.removeEventListener('contextmenu', this.handleRightClick)

    this.canvasDOM = undefined;
    elemLayout.gc();
  }

  handleRightClick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.connecting({
      currently: false,
      from: ''
    });
  }

  wrappedCustomEntities = Object.assign(
    {},
    ...Object.keys(this.props.customEntities).map(type => ({
      [type]: EntityHOC(
        connect(null, { setName })(this.props.customEntities[type].component)
      )
    }))
  );

  setOffset() {
    if (this.canvasDOM) {
      const cd = this.canvasDOM;
      elemLayout.set(cd);
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
      this.props.configViewport();
    }
  }

  handleKey = (ev: SyntheticKeyboardEvent<HTMLElement>) => {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      ev.stopPropagation();
      this.props.connecting({
        currently: false,
        from: ''
      });
    }
    if (ev.getModifierState("Meta") || ev.getModifierState("Control")) {
      switch (ev.key) {
        case "z":
          ev.preventDefault();
          this.props.undo();
          break;
        case "y":
          ev.preventDefault();
          this.props.redo();
          break;
        // no default
      }
    }
  };

  onMouseDown = (ev: SyntheticKeyboardEvent<HTMLElement>) => {
    this.props.anchorCanvas(true);
  };
  onMouseMove = (ev: SyntheticMouseEvent<HTMLElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.trackMovement({
      x: ev.pageX,
      y: ev.pageY
    });
  };

  onMouseUp = () => {
    this.props.anchorCanvas(false);
  };

  traverseZoomLevels(i: number) {
    const min = 0;
    const max = this.zoomSteps.length - 1;
    const potential = this.state.zoomStep + i;

    const determineZoomLevel = (prevIndex: number): number => {
      if (potential > max) {
        return max;
      } else if (potential < min) {
        return min;
      } else {
        return prevIndex + i;
      }
    };
    this.setState(
      prevState => ({
        zoomStep: determineZoomLevel(prevState.zoomStep)
      }),
      () => this.props.zoom(this.zoomSteps[this.state.zoomStep])
    );
  }

  zoomIn = () => {
    this.traverseZoomLevels(1);
  };

  zoomOut = () => {
    this.traverseZoomLevels(-1);
  };

  handleRef = (div: HTMLElement) => {
    if (this.canvasDOM === undefined) {
      this.canvasDOM = div;
      this.setOffset();
    }
  };

  render() {
    return (
      <Canvas
        entities={this.props.entities}
        view={this.props.view}
        connecting={this.props.connecting}
        wrappedCustomEntities={this.wrappedCustomEntities}
        handleRef={this.handleRef}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        isConnecting={this.props.isConnecting}
        connectingLink={this.props.connectingLink}
        zoomLevel={this.props.zoomLevel}
        zoomIn={this.zoomIn}
        zoomOut={this.zoomOut}
        artboard={this.props.artboard}
        gridSize={this.props.gridSize}
      />
    );
  }
}

const makeConnectingLinks = (state: State): LinksType => {
  if (state.canvas.connecting.currently) {
    const points: Array<Point> = calcLinkPoints(
      state.entity.find(entity => entity.id === state.canvas.connecting.from),
      {
        x: state.canvas.cursor.x,
        y: state.canvas.cursor.y,
        width: 0,
        height: 0
      },
      "makeConnectingLinks"
    );
    return [
      {
        target: "will_connect",
        edited: false,
        points
      }
    ];
  } else {
    return [{ target: "noop", edited: false }];
  }
};

const mapStateToProps = (state: State) => ({
  entities: state.entity,
  isConnecting: state.canvas.connecting.currently,
  connectingLink: makeConnectingLinks(state),
  gridSize: state.canvas.gridSize,
  artboard: state.canvas.canvasArtboard,
  zoomLevel: state.canvas.zoom
});

export default connect(mapStateToProps, {
  configViewport,
  trackMovement,
  anchorCanvas,
  connecting,
  resetCanvas,
  zoom,
  undo,
  redo
})(CanvasContainer);
