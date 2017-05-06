<template>
<div class="header-nav">
  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo container" mode="horizontal" @select="handleSelect" >
    <el-menu-item index="1"><a href="#">首页</a></el-menu-item>
    <el-menu-item index="2"><a href="#exam">精华试卷</a></el-menu-item>
    <el-menu-item index="3"><a href="#question">精华试题</a></el-menu-item>
    <div class="header-nav-search">
      <input type="text" placeholder="搜索">
      <i class="el-icon-search"></i>
    </div>
    <el-submenu index="3">
      <template slot="title">个人中心({{userName}})</template>
      <el-menu-item index="3-1"><a href="#activity" >学习活动</a></el-menu-item>
      <el-menu-item index="3-2"><a href="#profile">个人信息</a></el-menu-item>
      <el-menu-item index="3-3"><a href="#profile">退出</a></el-menu-item>
    </el-submenu>
  </el-menu>
</div>
</template>

<script>
import jwt from 'jsonwebtoken';

let util = require('../../common/util.js');

export default {
  name: 'hello',
  data () {
    return {
      activeIndex: '1',
      userName: ''
    }
  },
  components: {

  },
  created: function () {
    let userInfo = util.getUserInfoFromToken();
    console.log(userInfo);
    this.userName = userInfo.userName;
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key;
      if (key === '3-3') {
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

    &-search {
      float: left;
      margin: 8px 0 12px;
      padding: 0 20px;
      height: 40px;
      border-radius: 5px;
      margin-left: 20px;
      background-color: #1F2D3D;

      // placeholder 颜色
      @placeholderColor: #8492A6;
      input {
        ::-webkit-input-placeholder {
           color: @placeholderColor;
        }

        :-moz-placeholder { /* Firefox 18- */
           color: @placeholderColor;
        }

        ::-moz-placeholder {  /* Firefox 19+ */
           color: @placeholderColor;
        }

        :-ms-input-placeholder {
           color: @placeholderColor;
        }
      }

      // input 背景颜色
      input {
        height: 38px;
        color: #fff;
        box-shadow: 0 0 0px 1000px #1F2D3D inset;
        border: 0;

        // focus 时去掉样式
          &:focus {
            outline-offset: 0px;
            outline: -webkit-focus-ring-color auto 0px;
            border: 0;
          }
      }

      i {
        color: #8492A6;
      }
    }
  }

  .el-submenu {
    float: right;
  }
</style>
