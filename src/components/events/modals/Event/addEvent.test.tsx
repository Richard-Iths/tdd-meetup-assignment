import { render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import AddEvent, { Props } from './AddEvent';
import BaseModal from '../../../modals/BaseModal';
import mockData from '../../../../repositories/mock/mockData';
import EventForm from '../../forms/event/EventForm';
import { RecoilRoot } from 'recoil';

describe('AddEvent.tsx', () => {
  const props: Props = {
    closeModal: () => {},
    modalRef: 'my-modal',
    visible: true,
    event: { ...mockData.events[0] },
  };
  describe('Smoke tests', () => {
    it('Should render AddEvent component', () => {
      render(
        <RecoilRoot>
          <AddEvent {...props} />
        </RecoilRoot>
      );
    });
    it('Should render BaseModal component', () => {
      const wrapper = mount(
        <RecoilRoot>
          <AddEvent {...props} />
        </RecoilRoot>
      );
      const baseModal = wrapper.find(BaseModal);
      expect(baseModal.exists()).toBe(true);
    });
    it('should render EventForm component', () => {
      const wrapper = mount(
        <RecoilRoot>
          <AddEvent {...props} />
        </RecoilRoot>
      );
      const eventForm = wrapper.find(EventForm);
      expect(eventForm.exists()).toBe(true);
    });
  });
  describe('Black box tests', () => {});

  describe('White box tests', () => {});
});
