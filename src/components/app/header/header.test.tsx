import { render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';
import UserModal from '../../user/modals/UserModal';
import { RecoilRoot } from 'recoil';
import UserEvents from '../../user/events/UserEvents';
import { UserState, userState } from '../../../recoil/atoms/user';
import { RecoilObserver } from '../../../recoil/observer';

describe('Header.tsx', () => {
  const stateChange = jest.fn();
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
      it('should render UserSettings when user is authorized', () => {
        const wrapper = mount(
          <RecoilRoot>
            <RecoilObserver<UserState> node={userState} onChange={stateChange} />
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
