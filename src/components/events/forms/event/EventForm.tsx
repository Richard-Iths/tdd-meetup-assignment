import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Event } from '../../../../models';
import { userState, UserState } from '../../../../recoil/atoms/user';
import { repoFactory } from '../../../../repositories';
import { EventDto } from '../../../../repositories/types';
import Input, { Props as IInput } from '../../../input/Input';

interface Props {
  event?: Event;
}

const EventForm: React.FC<Props> = ({ event }) => {
  const [addEvent, setAddEvent] = useState<EventDto>({
    date: '',
    dueDate: '',
    description: '',
    maxAttendees: 0,
    minAttendees: 0,
    name: '',
    place: '',
    time: '',
  });
  const [user, setUser] = useRecoilState<UserState>(userState);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setAddEvent({ ...addEvent, [target.name]: target.value });
  };
  const isInputValue = (key: keyof Event) => (event !== undefined ? event[key] : '');
  const inputs: IInput[] = [
    {
      inputName: 'name',
      inputType: 'text',
      onChangeHandler: onInputChange,
      label: 'Event Name',
      placeholder: 'Enter event name',
      value: isInputValue('name') as string,
    },
    {
      inputName: 'description',
      inputType: 'text',
      onChangeHandler: onInputChange,
      label: 'Event Description',
      placeholder: 'Enter event description',
      value: isInputValue('description') as string,
    },
    {
      inputName: 'date',
      inputType: 'date',
      onChangeHandler: onInputChange,
      label: 'Event Date',
      placeholder: 'Enter event date',
      value: isInputValue('date') as string,
    },
    {
      inputName: 'time',
      inputType: 'string',
      onChangeHandler: onInputChange,
      label: 'Event Time',
      placeholder: 'Enter event time',
      value: isInputValue('time') as string,
    },
    {
      inputName: 'dueDate',
      inputType: 'date',
      onChangeHandler: onInputChange,
      label: 'Sign up due date',
      placeholder: 'Enter sign up due date',
      value: isInputValue('due_date') as string,
    },
    {
      inputName: 'minAttendees',
      inputType: 'number',
      onChangeHandler: onInputChange,
      label: 'Minimum Attendees',
      placeholder: 'Enter minimum attendees',
      step: 1,
      value: isInputValue('min_attendees') as number,
    },
    {
      inputName: 'maxAttendees',
      inputType: 'number',
      onChangeHandler: onInputChange,
      label: 'Maximum Attendees',
      placeholder: 'Enter maximum attendees',
      step: 1,
      value: isInputValue('max_attendees') as number,
    },
    {
      inputName: 'place',
      inputType: 'text',
      onChangeHandler: onInputChange,
      label: 'Event Takes Place',
      placeholder: 'Enter where the event takes place',
      value: isInputValue('place') as string,
    },
  ];
  const addEventHandler = async () => {
    if (user.token) {
      const eventsRepo = repoFactory('eventRepository');
      const response = await eventsRepo.createEvent(user.token, { ...addEvent });
      if (response) {
        setUser({ ...user, administratedEvents: [...user.administratedEvents, { ...response.data }] });
      }
    }
  };
  return (
    <article className="event-form">
      {inputs.map((input, index) => (
        <Input {...input} key={index} />
      ))}
      <div className="event-form__cta">
        <button className="event-form__cta__btn" data-test="btn-add-event" onClick={addEventHandler}></button>
      </div>
    </article>
  );
};

export default EventForm;
