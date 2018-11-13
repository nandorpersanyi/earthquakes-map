import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Home.css';

const Home = () => {
        return (
            <div className='home-component'>
                <h1 id='homepage-title'>Earthquakes Map</h1>
                <Link to="/dashboard"><button>Go to the dashboard</button></Link>
                <p>This dashboard visualizes all registered earthquakes around the world in the past 7 days/ past day/ past hour.</p>
                <p>All the data on this site is made available under the Open Government Licence.</p>
                <p>Data Source:<a href='http://earthquake.usgs.gov/'>http://earthquake.usgs.gov/</a></p>
                <p>This code is available on GitHub:</p>
                <p><a href='https://github.com/nandorpersanyi/earthquakes-map'><img src='images/github-logo-icon-2.png' id='github-logo' /></a></p>
                <p>Links to some frameworks, libraries and modules I have used for this project:</p>
                <p><a href='https://facebook.github.io/react/'>https://facebook.github.io/react/</a></p>
                <p><a href='https://facebook.github.io/flux/'>https://facebook.github.io/flux/</a></p>
            </div>
        );
}

export default Home;