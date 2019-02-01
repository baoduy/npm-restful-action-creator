import { AxiosRequestConfig } from 'axios';

export type ErrorHandler = (error: any) => Promise<any>;

export interface RestConfig extends AxiosRequestConfig {
  /** Global Exception Handler*/
  errorHandler?: ErrorHandler;
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
