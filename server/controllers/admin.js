let formidable = require('koa-formidable');
let fs = require('fs');
let path = require('path');

let questionMode = require('../models/question');
let userModel = require('../models/user');

// newquestion 创建题目
let createQuestion = function * () {
  let params = this.request.body;
  let dbResult = yield questionMode.createQuestion(params);
  console.log(params, dbResult);
  if (dbResult) {
    this.body = {
      success: true,
      info: '创建试题成功！'
    };
  } else {
    this.body = {
      success: false,
      info: '创建试题失败！'
    };
  }
};

// question 获取题目列表
let questionList = function * () {
  let dbResult = yield questionMode.questionList();
  if (dbResult) {
    this.body = {
      success: true,
      data: dbResult
    };
  } else {
    this.body = {
      success: false,
      info: '获取试题失败！'
    };
  }
};

// newquestion 图片上传
function imageUpload (response, request) {
  console.log("Request handler 'upload' was called.");

  // var form = new formidable.IncomingForm();
  console.log('about to parse');
  formidable.parse(this.request, function (error, fields, files) {
    console.log('parsing done');
    fs.renameSync(files.upload.path, path.join(__dirname, '/static/test', '.png'));
    // response.writeHead(200, {'content-type': 'text/plain'});
    // response.write('received upload:\n\n');
    // response.write('received image:<br/>');
    // response.write('<img src='/show' />");
    // response.end();
  });
}

module.exports = (router) => {
  router.post('/admin/createQuestion', createQuestion);
  router.get('/admin/question', questionList);
  // router.post('/admin/imageUpload', imageUpload);
};
