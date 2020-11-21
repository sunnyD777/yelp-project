import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProfileItem from './ProfileItem';

configure({ adapter: new Adapter() });

describe('Profile', () => {
  it('Profile items render properly', () => {
    const wrapper = shallow(<ProfileItem />);
    expect(wrapper.find('li'));
  });
});
