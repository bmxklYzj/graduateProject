let questionModel = require('../models/question');
let userModel = require('../models/user');
let examModel = require('../models/exam');

// newquestion 创建题目
let createQuestion = function * () {
  let postBody = this.request.body;
  let dbResult = yield questionModel.createQuestion(postBody);
  console.log(postBody, dbResult);
  if (dbResult) {
    this.body = {
      success: true,
      info: '创建试题成功！'
    };
  } else {
    this.body = {
      success: false,
      info: '创建试题失败！'
    };
  }
};

// question 获取题目列表
let questionList = function * () {
  let token = this.request.header.authorization.split('Bearer ')[1];
  let renderAnswer = this.request.url.indexOf('api/auth/') === -1 ? false : true;  
  let dbResult = yield questionModel.questionList(this.query, renderAnswer, token
  );
  let count = yield questionModel.countQuestion(this.query);
  if (dbResult) {
    var temp = [];
    dbResult.forEach((item, index) => {
      temp.push(item.toJSON());
      temp[index].finishedCnt = item.userDone.length;
    });
    this.body = {
      success: true,
      data: {
        'totalCnt': count,
        list: temp
      }
    };
  } else {
    this.body = {
      success: false,
      info: '获取试题失败！'
    };
  }
};

// exam 创建试卷
let createExam = function * () {
  let postBody = this.request.body;
  let dbResult = yield examModel.createExam(postBody);
  if (dbResult) {
    this.body = {
      success: true,
      info: '创建试卷成功！'
    };
  } else {
    this.body = {
      success: false,
      info: '创建试卷失败！'
    };
  }
};

// exam 获取试卷列表
let examList = function * () {
  let dbResult = yield examModel.examList(this.query);
  let count = yield examModel.countExam(this.query);
  if (dbResult) {
    let temp = [];
    dbResult.forEach((item, index) => {
      temp.push(item.toJSON());
      temp[index].finishedCnt = item.userDone.length;
    });
    this.body = {
      success: true,
      data: {
        'totalCnt': count,
        list: temp
      }
    };
  } else {
    this.body = {
      success: false,
      info: '获取试卷失败！'
    };
  }
};

// 点击某一个试卷 进入到试题列表，纯展示
let examQuestionlist = function * () {
  let token = this.request.header.authorization.split('Bearer ')[1];
  let renderAnswer = this.request.url.indexOf('api/auth/') === -1 ? false : true;  
  var examId = this.params.examId;
  let dbResult = yield examModel.getExamById(examId);
  let questionResult = [];
  if (dbResult) {
    let questionArray = dbResult.question;
    for (let i = 0, len = questionArray.length; i < len; i++) {
      let item = yield questionModel.getQuestionById(questionArray[i], renderAnswer, token);
      questionResult.push(item);
      console.log(2, questionResult);
    }
    console.log(1, questionResult);
    this.body = {
      success: true,
      data: questionResult
    };
  } else {
    this.body = {
      success: false,
      info: '获取试卷失败！'
    };
  }
};

// 用户做某一个题接口
let userDoQuestion = function * () {
  let postBody = this.request.body || {};
  // 1. 更新question表中的userDone
  // 2. 更新user表中的question
  let userResult = yield userModel.userDoQuestion(postBody);
  let questionAnswer = yield questionModel.getAnswerById(postBody.questionId);
  
  console.log(postBody, dbResult);
  if (dbResult) {
    this.body = {
      success: true,
      info: '创建试题成功！'
    };
  } else {
    this.body = {
      success: false,
      info: '创建试题失败！'
    };
  }
};

module.exports = {
  createQuestion,
  questionList,
  createExam,
  examList,
  examQuestionlist,
  userDoQuestion
};
