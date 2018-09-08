import RestfulCreator from '../src';

const restApi = RestfulCreator('https://jsonplaceholder.typicode.com');

describe('Test Controller', () => {
  const todoApi = restApi.create('todos');

  test('get by path param todo 1', async () => {
    const item = await todoApi.get({ params: { id: 1 } });
    expect(item).toHaveProperty('id');
  });

  test('get todo 1', async () => {
    const item = await todoApi.get({ params: { id: 1 }, isPathParams: false });
    expect(item).toHaveLength(1);
  });

  test('get todo', async () => {
    const item = await todoApi.get();
    expect(item.length).toBeGreaterThanOrEqual(10);
  });

  test('create, update todo', async () => {
    let item = await todoApi.post({
      data: {
        userId: 1,
        title: 'Duy Hoang',
        completed: false
      }
    });

    expect(item.title).toBe('Duy Hoang');

    item = await todoApi.put({
      params: { id: 1 },
      isPathParams: true,
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
      isPathParams: true,
      data: { completed: true }
    });

    expect(item.completed).toBe(true);
  });

  test('DELETE todo', async () => {
    let item = await todoApi.delete({
      params: { id: 1 },
      isPathParams: true
    });

    expect(item).toBe(true);
  });

  test('Request DELETE todo', async () => {
    let item = await todoApi.request({
      url: 'https://jsonplaceholder.typicode.com/todos/100',
      method: 'DELETE'
    });

    expect(item).toBeDefined();
  });

  test('custom PUT todo', async () => {
    let item = await todoApi.request({
      url: 'https://jsonplaceholder.typicode.com/todos/100',
      method: 'PUT',
      data: {
        id: 100,
        title: 'Duy Hoang 10'
      }
    });

    expect(item).toHaveProperty('id');
  });

  test('Test Head todo', async () => {
    let item = await todoApi.head();
    expect(item).toBeDefined();
  });
});
