import { act, render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import UserEvents, { Props } from './UserEvents';
import UsersRepository from '../../../../repositories/users';
import { Event } from '../../../../models';
import { RecoilRoot } from 'recoil';
import EventList from './list/EventList';
import mockData from '../../../../repositories/mock/mockData';
import { userState, UserState } from '../../../../recoil/atoms/user';
import AddEvent from '../../../events/modals/Event/AddEvent';

let repoSpy: jest.SpyInstance;

describe('UserEvents.tsx', () => {
  const event: Event = { ...mockData.events[0] };
  const props: Props = {
    visible: true,
    closeModal: () => {},
    modalRef: 'my-modal',
  };
  const userRecoilState: UserState = { administratedEvents: [], attendingEvents: [], token: '222' };

  beforeAll(() => {
    repoSpy = jest
      .spyOn(UsersRepository.prototype, 'getUserEvents')
      .mockResolvedValue({ data: { administrated_events: [{ ...event }], attending_events: [{ ...event }] } });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('Smoke tests', () => {
    it('Should render UserEvents component', () => {
      render(
        <RecoilRoot>
          <UserEvents {...props} />
        </RecoilRoot>
      );
    });
    it('Should render EventList component', () => {
      const wrapper = mount(
        <RecoilRoot initializeState={(snap) => snap.set(userState, { ...userRecoilState })}>
          <UserEvents {...props} />
        </RecoilRoot>
      );

      const eventList = wrapper.find(EventList);
      expect(eventList.exists()).toBe(true);
    });
  });

  describe('Black box tests', () => {
    it('should display events for the current user', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserEvents {...props} />
        </RecoilRoot>
      );
      const attendingSection = wrapper.find('[data-test="user-events"]');
      expect(attendingSection.exists()).toBe(true);
    });

    it('should be able to add new event', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserEvents {...props} />
        </RecoilRoot>
      );
      let eventModal = wrapper.find('[data-test="event-form"]');
      expect(eventModal.exists()).toBe(false);
      const addEventBtn = wrapper.find('[data-test="icon-add-event"]');
      expect(addEventBtn.exists()).toBe(true);
      addEventBtn.simulate('click');
      eventModal = wrapper.find('[data-test="event-form"]');
      expect(eventModal.exists()).toBe(true);
    });
  });

  describe('White box tests', () => {
    it('should get user events on component load', async () => {
      expect(repoSpy).toHaveBeenCalledTimes(0);
      await act(async () => {
        mount(
          <RecoilRoot initializeState={(snap) => snap.set(userState, { ...userRecoilState })}>
            <UserEvents {...props} />
          </RecoilRoot>
        );
      });
      expect(repoSpy).toHaveBeenCalledTimes(1);
    });

    it('should receive props to close modal,visibility and modal ref', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserEvents {...props} />
        </RecoilRoot>
      );
      const auth = wrapper.find(UserEvents);
      expect(auth.props()).toStrictEqual(props);
    });
  });
});
