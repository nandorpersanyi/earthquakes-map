import dispatcher from '../dispatcher';

export function getData(){
	dispatcher.dispatch({
		type: "GET_DATA"
	});
}

export function addFilter(){
	dispatcher.dispatch({
		type: "FILTER_DATA"
	});
}