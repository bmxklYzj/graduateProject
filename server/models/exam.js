let mongoose = require('../config/mongoose');
let examSchema = require('../schema/exam');

let globalConfig = require('../../src/common/globalConfig');

let Exam = mongoose.model('Exam', examSchema);

let createExam = function * (params) {
  let dbResult = yield Exam.create({
    createUserId: params.createUserId,
    createUserName: params.createUserName,
    description: params.description,
    createTime: params.createTime,
    updateTime: params.updateTime,
    question: params.question
  });
  return dbResult;
};

let examList = function * (params) {
  let userId = params.userId;
  let options = {};
  if (userId) {
    options = {'createUserId': userId};
  }
  let pageSize = +params.pageSize || globalConfig.pageSize;
  let currentPage = +params.currentPage || globalConfig.currentPage;

  let dbResult = yield Exam.find(options).sort({'_id': -1}).skip((currentPage - 1) * pageSize
  ).limit(pageSize);
  return dbResult;
};

let getExamById = function * (examId) {
  let dbResult = yield Exam.findOne({
    _id: examId
  });
  return dbResult;
};

let countExam = function * (params) {
  let userId = params.userId;
  let options = {};
  if (userId) {
    options = {'createUserId': userId};
  }
  let dbResult = yield Exam.count(options);
  return dbResult;
};

// 用户做了某一个试卷，将questionId加入到exam表中的userDone字段中
let userDoExam = function * (userId, examId) {
  let dbResult = yield Exam.update({'_id': examId},
    {
      $addToSet: {
        'userDone': userId
      }
    }
  );
  return dbResult;
};

module.exports = {
  createExam,
  examList,
  getExamById,
  countExam,
  userDoExam
};
