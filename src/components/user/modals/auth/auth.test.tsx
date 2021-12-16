import { render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import AuthModal from './Auth
import UserLogin from '../../forms/login/UserLogin';
import { RecoilRoot } from 'recoil';

describe('AuthModal.tsx', () => {
  describe('Smoke tests', () => {
    it('should render AuthModal component', () => {
      render(
        <RecoilRoot>
          <AuthModal />
        </RecoilRoot>
      );
    });
    it('should render UserLogin component', () => {
      const wrapper = mount(
        <RecoilRoot>
          <AuthModal />
        </RecoilRoot>
      );
      const userLogin = wrapper.find(UserLogin);
      expect(userLogin.exists()).toBe(true);
    });
  });
  describe('Black box tests', () => {
    it('should display UserLogin Component when showing modal', () => {
      const wrapper = mount(
        <RecoilRoot>
          <AuthModal />
        </RecoilRoot>
      );
      const userRegister = wrapper.find('[data-test="user-register"]');
      const userLogin = wrapper.find('[data-test="user-login"]');
      expect(userLogin.exists()).toBe(true);
      expect(userRegister.exists()).toBe(false);
    });
    it('should be able to change to UserRegister Component', () => {
      const wrapper = mount(
        <RecoilRoot>
          <AuthModal />
        </RecoilRoot>
      );

      const registerLink = wrapper.find('[data-test="link-register"]');
      expect(registerLink.exists()).toBe(true);
      registerLink.simulate('click');
      const userRegister = wrapper.find('[data-test="user-register"]');
      expect(userRegister.exists()).toBe(true);
    });
    it('should be able to switchback to UserLogin Component', () => {
      const wrapper = mount(
        <RecoilRoot>
          <AuthModal />
        </RecoilRoot>
      );
      let registerLink = wrapper.find('[data-test="link-register"]');

      let loginLink = wrapper.find('[data-test="link-login"]');
      expect(loginLink.exists()).toBe(false);

      registerLink.simulate('click');

      let userLogin = wrapper.find('[data-test="user-login"]');
      expect(userLogin.exists()).toBe(false);

      registerLink = wrapper.find('[data-test="link-register"]');
      expect(registerLink.exists()).toBe(false);

      loginLink = wrapper.find('[data-test="link-login"]');
      expect(loginLink.exists()).toBe(true);
      loginLink.simulate('click');

      userLogin = wrapper.find('[data-test="user-login"]');
      expect(userLogin.exists()).toBe(true);
    });
  });
  describe('White box tests', () => {});
});
