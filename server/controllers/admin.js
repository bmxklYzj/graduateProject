let questionModel = require('../models/question');
let userModel = require('../models/user');
let examModel = require('../models/exam');

// newquestion 创建题目
let createQuestion = function * () {
  let params = this.request.body;
  let dbResult = yield questionModel.createQuestion(params);
  console.log(params, dbResult);
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

// exam 创建试题
let createExam = function * () {
  let params = this.request.body;
  let dbResult = yield examModel.createExam(params);
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

// exam 获取试题列表
let examList = function * () {
  let dbResult = yield examModel.examList();
  if (dbResult) {
    let temp = [];
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
      info: '获取试卷失败！'
    };
  }
};

// 点击某一个试卷 进入到试题列表，纯展示
let examQuestionlist = function * () {
  var examId = this.params.examId;
  let dbResult = yield examModel.getExamById(examId);
  let questionResult = [];
  if (dbResult) {
    let questionArray = dbResult.question;
    for (let i = 0, len = questionArray.length; i < len; i++) {
      let item = yield questionModel.getQuestionById(questionArray[i]);
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

module.exports = (router) => {
  router.post('/admin/question', createQuestion); // 创建试题
  router.get('/admin/question', questionList); // 获取试题列表
  router.post('/admin/exam', createExam); // 创建试卷
  router.get('/admin/exam', examList); // 获取试卷列表
  router.get('/admin/examquestionlist/:examId', examQuestionlist); // 点击某一个试卷 进入到试题列表，纯展示
};
