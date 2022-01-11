import { render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';
import { RecoilRoot } from 'recoil';
import { UserState, userState } from '../../../recoil/atoms/user';

describe('Header.tsx', () => {
  const recoilUserState: UserState = { administratedEvents: [], attendingEvents: [], token: null };
  describe('Smoke tests', () => {
    it('Should render header component', () => {
      render(
        <RecoilRoot>
          <Header />
        </RecoilRoot>
      );
    });
  });

  describe('Black box tests', () => {
    describe('Unauthorized user', () => {
      it('should have a icon for authentication', () => {
        const wrapper = mount(
          <RecoilRoot>
            <Header />
          </RecoilRoot>
        );
        const authModalIcon = wrapper.find('[data-test="icon-auth-modal"]');
        expect(authModalIcon.exists()).toBe(true);
      });
      it('should render AuthModal when auth icon is clicked', () => {
        const wrapper = mount(
          <RecoilRoot>
            <Header />
          </RecoilRoot>
        );
        let authModal = wrapper.find('[data-test="auth-modal"]');
        expect(authModal.exists()).toBe(false);

        const authModalIcon = wrapper.find('[data-test="icon-auth-modal"]');
        authModalIcon.simulate('click');
        authModal = wrapper.find('[data-test="auth-modal"]');

        // wrapper.update();
        expect(authModal.exists()).toBe(true);
      });
    });

    describe('Authorized user', () => {
      it('should have a icon for user events', () => {
        const wrapper = mount(
          <RecoilRoot initializeState={(snap) => snap.set(userState, { ...recoilUserState, token: '222' })}>
            <Header />
          </RecoilRoot>
        );
        const userEventsIcon = wrapper.find('[data-test="icon-user-events-modal"]');
        expect(userEventsIcon.exists()).toBe(true);
      });
      it('should render UserEventsModal when icon is clicked', () => {
        const wrapper = mount(
          <RecoilRoot initializeState={(snap) => snap.set(userState, { ...recoilUserState, token: '222' })}>
            <Header />
          </RecoilRoot>
        );
        let eventsModal = wrapper.find('[data-test="user-events-modal"]');
        expect(eventsModal.exists()).toBe(false);

        const eventsModalIcon = wrapper.find('[data-test="icon-user-events-modal"]');
        eventsModalIcon.simulate('click');

        eventsModal = wrapper.find('[data-test="user-events-modal"]');
        expect(eventsModal.exists()).toBe(true);
      });
    });
    it('should have text element for logo', () => {
      const wrapper = mount(
        <RecoilRoot>
          <Header />
        </RecoilRoot>
      );
      const logoEl = wrapper.find('[data-test="header-logo"]');
      expect(logoEl.exists()).toBe(true);
    });
  });
  describe('White box tests', () => {
    it('should have a search-bar', () => {
      const wrapper = mount(
        <RecoilRoot>
          <Header />
        </RecoilRoot>
      );
      const searchBar = wrapper.find('[data-test="search-bar"]');
      expect(searchBar.exists()).toBe(true);
    });
  });
});
