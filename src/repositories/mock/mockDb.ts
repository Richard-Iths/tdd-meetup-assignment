import { Attendee, Event, EventComment, User } from '../../models';
import mockData from './mockData';

interface IDbUser extends User {
  password: string;
}
interface IDb {
  users: IDbUser[];
  events: Event[];
  event_user: Attendee[];
  event_comment: EventComment[];
}
const db: IDb = {
  events: [...mockData.events],
  users: [...mockData.users.map((user) => ({ ...user, password: 'grillkorv' }))],
  event_user: [...mockData.eventUser],
  event_comment: [...mockData.eventComments],
};

interface IMockDb {
  getUsersTable(): IDbUser[];
  getEventsTable(): Event[];
  getEventUSerTable(): Attendee[];
  getEventCommentTable(): EventComment[];
}

export default class MockDb implements IMockDb {
  private static instance: MockDb;
  private constructor() {}
  getEventsTable(): Event[] {
    return db['events'];
  }
  getEventUSerTable(): Attendee[] {
    return db['event_user'];
  }
  getEventCommentTable(): EventComment[] {
    return db['event_comment'];
  }
  getUsersTable(): IDbUser[] {
    return db['users'];
  }

  static initMockDb() {
    if (!this.instance) {
      this.instance = new MockDb();
      return this.instance;
    }
    return this.instance;
  }
}
export const timeOutValue = (cb: CallableFunction) => {
  const random = Math.floor(Math.random() * 1000);
  setTimeout(() => {
    cb();
  }, random);
};
