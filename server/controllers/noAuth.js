let commonFunction = require('./commonFunction');

module.exports = {
  noAuth: (router) => {
    router.get('/question', commonFunction.questionList); // 获取全部问题列表
    router.get('/exam', commonFunction.examList); // 获取全部试题列表

    // doexam 页面获取exam 在noAuth中，get('/doExamList');
    // doexam 提交exam 在auth中，post('/doExamList')
    router.get('/doExamList', commonFunction.examQuestionlist); // 做题返回该试题的全部question列表
  }
};
