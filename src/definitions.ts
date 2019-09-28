import { AxiosRequestConfig } from 'axios';

export type ErrorHandler = (error: any) => Promise<any>;

export type RequestHandler = (
  config: AxiosRequestConfig
) => AxiosRequestConfig | Promise<AxiosRequestConfig>;

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
  /** The path parameters like: /{userId}/Accounts/ then path should be [1,"Accounts"] to get Accounts of User */
  path?: object | Array<any> | string | number;
  /** The query string parameters like: ?userId=1&accountId=2 then params should be {userId:1,accountId:2} */
  params?: object;
  /** The data will be post to API as body */
  data?: object;
  /** Other  axios config*/
  [key: string]: any;
}
