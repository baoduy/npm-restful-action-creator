import { AxiosRequestConfig } from 'axios';
import RestfulCreator from '../src';

var MockAdapter = require('axios-mock-adapter');
var axios = require('axios');

var mock = new MockAdapter(axios);

describe('Test Request Handler', () => {
  mock.onGet('http://test/api/tests').reply((config: AxiosRequestConfig) => {
    if (config.headers['Authorization'])
      return [
        200,
        {
          users: [{ id: 1, name: 'John Smith' }]
        }
      ];

    return [401, 'Unauthorized'];
  });

  test('Without Auth', async () => {
    const restApi = RestfulCreator({ baseURL: 'http://test/api' });
    const testApi = restApi.create('tests');

    try {
      const item = await testApi.get();
      expect(item.status).toBe(401);
    } catch (ex) {
      expect(ex).toBeDefined();
    }
  });

  test('Sync Auth', async () => {
    const restApi = RestfulCreator({
      baseURL: 'http://test/api',
      onRequesting: cfg => {
        cfg.headers['Authorization'] = 'Bearer 123';
        return cfg;
      }
    });

    const testApi = restApi.create('tests');
    const item = await testApi.get();

    expect(item.status).toBe(200);
  });

  test('Async Auth', async () => {
    const restApi = RestfulCreator({
      baseURL: 'http://test/api',
      onRequesting: async cfg => {
        const token = await new Promise(rs => setTimeout(() => rs('Bearer 123'), 300));

        cfg.headers['Authorization'] = token;
        return cfg;
      }
    });

    const testApi = restApi.create('tests');
    const item = await testApi.get();

    expect(item.status).toBe(200);
  });
});
