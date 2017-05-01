var mongoose = require('../config/mongoose');
var Schema = mongoose.Schema;

var examSchema = new Schema({
  createUserId: {type: Schema.Types.ObjectId}, // 评论用户名
  createTime: {type: Date, default: Date.now}, // 创建时间
  updateTime: {type: Date, default: Date.now}, // 更新时间
  questions: {type: Array}, // 包含的问题id

  // 用户数据
  userDone: {type: Array} // 哪些人做了此试题
});

module.exports = examSchema;
