let mongoose = require('../config/mongoose');
let examSchema = require('../schema/exam');

let globalConfig = require('../../src/common/globalConfig');

let Exam = mongoose.model('Exam', examSchema);

let createExam = function * (params) {
  let dbResult = yield Exam.create({
    createUserId: params.createUserId,
    createUserName: params.createUserName,
    description: params.description,
    requirement: params.requirement,
    createTime: params.createTime,
    updateTime: params.updateTime,
    question: params.question,
    dateRange: params.dateRange
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


/**
 * 删除试卷
 * @param {String} examId 试卷id
 */
let removeExam = function * (examId) {
  yield Exam.remove({'_id': examId});
};

/**
 * 试题是否已经被加入到试卷中，没哟可以删，否则不能删
 * @param {String} questionId 试卷id
 */
let questionHasBeenAddedToExam = function * (questionId) {
  let count = Exam.count({'question': questionId});
  return (count);
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

// 试题做完后，查看统计结果页面：根据userId查找exam表中的所有的question中的questionId
let examGetQuestion = function * (examId) {
  let dbResult = yield Exam.findOne({'_id': examId},
    {
      'question': 1
    }
  );
  return dbResult ? dbResult.question : [];
};

module.exports = {
  createExam,
  examList,
  getExamById,
  countExam,
  userDoExam,
  examGetQuestion,
  removeExam,
  questionHasBeenAddedToExam
};
