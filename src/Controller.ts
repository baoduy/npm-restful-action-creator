import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import * as urljoin from 'url-join';

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
  pathParams?: object | Array<string> | string;
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

  private getUrl = (pathParams?: object | Array<string> | string) => {
    if (!pathParams) return this.url;

    let newPath = '';

    if (typeof pathParams === 'string') newPath = pathParams;
    else if (Array.isArray(pathParams))
      (<Array<any>>pathParams).forEach(element => {
        if (!element) return;
        newPath = urljoin(newPath, element.toString());
      });
    else
      Object.getOwnPropertyNames(pathParams).forEach(p => {
        const val = pathParams[p];
        if (!val) return;
        newPath = urljoin(newPath, val.toString());
      });

    return urljoin(this.url, newPath);
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
    this.ins.get<T>(this.getUrl(config ? config.pathParams : undefined), {
      params: config ? config.params : undefined,
      data: config ? config.data : undefined
    });

  /**
   *DELETE action
   *
   * @memberof Controller
   */
  public delete = (config: IRequestConfig) =>
    this.ins.delete(this.getUrl(config.pathParams), {
      params: config ? config.params : undefined,
      data: config ? config.data : undefined
    });

  /**
   *retreive header only of request.
   *
   * @memberof Controller
   */
  public head = (config?: IRequestConfig) =>
    this.ins.head(this.getUrl(config ? config.pathParams : undefined), {
      params: config ? config.params : undefined,
      data: config ? config.data : undefined
    });

  /**
   *POST action
   *
   * @memberof Controller
   */
  public post = <T = any>(config: IRequestConfig) =>
    this.ins.post<T>(this.getUrl(config.pathParams), {
      params: config ? config.params : undefined,
      data: config ? config.data : undefined
    });

  /**
   *PUT action
   *
   * @memberof Controller
   */
  public put = <T = any>(config: IRequestConfig) =>
    this.ins.put<T>(this.getUrl(config.pathParams), {
      params: config ? config.params : undefined,
      data: config ? config.data : undefined
    });

  /**
   *PATCH action
   *
   * @memberof Controller
   */
  public patch = <T = any>(config: IRequestConfig) =>
    this.ins.patch<T>(this.getUrl(config.pathParams), {
      params: config ? config.params : undefined,
      data: config ? config.data : undefined
    });
}
