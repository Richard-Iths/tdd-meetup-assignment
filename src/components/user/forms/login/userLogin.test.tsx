import { render } from '@testing-library/react';
import React from 'react';
import { mount, shallow } from 'enzyme';
import UserLogin from './UserLogin';
import UsersRepository from '../../../../repositories/users';
import { RecoilRoot } from 'recoil';
import { act } from 'react-dom/test-utils';

describe('UserLogin.tsx', () => {
  describe('Smoke tests', () => {
    it('Should render UserLogin component', () => {
      render(
        <RecoilRoot>
          <UserLogin />
        </RecoilRoot>
      );
    });
  });
  describe('Black box tests', () => {
    it('Should have input element for username', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserLogin />
        </RecoilRoot>
      );
      const input = wrapper.find('[data-test="input-username"]');
      expect(input.exists()).toBe(true);
    });
    it('Should have input element for password', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserLogin />
        </RecoilRoot>
      );
      const input = wrapper.find('[data-test="input-password"]');
      expect(input.exists()).toBe(true);
    });
    it('should render a login button element', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserLogin />
        </RecoilRoot>
      );
      const button = wrapper.find('[data-test="login-btn"]');
      expect(button.exists()).toBe(true);
    });
  });

  describe('White box tests', () => {
    it('should login the user when login button is clicked', async () => {
      const loginSpy = jest
        .spyOn(UsersRepository.prototype, 'loginUser')
        .mockResolvedValue(Promise.resolve({ data: { message: 'success', token: '123' } }));

      const wrapper = mount(
        <RecoilRoot>
          <UserLogin />
        </RecoilRoot>
      );
      const inputs = wrapper.find('input');
      inputs.forEach((input) => {
        input.simulate('change', { target: { value: 'username1', name: input.prop('name') } });
      });
      expect(loginSpy).toBeCalledTimes(0);
      await act(async () => {
        const loginButton = wrapper.find('[data-test="login-btn"]');
        loginButton.simulate('click');
      });
      expect(loginSpy).toBeCalledTimes(1);
    });
    it('should disable login button if password or username field is empty', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserLogin />
        </RecoilRoot>
      );
      const usernameInput = wrapper.find('[data-test="input-username"]');
      const passwordInput = wrapper.find('[data-test="input-password"]');
      let btn = wrapper.find('[data-test="login-btn"]');
      expect(btn.prop('disabled')).toBe(true);
      usernameInput.simulate('change', { target: { value: 'username', name: 'username' } });
      expect(btn.prop('disabled')).toBe(true);
      passwordInput.simulate('change', { target: { value: 'password', name: 'password' } });
      btn = wrapper.find('[data-test="login-btn"]');
      expect(btn.prop('disabled')).toBe(false);
    });
  });
});
