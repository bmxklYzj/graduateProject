let app = require('koa')();
let koa = require('koa-router')();
let json = require('koa-json');
let logger = require('koa-logger');
let auth = require('./server/routes/auth.js'); // 引入auth
let jwt = require('koa-jwt');
let api = require('./server/routes/api');

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function* (next) {
  let start = new Date();
  yield next;
  let ms = new Date() - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.on('error', function (err, ctx) {
  console.log('server error', err);
});

// 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
koa.use('/auth', auth.routes());
// 所有走/api/打头的请求都需要经过jwt验证。
koa.use('/api', jwt({secret: 'token'}), api.routes());

app.use(koa.routes()); // 将路由规则挂载到Koa上。

app.listen(8889, () => {
  console.log('Koa is listening in 8889');
});

module.exports = app;
