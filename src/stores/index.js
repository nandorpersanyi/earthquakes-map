
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const initialState = {
    earthquakes: [],
    filteredEarthquakes: [],
    selectedTimeFrame: 'past-7days',
    filterTerm: '',
    ready: { display: 'block' }
}

const reducer = (state = initialState, action) => {
    const newState = {...state};
    if(action.type === 'GET_EARTHQUAKES'){
        newState.earthquakes = action.value.data.features;
        newState.selectedTimeFrame = action.value.selectedTimeFrame;
        newState.ready = action.value.ready;
    }
    if(action.type === 'FILTER_EARTHQUAKES'){
        newState.filterTerm = action.value.filterTerm;
        newState.filteredEarthquakes = action.value.data;
    }
    return newState;
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;