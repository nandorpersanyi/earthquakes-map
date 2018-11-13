import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    earthquakes: [],
    filteredEarthquakes: [],
    selectedTimeFrame: 'past-day',
    filterTerm: '',
    noOfQuakes: 0,
    ready: { display: 'block' }
}

const reducer = (state = initialState, action) => {
    const newState = {...state};
    if(action.type === 'GET_EARTHQUAKES'){
        newState.earthquakes = action.value.data;
        newState.selectedTimeFrame = action.value.selectedTimeFrame;
        newState.noOfQuakes = action.value.data.length;
        newState.ready = { display: 'none' };
    }
    if(action.type === 'FILTER_EARTHQUAKES'){
        newState.filterTerm = action.value.filterTerm;
        newState.filteredEarthquakes = action.value.data;
        newState.noOfQuakes = action.value.data.length;
        newState.ready = { display: 'none' };
    }
    if(action.type === 'LOADING_SCREEN'){
        newState.ready = { display: 'block' };
    }
    return newState;
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;