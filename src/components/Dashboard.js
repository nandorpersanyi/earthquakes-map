'use strict';

import React from 'react';
/*import shouldPureComponentUpdate from 'react-pure-render/function';*/
import GoogleMap from 'google-map-react';
import earthquake from 'stores//Earthquake';
import * as EarthquakeActions from 'actions//EarthquakeActions';

require('styles//Dashboard.css');

class Dashboard extends React.Component {
	constructor(){
		super();
		this.state = {
			earthquakes: earthquake.getAll()
		}
	}

	componentWillMount(){
		earthquake.on('change', ()=>{
			this.setState = {
				earthquakes: earthquake.getAll()
			}
		})
	}

	addFilter(){
		EarthquakeActions.addFilter()
	}

	getData(){
		EarthquakeActions.getData()
	}

	static defaultProps = {
		center: {lat: 59.938043, lng: 30.337157},
		zoom: 9,
		greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
	};
	/*shouldComponentUpdate = shouldPureComponentUpdate;*/
	render() {
		const { earthquakes } = this.state;
		console.log(earthquakes);
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
		<button onClick={this.addFilter.bind(this)}>Add</button>
		<button onClick={this.getData.bind(this)}>Get</button>
		{earthquakes.one}
		</div>
		);
	}
}

Dashboard.displayName = 'Dashboard';

// Uncomment properties you need
// DashboardComponent.propTypes = {};
// DashboardComponent.defaultProps = {};

export default Dashboard;
