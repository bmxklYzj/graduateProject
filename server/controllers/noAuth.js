let commonFunction = require('./commonFunction');

module.exports = {
  noAuth: (router) => {
    router.get('/question', commonFunction.questionList); // 获取试题列表
    router.get('/exam', commonFunction.examList); // 获取试题列表
  }
};
