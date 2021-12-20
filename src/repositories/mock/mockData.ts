import { Attendee, Event, EventComment, User } from '../../models';

const events: Event[] = [
  {
    id: '123',
    created_at: new Date(),
    daley_visitors: 100,
    date: new Date(),
    description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam illum quod fugiat provident totam laboriosam
        ut vitae iure eius nobis optio nostrum vero, earum, aut rerum sint recusandae aspernatur in.`,
    due_date: new Date(),
    event_admin: 'SpongeBob',
    image: 'https://via.placeholder.com/150/0000FF/808080 ?Text=Hello world',
    max_attendees: 50,
    min_attendees: 45,
    name: 'City trip',
    place: 'in the city',
    time: '15:50',
    updated_at: new Date(),
  },
  {
    id: '456',
    created_at: new Date(),
    daley_visitors: 100,
    date: new Date(),
    description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam illum quod fugiat provident totam laboriosam
        ut vitae iure eius nobis optio nostrum vero, earum, aut rerum sint recusandae aspernatur in.`,
    due_date: new Date(),
    event_admin: 'SpongeBob',
    image: 'https://via.placeholder.com/150/0000FF/808080 ?Text=Hello world',
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
    description: ` Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam illum quod fugiat provident totam laboriosam
        ut vitae iure eius nobis optio nostrum vero, earum, aut rerum sint recusandae aspernatur in.`,
    due_date: new Date(),
    event_admin: 'AnnUser',
    image: 'https://via.placeholder.com/150/0000FF/808080 ?Text=Hello world',
    max_attendees: 50,
    min_attendees: 45,
    name: ' Car trip',
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
    image: 'https://via.placeholder.com/150/0000FF/808080 ?Text=Hello world',
    max_attendees: 50,
    min_attendees: 45,
    name: 'Camping trip',
    place: 'in the city',
    time: '15:50',
    updated_at: new Date(),
  },
];

const eventUser: Attendee[] = [
  {
    event_id: '789',
    user_id: 'SpongeBob',
  },
  {
    event_id: '456',
    user_id: 'SpongeBob',
  },
  {
    event_id: '789',
    user_id: 'SpiderMan',
  },
];

const users: User[] = [
  {
    email: 'user1@test.com',
    name: 'Bob',
    last_name: 'Sponge',
    username: 'SpongeBob',
  },
  {
    email: 'user2@test.com',
    name: 'Spider',
    last_name: 'Man',
    username: 'SpiderMan',
  },
];

const eventComments: EventComment[] = [
  {
    comment: 'good stuff',
    created_at: new Date(),
    event_id: '789',
    updated_at: new Date(),
    name: 'Lasse',
    user_id: '123',
  },
  {
    comment: 'good stuff',
    created_at: new Date(),
    event_id: '789',
    updated_at: new Date(),
    name: 'Lasse',
    user_id: '123',
  },
];

interface MockData {
  eventComments: EventComment[];
  events: Event[];
  userEvents: Event[];
  users: User[];
  eventUser: Attendee[];
}

export default Object.assign({}, { eventComments, events, userEvents, users, eventUser }) as MockData;
