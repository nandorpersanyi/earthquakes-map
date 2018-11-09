import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import EarthquakeStore from '../stores//Earthquake';
import * as EarthquakeActions from '../actions/EarthquakeActions';
import Earthquakemarker from './Earthquakemarker';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import '../styles//Dashboard.css';

export default class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			earthquakes: [],
			selectedTimeFrame: 'past-day',
			ready: { display: 'block' }
		}
	}

	static defaultProps = {
		center: { lat: 13.758966, lng: -25.398046 },
		zoom: 1,
		mapTitle: 'All earthquakes in the '
	};

	changeTimeFrame = (event) => {
		EarthquakeActions.getEarthquakes(event.target.value);
	}

	componentWillMount() {
		EarthquakeActions.getEarthquakes('past-day');
		EarthquakeStore.on('change', () => {
			const updateEarthquakes = EarthquakeStore.getAll();
			this.setState({
				earthquakes: updateEarthquakes.data,
				selectedTimeFrame: updateEarthquakes.selected,
				ready: updateEarthquakes.ready
			});
		})
	}
	
	componentWillUnMount() {
		EarthquakeStore.unbindListener('change');
	}

	render() {
		const loadScreenStyle = this.state.ready;

		const { earthquakes } = this.state;
		const mapOptions = {
			panControl: false,
			mapTypeControl: false,
			scrollwheel: false,
			styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
		}
		console.log(earthquakes)
		const earthquakeMarkers = earthquakes.map(function (elem) {
			const { 0: lng, 1: lat } = elem.geometry.coordinates;
			return <Earthquakemarker key={elem.id} lat={lat} lng={lng} {...elem} />
		});

		return (
			<div className="dashboard-component">
				<div id="load-screen" style={loadScreenStyle}>Loading...</div>
				<div id="map-header">
					<div id="map-title">
						<h2>{this.props.mapTitle}</h2>
						<div id="select-timeframe">
						<Select onChange={this.changeTimeFrame} value={this.state.selectedTimeFrame}>
							<MenuItem value="past-day">Past Day</MenuItem>
							<MenuItem value="past-hour">Past Hour</MenuItem>
							<MenuItem value="past-7days">Past 7 Days</MenuItem>
						</Select>
						</div>
					</div>
				</div>
				<div id="map-wrap">	
					<GoogleMap
						bootstrapURLKeys={{
							key: 'YOUR_API_KEY',
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
