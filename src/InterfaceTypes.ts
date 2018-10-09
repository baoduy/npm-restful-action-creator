import { AxiosRequestConfig } from 'axios';

export type ErrorHandler = (error: any) => Promise<any>;

export interface RestfulApiConfig extends AxiosRequestConfig {
  /** Global Exception Handler*/
  errorHandler?: ErrorHandler;
}

/**
 *Controller configuration
 * @export
 * @interface ControllerConfig
 * @extends {RestfulApiConfig}
 */
export interface ControllerConfig extends RestfulApiConfig {
  url: string;
}

export interface RequestConfig {
  pathParams?: object | Array<any> | string | number;
  params?: object;
  data?: object;
}
