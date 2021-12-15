import { act, render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import UserEvents from './UserEvents';
import UsersRepository from '../../../repositories/users';
import { Event } from '../../../models';
import { RecoilRoot } from 'recoil';
import EventList from './list/EventList';

afterAll(() => {
  jest.clearAllMocks();
});

describe('UserEvents.tsx', () => {
  const event: Event = {
    created_at: new Date(),
    daley_visitors: 100,
    date: new Date(),
    description: 'Camping the the forrest',
    due_date: new Date(),
    event_admin: 'admin',
    image: 'img',
    max_attendees: 50,
    min_attendees: 45,
    name: 'Camping trip',
    place: 'in the city',
    time: '15:50',
    updated_at: new Date(),
  };
  describe('Smoke tests', () => {
    it('Should render UserEvents component', () => {
      render(
        <RecoilRoot>
          <UserEvents />
        </RecoilRoot>
      );
    });
    it('Should render EventList component', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserEvents />
        </RecoilRoot>
      );

      const eventList = wrapper.find(EventList);
      expect(eventList.exists()).toBe(true);
    });
  });

  describe('Black box tests', () => {});

  describe('White box tests', () => {
    it('should get user events on component load', async () => {
      const repoSpy = jest
        .spyOn(UsersRepository.prototype, 'getUserEvents')
        .mockResolvedValue({ data: [{ ...event }] });

      expect(repoSpy).toHaveBeenCalledTimes(0);
      await act(async () => {
        mount(
          <RecoilRoot>
            <UserEvents />
          </RecoilRoot>
        );
      });

      expect(repoSpy).toHaveBeenCalledTimes(1);
    });
  });
});
