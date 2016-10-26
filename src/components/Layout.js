require('normalize.css/normalize.css');
require('styles/Layout.css');

import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router';

class Layout extends React.Component {
  render() {
    return (
		<div className="index">
			<nav>
				<ul>
					<li><Link to="/">Home</Link></li>
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
