import Controller from './Controller';
import { AxiosRequestConfig } from 'axios';

export interface RestfulApiConfig extends AxiosRequestConfig {
  debug?: boolean;
}

export default class RestfulApi {
  config: RestfulApiConfig;
  constructor(config: RestfulApiConfig | string) {
    if (typeof config === 'string') config = { baseURL: config };
    this.config = config;
  }

  public create = (url: string) => new Controller({ ...this.config, url });
}
