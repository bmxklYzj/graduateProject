let mongoose = require('../config/mongoose');
let classSchema = require('../schema/class');

let globalConfig = require('../../src/common/globalConfig');

let Class = mongoose.model('Class', classSchema);

/**
 * 管理员端-创建班级
 * @param {Object} params post对象
 */
let createClass = function * (params) {
  let dbResult = yield Class.create({
    className: params.className,
    subject: params.subject,
    createUserId: params.createUserId,
    createUserName: params.createUserName,
    createime: params.createime,
    exam: params.exam,
    student: params.student
  });
  return dbResult;
};

/**
 * 管理员端-获取班级列表
 * @param {String} createUserId 班级创建人id
 */
let AdminClassList = function * (createUserId) {
  let dbResult = yield Class.find(
    {'createUserId': createUserId}
  );
  return dbResult;
};


/**
 * 管理员端-删除班级
 * @param {String} classId 班级id
 */
let removeClass = function * (classId) {
  yield Class.remove({'_id': classId});
};

/**
 * 管理员端-编辑班级
 * @param {Object} params 编辑班级的参数对象，包含classId, subject, className
 */
let editClass = function * (params) {
  let classId = params.classId;
  let subject = params.subject;
  let className = params.className;
  yield Class.update(
    {'_id': classId},
    {
      'subject': subject,
      'className': className
    }
  );
};

/**
 * 管理员端-获取班级中的所有 examId
 * @param {String} classId 班级id
 */
let getExamIdInClass = function * (classId) {
  let dbResult = yield Class.findOne(
    {'_id': classId},
    {'exam': 1}
  );
  return dbResult.exam;
};

/**
 * 管理员端-在班级中添加试卷
 * @param {Stirng} classId 班级id
 * @param {Stirng} examId 试卷id
 */
let classAddExam = function * (classId, examId) {
  yield Class.update(
    {'_id': classId},
    {
      '$addToSet': {
        'exam': examId
      }
    }
  );
};

/**
 * 管理员端-移除班级中的某个试卷
 * @param {String} classId 班级id
 * @param {String} examId 试卷id
 */
let removeExamInClass = function * (classId, examId) {
  yield Class.update(
    {'_id': classId},
    {
      '$pull': {
        'exam': examId
      }
    }
  );
};

/**
 * 管理员端-获取班级中的所有学生id sutdentId
 * @param {String} classId 班级id
 */
let getStudentInClass = function * (classId) {
  let dbResult = yield Class.findOne(
    {'_id': classId},
    {'student': 1}
  );
  return dbResult.student;
};

/**
 * 管理员端-在班级中添加学生
 * @param {Stirng} classId 班级id
 * @param {Stirng} studentId 学生id
 */
let classAddStudent = function * (classId, studentId) {
  yield Class.update(
    {'_id': classId},
    {
      '$addToSet': {
        'student': studentId
      }
    }
  );
};

/**
 * 管理员端-移除班级中的某个学生
 * @param {String} classId 班级id
 * @param {String} studentId 学生id
 */
let removeStudentInClass = function * (classId, studentId) {
  yield Class.update(
    {'_id': classId},
    {
      '$pull': {
        'student': studentId
      }
    }
  );
};

let getClassList = function * (studentId) {
  let dbResult = Class.find({
    'student': studentId
  });
  return dbResult;
};


module.exports = {
  createClass,
  AdminClassList,
  removeClass,
  editClass,
  getExamIdInClass,
  classAddExam,
  removeExamInClass,
  getStudentInClass,
  classAddStudent,
  removeStudentInClass,

  // 用户端-班级列表
  getClassList
};
