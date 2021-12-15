import { Event, Attendee, User } from '../models';

export interface GlobalResponse<T> {
  data: T;
}
export interface TokenResponse {
  token: string;
}

type SuccessMessage = 'success';
export interface GlobalSuccessResponse {
  message: SuccessMessage;
}

export type GlobalFailedResponse = { message: string; statusCode: number; type: 'error' };

export type EventResponse = GlobalResponse<Event>;
export type EventsResponse = GlobalResponse<Event[]>;
export type UserResponse = GlobalResponse<User>;

export type AttendeeResponse = GlobalResponse<Attendee[]>;
export type LoginResponse = GlobalResponse<TokenResponse & GlobalSuccessResponse>;

export type SuccessResponse = GlobalResponse<GlobalSuccessResponse>;

export type EventsEndpoint = '/events' | '/events/:id';
export type UsersEndpoint = '/users' | '/users/:id' | '/users/events';
export type AuthEndPoint = '/auth';
