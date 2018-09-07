import ResfulCreator from '../src';

const restful = ResfulCreator('https://jsonplaceholder.typicode.com');

describe('Test Controller', () => {
  const todoRest = restful.create('todos');

  test('get todo 1', async () => {
    const item = await todoRest.get({ params: { id: 1 } });
    expect(item).toHaveLength(1);
  });

  test('get todo', async () => {
    const item = await todoRest.get();
    expect(item.length).toBeGreaterThanOrEqual(10);
  });

  test('create, update todo', async () => {
    let item = await todoRest.post({
      data: {
        userId: 1,
        title: 'Duy Hoang',
        completed: false
      }
    });

    expect(item.title).toBe('Duy Hoang');

    item = await todoRest.put({
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
    let item = await todoRest.patch({
      params: { id: 1 },
      isPathParams: true,
      data: { completed: true }
    });

    expect(item.completed).toBe(true);
  });

  test('DELETE todo', async () => {
    let item = await todoRest.delete({
      params: { id: 1 },
      isPathParams: true
    });

    expect(item).toBe(true);
  });

  test('Request todo', async () => {
    let item = await todoRest.request({
      url: 'https://jsonplaceholder.typicode.com/todos/100',
      method: 'DELETE'
    });

    expect(item).toBeDefined();
  });

  test('custom PUT todo', async () => {
    let item = await todoRest.request({
      url: 'https://jsonplaceholder.typicode.com/todos/100',
      method: 'PUT',
      data: {
        id: 100,
        title: 'Duy Hoang 10'
      }
    });

    expect(item).toBeDefined();
  });

  test('Test Head todo', async () => {
    let item = await todoRest.head();
    expect(item).toBeDefined();
  });
});
