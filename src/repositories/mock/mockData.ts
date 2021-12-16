import { Event, EventComment } from '../../models';

const events: Event[] = [
  {
    id: '123',
    created_at: new Date(),
    daley_visitors: 100,
    date: new Date(),
    description: 'Camping the the forrest',
    due_date: new Date(),
    event_admin: 'admin',
    image: 'img',
    max_attendees: 50,
    min_attendees: 45,
    name: 'Camping trip',
    place: 'in the city',
    time: '15:50',
    updated_at: new Date(),
  },
  {
    id: '456',
    created_at: new Date(),
    daley_visitors: 100,
    date: new Date(),
    description: 'Camping the the forrest',
    due_date: new Date(),
    event_admin: 'admin',
    image: 'img',
    max_attendees: 50,
    min_attendees: 45,
    name: 'Camping trip',
    place: 'in the city',
    time: '15:50',
    updated_at: new Date(),
  },
  {
    id: '789',
    created_at: new Date(),
    daley_visitors: 100,
    date: new Date(),
    description: 'Camping the the forrest',
    due_date: new Date(),
    event_admin: 'admin',
    image: 'img',
    max_attendees: 50,
    min_attendees: 45,
    name: 'Camping trip',
    place: 'in the city',
    time: '15:50',
    updated_at: new Date(),
  },
];

const userEvents: Event[] = [
  {
    id: '123',
    created_at: new Date(),
    daley_visitors: 100,
    date: new Date(),
    description: 'Camping the the forrest',
    due_date: new Date(),
    event_admin: 'admin',
    image: 'img',
    max_attendees: 50,
    min_attendees: 45,
    name: 'Camping trip',
    place: 'in the city',
    time: '15:50',
    updated_at: new Date(),
  },
  {
    id: '456',
    created_at: new Date(),
    daley_visitors: 100,
    date: new Date(),
    description: 'Camping the the forrest',
    due_date: new Date(),
    event_admin: 'admin',
    image: 'img',
    max_attendees: 50,
    min_attendees: 45,
    name: 'Camping trip',
    place: 'in the city',
    time: '15:50',
    updated_at: new Date(),
  },
];

const eventComments: EventComment[] = [
  {
    comment: 'good stuff',
    created_at: new Date(),
    event_id: '123',
    updated_at: new Date(),
  },
  {
    comment: 'good stuff',
    created_at: new Date(),
    event_id: '123',
    updated_at: new Date(),
  },
];

interface MockData {
  eventComments: EventComment[];
  events: Event[];
  userEvents: Event[];
}

export default Object.assign({}, { eventComments, events, userEvents }) as MockData;
