import { Event } from '../models';
import BaseRepository from './base';
import {
  CommentResponse,
  EventCommentDto,
  EventCommentsResponse,
  EventDto,
  EventResponse,
  EventsEndpoint,
  EventsResponse,
  IEventRepository,
  SuccessResponse,
} from './types';

export default class EventsRepository extends BaseRepository<Event> implements IEventRepository {
  async addEventComment(token: string, eventId: string, comment: EventCommentDto): Promise<void | CommentResponse> {
    try {
      const url: EventsEndpoint = '/events/:id/comments';
      const modifiedUrl = url.replace(':id', eventId);
      this.setAuthorizationToken(token);
      const { data } = await this.axiosInstance.post<CommentResponse>(modifiedUrl, comment);
      return { ...data };
    } catch (error) {}
  }
  async updateEvent(token: string, eventId: string, event: EventDto): Promise<void | EventResponse> {
    try {
      const url: EventsEndpoint = '/events/:id';
      const modifiedUrl = url.replace(':id', eventId);
      this.setAuthorizationToken(token);
      const { data } = await this.axiosInstance.post<EventResponse>(modifiedUrl, { ...event });
      return { ...data };
    } catch (error) {}
  }
  async createEvent(token: string, event: EventDto): Promise<EventResponse | void> {
    try {
      const url: EventsEndpoint = '/events';
      this.setAuthorizationToken(token);
      const { data } = await this.axiosInstance.post<EventResponse>(url, { ...event });
      return { ...data };
    } catch (_) {}
  }
  async getEvents(): Promise<EventsResponse | void> {
    try {
      const { data } = await this.findAll<EventsEndpoint>('/events');
      return { data: [...data] };
    } catch (_) {}
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
