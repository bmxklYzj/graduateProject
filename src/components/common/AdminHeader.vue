<template>
<div class="header-nav">
  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo container" mode="horizontal" @select="handleSelect" >
    <el-menu-item index="1">后台管理</el-menu-item>
    <el-menu-item index="2"><a href="#/admin">试卷</a></el-menu-item>
    <el-menu-item index="3"><a href="#/admin/question">试题</a></el-menu-item>

    <el-menu-item index="4" class="right-menu"><a>退出</a></el-menu-item>
     
  </el-menu>
</div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      activeIndex: '2'
    }
  },
  components: {

  },
  created: function () {
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (+key === 4) {
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
