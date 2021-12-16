import { render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import Auth, { Props } from './Auth';
import UserLogin from '../../forms/login/UserLogin';
import { RecoilRoot } from 'recoil';
import BaseModal from '../../../modals/BaseModal';

describe('Auth.tsx', () => {
  const props: Props = {
    visible: true,
    closeModal: () => {},
    modalRef: 'my-modal',
  };
  describe('Smoke tests', () => {
    it('should render Auth component', () => {
      render(
        <RecoilRoot>
          <Auth {...props} />
        </RecoilRoot>
      );
    });
    it('should render auth icon component', () => {
      const wrapper = mount(
        <RecoilRoot>
          <Auth {...props} />
        </RecoilRoot>
      );
      const userLogin = wrapper.find(UserLogin);
      expect(userLogin.exists()).toBe(true);
    });
    it('should render BaseModal component', () => {
      const wrapper = mount(
        <RecoilRoot>
          <Auth {...props} />
        </RecoilRoot>
      );
      const baseModal = wrapper.find(BaseModal);
      expect(baseModal.exists()).toBe(true);
    });
  });
  describe('Black box tests', () => {
    it('should display UserLogin Component when showing modal', () => {
      const wrapper = mount(
        <RecoilRoot>
          <Auth {...props} />
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
          <Auth {...props} />
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
          <Auth {...props} />
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
  describe('White box tests', () => {
    it('should receive props to close modal,visibility and modal ref', () => {
      const wrapper = mount(
        <RecoilRoot>
          <Auth {...props} />
        </RecoilRoot>
      );
      const auth = wrapper.find(Auth);
      expect(auth.props()).toStrictEqual(props);
    });
  });
});
