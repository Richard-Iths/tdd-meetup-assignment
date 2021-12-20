import React from 'react';
import { Event } from '../../../../../models';
import EventCard from '../../../../events/cards/EventCard';
import './eventList.styles.scss';

export interface Props {
  events: Event[] | undefined;
}
const EventList: React.FC<Props> = ({ events }) => {
  return (
    <section className="event-list">
      {events && events.map((event) => <EventCard event={{ ...event }} key={event.id} />)}
    </section>
  );
};

export default EventList;
