const Benchmark = require('benchmark')
const { compose, composeInMainThread } = require('../lib')

const suite = new Benchmark.Suite
const aoa = [...new Array(100000)].map((a, i) => {
  return [i, i, i, i, i]
})
const columns = [{key:'1'}, {key:'1'}, {key:'1'}, {key:'1'}, {key:'1'}, {key:'1'}]

// add tests
suite.add('single worker', async function() {
  // console.log(aoa)
  const data = await composeInMainThread(aoa, {columns})
})
.add('multi worker', async function() {
  const data = await compose(aoa, {columns})
  // console.log(aoa)
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
