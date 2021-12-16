import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../../recoil/atoms/user';
import UsersRepository from '../../../../repositories/users';
import BaseModal, { Props as IBaseModal } from '../../../modals/BaseModal';
import EventList from './list/EventList';

export interface Props extends IBaseModal {}

const UserEventsModal: React.FC<Props> = ({ closeModal, modalRef, visible }) => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const getEvents = async () => {
      const userRepo = new UsersRepository();
      const { token } = user;
      if (token) {
        const response = await userRepo.getUserEvents(token);
        if (response) {
          setUser({ ...user, attendingEvents: [...response.data] });
        }
      }
    };
    getEvents();
  }, []);

  return (
    <BaseModal {...{ visible, closeModal, modalRef }}>
      <section className="user-events-modal" data-test="user-events-modal">
        <EventList />
      </section>
    </BaseModal>
  );
};

export default UserEventsModal;
