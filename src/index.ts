import Resful from './ResfulApi';
import { AxiosRequestConfig } from 'axios';

export const createApi = (config: AxiosRequestConfig | string) =>
  new Resful(config);
export default createApi;
