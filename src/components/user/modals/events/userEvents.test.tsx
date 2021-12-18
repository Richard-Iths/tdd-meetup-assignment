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

afterAll(() => {
  jest.clearAllMocks();
});

describe('UserEvents.tsx', () => {
  const event: Event = { ...mockData.events[0] };
  const props: Props = {
    visible: true,
    closeModal: () => {},
    modalRef: 'my-modal',
  };
  const userRecoilState: UserState = { administratedEvents: [], attendingEvents: [], token: '222' };
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
        <RecoilRoot>
          <UserEvents {...props} />
        </RecoilRoot>
      );

      const eventList = wrapper.find(EventList);
      expect(eventList.exists()).toBe(true);
    });
  });

  describe('Black box tests', () => {
    it('should have an attending events section', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserEvents {...props} />
        </RecoilRoot>
      );
      const attendingSection = wrapper.find('[data-test="event-list-attending"');
      expect(attendingSection.exists()).toBe(true);
    });
  });

  describe('White box tests', () => {
    it('should get user events on component load', async () => {
      const repoSpy = jest
        .spyOn(UsersRepository.prototype, 'getUserEvents')
        .mockResolvedValue({ data: [{ ...event }] });

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
