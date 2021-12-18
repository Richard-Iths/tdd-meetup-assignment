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

export type GlobalFailedResponse = { message: string; statusCode: number; type: 'error' };

export type EventResponse = GlobalResponse<Event>;
export type EventsResponse = GlobalResponse<Event[]>;
export type UserResponse = GlobalResponse<User>;
export type UserEventsResponse = GlobalResponse<UserEvents>;
export type AttendeeResponse = GlobalResponse<Attendee[]>;
export type LoginResponse = GlobalResponse<TokenResponse & GlobalSuccessResponse>;

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
}

export interface IEventRepository {
  createEvent(event: Event): Promise<SuccessResponse | void>;
  getEvents(): Promise<EventsResponse | void>;
  deleteEvent(id: string, token: string): Promise<SuccessResponse | void>;
  getEventComments(id: string): Promise<EventCommentsResponse | void>;
}
