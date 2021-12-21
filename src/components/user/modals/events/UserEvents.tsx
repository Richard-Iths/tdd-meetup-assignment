import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Event } from '../../../../models';
import { userState } from '../../../../recoil/atoms/user';
import { repoFactory } from '../../../../repositories';
import BaseModal, { Props as IBaseModal } from '../../../modals/BaseModal';
import EventList from './list/EventList';
import './userEvents.styles.scss';

export interface Props extends IBaseModal {}
type UserStateEvent = 'attendingEvents' | 'administratedEvents';
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
  }, [user, setUser]);

  const getEvents = () => new Set([...user.administratedEvents, ...user.administratedEvents]);
  return (
    <BaseModal {...{ visible, closeModal, modalRef }}>
      <section className="user-events-modal" data-test="user-events-modal">
        <div className="user-events-modal__cta">
          <i className="ri-add-box-fill icon"></i>
        </div>
        <section className="user-events-modal__attending-events" data-test="user-events">
          <h3 className="user-modal__title">Events</h3>
          {user.token && <EventList events={getEvents()} />}
        </section>
      </section>
    </BaseModal>
  );
};

export default UserEventsModal;
