const Koa = require('koa')
const path = require('path')
const Router = require('koa-router')
const static = require('koa-static')
const multer = require('koa-multer')
const { Excelsior } = require('../lib')

const app = new Koa();
const router = new Router()
const upload = multer()

const schema = {
  name: 'my xlsx',
  maxlength: 1000,
  first: false,
  allowEmpty: true,
  columns: [{
    title: 'title1',
    key: 'k1'
  }, {
    title: 'title2',
    key: 'k2'
  }]
}

router.post('/upload', upload.any(), async (ctx) => {
  try {
    const { req } = ctx
    const file = req.files[0]
    const excelsior = new Excelsior(schema)
    const start = new Date()
    const data = await excelsior.parse(file.buffer)

    // const data = await excelsior.validate(file)
    ctx.body = { data, cost: new Date() - start }
  } catch(err) {
    ctx.status = 400
    ctx.body = { msg: err.message }
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(static('view'))
  .listen(3008)
process.title = 'xlsxhero-example'

console.log('server is up at port 3008')
