/* ACTIONS  >>> */

export const loadingScreen = () => {
	return { type: "LOADING_SCREEN" };
}

export const getEarthQuakes = (value) => {
	let dataEndPoint;
	let selectedTimeFrame;
	switch (value) {
		case 'past-day': {
			dataEndPoint = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
			selectedTimeFrame = 'past-day';
			break;
		}
		case 'past-hour': {
			dataEndPoint = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';
			selectedTimeFrame = 'past-hour';
			break;
		}
		case 'past-7days': {
			dataEndPoint = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
			selectedTimeFrame = 'past-7days';
			break;
		}
		case 'past-30days': {
			dataEndPoint = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson';
			selectedTimeFrame = 'past-30days';
			break;
		}
		default: 	{
			dataEndPoint = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
			selectedTimeFrame = 'past-day';
		}
	}
	
	var sessionStorage;
	if(sessionStorage = getSessionStorage(selectedTimeFrame)){
		let data = JSON.parse(sessionStorage);
		return dispatchAction({
			selectedTimeFrame: selectedTimeFrame,
			data: data.features,
			ready: { display: 'none' }
		});
	} else {
		return (dispatch) => {
			dispatch(loadingScreen());
	
			return fetch(dataEndPoint)
				.then(data => data.json())
				.then(data => {
					dispatch(dispatchAction({
						selectedTimeFrame: selectedTimeFrame,
						data: data.features,
						ready: { display: 'none' }
					}));
					saveToSessionStorage(data,selectedTimeFrame);
				})
				.catch(err => dispatch(errorAction(err)));
		};
	}
}

export const filteredEarthQuakes = (filterTerm, data) => {
	return { type: "FILTER_EARTHQUAKES", value: { 
		filterTerm: filterTerm,
		data: data,
		ready: { display: 'none' }
	}};
}

export const dispatchAction = (data) => {
	return { type: "GET_EARTHQUAKES", value: data };
}

export const errorAction = (err) => {
	return { type: "ERROR", value: err };
}

/* <<< ACTIONS */


/* HELPER FUNC >>> */

const getSessionStorage = (selectedTimeFrame) => {
	let response;
	try {
		response = sessionStorage.getItem(selectedTimeFrame);
	} catch(err) {
		console.log('Something went wrong with the localstorage')
		response = false;
	}
	return response;
}

const saveToSessionStorage = (data,selectedTimeFrame) => {
	try {
		const serializedData = JSON.stringify(data);
		sessionStorage.setItem(selectedTimeFrame,serializedData);
	} catch(err) {
		console.log('Something went wrong with the localstorage');
	}
}

/* <<< HELPER FUNC */
