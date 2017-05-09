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

// question 获取题目列表: 
// query: userId, pageSize, currentPage
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
// get 参数：examId
let examQuestionlist = function * () {
  let token = this.request.header.authorization.split('Bearer ')[1];
  let renderAnswer = this.request.url.indexOf('api/auth/') === -1 ? false : true;  
  var examId = this.query.examId;
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
// request.body 三个参数：userId, questionId, answer
let userDoQuestion = function * () {
  let postBody = this.request.body || {};
  let questionResult = yield questionModel.getQuestionById(postBody.questionId, true);

  let userHaveQuestionId = yield userModel.userHaveQuestionId(postBody);
  if (userHaveQuestionId) {
    this.body = {
      success: true,
      info: '已经做过此题目！',
      data: {
        userAnswerStatus: userHaveQuestionId.result,
        answer: questionResult.answer
      }
    };
    return;
  }
  // 1. 更新question表中的userDone
  // 2. 更新user表中的question
  let qResult = yield questionModel.userDoQuestion(postBody.userId, postBody.questionId);

  let userAnswerStatus = 0;
  //  题目类型为3表示选择填空题，正误待定为2
  if (+postBody.type === 3) {
    userAnswerStatus = 2;
  } else if (postBody.answer.sort().join('') === questionResult.answer.sort().join('')) {
    userAnswerStatus = 1;
  }
  // 更新user表:这里不更新，只是push，因为前面发现如果做过就直接返回了
  yield userModel.userDoQuestion(postBody.userId, postBody.questionId, postBody.answer, userAnswerStatus);


  console.log(qResult, questionResult);
  if (questionResult) {
    this.body = {
      success: true,
      info: '操作成功！',
      data: {
        userAnswerStatus: userAnswerStatus,
        answer: questionResult.answer
      }
    };
  } else {
    this.body = {
      success: false,
      info: '操作失败！'
    };
  }
};

let doExamListPost = function * () {
  let postBody = this.request.body || {};

  // 用户提交试卷，需要做三件事：
  // 1. 用户做了某一个试卷，将examId加入到user表中的userDone字段中
  yield userModel.userDoExam(postBody.userId, postBody.examId);
  // 2. 用户做了某一个试卷，将questionId加入到exam表中的userDone字段中
  yield examModel.userDoExam(postBody.userId, postBody.examId);

  // 3. 更新post进来的每一个questionId/userId:具体分为两步：
  // （1）更新question表中：把userId加入到question表中的userDone
  // （2）更新user表：     把questionId加入到user表中的question
  let array = postBody.items || [];
  // 在循环中使用yield要用for，不能用forEach
  for (let i = 0, len = array.length; i < len; i++) {
  // array.forEach(function * (item, index) {
    let item = array[i];
    yield questionModel.userDoQuestion(item.userId, item.questionId);

    let questionResult = yield questionModel.getQuestionById(item.questionId, true);
    let userAnswerStatus = 0;
    //  题目类型为3表示选择填空题，正误待定为2
    if (+item.type === 3) {
      userAnswerStatus = 2;
    } else if (item.answer.sort().join('') === questionResult.answer.sort().join('')) {
      userAnswerStatus = 1;
    }
    // 查询用户是否做过某个题：即查找当前item.questionId是否存在于user表的question.questionId中
    // 没做过就push，做过就set更新
    let userHaveQuestionId = yield userModel.userHaveQuestionId(item);
    userHaveQuestionId = userHaveQuestionId ? true : false;
    yield userModel.userDoQuestion(item.userId, item.questionId, item.answer, userAnswerStatus, userHaveQuestionId)
  }

  this.body = {
    success: true,
    info: '操作成功！'
  };
};

module.exports = {
  createQuestion,
  questionList,
  createExam,
  examList,
  examQuestionlist,
  userDoQuestion,
  doExamListPost
};
