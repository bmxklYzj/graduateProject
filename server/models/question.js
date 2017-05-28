let mongoose = require('../config/mongoose');
let questionSchema = require('../schema/question');

let globalConfig = require('../../src/common/globalConfig');

let Question = mongoose.model('Question', questionSchema);

// 创建试题
let createQuestion = function * (params) {
  let info = yield Question.create({
    createUserId: params.createUserId,
    createUserName: params.createUserName,
    createTime: params.createTime,
    updateTime: params.updateTime,
    type: params.type,
    description: params.description,
    image: params.image,
    option: params.option,
    answer: params.answer,
    comment: params.comment,
    like: params.like
  });
  return info;
};

/**
 * 删除试题
 * @param {String} questionId 试题id
 */
let removequestion = function * (questionId) {
  yield Question.remove({'_id': questionId});
};

// 获取全部试题
let questionList = function * (params, renderAnswer) {
  let userId = params.userId;
  let options = {};
  if (userId) {
    options = {'createUserId': userId};
  }
  let renderAnswerOption = {};
  if (!renderAnswer) {
    renderAnswerOption = {'answer': 0};
  }
  let pageSize = +params.pageSize || globalConfig.pageSize;
  let currentPage = +params.currentPage || globalConfig.currentPage;

  let info = yield Question.find(options, renderAnswerOption).sort({'_id': -1}).skip((currentPage - 1) * pageSize
  ).limit(pageSize);
  return info;
};

let getQuestionById = function * (questionId, renderAnswer) {
  let renderAnswerOption = {};
  if (!renderAnswer) {
    renderAnswerOption = {'answer': 0};
  }
  let dbResult = yield Question.findOne({
    _id: questionId
  }, renderAnswerOption);
  return dbResult;
};

let countQuestion = function * (params) {
  let userId = params.userId;
  let options = {};
  if (userId) {
    options = {'createUserId': userId};
  }
  let dbResult = yield Question.count(options);
  return dbResult;
};

// 用户做某一个题接口: userID push进 question 的 userDone
let userDoQuestion = function * (userId, questionId) {
  let dbResult = yield Question.update({'_id': questionId},
  {$addToSet: {'userDone': userId}});
  return dbResult;
};

module.exports = {
  createQuestion,
  removequestion,
  questionList,
  getQuestionById,
  countQuestion,
  userDoQuestion
};
