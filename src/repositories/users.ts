import { User } from '../models';
import BaseRepository from './base';
import {
  AuthEndPoint,
  LoginResponse,
  SuccessResponse,
  UsersEndpoint,
  IUserRepository,
  UserEventsResponse,
} from './types';

export default class UsersRepository extends BaseRepository<User> implements IUserRepository {
  async getUserEvents(token: string): Promise<void | UserEventsResponse> {
    try {
      const url: UsersEndpoint = '/users/events';
      this.setAuthorizationToken(token);
      const { data } = await this.axiosInstance.get<UserEventsResponse>(url);
      return { ...data };
    } catch (e) {
      console.log(e);
    }
  }
  async registerUser(email: string, password: string): Promise<void | LoginResponse> {
    try {
      const url: UsersEndpoint = '/users';
      const { data } = await this.axiosInstance.post<LoginResponse>(url, { email, password });
      return { ...data };
    } catch (e) {
      console.log(e);
    }
  }
  async loginUser(username: string, password: string): Promise<void | LoginResponse> {
    try {
      const url: AuthEndPoint = '/auth';
      const { data } = await this.axiosInstance.post<LoginResponse>(url, { username, password });
      return { ...data };
    } catch (e) {
      console.log(e, 'error');
    }
  }

  async deleteUserEvent(eventId: string, token: string): Promise<void | SuccessResponse> {
    try {
      this.setAuthorizationToken(token);
      const { data } = await this.deleteById<UsersEndpoint>('/users/events/:id', eventId);
      return { ...data };
    } catch (_) {}
  }
}
