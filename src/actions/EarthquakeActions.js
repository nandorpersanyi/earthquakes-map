import dispatcher from '../dispatcher';
import Request from 'superagent';

export function addFilter(){
	dispatcher.dispatch({
		type: "FILTER_DATA"
	});
}

export function getEarthquakes(){
	console.log('getEarthquakes action called')
	dispatcher.dispatch({
		type: "FETCH_EARTHQUAKES"
	});
	Request(
		'GET', 
		'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
		).then((data)=>{
			dispatcher.dispatch({
				type: "RECEIVED_EARTHQUAKES",
				data: data
			});
		}, (err)=>{
			dispatcher.dispatch({
				type: "ERROR_EARTHQUAKES",
				err: err
			});
		});
}
