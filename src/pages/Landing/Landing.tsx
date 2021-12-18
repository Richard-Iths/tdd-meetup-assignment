import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import EventCard from '../../components/events/cards/EventCard';
import { eventState } from '../../recoil/atoms/events';
import { repoFactory } from '../../repositories';

const LandingPage: React.FC = ({}) => {
  const [events, setEvents] = useRecoilState(eventState);
  useEffect(() => {
    const initEvents = async () => {
      const eventsRepo = repoFactory('eventRepository');
      const response = await eventsRepo.getEvents();
      if (response) {
        setEvents({ ...events, events: [...response.data] });
      }
    };
    if (!events.events.length) {
      initEvents();
    }
  });
  return (
    <section className="landing">
      <div className="landing-events">
        {events.events.length > 0 && events.events.map((event) => <EventCard key={event.id} event={{ ...event }} />)}
      </div>
    </section>
  );
};

export default LandingPage;
