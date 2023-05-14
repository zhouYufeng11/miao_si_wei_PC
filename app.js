const Koa = require('koa')
const app = new Koa()
// 模板渲染中间件
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// 解析器
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const { isPrd } = require('./configs/env')

const index = require('./routes/index')

// error handler
onerror(app, isPrd && {
  redirect: '/error'
});

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
// 使用模板渲染中间件：
app.use(views(__dirname + '/src/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
