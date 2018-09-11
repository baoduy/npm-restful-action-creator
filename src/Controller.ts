import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { mergeUrl } from './helper';

/**
 *Controller configuration
 *if debug === true then it will log the url to console
 * @export
 * @interface IControllerConfig
 * @extends {AxiosRequestConfig}
 */
export interface IControllerConfig extends AxiosRequestConfig {
  url: string;
  debug?: boolean;
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
  debug?: boolean;

  constructor(config: IControllerConfig) {
    this.url = config.url;
    this.debug = config.debug;
    this.ins = axios.create(config);
  }

  private getUrl = (pathParams?: object | Array<any> | string) => {
    const finalUrl = mergeUrl(this.url, pathParams);
    if (this.debug === true) console.log(finalUrl);
    return finalUrl;
  };

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
  public put = <T = any>(config: IRequestConfig) => {
    if (!config.data) throw 'data is required';
    return this.ins.put<T>(this.getUrl(config.pathParams), config.data);
  };

  /**
   *PATCH action
   *
   * @memberof Controller
   */
  public patch = <T = any>(config: IRequestConfig) => {
    if (!config.data) throw 'data is required';
    return this.ins.patch<T>(this.getUrl(config.pathParams), config.data);
  };
}
