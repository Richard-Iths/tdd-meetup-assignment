import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import EventCard from '../../components/events/cards/EventCard';
import { eventState } from '../../recoil/atoms/events';
import { repoFactory } from '../../repositories';
import './landing.styles.scss';

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
  }, [events]);
  return (
    <section className="landing">
      <article className="landing-hero">
        <h1 className="xl hide-mobile">
          YOUR TIME,
          <br />
          YOUR PLACE <br /> YOUR INTERESTS
        </h1>
      </article>
      <div className="landing__events">
        {events.events.length > 0 && events.events.map((event) => <EventCard key={event.id} event={{ ...event }} />)}
      </div>
    </section>
  );
};

export default LandingPage;
