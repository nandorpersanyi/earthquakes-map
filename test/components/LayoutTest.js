/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import Layout from 'components/Layout';

describe('Layout', () => {
  let component;

  beforeEach(() => {
    component = createComponent(Layout);
  });
  it('should render component', () => {
  	should.exist(component);
  });
  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('index');
  });
});
