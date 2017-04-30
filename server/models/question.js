let mongoose = require('../config/mongoose');
let questionSchema = require('../schema/question');

let Question = mongoose.model('Question', questionSchema);

let createQuestion = function * (params) {
  let info = yield Question.create({
    createUserId: params.createUserId,
    createTime: params.createTime,
    updateTime: params.updateTime,
    type: params.type,
    description: params.description,
    image: params.image,
    option: params.option,
    answer: params.answer,
    comment: params.comment,
    like: params.like
  });
  return info;
};

module.exports = {
  createQuestion
};
