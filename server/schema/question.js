var mongoose = require('../config/mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  createUserId: {type: Schema.Types.ObjectId}, // 创建用户id
  createUserName: {type: String}, // 创建用户名：仅仅是冗余，如果没有userName，需要跨表来查询user通过userId来查询userName
  createTime: {type: Date, default: Date.now}, // 创建时间
  updateTime: {type: Date, default: Date.now}, // 更新时间
  type: {type: String}, // 试题的类型：单选：1；多选：2；填空/问答：3
  description: {type: String}, // 试题描述
  image: {type: Array}, // 图片
  option: {type: Array}, // 选项：(注意：这里type为1时单选，数组长度为1；type为2为多选，数组长度>=2；type为3时填空/问答，数组长度不定 >=1)
  answer: {type: Array}, // 答案：(注意：这里type为1时单选，数组长度为1；type为2为多选，数组长度>=2；type为3时填空/问答，数组长度不定 =1)

  // 用户数据
  userDone: {type: Array}, // 哪些人做了此试题
  like: {type: Array} // 试题的点赞
});

module.exports = questionSchema;
