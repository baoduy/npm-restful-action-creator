import Controller from './Controller';
import { RestfulApiConfig } from './InterfaceTypes';

export default class {
  config: RestfulApiConfig;
  constructor(config: RestfulApiConfig | string) {
    this.config = typeof config === 'string' ? { baseURL: config } : config;
  }

  public create = (url: string) => new Controller({ ...this.config, url });
}
