import ResfulCreator from '../src';

const restApi = ResfulCreator('https://jsonplaceholder.typicode.com');

describe('Test Controller', () => {
  const todoApi = restApi.create('todos');

  test('get todo 1', async () => {
    const item = await todoApi.get({ id: 1 });
    expect(item).toHaveLength(1);
  });

  test('get todo', async () => {
    const item = await todoApi.get();
    expect(item.length).toBeGreaterThanOrEqual(10);
  });

  test('create, update todo', async () => {
    let item = await todoApi.post({
      userId: 1,
      title: 'Duy Hoang',
      completed: false
    });

    expect(item.title).toBe('Duy Hoang');

    item = await todoApi.put({
      params: { id: 1 },
      data: {
        ...item,
        title: 'Duy Hoang 10'
      }
    });

    expect(item.title).toBe('Duy Hoang 10');
  });

  test('PATCH todo', async () => {
    let item = await todoApi.patch({
      params: { id: 1 },
      data: { completed: true }
    });

    expect(item.completed).toBe(true);
  });

  test('DELETE todo', async () => {
    let item = await todoApi.delete({
      params: { id: 1 }
    });

    expect(item).toBe(true);
  });

  test('Request DELETE todo', async () => {
    let item = await todoApi.request({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'DELETE'
    });

    expect(item).toBeDefined();
  });

  test('Request GET todo', async () => {
    let item = await todoApi.request({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET'
    });

    expect(item).toHaveProperty('id');
  });
});
