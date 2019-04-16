import { RequestConfig, RestEndpointConfig } from './definitions';
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
    this.applyHandlers();
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

  private applyHandlers() {
    this.axiosInstance.interceptors.request.use(
      this.config.onRequesting,
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
  public all = <T>(values: Array<T | Promise<T>>) =>
    axios.all(values).then(axios.spread((...args: T[]) => args));

  /**
   *The original request of Axios
   *
   * @memberof RestEndpoint
   */
  public request = <T>(config: AxiosRequestConfig) =>
    this.axiosInstance.request<T>(config);

  /**
   *GET action
   * get method. if config is not IRequestConfig it will pass as  params
   * @memberof RestEndpoint
   */
  public get = <T>(config?: RequestConfig | object) => {
    if (RestEndpoint.isRequestConfig(config)) {
      const { pathParams, ...rest } = config as RequestConfig;
      return this.axiosInstance.get<T>(this.getUrl(pathParams), rest);
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
  public delete = (config: RequestConfig | string | number) => {
    if (RestEndpoint.isRequestConfig(config)) {
      const { pathParams, ...rest } = config as RequestConfig;
      return this.axiosInstance.delete(this.getUrl(pathParams), rest);
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
  public post = <T>(config: RequestConfig | object) => {
    if (RestEndpoint.isRequestConfig(config)) {
      const { data, pathParams, ...rest } = config as RequestConfig;
      return this.axiosInstance.post<T>(this.getUrl(pathParams), data, rest);
    }

    return this.axiosInstance.post<T>(this.getUrl(), config);
  };

  /**
   *PUT action
   *
   * @memberof RestEndpoint
   */
  public put = <T>(config: RequestConfig | object) => {
    if (RestEndpoint.isRequestConfig(config)) {
      const { data, pathParams, ...rest } = config as RequestConfig;
      return this.axiosInstance.put<T>(this.getUrl(pathParams), data, rest);
    }

    return this.axiosInstance.put<T>(this.getUrl(), config);
  };

  /**
   *PATCH action
   *
   * @memberof RestEndpoint
   */
  public patch = <T>(config: RequestConfig | object) => {
    if (RestEndpoint.isRequestConfig(config)) {
      const { data, pathParams, ...rest } = config as RequestConfig;
      return this.axiosInstance.patch<T>(this.getUrl(pathParams), data, rest);
    }

    return this.axiosInstance.patch<T>(this.getUrl(), config);
  };
}
