let jwt = require('jsonwebtoken');

module.exports = {
  user: {
    userName: '',
    userRole: '',
    userId: ''
  },
  // register或者login之后将用户信息放到配置文件中，命名错误，但是很多地方用到了这个名字，就没有修改了
  getUserInfoFromToken: function () {
    let token = sessionStorage.getItem('token') || null;
    if (token) {
      return JSON.parse(decodeURIComponent(escape(atob(token.split('.')[1]))));
    }
    return this.user;
  },

  userRole: {
    '0': '已注销的账号',
    '1': '学生',
    '2': '教师',
    '3': '超级管理员'
  }
};
