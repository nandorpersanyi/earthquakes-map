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
			earthquakes: [],
			mapTitle: '',
			ready: {display:'block'},
		}
	}

	componentWillMount(){
		EarthquakeActions.getEarthquakes('past-day');
		EarthquakeStore.on('change', ()=>{
			const updateEarthquakes = EarthquakeStore.getAll();
			this.setState({
				earthquakes: updateEarthquakes.data,
				mapTitle: updateEarthquakes.title,
				ready: updateEarthquakes.ready
			});
		})
	}
	componentWillUnMount(){
		EarthquakeStore.unbindListener('change');
	}
	changeTimeFrame(event){
		EarthquakeActions.getEarthquakes(event.target.value);
	}
	
	static defaultProps = {
		center: {lat: 13.758966, lng: -25.398046},
		zoom: 1
	};
	render() {
		const loadScreenStyle = this.state.ready;

		const { earthquakes } = this.state;
		const { mapTitle } = this.state;
		const mapOptions = {
			panControl: false,
			mapTypeControl: false,
			scrollwheel: false,
			styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
		}
		const earthquakeMarkers = earthquakes.map( function(elem){
			const { 0:lng, 1:lat, 2:depth } = elem.geometry.coordinates;
			return <EarthquakeMarker  key={elem.id} lat={lat} lng={lng} {...elem}/>
		});
		return(
			<div className="dashboard-component">
				<div id="load-screen" style={loadScreenStyle}>Loading...</div>
				<div id="map-header">
					<div id="map-title"><h2>{mapTitle}</h2></div>
					<div id="select-timeframe">
						<select onChange={this.changeTimeFrame}>
							<option value="past-day">Past Day</option>
							<option value="past-hour">Past Hour</option>
							<option value="past-7days">Past 7 Days</option>
						</select>
					</div>
				</div>
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
			</div>
		);
	}
}

Dashboard.displayName = 'Dashboard';

// Uncomment properties you need
// DashboardComponent.propTypes = {};
// DashboardComponent.defaultProps = {};

export default Dashboard;
