var mongoose = require('../config/mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  userId: {type: Schema.Types.ObjectId}, // 评论用户名
  userName: {type: String}, // 冗余的userName
  questionId: {type: Schema.Types.ObjectId}, // 评论问题id
  createTime: {type: Date, default: Date.now}, // 创建时间
  content: {type: String} // 内容
});

module.exports = commentSchema;
