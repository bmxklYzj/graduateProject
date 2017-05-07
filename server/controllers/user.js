const modelUser = require('../models/user.js');
const jwt = require('koa-jwt');
const util = require('../../src/common/util');

const getUserInfo = function* () {
  const id = this.params.id; // 获取url里传过来的参数里的id
  const result = yield modelUser.getUserById(id);  // 通过yield “同步”地返回查询结果
  this.body = result; // 将请求的结果放到response的body里返回
};

let UserRegister = function * () {
  let params = this.request.body;
  let result = yield modelUser.UserRegister(params);
  console.log(result);
  if (result) {
    const token = util.generateToken(result); // 签发token
    this.body = {
      success: true,
      token: token // 返回token
    };
  } else {
    this.body = {
      success: false,
      info: '注册失败！'
    };
  }
};

let userLogin = function * () {
  let params = this.request.body;
  let result = yield modelUser.getUserByName(params.userName);
  console.log(result);
  // 找到用户名，验证密码是否相同；没找到用户名反馈错误消息
  if (result) {
    if (result.password !== params.password) {
      this.body = {
        success: false,
        info: '密码错误！'
      };
    } else {
      const token = util.generateToken(result); // 签发token
      this.body = {
        success: true,
        token: token // 返回token
      };
    }
  } else {
    this.body = {
      success: false,
      info: '用户不存在！'
    };
  }
};

module.exports = {
  doAuth: (router) => {
    router.get('/user/:id', getUserInfo); // 定义url的参数是id
    router.post('/userRegister', UserRegister); // 注册
    router.post('/userLogin', userLogin); // 登录
  }
};
