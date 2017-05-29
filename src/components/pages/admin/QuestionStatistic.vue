<template>
  <div class="admin-exam">
    <my-header></my-header>

    <div class="container">
      <header class="admin-exam-head">
        <span class="title">试题统计</span>
      </header>

      <div class="statistic">
        <p class="item" v-for="(item, index) in data">
          <span class="left">{{index}}</span>
          <span class="right">{{item}}</span>
        </p>
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
let moment = require('moment');
import AdminHeader from '../../common/AdminHeader.vue'
import Footer from '../../common/Footer.vue'

let util = require('../../../common/util.js');
let globalConfig = require('../../../common/globalConfig.js');

export default {
  name: 'hello',
  data () {
    return {
      token: '',

      data: {}
    }
  },
  components: {
    'my-header': AdminHeader,
    'my-footer': Footer
  },
  created: function () {
    this.token = util.getUserInfoFromToken() || {};
    this.getQuestion();
  },
  methods: {
    getQuestion: function () {
      let questionId =  location.href.split('?questionId=')[1].split('&')[0];
      this.$http.get('/api/auth/questionStatistic'
      + '?questionId=' + questionId
      ).then(response => {
        let dataRec = response.body.data;
        this.data = {
          '试题作答总人数': dataRec.finishedCnt,
          '试题作答正确人数': dataRec.rightCnt,
          '试题作答错误人数': dataRec.falseCnt,
          '试题作答正误待教师批阅人数': dataRec.unknownCnt,
        }
        }, response => {
      });
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

    .admin-exam-head {
      .title {
        font-size: 20px;
        margin-bottom: 30px;
        display: inline-block;
      }
    }
  }

  .statistic {
    .item {
      width: 600px;
      .left {
        display: inline-block;
        width: 190px;
        margin-right: 20px;
        text-align: right;
      }
    }
  }

</style>
