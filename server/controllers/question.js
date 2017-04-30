let questionMode = require('../models/question');

let createQuestion = function * () {
  let params = this.request.body;
  let dbResult = yield questionMode.createQuestion(params);

  if (dbResult) {
    this.body = {
      success: true,
      info: '创建试题成功！'
    }
  } else {
    this.body = {
      success: false,
      info: '创建试题失败！'
    }
  }
};

module.exports = (router) => {
  router.post('/createQuestion', createQuestion);
};
