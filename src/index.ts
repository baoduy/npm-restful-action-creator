import Restful from './RestfulApi';
import { RestfulApiConfig } from './InterfaceTypes';

export default (config: RestfulApiConfig | string) => new Restful(config);
