import { User } from '../models';
import BaseRepository from './base';
import { LoginResponse, UsersEndpoint } from './types';

interface IRepository {
  loginUser(username: string, password: string): Promise<LoginResponse | void>;
}

export default class UsersRepository extends BaseRepository<User> implements IRepository {
  async loginUser(username: string, password: string): Promise<void | LoginResponse> {
    try {
      const url: UsersEndpoint = '/users';
      console.log('running api');
      console.log(username, password, 'username,password');

      const { data } = await this.axiosInstance.post<LoginResponse>(url, { username, password });
      return { ...data };
    } catch (e) {
      console.log(e, 'error');
    }
  }
}
