import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import * as urljoin from 'url-join';

export interface IControllerConfig extends AxiosRequestConfig {
  url: string;
}

export interface IRequestConfig {
  params?: any;
  isPathParams?: boolean;
  data?: any;
}

export default class Controller {
  ins: AxiosInstance;
  url: string;

  constructor(config: IControllerConfig) {
    this.url = config.url;
    this.ins = axios.create(config);
  }

  private getUrl = (config?: IRequestConfig) => {
    if (!config || !config.isPathParams) return this.url;

    let newUrl = this.url;

    Object.getOwnPropertyNames(config.params).forEach(p => {
      const val = config.params[p];
      if (!val) return;
      newUrl = urljoin(newUrl, val.toString());
    });

    //config.params = undefined;
    return newUrl;
  };

  public request = <T = any>(config: AxiosRequestConfig) =>
    this.ins.request<T>(config).then(rs => rs.data);

  public get = <T = any>(config?: IRequestConfig) =>
    this.ins.get<T>(this.getUrl(config), config).then(rs => rs.data);

  public delete = (config: IRequestConfig) =>
    this.ins.delete(this.getUrl(config), config).then(rs => true);

  public head = (config?: IRequestConfig) =>
    this.ins.head(this.getUrl(config), config).then(rs => rs.data);

  public post = <T = any>(config: IRequestConfig) =>
    this.ins
      .post<T>(this.getUrl(config), config.data, config)
      .then(rs => rs.data);

  public put = <T = any>(config: IRequestConfig) =>
    this.ins.put<T>(this.getUrl(config), config.data).then(rs => rs.data);

  public patch = <T = any>(config: IRequestConfig) =>
    this.ins
      .patch<T>(this.getUrl(config), config.data, config)
      .then(rs => rs.data);
}
