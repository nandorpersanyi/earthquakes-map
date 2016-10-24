'use strict';

import React from 'react';
/*import shouldPureComponentUpdate from 'react-pure-render/function';*/
import GoogleMap from 'google-map-react';

require('styles//Dashboard.css');

class Dashboard extends React.Component {
	static defaultProps = {
		center: {lat: 59.938043, lng: 30.337157},
		zoom: 9,
		greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
	};
	/*shouldComponentUpdate = shouldPureComponentUpdate;*/
	render() {
		const country = this.props.params.country;
		return (
		<div className="dashboard-component">
			<GoogleMap
				bootstrapURLKeys={{
					key: 'AIzaSyCckxILw3tv3EBFHx3Pi90dgzIHABhGqOc',
					language: 'en'
				}}
				defaultCenter={this.props.center}
				defaultZoom={this.props.zoom}>
			</GoogleMap>
		Dashboard content country selected: {country}
		</div>
		);
	}
}

Dashboard.displayName = 'Dashboard';

// Uncomment properties you need
// DashboardComponent.propTypes = {};
// DashboardComponent.defaultProps = {};

export default Dashboard;
