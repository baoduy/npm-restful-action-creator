import { AxiosRequestConfig } from 'axios';

export type ErrorHandler = (error: any) => Promise<any>;

export type RequestHandler = (config: AxiosRequestConfig) => AxiosRequestConfig;

export interface RestConfig extends AxiosRequestConfig {
  /** Global Exception Handler*/
  errorHandler?: ErrorHandler;
  /** Requesting handler use this if you want to inject anything (Authorization Attribute) to the configuration before submit a request. */
  onRequesting?: RequestHandler;
}

/**
 *Controller configuration
 * @export
 * @interface ControllerConfig
 * @extends {RestConfig}
 */
export interface RestEndpointConfig extends RestConfig {
  url: string;
}

export interface RequestConfig {
  pathParams?: object | Array<any> | string | number;
  params?: object;
  data?: object;
  [key: string]: any;
}
