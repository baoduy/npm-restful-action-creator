import RestClient from './restClientCreator';
import { RestConfig } from './definitions';

export default (config: RestConfig | string) => new RestClient(config);
