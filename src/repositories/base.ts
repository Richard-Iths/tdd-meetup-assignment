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
  protected async findAll<S extends string>(url: S, id?: string): Promise<AxiosResponse<T[], any>> {
    let newUrl = url as string;
    if (id) {
      newUrl = newUrl.replace(':id', id);
    }
    return await this.axiosInstance.get(newUrl);
  }

  protected async deleteById<S extends string>(url: S, id: string): Promise<AxiosResponse<SuccessResponse, any>> {
    const newUrl = url.replace(':id', id);
    return await this.axiosInstance.delete(newUrl);
  }
}
