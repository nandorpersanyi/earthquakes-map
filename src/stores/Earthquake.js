import { EventEmitter } from "events";
import dispatcher from '../dispatcher';

class Earthquake extends EventEmitter{
	constructor(){
		super();
		this.earthquakes = {
			one:1,
			two:2
		};
	}
	getAll(){
		return this.earthquakes;
	}
	filterData(){

	}

	handleApi(action){
		switch(action.type){
			case "GET_DATA":
				console.log(this.earthquakes);
				return this.earthquakes;

			case "FILTER_DATA":
				let vb = this.earthquakes.one;
				this.earthquakes.one += 1;
				console.log("FILTER_DATA");
				return this.filterData(action.filter);
			
		}
		console.log('weee')
	}
}

const earthquake = new Earthquake;
dispatcher.register(earthquake.handleApi.bind(earthquake))
window.dispatcher = dispatcher;
export default earthquake;