import { EventsResponse, IUserRepository, LoginResponse, SuccessResponse, UserEventsResponse } from '../types';
import MockDb, { timeOutValue } from './mockDb';
const mocked = MockDb.initMockDb();

export default class UsersMockRepository implements IUserRepository {
  loginUser(email: string, password: string): Promise<void | LoginResponse> {
    return new Promise((resolve) => {
      const userTable = mocked.getUsersTable();
      const existingUser = userTable.find((user) => user.email.toLowerCase() === email.toLowerCase());
      if (existingUser && existingUser.password === password) {
        timeOutValue(() => {
          resolve({ data: { message: 'success', token: existingUser.username } });
        });
      }
    });
  }
  registerUser(email: string, password: string): Promise<void | LoginResponse> {
    throw new Error('Method not implemented.');
  }
  getUserEvents(token: string): Promise<void | UserEventsResponse> {
    return new Promise((resolve) => {
      const eventsTable = mocked.getEventsTable();
      const userEventTable = mocked.getEventUserTable();
      const userEvents = userEventTable.filter((event) => event.user_id === token);
      const attendingEvents = eventsTable.filter((event) =>
        userEvents.find((userEvent) => userEvent.event_id === event.id)
      );
      const administratedEvents = eventsTable.filter((event) => event.event_admin === token);
      timeOutValue(() => {
        resolve({ data: { administrated_events: [...administratedEvents], attending_events: [...attendingEvents] } });
      });
    });
  }
  deleteUserEvent(eventId: string, token: string): Promise<void | SuccessResponse> {
    return new Promise((resolve) => {
      const eventsTable = mocked.getEventsTable();
      const eventIndex = eventsTable.findIndex((event) => event.id === eventId && token === event.event_admin);
      if (eventIndex) {
        eventsTable.splice(eventIndex, 1);
        timeOutValue(() => {
          resolve({ data: { message: 'success' } });
        });
      }
    });
  }
}
