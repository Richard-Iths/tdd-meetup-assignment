import { EventsResponse, IUserRepository, LoginResponse, SuccessResponse } from '../types';
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
  getUserEvents(token: string): Promise<void | EventsResponse> {
    return new Promise((resolve) => {
      const eventsTable = mocked.getEventsTable();
      const userEvents = eventsTable.filter((event) => event.event_admin === token);
      timeOutValue(() => {
        resolve({ data: [...userEvents] });
      });
    });
  }
  deleteUserEvent(eventId: string, token: string): Promise<void | SuccessResponse> {
    throw new Error('Method not implemented.');
  }
}
