'use strict';

import React from 'react';

require('styles//Dashboard.css');

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-component">
        Dashboard content
      </div>
    );
  }
}

Dashboard.displayName = 'Dashboard';

// Uncomment properties you need
// DashboardComponent.propTypes = {};
// DashboardComponent.defaultProps = {};

export default Dashboard;
