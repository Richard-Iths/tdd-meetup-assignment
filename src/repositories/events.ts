import { Event } from '../models';
import BaseRepository from './base';
import { EventsEndpoint, SuccessResponse } from './types';

interface IRepository {
  createEvent(event: Event): Promise<SuccessResponse | void>;
  findAllEvents(): Promise<Event[]>;
}

export default class EventsRepository extends BaseRepository<Event> implements IRepository {
  async createEvent(event: Event): Promise<SuccessResponse | void> {
    try {
      const { data } = await this.create<EventsEndpoint>('/events', event);
      return data;
    } catch (_) {}
  }
  findAllEvents(): Promise<Event[]> {
    throw new Error('Method not implemented.');
  }
}
