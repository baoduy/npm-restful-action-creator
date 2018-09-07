import ResfulCreator from '../src';

const restful = ResfulCreator({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

test('get todo', async () => {
  const todoRest = restful.create('todos');
  const item = await todoRest.get({ params: { id: 1 } });

  expect(item).toBe({
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false
  });
});
