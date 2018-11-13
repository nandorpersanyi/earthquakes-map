import Request from 'superagent';

export const getEarthQuakes = (value) => {
	let apiTimeframe = '';
	let apiselectedTimeFrame = '';
	switch (value) {
		case 'past-day': {
			apiTimeframe = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
			apiselectedTimeFrame = 'past-day';
			break;
		}
		case 'past-hour': {
			apiTimeframe = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';
			apiselectedTimeFrame = 'past-hour';
			break;
		}
		case 'past-7days': {
			apiTimeframe = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
			apiselectedTimeFrame = 'past-7days';
			break;
		}
		case 'past-30days': {
			apiTimeframe = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson';
			apiselectedTimeFrame = 'past-30days';
			break;
		}
		default: 	
	}
	return dispatch => {
		dispatch(apiCall(apiTimeframe,apiselectedTimeFrame,dispatch));
	}
}

export const dispatchAction = (data) => {
	console.log('async:',data)
	return { type: "GET_EARTHQUAKES", value: data };
}

export const apiCall = async (apiTimeframe,apiselectedTimeFrame,dispatch) => {

	const data = await fetch(apiTimeframe);
	const json = await data.json();
	console.log(json);
	dispatch(dispatchAction(json))
	return json;
}
/*import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class Earthquake extends EventEmitter {
	constructor() {
		super();
		this.earthquakes = {
			selected: '',
			data: [],
			ready: { display: 'none' }
		}
		this.earthquakeFilters = [];
	}
	getAll() {
		return this.earthquakes;
	}
	handleActions(action) {
		switch (action.type) {
			case 'FETCHING_EARTHQUAKES': {
				this.earthquakes.ready = { display: 'block' };
				this.emit('change');
				break;
			}
			case 'RECEIVED_EARTHQUAKES': {
				this.earthquakes.data = action.data.body.features;
				this.earthquakes.selected = action.selected;
				this.earthquakes.ready = { display: 'none' };
				this.emit('change');
				break;
			}
			case 'ERROR_EARTHQUAKES': {
				break;
			}
		}
	}
}

const EarthquakeStore = new Earthquake();
dispatcher.register(EarthquakeStore.handleActions.bind(EarthquakeStore))

export default EarthquakeStore;
*/