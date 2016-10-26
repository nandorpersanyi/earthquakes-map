'use strict';

import React from 'react';

require('styles//EarthquakeMarker.css');

class EarthquakeMarker extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showDesc: { display: 'none' }
    }
  }
  showDetails(){
    this.setState({
      showDesc: { display: 'block' }
    });
  }
  hideDetails(){
    this.setState({
      showDesc: { display: 'none' }
    });
  }

  render() {
    const { 0:lng, 1:lat, 2:depth } = this.props.geometry.coordinates;
    const {mag,title,tsunami,status,place} = this.props.properties;
    const quakeRatio = mag*10;
    const earthquakeMarkerStyle = {
      width:(quakeRatio).toFixed(0) + 'px',
      height:(quakeRatio).toFixed(0) + 'px',
      marginTop:'-'+((quakeRatio)/2).toFixed(0) + 'px',
      marginLeft:'-'+((quakeRatio)/2).toFixed(0) + 'px',
      backgroundColor: 'rgba(255,0,0,'+ (mag*0.115).toFixed(1) +')',
    };
    const earthquakeDescStyle = this.state.showDesc;

    return (
      <div className="earthquake-marker-wrap">
        <div className="earthquake-description" style={earthquakeDescStyle}>
          <span><strong>Title:</strong> {title}</span>
          <span><strong>Place:</strong> {place}</span>
          <span><strong>Tsunami:</strong> {tsunami}</span>
          <span><strong>Magnitude:</strong> {mag}</span>
          <span><strong>Status:</strong> {status}</span>
        </div>
        <div onMouseOver={this.showDetails.bind(this, true)} onMouseOut={this.hideDetails.bind(this, true)} className="earthquake-marker-round" style={earthquakeMarkerStyle}></div>
      </div>
      
    );
  }
}

EarthquakeMarker.displayName = 'EarthquakeMarker';

// Uncomment properties you need
// EarthquakeMarkerComponent.propTypes = {};
// EarthquakeMarkerComponent.defaultProps = {};

export default EarthquakeMarker;
