import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../../recoil/atoms/user';
import { repoFactory } from '../../../../repositories';
import AddEvent, { Props as IAddEvent } from '../../../events/modals/Event/AddEvent';
import BaseModal, { Props as IBaseModal } from '../../../modals/BaseModal';
import EventList from './list/EventList';
import './userEvents.styles.scss';

export interface Props extends IBaseModal {}
const UserEventsModal: React.FC<Props> = ({ closeModal, modalRef, visible }) => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    const body = document.querySelector('body')!;
    if (visible) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }, [visible]);
  useEffect(() => {
    const getEvents = async () => {
      const userRepo = repoFactory('userRepository');
      const { token } = user;
      if (token) {
        const response = await userRepo.getUserEvents(token);
        if (response) {
          setUser({
            ...user,
            attendingEvents: [...response.data.attending_events],
            administratedEvents: [...response.data.administrated_events],
          });
        }
      }
    };
    getEvents();
  }, []);
  const getEvents = () => new Set([...user.administratedEvents, ...user.attendingEvents]);

  const [addEvent, setAddEvent] = useState<boolean>(false);

  const toggleAddEventHandler = () => setAddEvent(!addEvent);

  const addEventState: IAddEvent = {
    closeModal: toggleAddEventHandler,
    modalRef: 'addEventModal',
    visible: addEvent,
  };

  return (
    <BaseModal {...{ visible, closeModal, modalRef }} title="Events">
      <section className="user-events-modal" data-test="user-events-modal">
        <div className="user-events-modal__cta">
          <i className="ri-add-box-fill icon" data-test="icon-add-event" onClick={toggleAddEventHandler}></i>
        </div>
        <section className="user-events-modal__attending-events" data-test="user-events">
          {user.token && <EventList events={getEvents()} />}
        </section>
      </section>
      <AddEvent {...addEventState} />
    </BaseModal>
  );
};

export default UserEventsModal;
