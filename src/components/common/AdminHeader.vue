<template>
<div class="header-nav">
  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo container" mode="horizontal" @select="handleSelect" >
    <el-menu-item index="1">后台管理</el-menu-item>
    <el-menu-item index="2"><a href="#/admin">试卷</a></el-menu-item>
    <el-menu-item index="3"><a href="#/admin/question">试题</a></el-menu-item>
    <el-menu-item index="4"><a href="#/admin/marklist">未批阅试卷</a></el-menu-item>
    <el-menu-item index="5"><a href="#/admin/class">班级</a></el-menu-item>
    <el-menu-item index="7" v-if="+token.userRole === 3"><a href="#/admin/manageuser">超级管理员管理用户</a></el-menu-item>

    <el-menu-item index="6" class="right-menu"><a>退出</a></el-menu-item>
     
  </el-menu>
</div>
</template>

<script>
let util = require('../../common/util.js');

export default {
  name: 'hello',
  data () {
    return {
      activeIndex: '1',
      token: ''
    }
  },
  components: {

  },
  created: function () {
      this.token = util.getUserInfoFromToken() || {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key;
      if (+key === 6) {
        sessionStorage.removeItem('token');
        this.$router.push('/');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../static/assets/css/common.less';

  .header-nav {

    .el-menu-item,
    .el-submenu__title {
      font-size: 18px;
    }

    background-color: #324157;

    a {
      text-decoration: none;
    }
  }

  .right-menu {
    float: right;
  }
</style>
