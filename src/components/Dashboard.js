import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as EarthquakeActions from '../stores/actions/Earthquake';
import MapHeader from './MapHeader';
import GoogleMap from 'google-map-react';
import Earthquakemarker from './Earthquakemarker';

import '../styles//Dashboard.css';

class Dashboard extends Component {

	static defaultProps = {
		mapTitle: 'All earthquakes in the '
	};

	changeTimeFrame = (event) => {
		this.props.getEarthQuakesChange(event.target.value);
	}

	addCountryFilter = (event) => {
		/*let filterTerm = event.target.value.toLowerCase();
		this.setState({
			filterTerm: filterTerm 
		})
		let fullData = this.props.earthquakes;

		let filteredData = fullData.filter((elem) => {
			if(elem.properties.place.toLowerCase().search(filterTerm) > 0){
				return elem;
			}
		});

		(filteredData.length > 0) ? this.setState({ filteredEarthquakes: filteredData }) : this.setState({ filteredEarthquakes: [] })
	*/}

	zoomIn = (lng,lat) => {
		this.setState({
			center:{lat:lat,lng:lng},
			zoom: 2
		})
	}

	componentDidMount() {
		this.props.getEarthQuakes();
	}

	render() {
		console.log(this.props)
		const loadScreenStyle = this.props.ready;

		if(this.props.filteredEarthquakes.length === 0 && this.props.filterTerm.length === 0){
			var earthquakes = this.props.earthquakes;
		} else {
			var earthquakes = this.props.filteredEarthquakes;
		}
		
		const mapOptions = {
			panControl: false,
			mapTypeControl: false,
			scrollwheel: false,
			styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
		}

		return (
			//console.log(this.props);
			<div className="dashboard-component">
				<div id="load-screen" style={loadScreenStyle}>Loading...</div>
				<MapHeader mapTitle={this.props.mapTitle} selectedTimeFrame={this.props.selectedTimeFrame} changeTimeFrame={this.changeTimeFrame} addCountryFilter={this.addCountryFilter} />
				<div id="map-wrap">	
					<GoogleMap
						bootstrapURLKeys={{
							key: 'AIzaSyAGqMSur03kYEGxvCKOHNvUJfLlDo0j7Kg',
							language: 'en'
						}}
						center={this.props.center}
						zoom={this.props.zoom}
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
	//console.log('mapStateToProps', state)
	return {
		earthquakes: state.earthquakes,
		filteredEarthquakes: state.filteredEarthquakes,
		selectedTimeFrame: state.selectedTimeFrame,
		filterTerm: state.filterTerm,
		center: state.center,
		zoom: state.zoom,
		ready: state.ready
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getEarthQuakes: () => dispatch(EarthquakeActions.getEarthQuakes('past-7days')),
		getEarthQuakesChange: (value) => dispatch(EarthquakeActions.getEarthQuakes(value))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
