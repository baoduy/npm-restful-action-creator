import Restful from './RestfulApi';
import { AxiosRequestConfig } from 'axios';

export const createApi = (config: AxiosRequestConfig | string) =>
  new Restful(config);
export default createApi;
