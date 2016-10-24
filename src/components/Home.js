'use strict';

import React from 'react';

require('styles//Home.css');

class Home extends React.Component {
  render() {
    return (
      <div className="home-component">
        Homepage content
      </div>
    );
  }
}

Home.displayName = 'Home';

// Uncomment properties you need
// HomeComponent.propTypes = {};
// HomeComponent.defaultProps = {};

export default Home;
