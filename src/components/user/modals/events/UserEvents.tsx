import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../../recoil/atoms/user';
import { repoFactory } from '../../../../repositories';
import BaseModal, { Props as IBaseModal } from '../../../modals/BaseModal';
import EventList from './list/EventList';

export interface Props extends IBaseModal {}
type UserStateEvent = 'attendingEvents' | 'administratedEvents';
const UserEventsModal: React.FC<Props> = ({ closeModal, modalRef, visible }) => {
  const [user, setUser] = useRecoilState(userState);
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
  const getEvents = (eventType: UserStateEvent) => (user[eventType].length > 0 ? [...user[eventType]] : undefined);
  return (
    <BaseModal {...{ visible, closeModal, modalRef }}>
      <section className="user-events-modal" data-test="user-events-modal">
        <section className="user-events-modal__attending-events" data-test="user-event-attending">
          <h3 className="user-modal__title"> Attending Events</h3>
          <EventList events={getEvents('attendingEvents')} />
        </section>
      </section>
      <section className="user-events-modal__attending-events" data-test="user-event-administrated">
        <h3 className="user-modal__title">Administrated Events</h3>
        <EventList events={getEvents('attendingEvents')} />
      </section>
    </BaseModal>
  );
};

export default UserEventsModal;
