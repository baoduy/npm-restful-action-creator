import Controller from './Controller';
import { AxiosRequestConfig } from 'axios';

export default class {
  config: AxiosRequestConfig;
  constructor(config: AxiosRequestConfig | string) {
    this.config = typeof config === 'string' ? { baseURL: config } : config;
  }

  public create = (url: string) => new Controller({ ...this.config, url });
}
