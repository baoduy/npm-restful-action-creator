import Benchmark from 'benchmark';
import { mergeUrl } from '../src/helper';

const suite = new Benchmark.Suite();

test('Test Benchmark', () => {
  suite
    .add('benchmark mergeUrl with object', () =>
      mergeUrl('h', { id: 1, name: 'hoang' })
    )
    .add('benchmark mergeUrl with array', () => mergeUrl('h', [1, 'hoang']))
    .add('benchmark mergeUrl with string', () => mergeUrl('h', '1/hoang'))
    // add listeners
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ async: false });
});
