// @flow

import React, { Component } from 'react';
import style from 'styled-components';

/*
 * Presentational
 * ==================================== */

const Circle = style.circle`
  fill: black;
`;

class CircleMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInitXPosition = () => {
    return 5;
  };

  getInitYPosition = () => {
    return 5;
  };

  render() {
    return (
      <marker
        id="circle-start"
        viewBox="0 0 10 10"
        refX={this.getInitXPosition()}
        refY={this.getInitYPosition()}
        markerWidth="5"
        markerHeight="5"
      >
        <Circle cx="5" cy="5" r="5"/>
      </marker>
    );
  }
}

export default CircleMarker;
