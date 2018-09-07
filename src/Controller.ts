import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export interface IRequestConfig {
  params?: any;
  paramsSerializer?: (params: any) => string;
  data?: any;
}

export default class Controller {
  ins: AxiosInstance;
  url: string;

  constructor(config: AxiosRequestConfig) {
    if (!config.url) throw 'The URL of config is required';

    this.url = config.url;
    this.ins = axios.create(config);
  }

  public request = (config: IRequestConfig) => this.ins.request(config);

  public get = (config: IRequestConfig) => this.ins.get(this.url, config);

  public delete = (config: IRequestConfig) => this.ins.delete(this.url, config);

  public head = (config: IRequestConfig) => this.ins.head(this.url, config);

  public post = (config: IRequestConfig) =>
    this.ins.post(this.url, config.data, config);

  public put = (config: IRequestConfig) =>
    this.ins.put(this.url, config.data, config);

  public patch = (config: IRequestConfig) =>
    this.ins.patch(this.url, config.data, config);
}
