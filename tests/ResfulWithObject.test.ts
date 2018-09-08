import RestfulCreator from '../src';

const restApi = RestfulCreator({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

describe('Test Controller', () => {
  const todoApi = restApi.create('todos');

  test('get todo 1', async () => {
    const item = await todoApi.get({ id: 1 });
    expect(item.data).toHaveLength(1);
  });

  test('get todo', async () => {
    const item = await todoApi.get();
    expect(item.data.length).toBeGreaterThanOrEqual(10);
  });

  test('create, update todo', async () => {
    let item = await todoApi.post({
      userId: 1,
      title: 'Duy Hoang',
      completed: false
    });

    expect(item.data.title).toBe('Duy Hoang');

    item = await todoApi.put({
      params: { id: 1, title: null },
      data: {
        ...item.data,
        title: 'Duy Hoang 10'
      }
    });

    expect(item.data.title).toBe('Duy Hoang 10');
  });

  test('PATCH todo', async () => {
    let item = await todoApi.patch({
      params: { id: 2 },
      data: { completed: true }
    });

    expect(item.data.completed).toBe(true);
  });

  test('DELETE todo with obj param', async () => {
    let item = await todoApi.delete({
      params: { id: 2 }
    });

    expect(item.data).toBeDefined();
  });

  test('Request DELETE todo', async () => {
    let item = await todoApi.request({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'DELETE'
    });

    expect(item.data).toBeDefined();
  });

  test('Request GET todo', async () => {
    let item = await todoApi.request({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET'
    });

    expect(item.data).toHaveProperty('id');
  });
});
