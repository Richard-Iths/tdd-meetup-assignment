import { render } from '@testing-library/react';
import LandingPage from './Landing';
import React from 'react';
import EventsRepository from '../../repositories/events';
import { mount } from 'enzyme';
import { RecoilRoot } from 'recoil';
import mockData from '../../repositories/mock/mockData';
import { Event } from '../../models';
import { act } from 'react-dom/test-utils';
import { eventState } from '../../recoil/atoms/events';
import EventCard from '../../components/events/cards/EventCard';

const events: Event[] = [...mockData.events];

describe('Landing.tsx', () => {
  describe('Smoke tests', () => {
    it('should render landing page', () => {
      render(
        <RecoilRoot>
          <LandingPage />
        </RecoilRoot>
      );
    });
  });

  describe('Black box tests', () => {
    it('should load events on page load', async () => {
      const repoSpy = jest.spyOn(EventsRepository.prototype, 'getEvents').mockResolvedValue({ data: [...events] });
      expect(repoSpy).toHaveBeenCalledTimes(0);
      await act(async () => {
        mount(
          <RecoilRoot>
            <LandingPage />
          </RecoilRoot>
        );
      });
      expect(repoSpy).toHaveBeenCalledTimes(1);
    });
    it('should render event cards for all events', () => {
      const wrapper = mount(
        <RecoilRoot initializeState={(snap) => snap.set(eventState, { events: [...events] })}>
          <LandingPage />
        </RecoilRoot>
      );
      const eventCards = wrapper.find(EventCard);
      expect(eventCards.exists()).toBe(true);
      expect(eventCards.children().length).toBe(3);
    });
  });
});
