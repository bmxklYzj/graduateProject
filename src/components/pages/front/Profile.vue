<template>
  <div class="profile">
    <my-header></my-header>

    <div class="container">
      <div class="cf">
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1017904219,2460650030&fm=23&gp=0.jpg" alt="">

        <ul class="profile-ul">
          <li v-for="(item, index) in list">
            <span class="left">{{index}}</span>
            <span class="right">{{item}}</span>
          </li>
        </ul>
    </div>

      <el-button class="button cf" type="primary">更新个人信息</el-button>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import Header from '../../common/Header.vue'
import Footer from '../../common/Footer.vue'

export default {
  name: 'hello',
  data () {
    return {
      data: '',
      list: '',
    }
  },
  components: {
    'my-header': Header,
    'my-footer': Footer
  },
  created: function () {
    this.getExam();
    
  },
  methods: {
    getExam: function () {
      this.$http.get('./api/exam_done.ajax').then(response => {
        this.data = response.body.data || {};
        this.formatData();
        }, response => {
      });
    },
    formatData: function () {
      this.list = {
        '昵称': this.data.createUser,
        '性别': this.data.createTime,
        '学校': this.data.finishedCnt,
        '年龄': this.data.likeCnt,
        '学院': this.data.commentCnt,
      };
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../static/assets/css/common.less';
  .container {
    margin-top: 50px;
    overflow: hidden;
  }
  .profile {
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      float: left;
    }

    &-ul {
      float: left;
      margin-left: 100px;
      li {
        padding: 10px 0;
        span {
          display: inline-block;
        }
        .left {
          width: 100px;
          text-align: right;
        }
        .right {
          min-width: 300px;
          vertical-align: middle;
          padding-left: 20px;
        }
      }
    }

    .button {
      clear: both;
      display: block;
      width: 200px;
      margin-top: 40px;
    }
  }
  
</style>
