import RestfulCreator from '../src';

describe('Test Error Handler', () => {
  const func1 = jest.fn();

  const restApi = RestfulCreator({
    baseURL: 'http://hbd.com',
    errorHandler: func1
  });

  const todoApi = restApi.create('comments');

  test('get', async () => {
    await todoApi.get({ postId: 1 });
    expect(func1).toHaveBeenCalled();
  });
});
