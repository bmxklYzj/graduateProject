let formidable = require('koa-formidable');
let fs = require('fs');
let path = require('path');

// newquestion 图片上传
function imageUpload (response, request) {
  console.log("Request handler 'upload' was called.");

//   // var form = new formidable.IncomingForm();
//   console.log('about to parse');
//   formidable.parse(this.request, function (error, fields, files) {
//     console.log('parsing done');
//     fs.renameSync(files.upload.path, path.join(__dirname, '/static/test', '.png'));
//     // response.writeHead(200, {'content-type': 'text/plain'});
//     // response.write('received upload:\n\n');
//     // response.write('received image:<br/>');
//     // response.write('<img src='/show' />");
//     // response.end();
//   });
}

module.exports = (router) => {
  router.post('/admin/imageUpload', imageUpload);
};
