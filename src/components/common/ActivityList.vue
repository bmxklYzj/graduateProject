<template>
  <section class="list">
    <div class="head">{{title}}</div>
    <ul class="table-list">
      <template v-for="(item, index) in list">
        <li class="table-list-li" v-if="title === '做过的试卷'" @click="goExamDone(item)">
        <!--<li class="table-list-li" v-else>-->
          <div class="li-head">
            <span class="title">{{item.description}}</span>
            <span class="heat">热度：{{item.heat}}</span>
            <span class="cnt">作答人数：{{item.finishedCnt}} 人</span>
          </div>
        </li>
        <li class="table-list-li" v-else>
          <div class="li-head">
            <span class="title">{{item.description}}</span>
            <span class="heat">热度：{{item.heat}}</span>
            <span class="cnt">作答人数：{{item.finishedCnt}} 人</span>
          </div>
        </li>
        <ul>
          <li>
            <div class="li-content" v-if="title === '做过的试卷'">
              <p v-if="item.teacherComment">教师评语：{{item.teacherComment}}</p>
              <p v-if="item.studentComment">学生意见、交流：{{item.studentComment}}</p>
              <p>选择填空类主观题教师已经阅卷：{{item.teacherReviewed ? '是' : '否'}}</p>
              <p>该试卷的选择填空类主观题教师 {{item.teacherReviewed ? '已经阅卷，成绩是最终成绩' : '还没有阅卷，显示的是单选、多选类客观题分数'}}得分：{{item.score}}</p>
            </div>
          </li>
        </ul>
      </template>
    </ul>

    <div class="exam-analysis" v-if="title === '做过的试卷'">
      <h3>试卷总统计</h3>
      <p>做过的试卷总数：{{examAnalysis.totalExam}}</p>
      <p>做过的试卷最高分：{{examAnalysis.maxScore}}</p>
      <p>做过的试卷最低分：{{examAnalysis.minScore}}</p>
      <p>做过的试卷平均分：{{examAnalysis.averageScore}}</p>
    </div>
  </section>
</template>

<script>
let util = require('../../common/util.js');
let globalConfig = require('../../common/globalConfig.js')

export default {
  name: 'hello',
  props: {
    title: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      token: '',
      examAnalysis: {}, // 试卷统计对象
      list: []
    }
  },
  components: {
  },
  created: function () {
    this.token = util.getUserInfoFromToken() || {};
    this.getList();
  },
  methods: {
    getList: function () {
      let hrefName = '';
      if (this.title === '做过的试卷') {
        hrefName = 'userExamList';
      } else if (this.title === '做过的试题') {
        hrefName = 'userQuestionList';
      }
      this.$http.get('./api/auth/' + hrefName
        + '?userId=' + this.token.userId
        + '&limit=' + globalConfig.indexListCnt
      ).then(response => {
        this.list = response.body.data;

        // 试卷统计对象
        let scoreArray = [];
        this.list.forEach(function(item, index) {
          scoreArray.push(+item.score);
        }, this);
        this.examAnalysis = {
          maxScore: Math.max.apply(null, scoreArray),
          minScore: Math.min.apply(null, scoreArray),
          totalExam: scoreArray.length,
          averageScore: ~~(scoreArray.reduce(function(pre, nex, index){return pre + nex;}) / scoreArray.length)
        };
        }, response => {
      });
    },
    goExamDone: function (item) {
      this.$router.push('/examdone/' + item._id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../static/assets/css/common.less';
  @height: 50px;

  .list {
    margin-top: 100px;
    color: @text-black;
    .head {
      color: @blue;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .table-list {
      &-li {
        padding: 0 2%;
        line-height: @height;
        height: @height;
        border-top: 1px solid @border;
        border-bottom: 1px solid @border;

        &:last-child {
          border-bottom: 1px solid @border;
        }

        .title {
          width: 70%;
          .text-ellipsis();
        }
        .cnt,
        .heat {
          float: right;
          width: 10%;
          text-align: right;
          color: @text-gray;
          font-size: 14px;
        }
      }
    }
    .li-head {
      height: 50px;
    }
    .li-content {
      p {
        margin: 5px 0;
        line-height: 1.5;
      }
      padding: 2% 0 2% 5%;
    }
    .exam-analysis {
      margin-left: 2%;
      h3 {
         margin-left: -2%;
        font-size: 24px;
        font-weight: normal;
        color: @blue;
      }
    }
  }
</style>
