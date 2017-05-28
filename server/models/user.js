var mongoose = require('../config/mongoose');
var UserSchema = require('../schema/user');

var User = mongoose.model('User', UserSchema);

let getUserById = function * (id) {
  let userInfo = yield User.findOne({
    '_id': id
  });
  return userInfo;
};

// 返回用户信息，除了密码
let getUserByIdExcludedPassword = function * (userId) {
  let userInfo = yield User.findOne({
    '_id': userId
  }, {'password': 0});
  return userInfo;
};

let getUserByName = function * (name) {
  let userInfo = yield User.findOne({
    'userName': name
  });
  return userInfo;
};

let UserRegister = function * (params) {
  let user = params;
  let userInfo = yield User.create({
    userName: user.userName,
    // role: user.role,
    // wantToBeAdmin: user.wantToBeAdmin,
    password: user.password,
    age: user.age,
    sex: user.sex,
    school: user.school,
    studentId: user.studentId,
    classId: user.classId,
    avator: user.avator,
    introduce: user.introduce,
    interest: user.interest
  });
  return userInfo;
};

// 用户做某一个题接口: 将questionId push进 user表的 question
let userDoQuestion = function * (userId, questionId, answer, userAnswerStatus, update) {
  let dbResult;
  // 默认是直接push，如果update参数为true，就更新
  if (update) {
    dbResult = yield User.update(
      {
        '_id': userId,
        'question.questionId': questionId
      },
      {
        $set: {
          'question.$.answer': answer,
          'question.$.result': userAnswerStatus
        }
      }
    );
  } else {
    dbResult = yield User.update(
      {'_id': userId},
      {
        $addToSet: {
          'question': {
            questionId: questionId,
            answer: answer,
            result: userAnswerStatus
          }
        }
      }
    );
  }
  return dbResult;
};

/**
 * 用户做某一个题接口：辅助函数-判断某一个用户是否做个某个题，
 * 即查找user表中question是否含有某个questionId
 * @param {Object} params 参数：包含userId、questionId
 */
let userHaveQuestionId = function * (params) {
  let dbResult = yield User.findOne(
    {
      '_id': params.userId,
      'question.questionId': params.questionId
    },
    {
      'question.$': 1
    }
  );
  // let sendResult;
  // dbResult.question.forEach(function (item, index) {
  //   if (params.questionId === item.questionId) {
  //     sendResult = item;
  //   }
  // });
  if (dbResult) {
    dbResult = dbResult.question[0];
  }
  return dbResult;
};

/**
 * 用户做了某一个试卷，将examId加入到user表中的 exam 字段中
 * @param {String} userId 
 * @param {String} examId 
 */
let userDoExam = function * (userId, examId, teacherReviewed, update) {
  teacherReviewed = teacherReviewed ? true : false;
  update = update ? true : false;
  let dbResult;
  // 默认是直接push，如果update参数为true，就更新
  if (update) {
    dbResult = yield User.update(
      {
        '_id': userId,
        'exam.examId': examId
      },
      {
        $set: {
          'exam.$.teacherReviewed': teacherReviewed
        }
      }
    );
  } else {
    dbResult = yield User.update(
      {
        '_id': userId
      },
      {
        $addToSet: {
          'exam': {
            examId: examId,
            teacherReviewed: teacherReviewed
          }
        }
      }
    );
  }
  return dbResult;
};
let userHaveExamId = function * (params) {
  let dbResult = yield User.findOne(
    {
      '_id': params.userId,
      'exam.examId': params.examId
    },
    {
      'exam.$': 1
    }
  );
  if (dbResult) {
    dbResult = dbResult.exam[0];
  }
  return dbResult;
};


// 试题做完后，查看统计结果页面-学生提交对试卷的评论
let examDoneStudentComment = function * (params) {
  let userId = params.userId || '';
  let examId = params.examId || '';
  let studentComment = params.studentComment || '';
  let dbResult = yield User.update(
    {
      '_id': userId,
      'exam.examId': examId
    },
    {
      $set: {
        'exam.$.studentComment': studentComment
      }
    }
  );
  return dbResult;
};

// 试题做完后，查看统计结果页面-更新用户试卷正确率，存入user表exam字段的score中
let examDoneUpdateScore = function * (params) {
  let userId = params.userId || '';
  let examId = params.examId || '';
  let score = params.score || '';
  let dbResult = yield User.update(
    {
      '_id': userId,
      'exam.examId': examId
    },
    {
      $set: {
        'exam.$.score': score
      }
    }
  );
  return dbResult;
};

// 管理员批阅试卷-更新用户试题正确率，存入user表exam字段的 result 和 teacherReviewed
let userUpdateQuestionResult = function * (params) {
  let userId = params.userId || '';
  let questionId = params.questionId || '';
  let result = params.result || '';
  let dbResult = yield User.update(
    {
      '_id': userId,
      'question.questionId': questionId
    },
    {
      $set: {
        'question.$.result': result
      }
    }
  );
  return dbResult;
};

/**
 * 根据userId查找user表中exam的所有examId
 * @param {String} userId userId
 * @param {String} limit limit
 */
let getAllExam = function * (userId, limit) {
  let dbResult = yield User.findOne({'_id': userId}, {'exam': 1}).limit(limit);
  return dbResult ? dbResult.exam : [];
};

/**
 * 根据userId查找user表中question的所有questionId
 * @param {String} userId userId
 * @param {String} limit limit
 */
let getAllQuestion = function * (userId, limit) {
  let dbResult = yield User.findOne({'_id': userId}, {'question.questionId': 1}).limit(limit);
  return dbResult ? dbResult.question : [];
};

/**
 * admin端-markList 未批阅试卷 列表
 */
let markListGetAllExam = function * () {
  let dbResult = yield User.find(
    {'exam.teacherReviewed': false}
    // ,{'exam.$': 1, 'userName': 1, '_id': 1}
  );
  return dbResult || [];
};

/**
 * admin端-markdetail 未批阅试卷 详情页
 */
let markDetailGetQuestionById = function * (userId, questionId) {
  let dbResult = yield User.findOne(
    {'_id': userId, 'question.questionId': questionId}, {'question.$': 1}
  );
  return dbResult.question[0] || [];
};


/**
 * admin端-试卷列表删除试卷
 * 参数 examId。
 * 先在user表中判断是否有用户做过
 */
let examHasBeenDone = function * (examId) {
  let count = yield User.count({'exam.examId': examId});
  return (count);
};

/**
 * admin端 - 超级管理员 获取全部用户
 */
let getAllUserList = function * () {
  // 排除role为3的超级管理员
  let dbResult = User.find({'role': /[^3]/});
  return dbResult;
};

/**
 * 根据试卷id 得到所有用户已经做过的成绩score
 * @param {String} examId 试卷id
 */
let getAllScoreByExamId = function * (examId) {
  let dbResult = yield User.find(
    {'exam.examId': examId},
    {'exam.$.score': 1}
  );
  return dbResult;
};

/**
 * 根据试题id 得到所有用户已经做过的成绩score
 * @param {String} questionId 试题id
 */
let getAllScoreByQuestionId = function * (questionId) {
  let dbResult = yield User.find(
    {'question.questionId': questionId},
    {'question.$.result': 1}
  );
  return dbResult;
};

module.exports = {
  getUserById,
  getUserByIdExcludedPassword,
  getUserByName,
  UserRegister,
  userDoQuestion,
  userHaveQuestionId,
  userDoExam,
  userHaveExamId,
  getAllExam,
  getAllQuestion,
  examDoneStudentComment,
  examDoneUpdateScore,
  userUpdateQuestionResult,
  markListGetAllExam,
  markDetailGetQuestionById,
  examHasBeenDone,
  getAllUserList,
  getAllScoreByExamId,
  getAllScoreByQuestionId
};
