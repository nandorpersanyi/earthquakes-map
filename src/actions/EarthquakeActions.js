import dispatcher from '../dispatcher';
import Request from 'superagent';

export function getEarthquakes(timeFrame){
	dispatcher.dispatch({
		type: 'FETCHING_EARTHQUAKES'
	});
	let apiTimeframe = '';
	let apiTimeframeTitle = '';
	switch(timeFrame){
		case 'past-day':{
			apiTimeframe = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
			apiTimeframeTitle = 'All earthquakes in the past day';
			break;
		}
		case 'past-hour':{
			apiTimeframe = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';
			apiTimeframeTitle = 'All earthquakes in the past hour';
			break;
		}
		case 'past-7days':{
			apiTimeframe = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
			apiTimeframeTitle = 'All earthquakes in the past 7 days';
			break;
		}
	}
	Request(
		'GET',
		apiTimeframe
		).then((data)=>{
			dispatcher.dispatch({
				type: 'RECEIVED_EARTHQUAKES',
				title: apiTimeframeTitle,
				data: data
			});
		}, (err)=>{
			dispatcher.dispatch({
				type: 'ERROR_EARTHQUAKES',
				err: err
			});
		});
}
