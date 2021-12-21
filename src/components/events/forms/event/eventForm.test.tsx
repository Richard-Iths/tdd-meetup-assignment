import { act, render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import EventForm from './EventForm';
import EventsRepository from '../../../../repositories/events';
import mockData from '../../../../repositories/mock/mockData';
import { RecoilRoot } from 'recoil';
import { userState, UserState } from '../../../../recoil/atoms/user';
import { EventDto } from '../../../../repositories/types';
import { Event } from '../../../../models';

describe('EventForm.tsx', () => {
  const mockEvent: Event = { ...mockData.events[0] };
  const recoilUserState: UserState = { administratedEvents: [], attendingEvents: [], token: 'abc' };

  describe('Smoke tests', () => {
    it('Should render EventForm component', () => {
      render(
        <RecoilRoot>
          <EventForm />
        </RecoilRoot>
      );
    });
  });
  describe('Black box tests', () => {
    it('should have input field and a label for event name', () => {
      const wrapper = mount(
        <RecoilRoot>
          <EventForm />
        </RecoilRoot>
      );
      const eventNameInput = wrapper.find('[data-test="input-name"]');
      expect(eventNameInput.exists()).toBe(true);
      const eventNameLabel = wrapper.find('[data-test="label-name"]');
      expect(eventNameLabel.exists()).toBe(true);
    });
    it('should have input field and a label for event description', () => {
      const wrapper = mount(
        <RecoilRoot>
          <EventForm />
        </RecoilRoot>
      );
      const eventDescriptionInput = wrapper.find('[data-test="input-description"]');
      expect(eventDescriptionInput.exists()).toBe(true);
      const eventDescriptionLabel = wrapper.find('[data-test="label-description"]');
      expect(eventDescriptionLabel.exists()).toBe(true);
    });
    it('should have input field and a label for event date', () => {
      const wrapper = mount(
        <RecoilRoot>
          <EventForm />
        </RecoilRoot>
      );
      const eventDateInput = wrapper.find('[data-test="input-date"]');
      expect(eventDateInput.exists()).toBe(true);
      const eventDateLabel = wrapper.find('[data-test="label-date"]');
      expect(eventDateLabel.exists()).toBe(true);
    });
    it('should have input field and a label for event sign up due date', () => {
      const wrapper = mount(
        <RecoilRoot>
          <EventForm />
        </RecoilRoot>
      );
      const eventDueDateInput = wrapper.find('[data-test="input-dueDate"]');
      expect(eventDueDateInput.exists()).toBe(true);
      const eventDueDateLabel = wrapper.find('[data-test="label-dueDate"]');
      expect(eventDueDateLabel.exists()).toBe(true);
    });
    it('should have input field and a label for minimum attendees', () => {
      const wrapper = mount(
        <RecoilRoot>
          <EventForm />
        </RecoilRoot>
      );
      const eventMinAttendees = wrapper.find('[data-test="input-minAttendees"]');
      expect(eventMinAttendees.exists()).toBe(true);
      expect(eventMinAttendees.prop('step')).toBe(1);

      const eventMinAttendeesLabel = wrapper.find('[data-test="label-minAttendees"]');
      expect(eventMinAttendeesLabel.exists()).toBe(true);
    });
    it('should have input field and a label for maximum attendees', () => {
      const wrapper = mount(
        <RecoilRoot>
          <EventForm />
        </RecoilRoot>
      );
      const eventMaxAttendees = wrapper.find('[data-test="input-maxAttendees"]');
      expect(eventMaxAttendees.exists()).toBe(true);
      expect(eventMaxAttendees.prop('step')).toBe(1);
      const eventMaxAttendeesLabel = wrapper.find('[data-test="label-maxAttendees"]');
      expect(eventMaxAttendeesLabel.exists()).toBe(true);
    });
    it('should have input field and a label for event time', () => {
      const wrapper = mount(
        <RecoilRoot>
          <EventForm />
        </RecoilRoot>
      );
      const eventTime = wrapper.find('[data-test="input-time"]');
      expect(eventTime.exists()).toBe(true);
      const eventTimeLabel = wrapper.find('[data-test="label-time"]');
      expect(eventTimeLabel.exists()).toBe(true);
    });
    it('should have input field and a label for event place', () => {
      const wrapper = mount(
        <RecoilRoot>
          <EventForm />
        </RecoilRoot>
      );
      const eventPlace = wrapper.find('[data-test="input-place"]');
      expect(eventPlace.exists()).toBe(true);
      const eventPlaceLabel = wrapper.find('[data-test="label-place"]');
      expect(eventPlaceLabel.exists()).toBe(true);
    });
    it('should have a button to add event', async () => {
      const repoSpy = jest
        .spyOn(EventsRepository.prototype, 'createEvent')
        .mockResolvedValue({ data: { ...mockEvent } });
      const wrapper = mount(
        <RecoilRoot initializeState={(snap) => snap.set(userState, { ...recoilUserState })}>
          <EventForm />
        </RecoilRoot>
      );
      expect(repoSpy).toBeCalledTimes(0);
      const btn = wrapper.find('[data-test="btn-add-event"]');
      expect(btn.exists()).toBe(true);
      await act(async () => {
        btn.simulate('click');
      });

      expect(repoSpy).toBeCalledTimes(1);
    });
    it('should have an optional event prop to edit an existing event', () => {
      const expectedValues: EventDto = {
        maxAttendees: mockEvent.max_attendees,
        minAttendees: mockEvent.min_attendees,
        dueDate: mockEvent.due_date.toString(),
        name: mockEvent.name,
        date: mockEvent.date.toString(),
        description: mockEvent.description,
        place: mockEvent.place,
        time: mockEvent.time,
      };
      const wrapper = mount(
        <RecoilRoot>
          <EventForm event={{ ...mockEvent }} />
        </RecoilRoot>
      );
      const eventForm = wrapper.find(EventForm);
      expect(eventForm.props()).toStrictEqual({ event: mockEvent });

      const result = wrapper.find('input').reduce((acc, curr) => {
        const name: string = curr.prop('name')!;
        const value = curr.prop('defaultValue');
        acc = { ...acc, [name]: value };
        return acc;
      }, {});

      expect(result).toEqual(expectedValues);
    });

    it('should be able to update an event', async () => {
      const repoSpy = jest
        .spyOn(EventsRepository.prototype, 'updateEvent')
        .mockResolvedValue({ data: { ...mockEvent } });
      const wrapper = mount(
        <RecoilRoot initializeState={(snap) => snap.set(userState, { ...recoilUserState })}>
          <EventForm event={{ ...mockEvent }} />
        </RecoilRoot>
      );

      expect(repoSpy).toHaveBeenCalledTimes(0);

      const updateBtn = wrapper.find('[data-test="btn-update-event"]');

      await act(async () => {
        updateBtn.simulate('click');
      });

      expect(repoSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('White box tests', () => {
    it('should switch between adding and updating state if event prop is provided', () => {
      let wrapper = mount(
        <RecoilRoot>
          <EventForm />
        </RecoilRoot>
      );
      const addBtn = wrapper.find('[data-test="btn-add-event"]');
      expect(addBtn.exists()).toBe(true);

      wrapper = mount(
        <RecoilRoot>
          <EventForm event={{ ...mockEvent }} />
        </RecoilRoot>
      );
      const updateBtn = wrapper.find('[data-test="btn-update-event"]');
      expect(updateBtn.exists()).toBe(true);
    });
  });
});
