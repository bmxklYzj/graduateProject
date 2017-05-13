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

      <el-alert
        v-if="teacherReviewed"
        :title="'此次试卷中包含 ' + questionTypeThreeCnt + ' 个填空问答题，并且老师已批阅此类主观题。正确率的统计计算了单选、多选题型、填空问答的全部提醒'"
        type="info"
        show-icon>
      </el-alert>
      <el-alert
        v-else
        :title="'此次试卷中包含 ' + questionTypeThreeCnt + ' 个填空问答题，老师还没有批阅此类主观题！填空问答为主观题、判题机器人无法识别正误。正确率的统计只计算了单选、多选题型。'"
        type="info"
        show-icon>
      </el-alert>

        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="您可以输入对试题的评价或想对老师说的话，教师在后台可以看到"
          v-model="studentComment">
        </el-input>
        <el-button type="primary" @click="submitStudentComment()">提交评论</el-button>

    </div>


    <my-footer></my-footer>
  </div>
</template>

<script>
import Header from '../../common/Header.vue'
import Footer from '../../common/Footer.vue'

let moment = require('moment');
let util = require('../../../common/util.js');

export default {
  name: 'hello',
  data () {
    return {
      examId: '',
      token: '',
      studentComment: '',
      data: '',
      list: '',
      heat: 0,
      accuracy: 0,
      percentage: 0,
      questionTypeThreeCnt: 0, // 是否有选择填空题
      teacherReviewed: false,
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
      this.examId = location.href.split('/examdone/')[1].split('/')[0];
      this.token = util.getUserInfoFromToken() || {};

      this.$http.get('./api/auth/examDone'
      + '?examId=' + this.examId
      + '&userId=' + this.token.userId
      ).then(response => {
        this.data = response.body.data || {};
        this.formatData();
        }, response => {
      });
    },
    formatData: function () {
      this.list = {
        '发布者': this.data.createUserName,
        '试卷标题': this.data.description,
        '发布时间': moment(this.data.createTime).format('YYYY-MM-DD HH:mm:ss'),
        '多少人已做过': this.data.finishedCnt
      };
      this.heat = +this.data.heat;
      let questionList = this.data.list;
      let rightCnt = 0;
      let falseCnt = 0;
      questionList.forEach(function(item, index) {
        if (+item.result === 0) {
          falseCnt++;
        } else if (+item.result === 1) {
          rightCnt++;
        } else if (+item.result === 2) {
          this.questionTypeThreeCnt++;
        }
      }, this);
      if (+this.questionTypeThreeCnt === 0) {
        this.teacherReviewed = true;
      } else {
        this.teacherReviewed = this.data.teacherReviewed;
      }
      this.accuracy = ~~(rightCnt / (rightCnt + falseCnt) * 100);

    },
    submitStudentComment: function () {
      let params = {
        studentComment: this.studentComment,
        'examId': this.examId,
        'userId': this.token.userId
      }
      this.$http.post('./api/auth/examDoneStudentComment', params).then((response) => {
        var data = response.body || {};
        if (data.success) {
          this.$message.success('提交成功！');
          this.$router.push('/admin/exam');
        } else {
          this.$message.error('提交失败！');
        }
      }, response => {
        this.$message.error('提交失败！');
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
    .el-textarea {
      margin: 50px 0 20px;
    }
  }
  
</style>
