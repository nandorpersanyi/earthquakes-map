'use strict';

import React from 'react';

require('styles//EarthquakeMarker.css');

class EarthquakeMarker extends React.Component {
  constructor(props) {
    super();
  }
  
  render() {
    const { 0:lng, 1:lat, 2:depth } = this.props.geometry.coordinates;
    const {mag,title,tsunami,status,place} = this.props.properties;
    console.log((mag*0.115).toFixed(1))

    const divStyle = {
      width:(mag*10).toFixed(0) + 'px',
      height:(mag*10).toFixed(0) + 'px',
      backgroundColor: 'rgba(255,0,0,'+ (mag*0.115).toFixed(1) +')',
    };
    return (
      <div className="earthquake-marker-round" style={divStyle}>ff</div>
    );
  }
}

EarthquakeMarker.displayName = 'EarthquakeMarker';

// Uncomment properties you need
// EarthquakeMarkerComponent.propTypes = {};
// EarthquakeMarkerComponent.defaultProps = {};

export default EarthquakeMarker;
