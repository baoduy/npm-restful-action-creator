import Restful from './RestfulApi';
import { AxiosRequestConfig } from 'axios';

export default (config: AxiosRequestConfig | string) => new Restful(config);
