import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Event } from '../../../models';
import { userState } from '../../../recoil/atoms/user';
import { eventState, EventState } from '../../../recoil/atoms/events';
import { repoFactory } from '../../../repositories';
import CommentsModal, { Props as ModalProps } from '../modals/comments/Comments';
import './eventCard.styles.scss';
interface Props {
  event: Event;
}
enum ModalRef {
  COMMENTS_MODAL = 'commentsModal',
}
const EventCard: React.FC<Props> = ({ event }) => {
  const [user, setUser] = useRecoilState(userState);
  const [events, setEvents] = useRecoilState<EventState>(eventState);
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
        const newEvents = events.events.filter((currenEvent) => currenEvent.id !== event.id);
        setEvents({ ...events, events: [...newEvents] });
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

  const isAttendingEvent = () => user.attendingEvents.some((attendingEvent) => attendingEvent.id === event.id);

  const attendEvent = async () => {
    if (user.token) {
      const userRepo = repoFactory('userRepository');
      const response = await userRepo.attendEvent(event.id, user.token);
      if (response) {
        setUser({ ...user, attendingEvents: [...user.attendingEvents, { ...event }] });
      }
    }
  };
  const unAttendEvent = async () => {
    if (user.token) {
      const userRepo = repoFactory('userRepository');
      const response = await userRepo.unAttendEvent(event.id, user.token);
      if (response) {
        const attendingEvents = user.attendingEvents.filter((attendingEvent) => attendingEvent.id !== event.id);
        setUser({ ...user, attendingEvents: [...attendingEvents] });
      }
    }
  };
  const isEventOver = () => new Date().getTime() > new Date(event.date).getTime() && 'event-card--event-over';
  const checkCardType = (): string => {
    let className = '';
    if (isEventAdmin) {
      className = className.concat('event-card__type--event-admin');
    } else {
      className = className.concat('event-card__type--event-attendee');
    }
    return className;
  };

  return (
    <article className={`event-card ${isEventOver()}`} data-test="card-event">
      <div className="event-card__header">
        <div className="event-card__cta">
          <i
            className="ri-chat-1-fill icon"
            data-test="icon-comment"
            onClick={() => {
              toggleModal(ModalRef.COMMENTS_MODAL);
            }}
          ></i>
          {user.token && !isAttendingEvent() && (
            <i className="ri-user-add-fill icon" data-test="icon-event-attend" onClick={attendEvent} />
          )}
          {user.token && isAttendingEvent() && (
            <i className="ri-user-unfollow-fill icon" data-test="icon-event-un-attend" onClick={unAttendEvent} />
          )}
        </div>
      </div>
      <div className={`event-card__type ${checkCardType()}`}></div>
      <div className="event-card__info">
        <h2 className="event-card__info__name" data-test="event-card-name">
          {event.name}
        </h2>
        <p className="event-card__info__description" data-test="event-card-description">
          {event.description}
        </p>
      </div>
      <div className="event-card__footer">
        {user.token && isEventAdmin && <i className="ri-edit-fill icon" data-test="icon-edit" />}
        {user.token && isEventAdmin && !isEventOver() && (
          <i className="ri-delete-bin-fill icon" data-test="icon-remove" onClick={removeEvent} />
        )}
      </div>
      <CommentsModal {...commentsModalState} />
    </article>
  );
};

export default EventCard;
