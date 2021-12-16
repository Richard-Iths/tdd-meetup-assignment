import { act, render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import UserEvents from './UserEvents';
import UsersRepository from '../../../repositories/users';
import { Event } from '../../../models';
import { RecoilRoot } from 'recoil';
import EventList from './list/EventList';
import mockData from '../../../repositories/mock/mockData';

afterAll(() => {
  jest.clearAllMocks();
});

describe('UserEvents.tsx', () => {
  const event: Event = { ...mockData.events[0] };

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
