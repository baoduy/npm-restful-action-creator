import { RequestConfig, RestEndpointConfig } from './InterfaceTypes';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { mergeUrl } from './helper';

/**
 *The request parameters.
 * @pathParams  : the adition path will be added to the original url ex: 'originalUrl/1/subitems/2'
 * @params      : the original @params of AxiosRequestConfig
 * @data        : the original @data of AxiosRequestConfig
 * @export
 * @interface RequestConfig
 */

export default class RestEndpoint {
  private config: RestEndpointConfig;
  public name: string;
  private axiosInstance: AxiosInstance;

  constructor(config: RestEndpointConfig) {
    this.config = config;
    this.name = config.url.toUpperCase(); //Consider Url is name of the endpoint.

    this.axiosInstance = axios.create(config);
    //Apply error handler
    this.applyErrorHandler();
  }

  private getUrl = (pathParams?: object | Array<any> | string | number) =>
    mergeUrl(this.config.url, pathParams);

  /**
   * @description check whether object is {RequestConfig} or not
   * @private
   */
  private static isRequestConfig = (obj?: any) =>
    obj &&
    (obj.hasOwnProperty('pathParams') ||
      obj.hasOwnProperty('params') ||
      obj.hasOwnProperty('data'));

  /**
   * If ErrorHandler is provided in the configuration then it will be enabled automatically.
   * In-case you disabled it then use this method to re-enable it.
   */
  private applyErrorHandler() {
    if (!this.config.errorHandler) return;

    this.axiosInstance.interceptors.request.use(
      undefined,
      this.config.errorHandler
    );
    this.axiosInstance.interceptors.response.use(
      undefined,
      this.config.errorHandler
    );
  }

  /**
   * @description calling multi actions from API
   */
  public all = <T>(values: (T | Promise<T>)[]) =>
    axios.all(values).then(axios.spread((...args: T[]) => args));

  /**
   *The original request of Axios
   *
   * @memberof RestEndpoint
   */
  public request = <T = any>(config: AxiosRequestConfig) =>
    this.axiosInstance.request<T>(config);

  /**
   *GET action
   * get method. if config is not IRequestConfig it will pass as  params
   * @memberof RestEndpoint
   */
  public get = <T = any>(config?: RequestConfig | object) => {
    if (RestEndpoint.isRequestConfig(config)) {
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
   * @memberof RestEndpoint
   */
  public delete = (
    config: RequestConfig | any | Array<any> | string | number
  ) => {
    if (RestEndpoint.isRequestConfig(config)) {
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
   * @memberof RestEndpoint
   */
  public head = (config?: RequestConfig) =>
    this.axiosInstance.head(this.getUrl(config && config.pathParams), {
      params: config && config.params,
      data: config && config.data
    });

  /**
   *POST action. if config is not IRequestConfig it will pass as data.
   *
   * @memberof RestEndpoint
   */
  public post = <T = any>(config: RequestConfig | object) => {
    if (RestEndpoint.isRequestConfig(config)) {
      const p = <RequestConfig>config;
      return this.axiosInstance.post<T>(this.getUrl(p.pathParams), p.data, {
        params: p.params
      });
    }

    return this.axiosInstance.post<T>(this.getUrl(), null, config);
  };

  /**
   *PUT action
   *
   * @memberof RestEndpoint
   */
  public put = <T = any>(config: RequestConfig) => {
    if (RestEndpoint.isRequestConfig(config)) {
      const p = <RequestConfig>config;
      return this.axiosInstance.put<T>(this.getUrl(p.pathParams), p.data, {
        params: p.params
      });
    }

    return this.axiosInstance.put<T>(this.getUrl(), null, config);
  };

  /**
   *PATCH action
   *
   * @memberof RestEndpoint
   */
  public patch = <T = any>(config: RequestConfig) => {
    if (!config.data) throw 'data is required';
    return this.axiosInstance.patch<T>(
      this.getUrl(config.pathParams),
      config.data
    );
  };
}
