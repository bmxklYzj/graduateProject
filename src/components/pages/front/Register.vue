<template>
  <div>
    <my-header></my-header>

    <div class="register-header">
      <div class="container">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-color="#fff" class="cf register-header-form">
          <el-form-item label="用户名" prop="userName" class="form-item">
            <el-input v-model="form.userName" placeholder="请输入用户名" class="form-item-input"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input v-model="form.repassword" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="form.sex" placeholder="请输入性别"></el-input>
          </el-form-item>
          <el-form-item label="学校" prop="school">
            <el-input v-model="form.school" placeholder="请输入学校"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="studentId">
            <el-input v-model="form.studentId" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="班号" prop="classId">
            <el-input v-model="form.classId" placeholder="请输入班号"></el-input>
          </el-form-item>
            <el-form-item label="个人简介" prop="introduce">
            <el-input type="textarea" v-model="form.introduce" placeholder="请输入个人简介"></el-input>
          </el-form-item>
          <!-- 兴趣 -->
          <div class="register-header-interest">
            <label>感兴趣的科目</label>
            <div class="wrap">
              <el-select
                v-model="form.interest"
                multiple
                filterable
                allow-create
                placeholder="请输入你感兴趣的科目">
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-form>

        <div class="register-btn-group">
            <el-button @click="submitForm('form')" class="login-btn" type="primary">注册</el-button>
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
import LoginIntroduce from '../../common/LoginIntroduce.vue'
import md5 from 'md5'

let util = require('../../../common/util.js');

export default {
  name: 'hello',
  data () {
    return {
      form: {
        userName: '',
        password: '',
        repassword: '',
        age: '',
        sex: '',
        school: '',
        studentId: '',
        classId: '',
        avator: '',
        introduce: '',
        interest: ''
      },
      options: [{
        value: '高数',
        label: '高数'
      }, {
        value: '大物',
        label: '大物'
      }, {
        value: '英语',
        label: '英语'
      }],

      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        repassword: [
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
          if (this.form.password !== this.form.repassword) {
            this.$message.error('两次密码如不一致，请重新填写！');
            return false;
          }
          this.register();
        } else {
          this.$message.error('表单填写错误，请重新填写！');
          return false;
        }
      });
    },
    register: function () {
      var params = {
        userName: this.form.userName,
        password: md5(this.form.password),
        age: this.form.age,
        sex: this.form.sex,
        school: this.form.school,
        studentId: this.form.studentId,
        classId: this.form.classId,
        avator: this.form.avator,
        introduce: this.form.introduce,
        interest: this.form.interest.join(',')
      };
      this.$http.post('doAuth/userRegister', params).then(response => {
        var data = response.body || {};
        if (data.success) {
          this.$message.success('注册成功！');
          sessionStorage.setItem('token', data.token);
          util.user = Object.assign({}, data.user);
          this.$router.push('/');
        } else {
          this.$message.error('注册失败！');
          sessionStorage.setItem('token', null);
        }
      }, response => {
        this.$message.error('注册失败！');
        sessionStorage.setItem('token', null);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
  @import '../../../../static/assets/css/common.less';
  .register-header {
    width: 100%;
    min-height: 450px;

    // 渐变
    background: #606c88;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #3f4c6b, #606c88); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    @width: 300px;
    &-form {
      padding-top: 50px;
    }
    .el-form-item {
      width: 35%;
      margin-right: 10%;
      margin-left: 5%;
      float: left;

      .el-form-item__label {
        color: #fff;
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

  .register-header-interest {
    display: inline-block;
    width: 35%;
    float: right;
    margin-right: 10%;
    label {
      width: 100px;
      color: #fff;
      float: left;
      padding: 11px 12px 11px 0;
      box-sizing: border-box;
    }
    .el-select {
      width: 100%;
    }
    .wrap {
      margin-left: 100px;
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
