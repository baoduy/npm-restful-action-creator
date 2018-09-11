import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

import { mergeUrl } from './helper';

export interface IControllerConfig extends AxiosRequestConfig {
  url: string;
}

/**
 *The request parameters.
 * @pathParams  : the adition path will be added to the original url ex: 'originalUrl/1/subitems/2'
 * @params      : the original @params of AxiosRequestConfig
 * @data        : the original @data of AxiosRequestConfig
 * @export
 * @interface IRequestConfig
 */
export interface IRequestConfig {
  pathParams?: object | Array<any> | string;
  params?: object;
  data?: object;
}

export default class Controller {
  ins: AxiosInstance;
  url: string;

  constructor(config: IControllerConfig) {
    this.url = config.url;
    this.ins = axios.create(config);
  }

  private getUrl = (pathParams?: object | Array<any> | string) =>
    mergeUrl(this.url, pathParams);

  /**
   *The original request of Axios
   *
   * @memberof Controller
   */
  public request = <T = any>(config: AxiosRequestConfig) =>
    this.ins.request<T>(config);

  /**
   *GET action
   *
   * @memberof Controller
   */
  public get = <T = any>(config?: IRequestConfig) =>
    this.ins.get<T>(this.getUrl(config && config.pathParams), {
      params: config && config.params,
      data: config && config.data
    });

  /**
   *DELETE action
   *
   * @memberof Controller
   */
  public delete = (config: IRequestConfig) =>
    this.ins.delete(this.getUrl(config.pathParams), {
      params: config.params,
      data: config.data
    });

  /**
   *retreive header only of request.
   *
   * @memberof Controller
   */
  public head = (config?: IRequestConfig) =>
    this.ins.head(this.getUrl(config && config.pathParams), {
      params: config && config.params,
      data: config && config.data
    });

  /**
   *POST action
   *
   * @memberof Controller
   */
  public post = <T = any>(config: IRequestConfig) =>
    this.ins.post<T>(this.getUrl(config.pathParams), {
      params: config.params,
      data: config.data
    });

  /**
   *PUT action
   *
   * @memberof Controller
   */
  public put = <T = any>(config: IRequestConfig) =>
    this.ins.put<T>(this.getUrl(config.pathParams), {
      params: config.params,
      data: config.data
    });

  /**
   *PATCH action
   *
   * @memberof Controller
   */
  public patch = <T = any>(config: IRequestConfig) =>
    this.ins.patch<T>(this.getUrl(config.pathParams), {
      params: config.params,
      data: config.data
    });
}
