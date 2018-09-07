import Controller from './Controller';
import { AxiosRequestConfig } from 'axios';

export default class ResfulApi {
  config: AxiosRequestConfig;
  constructor(config: AxiosRequestConfig | string) {
    if (typeof config === 'string') config = { baseURL: config };
    this.config = config;
  }

  public create = (url: string) => new Controller({ ...this.config, url });
}
