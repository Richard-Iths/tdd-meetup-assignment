import { render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import EventList, { Props } from './EventList';
import mockData from '../../../../../repositories/mock/mockData';
import { RecoilRoot } from 'recoil';

describe('EventList.tsx', () => {
  const props: Props = { events: [...mockData.events] };
  describe('Smoke tests', () => {
    it('should render Template component', () => {
      render(
        <RecoilRoot>
          <EventList {...props} />
        </RecoilRoot>
      );
    });
    it('should render multiple event cards components for events prop', () => {
      const wrapper = mount(
        <RecoilRoot>
          <EventList {...props} />
        </RecoilRoot>
      );
      const cards = wrapper.find('[data-test="card-event"]');
      expect(cards.exists()).toBe(true);
      expect(cards.length).toBe(3);
    });
  });
  describe('Black box tests', () => {
    it('should take events as a prop', () => {
      const wrapper = mount(
        <RecoilRoot>
          <EventList {...props} />
        </RecoilRoot>
      );
      const eventList = wrapper.find(EventList);
      expect(eventList.props()).toStrictEqual(props);
    });
  });

  describe('White box tests', () => {});
});
