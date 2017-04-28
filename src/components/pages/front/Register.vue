<template>
  <div>
    <my-header></my-header>

    <div class="login-header">
      <div class="container">
        <el-row class="login-header-form" :gutter="0">
          <el-col :md="9">
            <label>
              用户名：
              <el-input v-model="name" placeholder="请输入用户名"></el-input>
            </label>
            <label>
              密码：
              <el-input v-model="password" placeholder="请输入密码"></el-input>
            </label>
            <label>
              确认密码：
              <el-input v-model="name" placeholder="请输入用户名"></el-input>
            </label>
            <label>
              昵称：
              <el-input v-model="password" placeholder="请输入密码"></el-input>
            </label>
          </el-col>
          <el-col :md="12">
            <label>
              省份：
              <el-input v-model="name" placeholder="请输入用户名"></el-input>
            </label>
            <label>
              学校：
              <el-input v-model="password" placeholder="请输入密码"></el-input>
            </label>
            <label>
              学号：
              <el-input v-model="name" placeholder="请输入用户名"></el-input>
            </label>
            <label>
              班级：
              <el-input v-model="password" placeholder="请输入密码"></el-input>
            </label>
          </el-col>
        </el-row>
        <div class="register-btn-group">
            <el-button class="login-btn" type="primary">注册</el-button>
            <a class="register-btn" href="#login">已有账号？点此登录</a>
        </div>
      </div>
    </div>
    <div class="container">
      <login-introduce
        :imgIsLeft="false"
        src="../../static/assets/img/introduce1.png"
         h2="精选试卷"
         :h="{row1: '根据用户点赞、评论数及答题数判断题目热度，', row2: '展示当前最有价值的试卷和试题，', row3: '让你不错过每一套优质题目。'}"
        ></login-introduce>
        <login-introduce
        :imgIsLeft="true"
        src="../../static/assets/img/introduce2.png"
         h2="每周英雄榜"
         :h="{row1: '充分发掘用户的答题信息记录，进行详细的分析，', row2: '让你一目了然的看到学习记录和成绩，', row3: '帮你树立学习的自信！'}"
        ></login-introduce>
        <login-introduce
        :imgIsLeft="false"
        src="../../static/assets/img/introduce3.png"
         h2="多样的互动环节"
         :h="{row1: '通过点赞、评论你不仅可以在这里收获知识，', row2: '更能寻找到良师益友，', row3: '祝你学习愉快！'}"
        ></login-introduce>

        <el-button class="btn-join" type="primary">加入我们的圈子！</el-button>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import Header from '../../common/Header.vue'
import Footer from '../../common/Footer.vue'
import LoginIntroduce from '../../LoginIntroduce.vue'

export default {
  name: 'hello',
  data () {
    return {
        name: '',
        password: ''
    }
  },
  components: {
    'my-header': Header,
    'my-footer': Footer,
    'login-introduce': LoginIntroduce
    // 'component-arousel': componentCarousel,
    // 'component-grid': componentGrid,
    // 'component-gap': componentGap
  },
  created: function () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../static/assets/css/common.less';
  .el-form-item__label {
    color: red;
  }
  .login-header {
    width: 100%;
    min-height: 450px;

    // 渐变
    background: #606c88;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #3f4c6b, #606c88); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    @width: 300px;
    &-form {
      padding-top: 80px;
      color: #fff;
      text-align: right;

      label {
        display: block;
        text-align: right;
        margin-bottom: 30px;
      }
      .el-input {
        width: @width;
      }
    }
    .login-btn {
      margin-top: 30px;
      width: @width;
      font-size: 18px;
    }
    .register-btn {
      display: block;
      margin: 10px 0 30px;
      color: #fff;
      text-decoration: underline;
    }
  }

  .register-btn-group {
    margin: auto;
    text-align: center;
    overflow: hidden;
  }

  .btn-join {
    width: 360px;
    height: 50px;
    font-size: 24px;
    display: block;
    margin: auto;
  }
</style>
