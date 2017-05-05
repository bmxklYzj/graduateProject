<template>
  <div>
    <my-header></my-header>

    <div class="login-header">
      <div class="container">
        <el-row>
          <el-col :md="12">
            <div class="left">
              <p class="big">You can <br>learn faster here</p>
              <p class="small">致力于打造一个高质量的在线答题社区。</p>
            </div>
          </el-col>
          <el-col :md="12">
            <div class="right">
              <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-color="#fff">
                <el-form-item label="用户名" prop="userName">
                  <el-input v-model="form.userName" placeholder="请输入用户名" class="form-item-input"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="form.password" placeholder="请输入密码" @keyup.enter.native="submitForm('form')" class="form-item-input"></el-input>
                </el-form-item>
              </el-form>
              <el-button  @click="submitForm('form')" class="login-btn" type="primary submit">登录</el-button>
              <a class="register-btn" href="#register">还没有注册？点此注册</a>
            </div>
          </el-col>
        </el-row>
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
      form: {
        name: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          this.$message.error('表单填写错误，请重新填写！');
          return false;
        }
      });
    },
    login: function () {
      var params = {
        userName: this.form.userName,
        password: this.form.password
      };
      this.$http.post('auth/userLogin', params).then(response => {
        var data = response.body || {};
        if (data.success) {
          this.$message.success('登录成功！');
          sessionStorage.setItem('token', data.token);
          this.$router.push('/');
        } else {
          this.$message.error(data.info || '登录失败！');
          sessionStorage.setItem('token', null);
        }
      }, response => {
        this.$message.error(data.info || '登录失败！');
        sessionStorage.setItem('token', null);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../static/assets/css/common.less';
  .login-header {
    width: 100%;
    min-height: 450px;

    // 渐变
    background: #606c88;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #3f4c6b, #606c88); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    // .left,
    // .right {
    //   width: 50%;
    // }
    .left {
      color: #fff;
      line-height: 1.2;
      .big {
        font-size: 60px;
        margin: 140px 0 55px;
      }
      .small {
        font-size: 20px;
      }
    }
    .right {
      @width: 300px;
      margin-top: 160px;
      color: #fff;
      text-align: right;
      .el-form {
        width: 400px;
        float: right;
      }
      label {
        display: block;
        text-align: right;
        margin-bottom: 30px;
      }
      .el-input {
        width: @width;
      }

      .login-btn {
        margin-top: 30px;
        width: @width;
        font-size: 18px;
      }
      .register-btn {
        display: block;
        margin: 10px 80px 0 0;
        color: #fff;
        text-decoration: underline;
      }
    }
  }

  .btn-join {
    width: 360px;
    height: 50px;
    font-size: 24px;
    display: block;
    margin: auto;
  }
</style>
