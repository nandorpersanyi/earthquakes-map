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
		EarthquakeStore.on('change', ()=>{
			console.log('changed')
			this.setState({
				earthquakes: EarthquakeStore.getAll()
			});
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
		//console.log(earthquakes);
		//const country = this.props.params.country;
		const elems = earthquakes.map(function(elem){ return <EarthquakeMarker key={elem.id} {...elem}/> });
		return(
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
				{elems}
			</div>
		);
	}
}

Dashboard.displayName = 'Dashboard';

// Uncomment properties you need
// DashboardComponent.propTypes = {};
// DashboardComponent.defaultProps = {};

export default Dashboard;
