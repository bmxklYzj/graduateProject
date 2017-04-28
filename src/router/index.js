import Vue from 'vue'
import Router from 'vue-router'

// front
import Index from '@/components/pages/front/Index'
import Login from '@/components/pages/front/Login'
import Register from '@/components/pages/front/Register'
import Exam from '@/components/pages/front/Exam'
import Question from '@/components/pages/front/Question'
import DoExam from '@/components/pages/front/DoExam'
import ExamDone from '@/components/pages/front/ExamDone'
import Activity from '@/components/pages/front/Activity'
import Profile from '@/components/pages/front/Profile'

// admin
import AdminExam from '@/components/pages/admin/Exam'
import AdminQuestion from '@/components/pages/admin/Question'
import NewQuestion from '@/components/pages/admin/NewQuestion'


Vue.use(Router)

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
      path: '/doexam',
      name: 'DoExam',
      component: DoExam
    },
    // 做完后的统计页面
    {
      path: '/examdone',
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


    // admin-试卷
    {
      path: '/admin/exam',
      name: 'AdminExam',
      component: AdminExam
    },
    {
      path: '/admin/',
      name: 'AdminExam',
      component: AdminExam
    },
    // admin-试题
    {
      path: '/admin/question',
      name: 'AdminQuestion',
      component: AdminQuestion
    },
    // admin-创建试题
    {
      path: '/admin/newquestion',
      name: 'NewQuestion',
      component: NewQuestion
    }
  ]
});
