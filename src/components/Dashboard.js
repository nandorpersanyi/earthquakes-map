import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as EarthquakeActions from '../stores/actions/Earthquake';
import MapHeader from './MapHeader';
import GoogleMap from 'google-map-react';
import Earthquakemarker from './Earthquakemarker';

import '../styles//Dashboard.css';

class Dashboard extends Component {

	constructor(props) {
        super();
        this.state = {
            center: { lat: 13.758966, lng: -25.398046 },
			zoom: 1,
        }
	}
	
	static defaultProps = {
		mapTitle: 'All earthquakes in the '
	};

	changeTimeFrame = (event) => {
		this.props.getEarthQuakes(event.target.value);
	}

	addCountryFilter = (event) => {
		let filterTerm = event.target.value.toLowerCase();
		let fullData = this.props.earthquakes;

		let filteredData = fullData.filter((elem) => {
			return elem.properties.place.toLowerCase().search(filterTerm) > 0;
		});

		if(filteredData.length > 0){
			this.props.filteredEarthQuakes(filterTerm, filteredData)
		} else {
			this.props.filteredEarthQuakes(filterTerm, [])
		}
	}

	zoomIn = (lng,lat) => {
		this.setState({
			center: { lat: lat, lng: lng },
			zoom: 1,
		})
	}

	componentDidMount() {
		this.props.getEarthQuakes(this.props.selectedTimeFrame);
	}

	render() {
		const loadScreenStyle = this.props.ready;
		let earthquakes;
		if(this.props.filteredEarthquakes.length === 0 && this.props.filterTerm.length === 0){
			earthquakes = this.props.earthquakes;
		} else {
			earthquakes = this.props.filteredEarthquakes;
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
				<MapHeader mapTitle={this.props.mapTitle} selectedTimeFrame={this.props.selectedTimeFrame} changeTimeFrame={this.changeTimeFrame} addCountryFilter={this.addCountryFilter} />
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

const mapStateToProps = (state) => {
	return {
		earthquakes: state.earthquakes,
		filteredEarthquakes: state.filteredEarthquakes,
		selectedTimeFrame: state.selectedTimeFrame,
		filterTerm: state.filterTerm,
		ready: state.ready
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getEarthQuakes: (timeFrame) => dispatch(EarthquakeActions.getEarthQuakes(timeFrame)),
		filteredEarthQuakes: (filterTerm, filteredData) => dispatch(EarthquakeActions.filteredEarthQuakes(filterTerm, filteredData))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
