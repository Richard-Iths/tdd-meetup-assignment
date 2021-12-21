import { render } from '@testing-library/react';
import React from 'react';
import { mount, shallow } from 'enzyme';
import AddEvent, { Props } from './AddEvent';
import BaseModal from '../../../modals/BaseModal';
import mockData from '../../../../repositories/mock/mockData';

describe('AddEvent.tsx', () => {
  const props: Props = {
    closeModal: () => {},
    modalRef: 'my-modal',
    visible: true,
    event: { ...mockData.events[0] },
  };
  describe('Smoke tests', () => {
    it('Should render AddEvent component', () => {
      render(<AddEvent {...props} />);
    });
    it('Should render BaseModal component', () => {
      const wrapper = shallow(<AddEvent {...props} />);
      const baseModal = wrapper.find(BaseModal);
      expect(baseModal.exists()).toBe(true);
    });
  });
  describe('Black box tests', () => {});

  describe('White box tests', () => {});
});
