let commonFunction = require('./commonFunction');

module.exports = (router) => {
  // admin端
  router.post('/question', commonFunction.createQuestion); // 创建试题
  router.get('/question', commonFunction.questionList); // 获取试题列表
  router.post('/exam', commonFunction.createExam); // 创建试卷
  router.get('/exam', commonFunction.examList); // 获取试卷列表
  router.get('/examquestionlist', commonFunction.examQuestionlist); // 点击某一个试卷 进入到试题列表，纯展示

  // 用户前端
  router.post('/userDoQuestion', commonFunction.userDoQuestion); // 用户做某一个题接口

  // doexam 页面获取exam 在noAuth中，get('/doExamList');
  // doexam 提交exam 在auth中，post('/doExamList')
  router.post('/doExamList', commonFunction.doExamListPost); // 做题返回该试题的全部question列表
  // 试题做完后，查看统计结果页面
  router.get('/examDone', commonFunction.examDone); // 做题返回该试题的全部question列表
  // 试题做完后，查看统计结果页面-学生提交对试卷的评论
  router.post('/examDoneStudentComment', commonFunction.examDoneStudentComment); // 做题返回该试题的全部question列表

  // 用户活动页面：获取做过的试题、试卷
  router.get('/userExamList', commonFunction.userExamList); // 做题返回该试题的全部question列表
  router.get('/userQuestionList', commonFunction.userQuestionList); // 做题返回该试题的全部question列表

  // 用户个人信息页面：获取个人信息，除了密码
  router.get('/profile', commonFunction.profile); // 做题返回该试题的全部question列表


};
