'use strict';

import React from 'react';

require('styles//EarthquakeMarker.css');

class EarthquakeMarker extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { val } = this.props;

    return (
      <li>
        <span>{val}</span>
      </li>
    );
  }
}

EarthquakeMarker.displayName = 'EarthquakeMarker';

// Uncomment properties you need
// EarthquakeMarkerComponent.propTypes = {};
// EarthquakeMarkerComponent.defaultProps = {};

export default EarthquakeMarker;
