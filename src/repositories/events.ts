import { Event } from '../models';
import BaseRepository from './base';
import { EventCommentsResponse, EventsEndpoint, SuccessResponse } from './types';

interface IRepository {
  createEvent(event: Event): Promise<SuccessResponse | void>;
  findAllEvents(): Promise<Event[]>;
  deleteEvent(id: string, token: string): Promise<SuccessResponse | void>;
  getEventComments(id: string): Promise<EventCommentsResponse | void>;
}

export default class EventsRepository extends BaseRepository<Event> implements IRepository {
  async createEvent(event: Event): Promise<SuccessResponse | void> {
    try {
      const { data } = await this.create<EventsEndpoint>('/events', event);
      return { ...data };
    } catch (_) {}
  }
  findAllEvents(): Promise<Event[]> {
    throw new Error('Method not implemented.');
  }
  async deleteEvent(id: string, token: string): Promise<void | SuccessResponse> {
    try {
      this.setAuthorizationToken(token);
      const { data } = await this.deleteById<EventsEndpoint>('/events/:id', id);
      return { ...data };
    } catch (_) {}
  }
  async getEventComments(id: string): Promise<void | EventCommentsResponse> {
    try {
      const url: EventsEndpoint = '/events/:id/comments';
      const modifiedUrl = url.replace(':id', id);
      const { data } = await this.axiosInstance.get<EventCommentsResponse>(modifiedUrl);
      return { ...data };
    } catch (_) {}
  }
}
