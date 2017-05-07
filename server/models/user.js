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

// 用户做某一个题接口: 将questionId push进 user表question
let userDoQuestion = function * (params) {
  let dbResult = yield User.update({'_id': params.userId},
  {$push: {'question': params.questionId}});
  return dbResult;
};

module.exports = {
  getUserById,
  getUserByName,
  UserRegister,
  userDoQuestion
};
