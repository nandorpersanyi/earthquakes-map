/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import Request from 'superagent';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import { getEarthquakes } from 'actions//EarthquakeActions.js';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
fetchMock.mock('^http://my.example.api', {data: 'foo'})

describe('asyncAction', function(){
    it('should call the API when argument is "past-hour"', function(){
        const store = mockStore()
        store.dispatch(asyncAction('past-hour'))
        const expected = [{
        	type: 'RECEIVED_EARTHQUAKES', 
        	title: 'All earthquakes in the past hour', 
        	data: {data: 'foo'}}]
        expect(store.getActions()).to.deep.equal(expected)
    })
})