# webpack

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 华丽的分割线

本次开发的框架基于vue-cli，使用`vue init webpack my-project-name` 来创建的，但是默认创建的项目没有提供mock数据的功能，本项目在此基础上添加了前端mock数据的功能，可以作为 spa 项目的脚手架使用。移动端项目：基于 vue-resource 和 饿了么的 mint-ui

开发的一点总结：
此脚手架是用express4作为服务器来热加载的
1. 关于静态文件的存放：

在`npm run dev` 其实执行的是 `build/dev-server.js` ，在文件有这一句`app.use(staticPath, express.static('./static'))` 其中 staticPath 是 `./static` 说明static文件夹是静态资源的存放目录。
所以我将全局的normalize.css / 工具less文件common.less 都放在了这里

```
static
    └── assets
        ├── css
        │   ├── common.less
        │   └── normalize.css
        ├── js
        │   └── zepto-1.2.0.min.js
        └── logo.png
```

然后normalize.css  在index.html中使用标签link来引入 `<link rel="stylesheet" href="./static/assets/css/normalize.css">`
common.less则需要在每个组件中引入，如：

```
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../static/assets/css/common.less';
```


# 使用vue-cli 构建项目开发购物车

## vue-cli 初始化项目
vue-cli是vue官方提供的用于快速构建vue项目的脚手架，初始化项目十分有用，webpack都是配置好了的，开箱即用。

```bash
# 安装vue-cli
cnpm i -g vue-cli

# vue list 用于查看可以初始化是么类型的项目。都用下看下目录结构，我常用 vue init webpack my-project-name
vue list

  Available official templates:

  ★  browserify - A full-featured Browserify + vueify setup with hot-reload, linting & unit testing.
  ★  browserify-simple - A simple Browserify + vueify setup for quick prototyping.
  ★  simple - The simplest possible Vue setup in a single HTML file
  ★  webpack - A full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction.
  ★  webpack-simple - A simple Webpack + vue-loader setup for quick prototyping.
```

## 开发中遇到的问题

1. 打算做一个前后端分离的项目，就是前端请求ajax或php接口，后端只需要开发接口就行了。但是前端这里如何mock数据？

  使用vue-resource请求的接口：

  ```js
    methods: {
      getDataSwipe: function () {
        this.$http.get('/api/index_swipe.php').then(response => {
          console.log(response);
          this.swipeArray = response.body.data;
        }, response => {
          console.log(response);
        });
      }
    }
  ```

  这时候需要把get、post等请求先打到本地的mock数据中，
  思路就是把所有api打头 .php结尾（如：`"api/xxx.php"`）的请求 都定向到mock文件夹中对应xxx.js文件中去

  ```js
  // serve pure static assets
  var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
  app.use(staticPath, express.static('./static'))

  // 上面几行是原有的代码，便于定位
  // app.use('/api', express.static('./mock')) // 之所以不用这一行是因为我们需要特殊处理下，把前端请求的xx.php换成xx.js(前端的mock数据)，而且还需要用all方法处理所有请求
  // )
  app.all(/api(\/\w+)+\.php$/, function (req, res) {
    var url = req.url || '';
    url = url.replace(/api/, 'mock');
    var temp = url.split('.');
    fs.readFile(path.join(__dirname, '../', temp[0]) + '.js', 'utf-8', function (err, data) {
        if (err) {
          console.log(1, err);
          return;
        } else {
          // res.set('Content-Type','application/json');
          try {
            data = JSON.parse(data);
          } catch (err) {
            console.log(err);
          }
          res.send(data);
        }
    });
  });
  ```

  然后在src的根目录创建mock目录，里面写上mock数据（json）就好了。形如：

  ```json
    {
        "status": 200,
        "error": null,
        "data": {
          "success": true
          }
    }
  ```

  **mock数据的改进**

  上面的mock数据方式虽然mock数据中可以直接写json格式的数据，但是还不完美，比如我需要输出数组，直接在mock数据中复制粘贴真的是太恶心了！希望次mock数据是一段js，能够执行然后返回mock数据，在上面我们使用`fs.readFile`方法读出的是`utf-8`格式文本格式，需要使用`JSON.parse`转成json格式的然后发出json形式的mock数据。

  现在关键的一步是我们需要把读取的文本文件当成js先执行，然后返回json形式的mock数据。搜索知道这里可以使用nodejs内置的vm模块来执行js。只需要`data = JSON.parse(data);`换成如下两行即可：

  ```js
  var script = new vm.Script('javascirpt string');
  var dat = script.runInNewContext();
  ```

  先`new Script`创建一个实例，该函数接受的就是 js的文本字符串，然后通过 runInNewContext() 函数来执行就可返回 执行后的js了，此时我们的mock数据可以写成这样：

  ```js
  (function() {
   var data = [];
   for (var i = 0; i < 12; i++) {
     data.push({
       "title": "title" + i,
       "description": "描述" + i,
       "image": "https://img6.bdstatic.com/img/image/smallpic/w1.jpg",
       "url": "/detail?id=123"
     })
   }

   var res = {
     status: 200,
     error: null,
     "data": data
   }

   return res;
  })();
  ```

  怎么，是不是很完美！


2. 打包部署

  weppack打包部署后发现静态文件的地址不对，解决： 在 `config/index.js` 中 `assetsPublicPath: '/',`, 改成 `assetsPublicPath: './',`，变成相对路径即可

  主要打包可以把 productionSourceMap: false, 设成false减小体积


