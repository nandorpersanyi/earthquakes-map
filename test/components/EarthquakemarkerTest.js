/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import Earthquakemarker from 'components//Earthquakemarker.js';

describe('Earthquakemarker', () => {
  let component;

  beforeEach(() => {
    component = createComponent(Earthquakemarker);
  });
  it('should render component', () => {
    should.exist(component);
  });
  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('earthquakemarker-component');
  });
});