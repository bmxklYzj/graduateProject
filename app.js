let app = require('koa')();
let koa = require('koa-router')();
let json = require('koa-json');
let logger = require('koa-logger');
let auth = require('./server/routes/auth.js'); // 引入auth
let jwt = require('koa-jwt');
let api = require('./server/routes/api');

var parse = require('co-busboy');
var os = require('os');
var fs = require('fs');
var path = require('path');

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function* (next) {
  let start = new Date();
  yield next;
  let ms = new Date() - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});


app.use(function *(next) {  //  如果JWT验证失败，返回验证失败信息
  try {
    yield next;
  } catch (err) {
    if (401 === +err.status) {
      this.status = 401;
      this.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      };
    } else {
      throw err;
    }
  }
});

app.on('error', function (err, ctx) {
  console.log('server error', err);
});
// koa.use('/unauth', apiUnAuth.routes());

// 图片上传
app.use(function * (next) {
  console.log('hello');
  // ignore non-POSTs
  if (!('POST' === this.method && this.path === '/auth/admin/imageUpload')) return yield next;

  // multipart upload
  var parts = parse(this);
  var part;
  var uniqueImageName;

  while ((part = yield parts)) {
    uniqueImageName = Date.now().toString() + '-' + part.filename;
    var stream = fs.createWriteStream(path.join(__dirname, '/static', '/upload', uniqueImageName)); // 每次上传的图片后面加上时间戳
    part.pipe(stream);
    console.log('uploading %s -> %s', part.filename, stream.path);
  }

  this.body = {
    success: true,
    imageUrl: path.join('/static/upload/', uniqueImageName)
  };
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
