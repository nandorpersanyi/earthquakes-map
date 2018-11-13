import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.css';

const Home = () => {
        return (
            <div className='Home'>
                <h1 id='homepage-title'>Earthquakes Map</h1>
                <Link to="/dashboard"><button>Go to the dashboard</button></Link>
                <p>This dashboard visualizes all registered earthquakes around the world.</p>
                <p>All the data on this site is made available under the Open Government Licence.</p>
                <p>Data Source: <a href='http://earthquake.usgs.gov/'>http://earthquake.usgs.gov/</a></p>
                <p>This code is available on GitHub:</p>
                <p><a href='https://github.com/nandorpersanyi/earthquakes-map'><img src='images/github-logo-icon-2.png' id='github-logo' alt='Github Logo' /></a></p>
                <p>Links to some libraries and modules I have used for this project:</p>
                <p><a href='https://reactjs.org/' target='_blank'>https://reactjs.org/</a></p>
                <p><a href='https://redux.js.org/' target='_blank'>https://redux.js.org/</a></p>
                <p><a href='https://github.com/reduxjs/redux-thunk' target='_blank'>https://github.com/reduxjs/redux-thunk</a></p>
            </div>
        );
}

export default Home;
