import RestCreator from '../src';

const restApi = RestCreator({
  baseURL: 'http://jsonplaceholder.typicode.com'
});

describe('Test comments', () => {
  const todoApi = restApi.create('comments');

  test('name', () => {
    expect(todoApi.name).toBe('comments'.toUpperCase());
  });

  test('get', async () => {
    const item = await todoApi.get<Array<any>>({ postId: 1 });

    expect(item.data.length).toBe(5);
  });
});

describe('Test comments', () => {
  const todoApi = restApi.create('posts');

  test('post', async () => {
    const item = await todoApi.post<{ id: number }>({
      title: 'Duy Hoang',
      body: 'Duy Hoang'
    });

    expect(item.data.id).toBeGreaterThanOrEqual(100);
  }, 10000);

  test('delete', async () => {
    const item = await todoApi.delete(1);
    expect(item.request._header).toContain('DELETE /posts/1');
  }, 10000);

  test('GET pathParams array', async () => {
    const item = await todoApi.get({ pathParams: [1] });
    expect(item.request._header).toContain('GET /posts/1');
  });

  test('GET pathParams value', async () => {
    const item = await todoApi.get({ pathParams: 1 });
    expect(item.request._header).toContain('GET /posts/1');
  });

  test('Test run multi requests with All', async () => {
    const item = await todoApi.all([
      todoApi.get({ pathParams: 1 }),
      todoApi.get({ pathParams: 2 })
    ]);
    expect(item.length).toBe(2);
  });
});
