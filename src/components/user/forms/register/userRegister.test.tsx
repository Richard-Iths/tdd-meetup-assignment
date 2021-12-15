import { act, render } from '@testing-library/react';
import React from 'react';
import { mount, shallow } from 'enzyme';
import UserRegister from './UserRegister';
import UsersRepository from '../../../../repositories/users';
import { RecoilRoot } from 'recoil';

afterAll(() => {
  jest.clearAllMocks();
});

describe('UserRegister.tsx', () => {
  describe('Smoke tests', () => {
    it('Should render Template component', () => {
      render(
        <RecoilRoot>
          <UserRegister />
        </RecoilRoot>
      );
    });
  });
  describe('Black box tests', () => {
    it('Should have input component for email', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserRegister />
        </RecoilRoot>
      );
      const emailInput = wrapper.find('[data-test="input-email"]');
      expect(emailInput.exists()).toBe(true);
    });
    it('Should have input component for password', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserRegister />
        </RecoilRoot>
      );
      const passwordInput = wrapper.find('[data-test="input-password"]');
      expect(passwordInput.exists()).toBe(true);
    });
    it('Should have a button to complete registration', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserRegister />
        </RecoilRoot>
      );
      const btn = wrapper.find('[data-test="btn-register"]');
      expect(btn.exists()).toBe(true);
    });

    it('Should handle register functionality when button is clicked', async () => {
      const repoSpy = jest
        .spyOn(UsersRepository.prototype, 'registerUser')
        .mockResolvedValue(Promise.resolve({ data: { token: '123', message: 'success' } }));
      const wrapper = mount(
        <RecoilRoot>
          <UserRegister />
        </RecoilRoot>
      );
      const inputs = wrapper.find('input');

      inputs.forEach((input) => {
        input.simulate('change', { target: { value: 'user1', name: input.prop('name') } });
      });

      expect(repoSpy).toBeCalledTimes(0);
      await act(async () => {
        const btn = wrapper.find('[data-test="btn-register"]');
        btn.simulate('click');
      });
      expect(repoSpy).toBeCalledTimes(1);
    });
    it('should disable button if input fields are empty', () => {
      const wrapper = mount(
        <RecoilRoot>
          <UserRegister />
        </RecoilRoot>
      );

      let btn = wrapper.find('[data-test="btn-register"]');
      expect(btn.prop('disabled')).toBe(true);

      const emailInput = wrapper.find('[data-test="input-email"]');
      const passwordInput = wrapper.find('[data-test="input-password"]');

      emailInput.simulate('change', { target: { value: 'user1', name: emailInput.prop('name') } });
      expect(btn.prop('disabled')).toBe(true);
      passwordInput.simulate('change', { target: { value: 'user1', name: passwordInput.prop('name') } });

      btn = wrapper.find('[data-test="btn-register"]');
      expect(btn.prop('disabled')).toBe(false);
    });
  });

  describe('White box tests', () => {});
});
