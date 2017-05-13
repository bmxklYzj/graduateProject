var mongoose = require('../config/mongoose');
var Schema = mongoose.Schema;

var ClassSchema = new Schema({
  className: {type: String}, // 班级名字
  createUserId: {type: Schema.Types.ObjectId}, // 创建教师用户Id
  createUserName: {type: String}, // 创建用户名：仅仅是冗余，如果不要userName，需要跨表通过userId来查询userName
  createime: {type: Date, default: Date.now}, // 班级的创建时间
  exam: {type: Array}, // 该班级报包含的试题Id,每一项的格式：{examId: ObjectID, startTime: Date, expireTime: Date}
  student: {type: Array} // 该班级报包含的学生Id


});

module.exports = ClassSchema;
