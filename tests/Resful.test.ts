import RestfulCreator from '../src';
var MockAdapter = require('axios-mock-adapter');
var axios = require('axios');

const restApi = RestfulCreator({ baseURL: '/', debug: true });
var mock = new MockAdapter(axios);

describe('Test Controller', () => {
  mock
    .onGet('/tests')
    .reply(200)
    .onGet('/tests/1')
    .reply(200)
    .onGet('/tests', { params: { id: 1 } })
    .reply(200)
    .onPost('/tests', { data: { id: 10 } })
    .reply(200)
    .onPut('/tests/10', { id: 10 })
    .reply(200)
    .onPatch('/tests/10', { id: 10 })
    .reply(200)
    .onDelete('tests/10')
    .reply(200)
    .onHead('tests')
    .reply(200)
    .onAny()
    .reply(config => {
      console.log(config);
      return new Promise(resolve => resolve([201, { success: true }]));
    });

  const todoApi = restApi.create('tests');

  test('get by path param todo 1', async () => {
    const item = await todoApi.get({ pathParams: '1' });

    expect(item.config.params).toBeUndefined();
    expect(item.config.data).toBeUndefined();
    expect(item.config.url).toBe('tests/1');
  });

  test('GET todo 1', async () => {
    const item = await todoApi.get({ params: { id: 1 } });

    expect(item.config.params).toMatchObject({ id: 1 });
    expect(item.config.url).toBe('tests');
  });

  test('GET todo', async () => {
    const item = await todoApi.get();

    expect(item.config.params).toBeUndefined();
    expect(item.config.data).toBeUndefined();
    expect(item.config.url).toBe('tests');
  });

  test('POST', async () => {
    //Create
    let item = await todoApi.post({
      data: { id: 10 }
    });

    expect(item.config.data).toBe('{"data":{"id":10}}');
    expect(item.config.params).toBeUndefined();
    expect(item.config.url).toBe('tests');
  });

  test('PUT', async () => {
    //Create
    let item = await todoApi.put({
      pathParams: [10],
      data: { id: 10 }
    });

    expect(item.config.data).toBe('{"id":10}');
    expect(item.config.params).toBeUndefined();
    expect(item.config.url).toBe('tests/10');
  });

  test('PUT with NULL data', async () => {
    //Create
    try {
      let item = await todoApi.put({
        pathParams: [10]
      });
    } catch (ex) {
      expect(ex).toBe('data is required');
    }
  });

  test('PATCH todo', async () => {
    let item = await todoApi.patch({
      pathParams: [10],
      data: { id: 10 }
    });

    expect(item.config.data).toBe('{"id":10}');
    expect(item.config.params).toBeUndefined();
    expect(item.config.url).toBe('tests/10');
  });

  test('PATCH with NULL data', async () => {
    try {
      let item = await todoApi.patch({
        pathParams: [10]
      });
    } catch (ex) {
      expect(ex).toBe('data is required');
    }
  });

  test('DELETE todo', async () => {
    let item = await todoApi.delete({
      pathParams: { id: 10, name: null }
    });

    expect(item.config.data).toBeUndefined();
    expect(item.config.params).toBeUndefined();
    expect(item.config.url).toBe('tests/10');
  });

  test('HEAD todo', async () => {
    let item = await todoApi.head();

    expect(item.config.data).toBeUndefined();
    expect(item.config.params).toBeUndefined();
    expect(item.config.url).toBe('tests');
  });

  test('HEAD todo with params', async () => {
    let item = await todoApi.head({ params: { id: 10 } });

    expect(item.config.data).toBeUndefined();
    expect(item.config.params).toMatchObject({ id: 10 });
    expect(item.config.url).toBe('tests');
  });

  test('HEAD todo with data', async () => {
    let item = await todoApi.head({ data: { id: 10 } });

    expect(item.config.data).toBe('{"id":10}');
    expect(item.config.params).toBeUndefined();
    expect(item.config.url).toBe('tests');
  });

  test('Reguest todo', async () => {
    let item = await todoApi.request({
      url: 'tests',
      params: { id: 1 },
      data: { id: 10 }
    });

    expect(item.config.data).toBe('{"id":10}');
    expect(item.config.params).toMatchObject({ id: 1 });
    expect(item.config.url).toBe('tests');
  });
});
