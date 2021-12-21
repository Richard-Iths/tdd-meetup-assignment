import React from 'react';
import { Event } from '../../../../../models';
import EventCard from '../../../../events/cards/EventCard';
import './eventList.styles.scss';

export interface Props {
  events: Event[];
}
const EventList: React.FC<Props> = ({ events }) => {
  return (
    <section className="event-list">
      {events.values()}
      {events && Array.from(events).map((event, index) => <EventCard event={{ ...event }} key={index} />)}
    </section>
  );
};

export default EventList;
