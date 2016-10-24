require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router';

class Layout extends React.Component {
  render() {
    return (
		<div className="index">
			
			<Header></Header>
			<nav className="layout-component">
				<ul>
					<li><Link to="/home">Home</Link></li>
					<li><Link to="/dashboard">Dashboard</Link></li>
				</ul>
			</nav>
			<main>{this.props.children}</main>
			<Footer></Footer>
			
		</div>
    );
  }
}

Layout.defaultProps = {
};

export default Layout;