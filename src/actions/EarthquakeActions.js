import dispatcher from '../dispatcher';
import Request from 'superagent';

export function getEarthquakes(timeFrame) {
	dispatcher.dispatch({
		type: 'FETCHING_EARTHQUAKES'
	});
	let apiTimeframe = '';
	let apiselectedTimeFrame = '';
	switch (timeFrame) {
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
	}

	Request(
		'GET',
		apiTimeframe
	).then((data) => {
		dispatcher.dispatch({
			type: 'RECEIVED_EARTHQUAKES',
			selected: apiselectedTimeFrame,
			data: data
		});
	}, (err) => {
		dispatcher.dispatch({
			type: 'ERROR_EARTHQUAKES',
			err: err
		});
	});
}
