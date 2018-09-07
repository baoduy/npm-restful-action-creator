import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export default class Controller {
  axiosInstance: AxiosInstance;
  constructor(config: AxiosRequestConfig | string) {
    if (typeof config === 'string') config = { baseURL: config };
    this.axiosInstance = axios.create(config);
  }

  public execute = (config: AxiosRequestConfig) => axios(config);
}
