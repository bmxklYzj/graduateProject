let jwt = require('jsonwebtoken');

module.exports = {
  // 创建token
  generateToken: function (user) {
    let userToken = {
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
