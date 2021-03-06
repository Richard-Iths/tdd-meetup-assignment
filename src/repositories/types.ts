import { Event, Attendee, User, EventComment } from '../models';

export interface GlobalResponse<T> {
  data: T;
}
export interface TokenResponse {
  token: string;
}
export interface UserEvents {
  attending_events: Event[];
  administrated_events: Event[];
}

type SuccessMessage = 'success';
export interface GlobalSuccessResponse {
  message: SuccessMessage;
}

export interface EventDto extends Pick<Event, 'name' | 'time' | 'place' | 'description'> {
  dueDate: string;
  date: string;
  minAttendees: number;
  maxAttendees: number;
}

export interface EventCommentDto {
  comment: string;
}

export type GlobalFailedResponse = { message: string; statusCode: number; type: 'error' };
export type EventResponse = GlobalResponse<Event>;
export type EventsResponse = GlobalResponse<Event[]>;
export type UserResponse = GlobalResponse<User>;
export type UserEventsResponse = GlobalResponse<UserEvents>;
export type AttendeeResponse = GlobalResponse<Attendee[]>;
export type LoginResponse = GlobalResponse<TokenResponse & GlobalSuccessResponse>;
export type CommentResponse = GlobalResponse<EventComment>;

export type SuccessResponse = GlobalResponse<GlobalSuccessResponse>;

export type EventCommentsResponse = GlobalResponse<EventComment[]>;

export type EventsEndpoint = '/events' | '/events/:id' | '/events/:id/comments';
export type UsersEndpoint = '/users' | '/users/:id' | '/users/events' | '/users/events/:id';
export type AuthEndPoint = '/auth';

export interface IUserRepository {
  loginUser(username: string, password: string): Promise<LoginResponse | void>;
  registerUser(email: string, password: string): Promise<LoginResponse | void>;
  getUserEvents(token: string): Promise<UserEventsResponse | void>;
  deleteUserEvent(eventId: string, token: string): Promise<SuccessResponse | void>;
  attendEvent(eventId: string, token: string): Promise<SuccessResponse | void>;
  unAttendEvent(eventId: string, token: string): Promise<SuccessResponse | void>;
}

export interface IEventRepository {
  createEvent(token: string, event: EventDto): Promise<EventResponse | void>;
  getEvents(): Promise<EventsResponse | void>;
  deleteEvent(id: string, token: string): Promise<SuccessResponse | void>;
  getEventComments(id: string): Promise<EventCommentsResponse | void>;
  updateEvent(token: string, eventId: String, event: EventDto): Promise<EventResponse | void>;
  addEventComment(token: string, eventId: string, comment: EventCommentDto): Promise<CommentResponse | void>;
}
