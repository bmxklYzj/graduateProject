var mongoose = require('../config/mongoose');
var UserSchema = require('../schema/user');

var User = mongoose.model('User', UserSchema);

let getUserById = function * (id) {
  let userInfo = yield User.findOne({
    'userId': id
  });
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

// 用户做某一个题接口：辅助函数-判断某一个用户是否做个某个题，
// 即查找user表中question是否含有某个questionId
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

// 用户做了某一个试卷，将examId加入到user表中的exam字段中
let userDoExam = function * (userId, examId) {
  let dbResult = yield User.update({'_id': userId},
    {
      $addToSet: {
        'exam': examId
      }
    }
  );
  return dbResult;
};

module.exports = {
  getUserById,
  getUserByName,
  UserRegister,
  userDoQuestion,
  userHaveQuestionId,
  userDoExam
};
