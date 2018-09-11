import Restful, { RestfulApiConfig } from './RestfulApi';

export const createApi = (config: RestfulApiConfig | string) =>
  new Restful(config);
export default createApi;
