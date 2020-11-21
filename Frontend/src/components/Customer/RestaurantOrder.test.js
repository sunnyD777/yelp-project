import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RestaurantOrder from './RestuarantOrder';

configure({ adapter: new Adapter() });

describe('Customer Order', () => {
  it('Orders render properly for customer', () => {
    const wrapper = shallow(<RestaurantOrder menu={[]} />);
    expect(wrapper.find('table'));
  });
});
