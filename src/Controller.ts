import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { mergeUrl } from './helper';
import {
  ErrorHandler,
  ControllerConfig,
  RequestConfig
} from './InterfaceTypes';

/**
 *The request parameters.
 * @pathParams  : the adition path will be added to the original url ex: 'originalUrl/1/subitems/2'
 * @params      : the original @params of AxiosRequestConfig
 * @data        : the original @data of AxiosRequestConfig
 * @export
 * @interface RequestConfig
 */

export default class {
  private axiosInstance: AxiosInstance;
  private url: string;
  private errorHandler?: ErrorHandler;

  constructor(config: ControllerConfig) {
    this.url = config.url;
    this.errorHandler = config.errorHandler;

    this.axiosInstance = axios.create(config);
    //Apply error handler
    this.applyErrorHandler();
  }

  private getUrl = (pathParams?: object | Array<any> | string | number) => {
    const finalUrl = mergeUrl(this.url, pathParams);
    return finalUrl;
  };

  private isRequestConfig = (obj?: any) =>
    obj &&
    (obj.hasOwnProperty('pathParams') ||
      obj.hasOwnProperty('params') ||
      obj.hasOwnProperty('data'));

  /**
   * If ErrorHandler is provided in the configuration then it will be enabled automatically.
   * In-case you disabled it then use this method to re-enable it.
   */
  private applyErrorHandler() {
    if (!this.errorHandler) return;

    this.axiosInstance.interceptors.request.use(undefined, this.errorHandler);
    this.axiosInstance.interceptors.response.use(undefined, this.errorHandler);
  }

  /**
   *The original request of Axios
   *
   * @memberof Controller
   */
  public request = <T = any>(config: AxiosRequestConfig) =>
    this.axiosInstance.request<T>(config);

  /**
   *GET action
   * get method. if config is not IRequestConfig it will pass as  params
   * @memberof Controller
   */
  public get = <T = any>(config?: RequestConfig | object) => {
    if (this.isRequestConfig(config)) {
      const p = <RequestConfig>config;
      return this.axiosInstance.get<T>(this.getUrl(p.pathParams), {
        params: p.params,
        data: p.data
      });
    }

    return this.axiosInstance.get<T>(this.getUrl(), {
      params: config
    });
  };

  /**
   *DELETE method. if config is not IRequestConfig it will pass as  pathParams
   *
   * @memberof Controller
   */
  public delete = (
    config: RequestConfig | any | Array<any> | string | number
  ) => {
    if (this.isRequestConfig(config)) {
      const p = <RequestConfig>config;
      return this.axiosInstance.delete(this.getUrl(p.pathParams), {
        params: p.params,
        data: p.data
      });
    }

    return this.axiosInstance.delete(this.getUrl(config));
  };

  /**
   *retreive header only of request.
   *
   * @memberof Controller
   */
  public head = (config?: RequestConfig) =>
    this.axiosInstance.head(this.getUrl(config && config.pathParams), {
      params: config && config.params,
      data: config && config.data
    });

  /**
   *POST action. if config is not IRequestConfig it will pass as data.
   *
   * @memberof Controller
   */
  public post = <T = any>(config: RequestConfig | object) => {
    if (this.isRequestConfig(config)) {
      const p = <RequestConfig>config;
      return this.axiosInstance.post<T>(this.getUrl(p.pathParams), p.data);
    }

    return this.axiosInstance.post<T>(this.getUrl(), config);
  };

  /**
   *PUT action
   *
   * @memberof Controller
   */
  public put = <T = any>(config: RequestConfig) => {
    if (!config.data) throw 'data is required';
    return this.axiosInstance.put<T>(
      this.getUrl(config.pathParams),
      config.data
    );
  };

  /**
   *PATCH action
   *
   * @memberof Controller
   */
  public patch = <T = any>(config: RequestConfig) => {
    if (!config.data) throw 'data is required';
    return this.axiosInstance.patch<T>(
      this.getUrl(config.pathParams),
      config.data
    );
  };
}
