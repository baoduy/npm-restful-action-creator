import RestCreator from '../src';

const requestHandler = jest.fn();
const errorHandler = jest.fn();

const restApi = RestCreator({
  baseURL: 'http://jsonplaceholder.typicode.com',
  errorHandler,
  onRequesting: requestHandler
});

describe('Test Controller', () => {
  const todoApi = restApi.create('comments');

  test('get by path param todo 1', async () => {
    await todoApi.get({ path: '1' });
    expect(requestHandler).toHaveBeenCalled();
  });

  test('GET todo 1', async () => {
    await todoApi.get({ params: { id: 'AAA' } });
    expect(errorHandler).toHaveBeenCalled();
  });
});
