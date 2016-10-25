import { EventEmitter } from "events";
import dispatcher from '../dispatcher';

class Earthquake extends EventEmitter{
	constructor(){
		super();
		this.earthquakes = [
		{id:1212112,val:"bb"},
		{id:1212121,val:"cc"},
		{id:1212120,val:"aa"}
		];
	}
	getAll(){
		return this.earthquakes;
	}
	filterData(){

	}
	addEarthquake(){
		this.earthquakes.push({id:Date.now(),val:"dd"});
		this.emit("change");
	}

	handleApi(action){
		switch(action.type){
			case "GET_DATA":{
				console.log(this.earthquakes);
				break;
			}
			case "FILTER_DATA":{
				this.addEarthquake();
				break;
			}
		}
		
	}
}

const EarthquakeStore = new Earthquake;
dispatcher.register(EarthquakeStore.handleApi.bind(EarthquakeStore))

export default EarthquakeStore;