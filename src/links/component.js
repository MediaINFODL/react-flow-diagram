// @flow

import React from "react";
import style from "styled-components";
import { store } from "../";
import type { EntityId, Links, Point } from "../entity/reducer";
import { assignLabelToStore } from "../history/reducer";
import { connect } from "react-redux";
/*
 * Presentational
 * ==================================== */

const Line = style.path`
  fill: none;
  stroke-width: ${props => props.strokeWidth};
  stroke: ${props => props.strokeColor};
  stroke-linejoin: round;
  marker-start: url("#circle-start");
  marker-end: url("#arrow-end");
`;

const InteractionLine = style.path`
  fill: none;
  stroke-width: 1em;
  stroke: transparent;
  stroke-linejoin: round;
`;

const Label = style.p`
  background: #444;
  border-radius: 3px;
  color: #fff;
  display: inline-block;
  font-size: 11px;
  padding: 2px 5px;
  cursor: pointer;
`;

const Plus = style.span`
  background: #444;
  border-radius: 3px;
  color: #fff;
  display: none;
  font-size: 11px;
  line-height: 15px;
  padding: 2px 5px;
  cursor: pointer;
  transform: translate(-50%, -50%);
`;

const Group = style.g`
    span {
      display: initial;
    }
`;

type ArrowBodyProps = {
  rawPoints: { x: number, y: number }[],
  points: string,
  id: EntityId,
  label: ?string,
  handleSidebarChange: () => void
};

class ArrowBody extends React.PureComponent<ArrowBodyProps> {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      width: 150,
      height: 50
    };
  }

  componentDidMount() {
    if (this.el) {
      const { height, width } = this.el.getBoundingClientRect();
      this.setState({ width, height });
    }
  }

  shouldUpdateLabel = (prevProps) => prevProps.labelSelected.uid !== this.props.labelSelected.uid

  componentDidUpdate(prevProps) {
    if (prevProps.isEntitySelected !== this.props.isEntitySelected || this.shouldUpdateLabel(prevProps)) {
      this.handleLineLabelClick()
    }
    if (this.el) {
      const { height, width } = this.el.getBoundingClientRect();
      this.setState({ width, height });
    }
  }

  checkIfZigZagLine = points => {
    const start = points[0];
    const startJoint = points[1];
    const endJoint = points[2];
    const end = points[3];
    let startDirection;
    let endDirection;

    if (start.x > startJoint.x) {
      startDirection = "left";
    } else if (start.x < startJoint.x) {
      startDirection = "right";
    }

    if (start.y > startJoint.y) {
      startDirection = "up";
    } else if (start.y < startJoint.y) {
      startDirection = "down";
    }

    if (end.x < endJoint.x) {
      endDirection = "left";
    } else if (end.x > endJoint.x) {
      endDirection = "right";
    }

    if (end.y < endJoint.y) {
      endDirection = "up";
    } else if (end.y > endJoint.y) {
      endDirection = "down";
    }

    return startDirection && endDirection && startDirection === endDirection;
  };

  getMethodForLabelPosition = () => {
    const points = this.props.rawPoints;
    let maxDistance = -1;
    let pt = [];
    for (let i = 0; i < points.length; i++) {
      if (points[i + 1]) {
        const d = Math.sqrt(Math.pow(points[i + 1].x - points[i].x, 2) + Math.pow(points[i + 1].y - points[i].y, 2));
        if (d >= maxDistance) {
          if (points.length === 4 && this.checkIfZigZagLine(points)) {
            pt = [];
            pt.push(points[0]);
            pt.push(points[points.length - 1]);
            return { x: (pt[0].x + pt[1].x) / 2, y: (pt[0].y + pt[1].y) / 2 };
          }
          maxDistance = d;
          pt = [];
          pt.push(points[i]);
          pt.push(points[i + 1]);
        }
      }
    }
    return { x: (pt[0].x + pt[1].x) / 2, y: (pt[0].y + pt[1].y) / 2 };
  };

  getLabelX = () => this.getMethodForLabelPosition().x - this.state.width / 2;

  getLabelY = () => this.getMethodForLabelPosition().y - this.state.height / 2;

  emitLabelData = data => {
    // console.log("LABEL CLICK", data);
    store.dispatch(assignLabelToStore(data));
  };

  handleLineLabelClick = (id) => {
    const { links, isEntitySelected, labelSelected } = this.props
    if (isEntitySelected) {
      links.map(link => {
        const lineElement = document.getElementById(`line${link.uid}`)
        lineElement.style.stroke = 'black'
        lineElement.style.strokeWidth = '.1em'
      })
    }
    else {
      links.map(link => {
        const labelId = id ? id : labelSelected.uid
        const lineElement = document.getElementById(`line${link.uid}`)
        if (labelId === link.uid) {
          lineElement.style.stroke = 'rgb(219, 40, 40)'
          lineElement.style.strokeWidth = '.2em'
        }
        else {
          if (lineElement) {
            lineElement.style.stroke = 'black'
            lineElement.style.strokeWidth = '.1em'
          }
        }
      })
    }
  }

  render() {
    return (
      <Group>
        <Line
          strokeWidth={this.props.id === 'will_connect' ? '.2em' : '.1em'}
          strokeColor={this.props.id === 'will_connect' ? '#db2828' : 'black'}
          d={this.props.points}
          id={`line${this.props.uid}`}
        />
        <InteractionLine d={this.props.points} />
        {this.props.label && (
          <foreignObject
            x={this.getLabelX()}
            y={this.getLabelY()}
            width={this.state.width}
            height={this.state.height}
          >
            <Label
              innerRef={(el) => this.el = el}
              xlinkHref={`#line${this.props.id}`}
              onClick={() => {
                this.handleLineLabelClick(this.props.uid, this.props)
                this.emitLabelData(this.props);
              }}
            >
              {this.props.label}
            </Label>
          </foreignObject>
        )}
        {!this.props.label && (
          <foreignObject
            x={this.getLabelX()}
            y={this.getLabelY()}
            width={this.state.width}
            height={this.state.height}
          >
            <Plus
              innerRef={(el) => this.el = el}
              onClick={() => {
                this.emitLabelData(this.props);
              }}
            >+</Plus>
          </foreignObject>
        )}
      </Group>
    );
  }
}


/*
 * Container
 * ==================================== */

const pointsToString = (points: Array<Point>): string => {
  const str = points
    .reduce((acc, curr) => `${acc} ${curr.x},${curr.y} L`, "M")
    .replace(/ L$/, "");
  return str;
};

const positionStartOfPath = (points: Array<Point>, entity) => {
  if (!entity) {
    return pointsToString(points);
  }
  const start = points[0];
  const joint = points[1];

  let direction = "";

  if (start.x > joint.x) {
    direction = "left";
  } else if (start.x < joint.x) {
    direction = "right";
  }

  if (start.y > joint.y) {
    direction = "up";
  } else if (start.y < joint.y) {
    direction = "down";
  }

  let connect;
  switch (direction) {
    case "left":
      connect = entity.x;
      points[0].x = connect;
      break;
    case "right":
      connect = entity.x + entity.width;
      points[0].x = connect;
      break;
    case "up":
      connect = entity.y;
      points[0].y = connect;
      break;
    case "down":
      connect = entity.y + entity.height;
      points[0].y = connect;
      break;
  }

  return pointsToString(points);
};

const getBoxPoints = (points: Array<Point>) => {
  let max_x = points[0].x;
  let max_y = points[0].y;
  let min_x = points[0].x;
  let min_y = points[0].y;
  points.map(point => {
    if (point.x > max_x) {
      max_x = point.x;
    }
    if (point.y > max_y) {
      max_y = point.y;
    }
    if (point.x < max_x) {
      min_x = point.x;
    }
    if (point.y < max_y) {
      min_y = point.y;
    }
  });
  return { min: { x: min_x, y: min_y }, max: { x: max_x, y: max_y } };
};

type ArrowBodyContainerProps = {
  links: Links,
  entity?: any,
  handleSidebarChange?: () => void,
  connectinLinks: Array<Links>,
  isSelected: Boolean
};

class ArrowBodyContainer extends React.PureComponent<ArrowBodyContainerProps> {


  render() {
    return (
      <g>
        {this.props.links.map(
          link =>
            link.points && (
              <ArrowBody
                key={link.target}
                id={link.target}
                isEntitySelected={this.props.isSelected}
                uid={link.uid}
                labelSelected={this.props.labelSelected}
                links={this.props.connectinLinks}
                label={link.label}
                points={positionStartOfPath(link.points, this.props.entity)}
                rawPoints={link.points}
                handleSidebarChange={this.props.handleSidebarChange}
              />
            )
        )}
      </g>
    );
  }
}
const mapStateToProps = (state: State) => {
  return {
    connectinLinks: state.entity.reduce((prev, next) => prev.concat(next.linksTo), []).filter(link => link !== undefined),
    isSelected: state.metaEntity.find(entity => entity.isSelected === true) !== undefined,
    labelSelected: state.label
  }
};

export default connect(mapStateToProps, {
  assignLabelToStore
})(ArrowBodyContainer);
