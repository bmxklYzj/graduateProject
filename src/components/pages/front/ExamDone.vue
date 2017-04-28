<template>
  <div class="exam-done">
    <my-header></my-header>

    <div class="container">
      <h2>恭喜您已经完成了该试卷，统计信息如下：</h2>
      <ul class="exam-done-ul">
        <li v-for="(item, index) in list">
          <span class="left">{{index}}</span>
          <span class="right">{{item}}</span>
        </li>
      </ul>
      <ul class="exam-done-ul">
        <li>
          <span class="left">试卷热度</span>
          <span class="right">
            <el-progress :text-inside="true" :stroke-width="15" :percentage="heat"></el-progress>
          </span>
        </li>
        <li>
          <span class="left">正确率</span>
          <span class="right">
            <el-progress type="circle" :percentage="accuracy"></el-progress>
          </span>
        </li>
      </ul>
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
      heat: '',
      accuracy: ''
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
        '发布者': this.data.createUser,
        '发布时间': this.data.createTime,
        '多少人已做过': this.data.finishedCnt,
        '点赞数': this.data.likeCnt,
        '评论数': this.data.commentCnt,
      };
      this.heat = +this.data.heat;
      this.accuracy = +this.data.accuracy;
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
  .exam-done {
    h2 {
      color: @green;
      margin-bottom: 50px;
    }
    &-ul {
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
  }
  
</style>
