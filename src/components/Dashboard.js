import React, { Component } from 'react';
import EarthquakeStore from '../stores//Earthquake';
import * as EarthquakeActions from '../actions/EarthquakeActions';
import MapHeader from './MapHeader';
import GoogleMap from 'google-map-react';
import Earthquakemarker from './Earthquakemarker';

import '../styles//Dashboard.css';

export default class Dashboard extends Component {
	
	constructor() {
		super();
		this.state = {
			earthquakes: [],
			filteredEarthquakes: [],
			selectedTimeFrame: 'past-7days',
			filterTerm: '',
			center: { lat: 13.758966, lng: -25.398046 },
			zoom: 1,
			ready: { display: 'block' }
		}
	}

	static defaultProps = {
		mapTitle: 'All earthquakes in the '
	};

	changeTimeFrame = (event) => {
		EarthquakeActions.getEarthquakes(event.target.value);
	}

	addCountryFilter = (event) => {
		let filterTerm = event.target.value.toLowerCase();
		this.setState({
			filterTerm: filterTerm 
		})
		let fullData = this.state.earthquakes;

		let filteredData = fullData.filter((elem) => {
			if(elem.properties.place.toLowerCase().search(filterTerm) > 0){
				return elem;
			}
		});

		(filteredData.length > 0) ? this.setState({ filteredEarthquakes: filteredData }) : this.setState({ filteredEarthquakes: [] })
	}

	zoomIn = (lng,lat) => {
		this.setState({
			center:{lat:lat,lng:lng},
			zoom: 2
		})
	}

	componentDidMount() {
		EarthquakeActions.getEarthquakes(this.state.selectedTimeFrame);
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

		if(this.state.filteredEarthquakes.length === 0 && this.state.filterTerm.length === 0){
			var earthquakes = this.state.earthquakes;
		} else {
			var earthquakes = this.state.filteredEarthquakes;
		}
		
		const mapOptions = {
			panControl: false,
			mapTypeControl: false,
			scrollwheel: false,
			styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
		}

		return (
			<div className="dashboard-component">
				<div id="load-screen" style={loadScreenStyle}>Loading...</div>
				<MapHeader mapTitle={this.props.mapTitle} selectedTimeFrame={this.state.selectedTimeFrame} changeTimeFrame={this.changeTimeFrame} addCountryFilter={this.addCountryFilter} />
				<div id="map-wrap">	
					<GoogleMap
						bootstrapURLKeys={{
							key: 'YOUR_API_KEY',
							language: 'en'
						}}
						center={this.state.center}
						zoom={this.state.zoom}
						options={mapOptions}>
						{
							earthquakes.map(function (elem) {
								const { 0: lng, 1: lat } = elem.geometry.coordinates;
								return <Earthquakemarker zoomIn={this.zoomIn.bind(this,lng,lat)} key={elem.id} lat={lat} lng={lng} {...elem} />
							}, this)
						}
					</GoogleMap>
				</div>
			</div>
		);
	}
}
