import { Event } from '../../models';
import {
  EventCommentsResponse,
  EventDto,
  EventResponse,
  EventsResponse,
  IEventRepository,
  SuccessResponse,
} from '../types';
import MockDb, { timeOutValue } from './mockDb';

const mocked = MockDb.initMockDb();

export default class EventsMockedRepository implements IEventRepository {
  updateEvent(token: string, eventId: String, event: EventDto): Promise<void | EventResponse> {
    return new Promise((resolve) => {
      const eventsTable = mocked.getEventsTable();
      const existingEvent = eventsTable.find((event) => event.id === eventId && event.event_admin === token);
      if (existingEvent) {
        const updatedEvent = { ...existingEvent, ...event };
        const updateTable = eventsTable.filter((event) => event.id !== eventId);
        updateTable.push({ ...updatedEvent });

        timeOutValue(() => {
          resolve({ data: { ...updatedEvent } });
        });
      }
    });
  }
  createEvent(token: string, event: EventDto): Promise<void | EventResponse> {
    return new Promise((resolve) => {
      const eventsTable = mocked.getEventsTable();
      const newEvent: Event = {
        ...event,
        id: Math.random().toString(),
        date: event.date,
        due_date: event.dueDate,
        min_attendees: event.minAttendees,
        max_attendees: event.maxAttendees,
        image: '',
        created_at: new Date().toString(),
        updated_at: new Date().toString(),
        daley_visitors: 0,
        event_admin: token,
      };
      eventsTable.push(newEvent);
      timeOutValue(() => {
        resolve({ data: { ...newEvent } });
      });
    });
  }
  getEvents(): Promise<EventsResponse | void> {
    return new Promise((resolve) => {
      const events = mocked.getEventsTable();
      timeOutValue(() => {
        resolve({ data: [...events] });
      });
    });
  }
  deleteEvent(id: string, token: string): Promise<void | SuccessResponse> {
    throw new Error('Method not implemented.');
  }
  getEventComments(id: string): Promise<void | EventCommentsResponse> {
    return new Promise((resolve) => {
      const eventCommentTable = mocked.getEventCommentTable();
      const eventComments = eventCommentTable.filter((comment) => comment.event_id === id);
      timeOutValue(() => {
        resolve({ data: [...eventComments] });
      });
    });
  }
}
