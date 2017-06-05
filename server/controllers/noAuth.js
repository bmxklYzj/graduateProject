let commonFunction = require('./commonFunction');

module.exports = {
  noAuth: (router) => {
    router.get('/question', commonFunction.questionList); // 获取全部问题列表
    router.get('/exam', commonFunction.examList); // 获取全部试题列表

    // doexam 页面获取exam 在noAuth中，get('/doExamList');
    // doexam 提交exam 在auth中，post('/doExamList')
    router.get('/doExamList', commonFunction.examQuestionlist); // 做题返回该试题的全部question列表

    // 班级相关
    // 获取班级列表
    router.get('/classList', commonFunction.getClassList);
    // 获取班级中的试卷
    router.get('/getExamInClass', commonFunction.AdminGetExamIdInClass);
    // 获取班级中的学生
    router.get('/getStudentInClass', commonFunction.AdminGetStudentIdInClass);
  }
};
