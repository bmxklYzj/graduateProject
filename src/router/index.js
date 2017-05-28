import Vue from 'vue';
import Router from 'vue-router';

// front
import Index from '@/components/pages/front/Index';
import Login from '@/components/pages/front/Login';
import Register from '@/components/pages/front/Register';
import Exam from '@/components/pages/front/Exam';
import Question from '@/components/pages/front/Question';
import DoExam from '@/components/pages/front/DoExam';
import ExamDone from '@/components/pages/front/ExamDone';
import Activity from '@/components/pages/front/Activity';
import Profile from '@/components/pages/front/Profile';

// admin
import AdminExam from '@/components/pages/admin/Exam';
import AdminExamStatistic from '@/components/pages/admin/ExamStatistic';
import AdminQuestion from '@/components/pages/admin/Question';
import AdminQuestionStatistic from '@/components/pages/admin/QuestionStatistic';
import NewQuestion from '@/components/pages/admin/NewQuestion';
import QuestionList from '@/components/pages/admin/QuestionList';
import MarkList from '@/components/pages/admin/MarkList';
import MarkDetail from '@/components/pages/admin/MarkDetail';
import Class from '@/components/pages/admin/Class';
import ClassInfo from '@/components/pages/admin/ClassInfo';
import ManageUser from '@/components/pages/admin/ManageUser';

// common: 没有权限
import DontHaveAuth from '@/components/pages/common/DontHaveAuth';
import FileNotFind from '@/components/pages/common/FileNotFind';


Vue.use(Router);

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    // 精华试卷
    {
      path: '/exam',
      name: 'Exam',
      component: Exam
    },
    // 精华试题
    {
      path: '/question',
      name: 'Question',
      component: Question
    },
    // 做题
    {
      path: '/doexam/*',
      name: 'DoExam',
      component: DoExam
    },
    // 做完后的统计页面
    {
      path: '/examdone/*',
      name: 'ExamDone',
      component: ExamDone
    },
    // 个人中心-学习活动
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    // 个人中心-个人信息
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },


    // admin-试卷列表
    {
      path: '/admin/exam',
      name: 'AdminExam',
      component: AdminExam
    },
    // admin-试卷列表-试卷统计
    {
      path: '/admin/examstatistic',
      name: 'AdminExamStatistic',
      component: AdminExamStatistic
    },
    {
      path: '/admin/',
      name: 'AdminExam',
      component: AdminExam
    },
    // admin-试题列表
    {
      path: '/admin/question',
      name: 'AdminQuestion',
      component: AdminQuestion
    },
    // admin-试题列表-试题统计
    {
      path: '/admin/questionstatistic',
      name: 'AdminQuestionStatistic',
      component: AdminQuestionStatistic
    },
    // admin-创建试题
    {
      path: '/admin/newquestion',
      name: 'NewQuestion',
      component: NewQuestion
    },
    // admin-点击某一个试卷 进入到试题列表，纯展示
    {
      path: '/admin/questionlist/*',
      name: 'QuestionList',
      component: QuestionList
    },
    // admin-未批阅试卷列表
    {
      path: '/admin/marklist',
      name: 'MarkList',
      component: MarkList
    },
    // admin-未批阅试卷 详情页面
    {
      path: '/admin/markdetail/*',
      name: 'MarkDetail',
      component: MarkDetail
    },
    // admin-班级列表
    {
      path: '/admin/class',
      name: 'Class',
      component: Class
    },
    // admin-班级详细信息，内含试卷列表和学生列表
    {
      path: '/admin/classinfo',
      name: 'ClassInfo',
      component: ClassInfo
    },
    // admin-超级管理员管理用户
    {
      path: '/admin/manageuser',
      name: 'ManageUser',
      component: ManageUser
    },


    // common: 没有权限
    {
      path: '/dontHaveAuth',
      name: 'DontHaveAuth',
      component: DontHaveAuth
    },

    // not fond： 其它未匹配的路由跳到 fileNotFind
    {
      path: '/*',
      name: 'FileNotFind',
      component: FileNotFind
    }


  ]
});
