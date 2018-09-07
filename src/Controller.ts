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

  private getUrl = (config: IRequestConfig) => {
    if (!config.params || config.isPathParams === false) return this.url;

    let newUrl = this.url;

    Object.getOwnPropertyNames(config.params).forEach(p => {
      const val = config.params[p];
      if (!val) return;
      newUrl = urljoin(newUrl, val.toString());
    });

    return newUrl;
  };

  private getConfig = (config?: IRequestConfig | object) => {
    const c = <IRequestConfig>config;

    if (c && (c.params || c.data))
      return <IControllerConfig>{
        data: c.data,
        params: c.isPathParams === true ? undefined : c.params,
        url: this.getUrl(c)
      };

    return <IControllerConfig>{ url: this.url, data: config, params: config };
  };

  public request = <T = any>(config: AxiosRequestConfig) =>
    this.ins.request<T>(config).then(rs => rs.data);

  public get = <T = any>(config?: IRequestConfig | object) => {
    const c = this.getConfig(config);
    return this.ins.get<T>(c.url, c).then(rs => rs.data);
  };

  public delete = (config: IRequestConfig | object) => {
    const c = this.getConfig(config);
    return this.ins.delete(c.url, c).then(rs => true);
  };

  public head = (config?: IRequestConfig | object) => {
    const c = this.getConfig(config);
    return this.ins.head(c.url, c).then(rs => rs.data);
  };

  public post = <T = any>(config: IRequestConfig | object) => {
    const c = this.getConfig(config);
    return this.ins.post<T>(c.url, c.data, c).then(rs => rs.data);
  };

  public put = <T = any>(config: IRequestConfig | object) => {
    const c = this.getConfig(config);
    return this.ins.put<T>(c.url, c.data).then(rs => rs.data);
  };

  public patch = <T = any>(config: IRequestConfig | object) => {
    const c = this.getConfig(config);
    return this.ins.patch<T>(c.url, c.data, c).then(rs => rs.data);
  };
}
