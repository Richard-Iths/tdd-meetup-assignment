import { render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';
import UserModal from '../../user/modals/auth/Auth';
import { RecoilRoot } from 'recoil';
import UserEvents from '../../user/modals/events/UserEvents';
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

    describe('Unauthorized user', () => {
      it('should render UserModal component', () => {
        const wrapper = mount(
          <RecoilRoot>
            <Header />
          </RecoilRoot>
        );
        const userModal = wrapper.find(UserModal);
        expect(userModal.exists()).toBe(true);
      });
    });

    describe('Authorized user', () => {
      it('should render UserEvents when user is authorized', () => {
        const wrapper = mount(
          <RecoilRoot initializeState={(snap) => snap.set(userState, { ...recoilUserState, token: '222' })}>
            <Header />
          </RecoilRoot>
        );
        const userSettings = wrapper.find(UserEvents);
        expect(userSettings.exists()).toBe(true);
      });
    });
  });

  describe('Black box tests', () => {
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
});
