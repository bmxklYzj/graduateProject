var mongoose = require('../config/mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  createUserId: {type: Schema.Types.ObjectId}, // 评论用户名
  createTime: {type: Date, default: Date.now}, // 创建时间
  updateTime: {type: Date, default: Date.now}, // 更新时间
  type: {type: String}, // 试题的类型：单选：1；多选：2；填空/问答：3
  description: {type: String}, // 试题描述
  image: {type: Array}, // 图片
  option: {type: Array}, // 选项：(注意：这里type为1时单选，数组长度为1；type为2为多选，数组长度>=2；type为3时填空/问答，数组长度不定 >=1)
  answer: {type: Array}, // 答案：(注意：这里type为1时单选，数组长度为1；type为2为多选，数组长度>=2；type为3时填空/问答，数组长度不定 =1)
  comment: {type: Array}, // 试题下面的评论
  like: {type: Array} // 试题的点赞
});

module.exports = questionSchema;
