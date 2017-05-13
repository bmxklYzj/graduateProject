var mongoose = require('../config/mongoose');
var Schema = mongoose.Schema;

var examSchema = new Schema({
  createUserId: {type: Schema.Types.ObjectId}, // 评论用户名
  createUserName: {type: String}, // 创建用户名：仅仅是冗余，如果不要userName，需要跨表通过userId来查询userName
  description: {type: String}, // 试卷描述
  requirement: {type: String}, // 教师对于试题的要求
  createTime: {type: Date, default: Date.now}, // 创建时间
  updateTime: {type: Date, default: Date.now}, // 更新时间
  question: {type: Array}, // 包含的问题id

  // 用户数据
  userDone: {type: Array} // 哪些人做了此试题
});

module.exports = examSchema;
