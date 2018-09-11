import { mergeUrl } from '../src/helper';

test('merge obj path test', () => {
  const item = mergeUrl('h', { id: 1, name: 'hoang' });
  expect(item).toBe('h/1/hoang');
});

test('merge Array path test', () => {
  const item = mergeUrl('h', [1, 'hoang']);
  expect(item).toBe('h/1/hoang');
});

test('merge String path test', () => {
  const item = mergeUrl('h', '1/hoang');
  expect(item).toBe('h/1/hoang');
});
