import { User } from '../models';
import BaseRepository from './base';
import { AuthEndPoint, EventsResponse, LoginResponse, UsersEndpoint } from './types';

interface IRepository {
  loginUser(username: string, password: string): Promise<LoginResponse | void>;
  registerUser(email: string, password: string): Promise<LoginResponse | void>;
  getUserEvents(token: string): Promise<EventsResponse | void>;
}

export default class UsersRepository extends BaseRepository<User> implements IRepository {
  async getUserEvents(token: string): Promise<void | EventsResponse> {
    try {
      const url: UsersEndpoint = '/users/events';
      this.setAuthorizationToken(token);
      const { data } = await this.axiosInstance.get<EventsResponse>(url);
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
}
