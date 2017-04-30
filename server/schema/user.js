var mongoose = require('../config/mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  // userId为默认的_id
  userName: {type: String}, // 用户名
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
  questions: {type: Array}, // 该用户做过的试题
  exams: {type: Array}, // 该用户做过的试卷
  comments: {type: Array}, // 该用户的评论
  like: {type: Array} // 试题的点赞
});

module.exports = UserSchema;
