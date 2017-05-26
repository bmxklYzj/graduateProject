var mongoose = require('../config/mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  // userId为默认的_id
  userName: {type: String}, // 用户名
  role: {type: String, default: '1'}, // 账号角色：1普通注册用户，2管理员可以发布试题，3超级管理员
  wantToBeAdmin: {type: Boolean, default: false}, // 标志普通用户是否想成为管理员
  password: {type: String}, // 密码
  age: {type: String}, // 年龄
  sex: {type: String}, // 性别：之所以不用boolean是因为用户不填性别我会设置成未填写而非男或女
  school: {type: String}, // 学校名
  studentId: {type: String}, // 学号
  classId: {type: String}, // 班号：学号、班号 便于老师管理学生
  avator: {type: String}, // 头像
  introduce: {type: String}, // 个人简介
  interest: {type: String}, // 兴趣

  // 数组类型
  // 注意：question中result为'0'为错误、'1'为正确、'2'为选择填空无法判断、需要人工来判断
  question: {type: Array}, // 该用户做过的试题 每一项的格式：{questionId: ObjectID, answer: [], result: int}
  exam: {type: Array}, // 该用户做过的试卷，
  // 每一项的格式：{examId: ObjectID, score: String(两位的整数), teacherReviewed: false, studentComment: String, teacherComment: String}

  like: {type: Array} // 试题的点赞
});

module.exports = UserSchema;
