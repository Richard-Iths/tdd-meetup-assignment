import UsersRepository from './users';
import UsersMockRepository from './mock/user';
import EventsMockedRepository from './mock/events';
import { IEventRepository, IUserRepository } from './types';
import EventsRepository from './events';

type repoKeyUser = 'userRepository';
type repoKeyEvent = 'eventRepository';

const checkDev = () => process.env.NODE_ENV === 'development';

export function repoFactory(r: repoKeyEvent): IEventRepository;
export function repoFactory(r: repoKeyUser): IUserRepository;

export function repoFactory(r: repoKeyUser | repoKeyEvent): any {
  switch (r) {
    case 'userRepository': {
      console.log('here');
      return checkDev() ? new UsersMockRepository() : new UsersRepository();
    }
    case 'eventRepository': {
      return checkDev() ? new EventsMockedRepository() : new EventsRepository();
    }
    default:
      throw new Error('repo does not exist');
  }
}
