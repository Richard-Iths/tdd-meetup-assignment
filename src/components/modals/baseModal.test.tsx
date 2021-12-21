import { render } from '@testing-library/react';
import React from 'react';
import { mount, shallow } from 'enzyme';
import BaseModal, { Props } from './BaseModal';

describe('BaseModal.tsx', () => {
  const props: Props = {
    visible: true,
    closeModal: () => {},
    modalRef: 'myModal',
    title: 'hello',
  };
  describe('Smoke tests', () => {
    it('Should render BaseModal component', () => {
      render(<BaseModal {...props} />);
    });
  });
  describe('Black box tests', () => {
    it('should receive a visible prop', () => {
      const wrapper = mount(<BaseModal {...props} />);
      expect(wrapper.prop('visible')).toBe(true);
    });
    it('should receive a close modal function as a prop', () => {
      const wrapper = mount(<BaseModal {...props} />);
      expect(wrapper.prop('closeModal')).toBeTruthy();
    });

    it('should be able to close modal when clicking on outer modal', () => {
      const wrapper = mount(<BaseModal {...props} />);
      let outerModal = wrapper.find('[data-test="outer-modal"]');
      expect(outerModal.exists()).toBe(true);
      outerModal.simulate('click');
      wrapper.setProps({ visible: false });
      outerModal = wrapper.find('[data-test="outer-modal"]');
      expect(outerModal.exists()).toBe(false);
    });
    it('should have a visual close button', () => {
      const wrapper = mount(<BaseModal {...props} />);
      let closeIcon = wrapper.find('[data-test="icon-close"]');
      expect(closeIcon.exists()).toBe(true);
      closeIcon.simulate('click');
      wrapper.setProps({ visible: false });
      const outerModal = wrapper.find('[data-test="outer-modal"]');
      expect(outerModal.exists()).toBe(false);
    });
    it('should have a ref prop to be provided in the close modal function', () => {
      const wrapper = mount(<BaseModal {...props} />);
      expect(wrapper.prop('modalRef')).toEqual('myModal');
    });
  });

  describe('White box tests', () => {});
});
