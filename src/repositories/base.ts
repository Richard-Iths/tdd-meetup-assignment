import { AxiosResponse } from 'axios';
import Crud from './crud';
import { SuccessResponse } from './types';

export default class BaseRepository<T> extends Crud<T> {
  protected setAuthorizationToken(token: string): void {
    this.axiosInstance.defaults.headers.common['Authorization'] = token;
  }
  protected async create<S extends string>(
    url: S,
    data: T,
    token?: string
  ): Promise<AxiosResponse<SuccessResponse, any>> {
    if (token) {
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return await this.axiosInstance.get(url, { data });
  }
  protected findAll<S extends String>(url: S, token?: string): Promise<AxiosResponse<T[], any>> {
    throw new Error('Method not implemented.');
  }

  protected async deleteById<S extends string>(url: S, id: string): Promise<AxiosResponse<SuccessResponse, any>> {
    const newUrl = url.replace(':id', id);
    return await this.axiosInstance.delete(newUrl);
  }
}
