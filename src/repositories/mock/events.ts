import { Event } from '../../models';
import { EventCommentsResponse, EventsResponse, IEventRepository, SuccessResponse } from '../types';
import MockDb, { timeOutValue } from './mockDb';

const mocked = MockDb.initMockDb();

export default class EventsMockedRepository implements IEventRepository {
  createEvent(event: Event): Promise<void | SuccessResponse> {
    throw new Error('Method not implemented.');
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
