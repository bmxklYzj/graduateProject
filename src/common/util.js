let jwt = require('jsonwebtoken');

module.exports = {
  getUserInfoFromToken: function () {
    let token = sessionStorage.getItem('token');
    if (token) {
      let decode = jwt.verify(token, 'token');
      return decode || {};
    }
    return {};
  }
};
