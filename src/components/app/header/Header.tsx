import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../recoil/atoms/user';
import AuthModal, { Props as IModalProps } from '../../user/modals/auth/Auth';
import UserEvents from '../../user/modals/events/UserEvents';
import './header.styles.scss';

enum ModalType {
  AUTH_MODAL = 'userModal',
  EVENTS_MODAL = 'eventModal',
}

const Header: React.FC = ({}) => {
  const [user, setUser] = useRecoilState(userState);
  const [authModal, setAuthModal] = useState<boolean>(false);
  const [eventsModal, setEventsModal] = useState<boolean>(false);

  const toggleModal = (modal: ModalType) => {
    switch (modal) {
      case ModalType.AUTH_MODAL: {
        setAuthModal(!authModal);
        break;
      }
      case ModalType.EVENTS_MODAL: {
        setEventsModal(!eventsModal);
        break;
      }
    }
  };
  const authModalProps: IModalProps = {
    closeModal: toggleModal,
    modalRef: ModalType.AUTH_MODAL,
    visible: authModal,
  };
  const eventsModalProps: IModalProps = {
    closeModal: toggleModal,
    modalRef: ModalType.EVENTS_MODAL,
    visible: eventsModal,
  };

  return (
    <header className="app-header">
      <h2 data-test="header-logo">AM</h2>
      <nav className="app-header__nav">
        {!user.token && (
          <i
            className="ri-user-fill icon"
            data-test="icon-auth-modal"
            onClick={() => toggleModal(ModalType.AUTH_MODAL)}
          ></i>
        )}
        {user.token && (
          <span className="icon-wrapper icon--primary-dark">
            <i
              className="ri-calendar-event-fill icon icon--primary-dark"
              data-test="icon-user-events-modal"
              onClick={() => toggleModal(ModalType.EVENTS_MODAL)}
            ></i>
          </span>
        )}
      </nav>
      {!user.token && <AuthModal {...authModalProps} />}
      {user.token && <UserEvents {...eventsModalProps} />}
    </header>
  );
};

export default Header;
