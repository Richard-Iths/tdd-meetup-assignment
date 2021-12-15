import { render } from '@testing-library/react';
import React from 'react';
import { mount, shallow } from 'enzyme';
import UserModal from './UserModal';

describe('UserModal.tsx', () => {
  describe('Smoke tests', () => {
    it('Should render UserModal component', () => {
      render(<UserModal />);
    });
    it('Should render UserLogin component', () => {
      const wrapper = mount(<UserModal />);
      const userLogin = wrapper.find(UserLogin);
      expect(userLogin.exists()).toBe(true);
    });
  });
});
