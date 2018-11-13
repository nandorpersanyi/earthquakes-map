
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

	return function(dispatch, getState) {
		return fetch(apiTimeframe)
			.then(data => data.json())
			.then(data => {
				dispatch(dispatchAction({
					selectedTimeFrame:apiselectedTimeFrame,
					data:data,
					ready:{ display: 'none' }}));
			})
			.catch(err => dispatch(dispatchAction()));
		};
}

export const dispatchAction = (data) => {
	return { type: "GET_EARTHQUAKES", value: data };
}

export const filteredEarthQuakes = (filterTerm, data) => {
	return { type: "FILTER_EARTHQUAKES", value: { filterTerm: filterTerm, data: data} };
}
