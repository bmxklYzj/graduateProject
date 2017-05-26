let jwt = require('jsonwebtoken');

module.exports = {
  // 创建token
  generateToken: function (user) {
    // 定义payload内容
    let userToken = {
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 设置一小时过期时间
      userName: user.userName,
      userId: user._id,
      userRole: user.role
    };
    let secret = 'token'; // 指定密钥
    return jwt.sign(userToken, secret) || '';
  },
  // 解析token
  getUserInfoFromToken: function () {
    let token = sessionStorage.getItem('token');
    if (token) {
      let decode = jwt.verify(token, 'token');
      return decode || {};
    }
    return {};
  }
};
