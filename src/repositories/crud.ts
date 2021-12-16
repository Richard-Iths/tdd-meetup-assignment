import axios, { AxiosResponse } from 'axios';
import { SuccessResponse } from './types';

export default abstract class Crud<T> {
  protected axiosInstance = axios.create({
    baseURL: process.env.HOST_URL || `http://localhost:3000/api/`,
  });

  protected abstract create<S extends string>(
    url: S,
    data: T,
    token?: string
  ): Promise<AxiosResponse<SuccessResponse, any>>;
  protected abstract findAll<S extends string>(url: S, token?: string): Promise<AxiosResponse<T[]>>;
  protected abstract deleteById<S extends string>(url: S, id: string): Promise<AxiosResponse<SuccessResponse>>;

  protected abstract setAuthorizationToken(token: string): void;
}
