// @flow

import React from 'react';
import style from 'styled-components';

import type { Links, Point, EntityId } from '../entity/reducer';
/*
 * Presentational
 * ==================================== */

const Line = style.path`
  fill: none;
  stroke-width: .1em;
  stroke: black;
  stroke-linejoin: round;
  marker-end: url("#arrow-end");
`;

const InteractionLine = style.path`
  fill: none;
  stroke-width: 1em;
  stroke: transparent;
  stroke-linejoin: round;
`;

type ArrowBodyProps = {
  points: string,
  id: EntityId,
  label: ?string,
  handleSidebarChange: () => void
};
class ArrowBody extends React.PureComponent<
  ArrowBodyProps
  > {
  constructor(props) {
    super(props);
  }
  render() {

    return (

      <g>
        <Line d={this.props.points} id={`line${this.props.id}`} />
        <InteractionLine
          d={this.props.points}
        />
        {this.props.label && (
          <text dy="-.25rem">
            <textPath
              xlinkHref={`#line${this.props.id}`}
              startOffset="33%"
              style={{ fontSize: '.8rem', cursor: 'pointer' }}
              onClick={() => {
                // Handles the opening on the sidebar, as well as passing the selected label
                this.props.handleSidebarChange(true, this.props);
              }}
            >
              {this.props.label}
            </textPath>
          </text>
        )}
      </g>
    )
  }
}


/*
 * Container
 * ==================================== */

const pointsToString = (points: Array<Point>): string =>
  points
    .reduce((acc, curr) => `${acc} ${curr.x},${curr.y} L`, 'M')
    .replace(/ L$/, '');

type ArrowBodyContainerProps = {
  links: Links,
  handleSidebarChange: () => void
};
class ArrowBodyContainer extends React.PureComponent<
  ArrowBodyContainerProps
  >
{
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
                points={pointsToString(link.points)}
                handleSidebarChange={this.props.handleSidebarChange}
              >
              </ArrowBody>
            )
        )}
      </g>
    )
  }
}

export default ArrowBodyContainer;
