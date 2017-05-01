let mongoose = require('../config/mongoose');
let examSchema = require('../schema/exam');

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

let examList = function * () {
  let dbResult = yield Exam.find({});
  return dbResult;
};

let getExamById = function * (examId) {
  let dbResult = yield Exam.findOne({
    _id: examId
  });
  return dbResult;
};

module.exports = {
  createExam,
  examList,
  getExamById
};
