let questionModel = require('../models/question');
let userModel = require('../models/user');
let examModel = require('../models/exam');



// question 获取题目列表
let questionList = function * () {
  let dbResult = yield questionModel.questionList();
  if (dbResult) {
    var temp = [];
    dbResult.forEach((item, index) => {
      temp.push(item.toJSON());
      temp[index].finishedCnt = item.userDone.length;
    });
    this.body = {
      success: true,
      data: temp
    };
  } else {
    this.body = {
      success: false,
      info: '获取试题失败！'
    };
  }
};

module.exports = {
  noAuth: (router) => {
    router.get('/question', questionList); // 获取试题列表
  }
};
