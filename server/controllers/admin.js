let commonFunction = require('./commonFunction');

module.exports = (router) => {
  router.post('/question', commonFunction.createQuestion); // 创建试题
  router.get('/question', commonFunction.questionList); // 获取试题列表
  router.post('/exam', commonFunction.createExam); // 创建试卷
  router.get('/exam', commonFunction.examList); // 获取试卷列表
  router.get('/examquestionlist/:examId', commonFunction.examQuestionlist); // 点击某一个试卷 进入到试题列表，纯展示
};
