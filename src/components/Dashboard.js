'use strict';

import React from 'react';
/*import shouldPureComponentUpdate from 'react-pure-render/function';*/
import GoogleMap from 'google-map-react';
import EarthquakeStore from 'stores//Earthquake';
import * as EarthquakeActions from 'actions//EarthquakeActions';
import EarthquakeMarker from './EarthquakeMarker';

require('styles//Dashboard.css');

class Dashboard extends React.Component {
	constructor(){
		super();
		this.state = {
			earthquakes: EarthquakeStore.getAll()
		}
	}

	componentWillMount(){
		console.log('component mounted')
		EarthquakeActions.getEarthquakes();
		EarthquakeStore.on('change', ()=>{
			console.log('changed')
			this.setState({
				earthquakes: EarthquakeStore.getAll()
			});
		})
	}

	addFilter(){
		EarthquakeActions.addFilter();
	}

	getData(){
		EarthquakeActions.getData();
	}

	static defaultProps = {
		center: {lat: 59.938043, lng: 30.337157},
		zoom: 1,
		greatPlaceCoords: {lat: 24.074295, lng: -21.569812}
	};
	/*shouldComponentUpdate = shouldPureComponentUpdate;*/
	render() {
		const { earthquakes } = this.state;
		const mapOptions = {
			panControl: false,
			mapTypeControl: false,
			scrollwheel: false,
			styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
		}
		const earthquakeMarkers = earthquakes.map( function(elem){
			const { 0:lng, 1:lat, 2:depth } = elem.geometry.coordinates;
			return <EarthquakeMarker key={elem.id} lat={lat} lng={lng} {...elem}/>
		});
		return(
			<div className="dashboard-component">
				<div id="map-wrap">
					<GoogleMap
						bootstrapURLKeys={{
							key: 'AIzaSyCckxILw3tv3EBFHx3Pi90dgzIHABhGqOc',
							language: 'en'
						}}
						defaultCenter={this.props.center}
						defaultZoom={this.props.zoom}
						options={mapOptions}>
						{earthquakeMarkers}
					</GoogleMap>
				</div>
				<button onClick={this.addFilter.bind(this)}>Add</button>
				<button onClick={this.getData.bind(this)}>Get</button>
			</div>
		);
	}
}

Dashboard.displayName = 'Dashboard';

// Uncomment properties you need
// DashboardComponent.propTypes = {};
// DashboardComponent.defaultProps = {};

export default Dashboard;
