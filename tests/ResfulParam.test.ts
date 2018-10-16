import RestfulCreator from '../src';

const restApi = RestfulCreator({
  baseURL: 'http://jsonplaceholder.typicode.com'
});

describe('Test comments', () => {
  const todoApi = restApi.create('comments');

  test('name', () => {
    expect(todoApi.name).toBe('comments'.toUpperCase());
  });

  test('get', async () => {
    const item = await todoApi.get({ postId: 1 });

    expect(item.data.length).toBe(5);
  });
});

describe('Test comments', () => {
  const todoApi = restApi.create('posts');

  test(
    'post',
    async () => {
      const item = await todoApi.post({
        title: 'Duy Hoang',
        body: 'Duy Hoang'
      });

      expect(item.data).toMatchObject({
        title: 'Duy Hoang',
        body: 'Duy Hoang'
      });
    },
    10000
  );

  test(
    'delete',
    async () => {
      const item = await todoApi.delete(1);
      expect(item.request._header).toContain('DELETE /posts/1');
    },
    10000
  );

  test('GET pathParams array', async () => {
    const item = await todoApi.get({ pathParams: [1] });
    expect(item.request._header).toContain('GET /posts/1');
  });

  test('GET pathParams value', async () => {
    const item = await todoApi.get({ pathParams: 1 });
    expect(item.request._header).toContain('GET /posts/1');
  });
});
