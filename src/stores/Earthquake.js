import { EventEmitter } from 'events';
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
