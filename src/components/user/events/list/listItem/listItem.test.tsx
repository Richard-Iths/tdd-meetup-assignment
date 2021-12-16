import { render } from '@testing-library/react';
import React from 'react';
import { mount, shallow } from 'enzyme';
import ListItem from './ListItem';
import EventCard from '../../../../events/cards/EventCard';
import { Event } from '../../../../../models';
import mockData from '../../../../../repositories/mock/mockData';

describe('ListItem.tsx', () => {
  const event: Event = { ...mockData.events[0] };
  describe('Smoke tests', () => {
    it('should render ListItem component', () => {
      render(<ListItem event={{ ...event }} />);
    });
    it('should render an event card component', () => {
      const wrapper = shallow(<ListItem event={{ ...event }} />);
      const eventCard = wrapper.find(EventCard);
      expect(eventCard.exists()).toBe(true);
    });
  });
  describe('Black box tests', () => {
    it('should receive an event as a prop', () => {
      const wrapper = mount(<ListItem event={{ ...event }} />);
      expect(wrapper.props()).toStrictEqual({ event });
    });
  });

  describe('White box tests', () => {});
});
