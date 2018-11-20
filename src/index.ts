import RestClient from './RestClient';
import { RestConfig } from './InterfaceTypes';

export default (config: RestConfig | string) => new RestClient(config);
