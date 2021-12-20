import { render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import EventCard from './EventCard';
import mockData from '../../../repositories/mock/mockData';
import { Event } from '../../../models';
import { RecoilRoot } from 'recoil';
import { UserState, userState } from '../../../recoil/atoms/user';
import UsersRepository from '../../../repositories/users';
import { act } from 'react-dom/test-utils';
import EventsRepository from '../../../repositories/events';

afterAll(() => {
  jest.clearAllMocks();
});
let commentSpy: jest.SpyInstance;
beforeAll(() => {
  commentSpy = jest.spyOn(EventsRepository.prototype, 'getEventComments').mockResolvedValue({ data: [] });
});

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

    describe('All users', () => {
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
      it('should be able to see comments modal when comments icon is clicked', () => {
        const wrapper = mount(
          <RecoilRoot>
            <EventCard event={{ ...event }} />
          </RecoilRoot>
        );
        let commentsModal = wrapper.find('[data-test="comments-modal"]');
        expect(commentsModal.exists()).toBe(false);
        const commentsIcon = wrapper.find('[data-test="icon-comment"]');
        commentsIcon.simulate('click');
        commentsModal = wrapper.find('[data-test="comments-modal"]');
        expect(commentsModal.exists()).toBe(true);
      });
      it('should be able to see the name of the card', () => {
        const wrapper = mount(
          <RecoilRoot>
            <EventCard event={{ ...event }} />
          </RecoilRoot>
        );
        const contentSection = wrapper.find('[data-test="event-card-name"]');
        expect(contentSection.exists()).toBe(true);
        expect(contentSection.text()).toStrictEqual(event.name);
      });
      it('should have event description content', () => {
        const wrapper = mount(
          <RecoilRoot>
            <EventCard event={{ ...event }} />
          </RecoilRoot>
        );
        const contentSection = wrapper.find('[data-test="event-card-description"]');
        expect(contentSection.exists()).toBe(true);
        expect(contentSection.text()).toStrictEqual(event.description);
      });
    });
    describe('Authorized user', () => {
      it('should be able to attend event if not already attending', async () => {
        const repoSpy = jest
          .spyOn(UsersRepository.prototype, 'attendEvent')
          .mockResolvedValue({ data: { message: 'success' } });
        expect(repoSpy).toHaveBeenCalledTimes(0);
        expect(commentSpy).toHaveBeenCalledTimes(0);
        const wrapper = mount(
          <RecoilRoot initializeState={(snap) => snap.set(userState, { ...authRecoilState })}>
            <EventCard event={{ ...event }} />
          </RecoilRoot>
        );
        const attendBtn = wrapper.find('[data-test="icon-event-attend"]');
        expect(attendBtn.exists()).toBe(true);
        await act(async () => {
          attendBtn.simulate('click');
        });
        expect(repoSpy).toHaveBeenCalledTimes(1);
        expect(commentSpy).toHaveBeenCalledTimes(1);
      });
      it('should be able to un attend an event if attending', async () => {
        const repoSpy = jest
          .spyOn(UsersRepository.prototype, 'unAttendEvent')
          .mockResolvedValue({ data: { message: 'success' } });
        expect(repoSpy).toHaveBeenCalledTimes(0);
        const wrapper = mount(
          <RecoilRoot
            initializeState={(snap) => snap.set(userState, { ...authRecoilState, attendingEvents: [{ ...event }] })}
          >
            <EventCard event={{ ...event }} />
          </RecoilRoot>
        );
        const unAttendBtn = wrapper.find('[data-test="icon-event-un-attend"]');
        expect(unAttendBtn.exists()).toBe(true);
        await act(async () => {
          unAttendBtn.simulate('click');
        });
        expect(repoSpy).toHaveBeenCalledTimes(1);
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
