let jwt = require('jsonwebtoken');

module.exports = {
  user: {
    userName: '',
    userRole: '',
    userId: ''
  },
  // register或者login之后将用户信息放到配置文件中，命名错误，但是很多地方用到了这个名字，就没有修改了
  getUserInfoFromToken: function () {
    return this.user;
  }
};
