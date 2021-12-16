import { render } from '@testing-library/react';
import React from 'react';
import { mount, shallow } from 'enzyme';
import EventCard from './EventCard';
import mockData from '../../../repositories/mock/mockData';
import { Event } from '../../../models';
import { RecoilRoot } from 'recoil';
import { UserState, userState } from '../../../recoil/atoms/user';
import UsersRepository from '../../../repositories/users';
import { act } from 'react-dom/test-utils';

describe('EventCard.tsx', () => {
  const event: Event = { ...mockData.events[0] };
  const authRecoilState: UserState = {
    token: '123',
    attendingEvents: [],
    administratedEvents: [{ ...mockData.events[0] }],
  };
  describe('Smoke tests', () => {
    it('Should render EventCard component', () => {
      render(
        <RecoilRoot>
          <EventCard event={{ ...event }} />
        </RecoilRoot>
      );
    });
  });
  describe('Black box tests', () => {
    it('should receive an event as a prop', () => {
      const wrapper = mount(
        <RecoilRoot>
          ...mockData.events
          <EventCard event={{ ...event }} />
        </RecoilRoot>
      );
      const eventCard = wrapper.find(EventCard);
      expect(eventCard.props().event).toStrictEqual(event);
    });

    describe('Unauthorized user', () => {
      it('should be able to see comment icon', () => {
        const wrapper = mount(
          <RecoilRoot>
            <EventCard event={{ ...event }} />
          </RecoilRoot>
        );
        const commentIcon = wrapper.find('[data-test="icon-comment"]');
        expect(commentIcon.exists()).toBe(true);
      });
      it('should not be able to edit event', () => {
        const wrapper = mount(
          <RecoilRoot>
            <EventCard event={{ ...event }} />
          </RecoilRoot>
        );
        const editIcon = wrapper.find('[data-test="icon-edit"]');
        expect(editIcon.exists()).toBe(false);
      });
    });
    describe('Event Admin', () => {
      it('Even admin should be able to see edit event icon', () => {
        const wrapper = mount(
          <RecoilRoot initializeState={(snap) => snap.set(userState, { ...authRecoilState })}>
            <EventCard event={{ ...event }} />
          </RecoilRoot>
        );
        const editIcon = wrapper.find('[data-test="icon-edit"]');
        expect(editIcon.exists()).toBe(true);
      });
      it('Even admin should be able to see remove event icon', () => {
        const wrapper = mount(
          <RecoilRoot initializeState={(snap) => snap.set(userState, { ...authRecoilState })}>
            <EventCard event={{ ...event }} />
          </RecoilRoot>
        );
        const editIcon = wrapper.find('[data-test="icon-remove"]');

        expect(editIcon.exists()).toBe(true);
      });

      it('Even admin should be able to remove event', async () => {
        const data = { ...authRecoilState };
        const userRepoSpy = jest
          .spyOn(UsersRepository.prototype, 'deleteUserEvent')
          .mockResolvedValue({ data: { message: 'success' } });

        const wrapper = mount(
          <RecoilRoot initializeState={(snap) => snap.set(userState, data)}>
            <EventCard event={{ ...event }} />
          </RecoilRoot>
        );
        expect(userRepoSpy).toHaveBeenCalledTimes(0);
        const editIcon = wrapper.find('[data-test="icon-remove"]');

        await act(async () => {
          editIcon.simulate('click');
        });
        expect(userRepoSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('White box tests', () => {});
});
