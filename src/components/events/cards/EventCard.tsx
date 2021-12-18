import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Event } from '../../../models';
import { userState } from '../../../recoil/atoms/user';
import { repoFactory } from '../../../repositories';
import CommentsModal, { Props as ModalProps } from '../modals/comments/Comments';
interface Props {
  event: Event;
}
enum ModalRef {
  COMMENTS_MODAL = 'commentsModal',
}
const EventCard: React.FC<Props> = ({ event }) => {
  const [user, setUser] = useRecoilState(userState);
  const [isEventAdmin, setIsEventAdmin] = useState<boolean>(false);
  useEffect(() => {
    const checkEventAdmin = () => user.administratedEvents.some((adminEvent) => adminEvent.id === event.id);
    setIsEventAdmin(checkEventAdmin());
  }, []);

  const removeEvent = async () => {
    if (user.token) {
      const userRepository = repoFactory('userRepository');
      const response = await userRepository.deleteUserEvent(event.id, user.token);
      if (response && response.data.message === 'success') {
        const administratedEvents = user.administratedEvents.filter((adminEvent) => adminEvent.id !== event.id);

        setUser({ ...user, administratedEvents: [...administratedEvents] });
      }
    }
  };
  const [commentsModal, setCommentsModal] = useState<boolean>(false);
  const toggleModal = (modalRef: ModalRef) => {
    switch (modalRef) {
      case ModalRef.COMMENTS_MODAL: {
        setCommentsModal(!commentsModal);
        break;
      }
      default:
        break;
    }
  };
  const commentsModalState: ModalProps = {
    closeModal: toggleModal,
    eventId: event.id,
    modalRef: ModalRef.COMMENTS_MODAL,
    visible: commentsModal,
  };

  return (
    <article className="event-card" data-test="card-event">
      <div className="event-card__header">
        <div className="event-card__cta">
          <i
            className="ri-chat-1-fill icon"
            data-test="icon-comment"
            onClick={() => {
              toggleModal(ModalRef.COMMENTS_MODAL);
            }}
          ></i>
          {user.token && isEventAdmin && <i className="ri-edit-fill icon" data-test="icon-edit"></i>}
          {user.token && isEventAdmin && (
            <i className="ri-edit-fill icon" data-test="icon-remove" onClick={removeEvent}></i>
          )}
        </div>
      </div>
      <div className="event-card__content">
        <img src={event.image} alt={event.image} />
        <div className="event-card__info">
          <h3 className="event-card__info__name" data-test="event-card-name">
            {event.name}
          </h3>
          <p className="event-card__info__description" data-test="event-card-description">
            {event.description}
          </p>
        </div>
      </div>
      <CommentsModal {...commentsModalState} />
    </article>
  );
};

export default EventCard;
