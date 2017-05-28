<template>
  <div class="admin-exam">
    <my-header></my-header>

    <div class="container">
      <header class="admin-exam-head">
        <span class="title">试卷统计</span>
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
    this.getExam();
  },
  methods: {
    getExam: function () {
      let examId =  location.href.split('?examId=')[1].split('&')[0];
      this.$http.get('/api/auth/examStatistic'
      + '?examId=' + examId
      ).then(response => {
        let dataRec = response.body.data;
        this.data = {
          '试卷作答人数': dataRec.finishedCnt,
          '试卷平均分': dataRec.averageScore,
          '试卷最高分': dataRec.maxScore || 0,
          '试卷最低分': dataRec.minScore || 0,
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
        width: 100px;
        margin-right: 20px;
        text-align: right;
      }
    }
  }
  
</style>
