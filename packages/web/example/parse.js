
const { Excelsior } = require('../lib')
const path = require('path')
const schema = {
  name: 'my xlsx',
  maxlength: 1000,
  first: false,
  allowEmpty: true,
  columns: [{
    title: 'title1',
    key: 'Title1'
  }, {
    title: 'title2',
    key: 'Title2'
  }, {
    title: 'title2',
    key: 'Title2'
  }, {
    title: 'title2',
    key: 'Title2'
  }, {
    title: 'title2',
    key: 'Title2'
  }, {
    title: 'title2',
    key: 'Title2'
  }, {
    title: 'title2',
    key: 'Title2'
  }, {
    title: 'title2',
    key: 'Title2'
  }]
}

;(async function() {
  const excelsior = new Excelsior(schema)
  const start = new Date()
  const data = await Promise.all([...new Array(1)].map(async i =>
    await excelsior.parse(path.join(__dirname, './excel/12k.xlsx'))
  ))
  console.log('result', data.length, new Date() - start)
})()

/// result 100 72032 without worker
/// result 100 74286 single worker
