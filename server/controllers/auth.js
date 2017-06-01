let commonFunction = require('./commonFunction');

module.exports = (router) => {
  // admin端
  router.post('/question', commonFunction.createQuestion); // 创建试题
  router.get('/question', commonFunction.questionList); // 获取试题列表
  // 查看试题统计
  router.get('/questionStatistic', commonFunction.questionStatistic); // 获取试题列表
  router.post('/exam', commonFunction.createExam); // 创建试卷
  router.get('/exam', commonFunction.examList); // 获取试卷列表
  // 查看试卷统计
  router.get('/examStatistic', commonFunction.examStatistic); // 获取试卷列表
  
  // 删除某一个试卷
  router.delete('/exam', commonFunction.deleteExam); // 点击某一个试卷 进入到试题列表，纯展示
  router.get('/examquestionlist', commonFunction.examQuestionlist); // 点击某一个试卷 进入到试题列表，纯展示
   // 删除某一个试卷
  router.delete('/question', commonFunction.deleteQuestion); // 点击某一个试卷 进入到试题列表，纯展示

  // marklist admin端-未批阅列表
  router.get('/marklist', commonFunction.markList);
  // marklist admin端-未批阅 详细情况
  router.get('/markdetail', commonFunction.markDetail);
  // marklist admin端-未批阅 教师提交批阅
  router.post('/markdetail', commonFunction.markDetailPost);

  // 管理员端班级
  // 管理员端-获取班级列表
  router.get('/AdminClassList', commonFunction.AdminClassList);
  // 管理员端-创建班级
  router.post('/AdminNewClass', commonFunction.AdminNewClass);
  // 管理员端-创建班级
  router.put('/AdminEditClass', commonFunction.AdminEditClass);
  // 管理员端-删除班级
  router.delete('/AdminDeleteClass', commonFunction.AdminDeleteClass);
  // 管理员端-获取班级中的试卷
  router.get('/AdminGetExamIdInClass', commonFunction.AdminGetExamIdInClass);
  // 管理员端-在班级中添加试卷
  router.post('/AdminClassAddExam', commonFunction.AdminClassAddExam);
  // 管理员端-在班级中移除试卷
  router.delete('/AdminClassRemoveExam', commonFunction.AdminClassRemoveExam);
  // 管理员端-获取班级中的学生
  router.get('/AdminGetStudentIdInClass', commonFunction.AdminGetStudentIdInClass);
  // 管理员端-在班级中添加学生
  router.post('/AdminClassAddStudent', commonFunction.AdminClassAddStudent);
  // 管理员端-在班级中移除学生
  router.delete('/AdminClassRemoveStudent', commonFunction.AdminClassRemoveStudent);


  

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




  // admin端 - 超级管理员 获取全部用户
  router.get('/manageUser', commonFunction.manageUser);
};
