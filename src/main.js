// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import '../static/assets/css/common.less';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';

let util = require('./common/util');

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueResource);

router.beforeEach((to, from, next) => {
  let sessionToken = sessionStorage.getItem('token');
  // console.log(token, to, from, next);
  // 有token，如果是登录、注册跳到首页，否则跳到原来的页面
  // 无token，直接跳到登录
  if (sessionToken) {
    if (to.path === '/login' || to.path === '/register') {
      next('/');
    } else {
      Vue.http.headers.common['Authorization'] = 'Bearer ' + sessionToken; // 注意Bearer后有个空格
      // 普通用户不能访问admin模块，这里使用前端控制的，感觉后端也应该控制下
      let token = util.getUserInfoFromToken();
      if (to.path.startsWith('/admin') && !(+token.userRole === 2 || +token.userRole === 3)) {
        next('/dontHaveAuth');
      } else {
        next();
      }
    }
    // next('/login');
  } else {
    if (to.path === '/' || to.path.startsWith('/exam') || to.path.startsWith('/question')) {
      next();
    } else if (to.path === '/login' || to.path === '/register') {
      next();
    } else {
      next('/login');
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
