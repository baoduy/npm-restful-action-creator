import { RestConfig } from './definitions';
import RestEndpoint from './restClientEndpoint';

export default class {
  config: RestConfig;
  constructor(config: RestConfig | string) {
    this.config = typeof config === 'string' ? { baseURL: config } : config;
  }

  /**
   * Create the Enpoint instance for the relative url.
   * @param {string} url the relative url of the Endpoint
   */
  public create = (url: string) => new RestEndpoint({ ...this.config, url });
}
