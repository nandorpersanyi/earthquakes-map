import { EventEmitter } from "events";
import dispatcher from '../dispatcher';

class Earthquake extends EventEmitter{
	constructor(){
		super();
		this.earthquakes = [];
		this.earthquakeFilters = [];
	}
	getAll(){
		return this.earthquakes;
	}
	addFilter(){
		this.earthquakeFilters.push();
		this.emit("change");
	}
	handleActions(action){
		switch(action.type){
			case "ADD_FILTER":{
				this.addEarthquake();
				break;
			}
			case "RECEIVED_EARTHQUAKES":{
				console.log('store received action')
				this.earthquakes = action.data.body.features;
				//console.log(this.earthquakes.body.features)
				this.emit("change");
				break;
			}
			case "ERROR_EARTHQUAKES":{
				console.log(action.err)
				break;
			}
		}
	}
}

const EarthquakeStore = new Earthquake;
dispatcher.register(EarthquakeStore.handleActions.bind(EarthquakeStore))

export default EarthquakeStore;