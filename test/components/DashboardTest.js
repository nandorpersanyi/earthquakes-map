/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import Dashboard from 'components//Dashboard.js';

describe('DashboardComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(Dashboard);
  });
  it('should render component', () => {
    should.exist(component);
    console.log(component.props.children)
  });
  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('dashboard-component');
  });
});
