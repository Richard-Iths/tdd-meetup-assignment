import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Event } from '../../../models';
import { userState } from '../../../recoil/atoms/user';
import { eventState, EventState } from '../../../recoil/atoms/events';
import { repoFactory } from '../../../repositories';
import CommentsModal, { Props as ModalProps } from '../modals/comments/Comments';
import { formatDate, isPastDate } from '../../../utils/dateTime';
import './eventCard.styles.scss';
export interface Props {
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
  }, [user]);

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

  const isAttendingEvent = () => {
    return user.attendingEvents.some((attendingEvent) => attendingEvent.id === event.id);
  };

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
  const isEventOver = () => isPastDate(new Date().toISOString(), event.date) && 'event-card--event-over';
  const isDueDate = () => new Date().getTime() > new Date(event.due_date).getTime();
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
          >
            <span className="icon__label">Comment</span>
          </i>
          {user.token && !isAttendingEvent() && !isDueDate() && (
            <i className="ri-user-add-fill icon" data-test="icon-event-attend" onClick={attendEvent}>
              <span className="icon__label">Attend</span>
            </i>
          )}
          {user.token && isAttendingEvent() && (
            <i className="ri-user-unfollow-fill icon" data-test="icon-event-un-attend" onClick={unAttendEvent}>
              <span className="icon__label">Un Attend</span>
            </i>
          )}
        </div>
      </div>
      <div className="event-card__schedule">
        <div className="event-card__schedule__info">
          <h5 className="event-card__schedule__text">Date</h5>
          <div className="event-card__schedule__dots"></div>
          <h5 className="event-card__schedule__text" data-test="event-date">
            {formatDate(event.date)}
          </h5>
        </div>
        <div className={`event-card__schedule__info ${isDueDate() && 'event-card__schedule__due-date'}`}>
          <h5 className="event-card__schedule__time">Sign up due date</h5>
          <div className="event-card__schedule__dots"></div>
          <h5 className="event-card__schedule__text" data-test="event-due-date">
            {formatDate(event.due_date)}
          </h5>
        </div>
        <div className="event-card__schedule__info">
          <h5 className="event-card__schedule__text">Place</h5>
          <div className="event-card__schedule__dots"></div>

          <h5 className="event-card__schedule__text" data-test="event-place">
            {event.place}
          </h5>
        </div>
        <div className="event-card__schedule__info">
          <h5 className="event-card__schedule__text">Time</h5>
          <div className="event-card__schedule__dots"></div>

          <h5 className="event-card__schedule__text" data-test="event-time">
            {event.time}{' '}
          </h5>
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
