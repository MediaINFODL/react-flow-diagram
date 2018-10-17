// @flow

import React from 'react';
import style from 'styled-components';

import type { EntityId, Links, Point } from '../entity/reducer';
/*
 * Presentational
 * ==================================== */

const Line = style.path`
  fill: none;
  stroke-width: .1em;
  stroke: black;
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
      label: this.props.label
    };
  }

  checkIfLabelIsDown = () => {
    let flag = true;
    let init = this.props.rawPoints[0].x;
    this.props.rawPoints.map((p: Point) => {
      if (p.x < init) {
        flag = false;
      }
    });
    if (!flag) {
      this.state.label = this.state.label.split('').reverse().join('');
    }
    return flag ? 0 : 180;
  };

  render() {
    return (
      <g>
        <Line d={this.props.points} id={`line${this.props.id}`}/>
        <InteractionLine d={this.props.points}/>
        {this.props.label && (
          <text
            dy="-.3rem"
            rotate={this.checkIfLabelIsDown()}>
            <textPath
              xlinkHref={`#line${this.props.id}`}
              startOffset="35%"
              style={{ fontSize: '.8rem', cursor: 'pointer' }}
              onClick={() => {
                // Handles the opening on the sidebar, as well as passing the selected label
                this.props.handleSidebarChange(true, this.props);
              }}
            >
              {this.state.label}
            </textPath>
          </text>
        )}
      </g>
    );
  }
}


/*
 * Container
 * ==================================== */

const pointsToString = (points: Array<Point>): string => {
  const str = points
    .reduce((acc, curr) => `${acc} ${curr.x},${curr.y} L`, 'M')
    .replace(/ L$/, '');
  return str;
};

const positionStartOfPath = (points: Array<Point>, entity) => {
  if (!entity) {
    return pointsToString(points);
  }
  const start = points[0];
  const joint = points[1];

  let direction = '';

  if (start.x > joint.x) {
    direction = 'left';
  } else if (start.x < joint.x) {
    direction = 'right';
  }

  if (start.y > joint.y) {
    direction = 'up';
  } else if (start.y < joint.y) {
    direction = 'down';
  }

  let connectValue;
  switch (direction) {
    case 'left':
      connectValue = entity.x;
      points[0].x = connectValue;
      break;
    case 'right':
      connectValue = entity.x + entity.width;
      points[0].x = connectValue;
      break;
    case 'up':
      connectValue = entity.y;
      points[0].y = connectValue;
      break;
    case 'down':
      connectValue = entity.y + entity.height;
      points[0].y = connectValue;
      break;
  }

  return pointsToString(points);
};

type ArrowBodyContainerProps = {
  links: Links,
  entity: any,
  handleSidebarChange: () => void
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
                label={link.label}
                points={positionStartOfPath(link.points, this.props.entity)}
                rawPoints={link.points}
                handleSidebarChange={this.props.handleSidebarChange}
              >
              </ArrowBody>
            )
        )}
      </g>
    );
  }
}

export default ArrowBodyContainer;
