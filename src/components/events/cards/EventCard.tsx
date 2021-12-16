import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Event } from '../../../models';
import { userState } from '../../../recoil/atoms/user';
import UsersRepository from '../../../repositories/users';
interface Props {
  event: Event;
}
const EventCard: React.FC<Props> = ({ event }) => {
  const [user, setUser] = useRecoilState(userState);
  const [isEventAdmin, setIsEventAdmin] = useState<boolean>(false);
  useEffect(() => {
    const checkEventAdmin = () =>
      user.administratedEvents.some((adminEvent) => adminEvent.event_admin === event.event_admin);
    setIsEventAdmin(checkEventAdmin());
  }, []);

  const removeEvent = async () => {
    if (user.token) {
      const userRepository = new UsersRepository();
      const response = await userRepository.deleteUserEvent(event.id, user.token);
      if (response && response.data.message === 'success') {
        const administratedEvents = user.administratedEvents.filter((adminEvent) => adminEvent.id !== event.id);

        setUser({ ...user, administratedEvents: [...administratedEvents] });
      }
    }
  };

  return (
    <article className="event-card">
      <div className="event-card__header">
        <div className="event-card__cta">
          <i className="ri-chat-1-fill icon" data-test="icon-comment"></i>
          {user.token && isEventAdmin && <i className="ri-edit-fill icon" data-test="icon-edit"></i>}
          {user.token && isEventAdmin && (
            <i className="ri-edit-fill icon" data-test="icon-remove" onClick={removeEvent}></i>
          )}
        </div>
      </div>
    </article>
  );
};

export default EventCard;
