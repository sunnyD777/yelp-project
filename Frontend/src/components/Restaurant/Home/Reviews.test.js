import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Reviews from './Reviews';

Enzyme.configure({ adapter: new Adapter() });

describe('Restaurant Reviews', () => {
  it('Reviews are properly rendered', () => {
    const wrapper = shallow(<Reviews />);
    expect(wrapper.state().reviews);
  });
});
