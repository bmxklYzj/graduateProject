let mongoose = require('../config/mongoose');
let questionSchema = require('../schema/question');

let globalConfig = require('../../src/common/globalConfig');

let Question = mongoose.model('Question', questionSchema);

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

let questionList = function * (params) {
  let userId = params.userId;
  let options = {};
  if (userId) {
    options = {'createUserId': userId};
  }
  let pageSize = +params.pageSize || globalConfig.pageSize;
  let currentPage = +params.currentPage || globalConfig.currentPage;

  let info = yield Question.find(options).sort({'_id': -1}).skip((currentPage - 1) * pageSize
  ).limit(pageSize);
  return info;
};

let getQuestionById = function * (questionId) {
  let dbResult = yield Question.findOne({
    _id: questionId
  });
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

module.exports = {
  createQuestion,
  questionList,
  getQuestionById,
  countQuestion
};
