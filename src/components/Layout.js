import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';

import '../styles/Layout.css';

const Layout = (props) => {
    return (
        <div className="Layout">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard">Earthquakes Map</Link></li>
                </ul>
            </nav>
            <main>{props.children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
