
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const initialState = {
    earthquakes: [],
    filteredEarthquakes: [],
    selectedTimeFrame: 'past-7days',
    filterTerm: '',
    center: { lat: 13.758966, lng: -25.398046 },
    zoom: 1,
    ready: { display: 'block' }
}

const reducer = (state = initialState, action) => {
    console.log('reducer action: ',action);
    const newState = {...state};
    if(action.type === 'GET_EARTHQUAKES'){
        console.log(action)
        //newState.earthquakes = 
    }
    return newState;
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;