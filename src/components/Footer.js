'use strict';

import React from 'react';

require('styles//Footer.css');

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-component">
        <footer>Footer</footer>
      </div>
    );
  }
}

Footer.displayName = 'Footer';

// Uncomment properties you need
// FooterComponent.propTypes = {};
// FooterComponent.defaultProps = {};

export default Footer;