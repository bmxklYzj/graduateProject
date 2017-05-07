<template>
  <div class="exam">
    <my-header></my-header>

    <div class="container">
      <!--列表-->
      <div class="exam-table">
        <div class="exam-table-head">
          <span class="th1"></span>
          <span class="th2">试卷名称</span>
          <span class="th3">创建人</span>
          <span class="th4">创建时间</span>
          <span class="th5">已作答人数</span>
          <span class="th6">热度</span>
        </div>
        <div class="exam-table-body" v-for="(item, index) in exam"  :key="index">
          <div class="exam-table-body-row" @click="clickTr(item, index)">
            <span class="th1"></span>
            
            <span class="th2" :title="item.description">{{item.description}}</span>
            <span class="th3">{{item.createUserName}}</span>
            <span class="th4">{{item.createTime}}</span>
            <span class="th5">{{item.finishedCnt}}<input type="text" v-model="item.createUserName">{{item.createUserName}}</span>
            <span class="th6">{{item.heat}}{{item.showContent}}</span>
          </div>
          <div class="exam-table-body-content" v-show="item.showContent">
            <span class="th1"></span>
            <span class="th2" :title="item.description">{{item.description}}</span>
            <span class="th3">{{item.createUserName}}</span>
            <span class="th4">{{item.createTime}}</span>
            <span class="th5">{{item.finishedCnt}}</span>
            <span class="th6">{{item.heat}}{{item.showContent}}</span>
          </div>
        </div>
      </div>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5, 20, 50, 100, 200, 500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCnt">
      </el-pagination>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import Header from '../../common/Header.vue'
import Footer from '../../common/Footer.vue'

let moment = require('moment');
let util = require('../../../common/util.js');
let globalConfig = require('../../../common/globalConfig.js');


export default {
  name: 'hello',
  data () {
    return {
      radio: '',
      checkbox: [],
      textarea: '',

      // 图片模态框
      dialogVisible: false,
      dialogImageUrl: '',
      // {
      //   "title": "春季校园招聘-互联网公司面试题：内含题目解答",
      //   "createUser": "张三李四",
      //   "createTime": "2017-04-01",
      //   "finishedCnt": ~~(Math.random() * 10) + 1,
      //   "heat":  ~~(Math.random() * 10) + 1
      // }
      exam: [],
      // checkList: [], // 多选的数组

      // 分页
      pageSize: globalConfig.pageSize,
      currentPage: 1,
      totalCnt: 0,
    }
  },
  components: {
    'my-header': Header,
    'my-footer': Footer
  },
  created: function () {
    this.getQuestion();
  },
  methods: {
    getQuestion: function () {
      this.$http.get('./api/question'
        + '?pageSize=' + this.pageSize
        + '&currentPage=' + this.currentPage
        ).then(response => {
          let data = response.body.data;
          this.exam = data.list;
          this.totalCnt = data.totalCnt;
          this.exam.forEach((item, index) => {
            /*
            这里遇到了诡异的bug：当 exam数据是直接模拟的、或者是后端返回了radio='',
            那么在table中每个radio是互不影响的。
            但是如果后端没返回，我在这里的forEach中手动加上去，就会有问题，总是不能刷新radio，点击了没反应
            我觉得肯定是跟vue、element-ui的生命周期有关。坑了我三四个小时啊！

            暂时就不解决radio和checkbox了，textarea每个是分离的好使着，就保留着
            */
            if (+item.type === 3) {
              item.textarea = [];
            }
            item.showContent = true;
            item.showAnswer = false;
            item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
            item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
            this.$set(this.exam, index, item)
            
          });
          // for (let i = 0, len = this.exam.length; i < len; i++) {
          //   this.exam[i].radio = '';
          // }
        }, response => {
      });
    },
    answerQuestion(row) {
      console.log(row, this);
      row.radio = 3;
      row.answer = [1];
      row.showAnswer = true;

      let token = util.getUserInfoFromToken() || {};
      let params = {
        userId: token.userId,
        questionId: row._id,
      };
      // 单选
      if (+row.type === 1) {
        params.answer = [this.radio];
      } else if (+row.type === 2) {
        params.answer = this.checkbox;
      } else if (+row.type === 3) {
        params.answer = [row.textarea];
      }
      // 用户做某一个题接口
      this.$http.post('api/auth/userDoQuestion', params).then(response => {
        var data = response.body || {};
        if (data.success) {
          this.$message.success('提交成功！');
          this.$router.push('/admin/question');
        } else {
          this.$message.error('提交失败！');
        }
      }, response => {
        this.$message.error('提交失败！');
      });
    },
    imagePreview(url) {
      this.dialogVisible = true;
      this.dialogImageUrl = url;
    },
    // 分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getQuestion();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getQuestion();
    },

    clickTr: function (item, index, event) {
      console.log(item, index, event);
      
      item.showContent = !item.showContent;
      this.$oset(this.exam, index, item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../static/assets/css/common.less';

  @border-color: #DFE6EC;
  @bg-gray: #FAFAFA;
  @bg-deep-gray: #EEF1F6;
  @bg-content-color: #FBFDFF;
  .exam-table {
    border: 1px solid @border-color;
    th {
      text-align: left;
      padding: 10px 0;
      background-color: @bg-deep-gray;
    }
    tr {
      border-top: 1px solid @border-color;
      height: 40px;
      td {
        div {
          margin-right: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }

    &-head,
    &-body {
      font-size: 0;
      span {
        font-size: 16px;
        line-height: 40px;
        height: 40px;
        vertical-align: top;
        display: inline-block;
        text-align: left;
        background-color: @bg-deep-gray;
        .text-ellipsis();
      }
      .th1 {
        width: 55px;
      }
      .th2 {
        width: 460px;
      }
      .th3,
      .th6 {
        width: 150px;
      }
      .th4 {
        width: 180px;
      }
      .th5 {
        width: 120px;
      }
    }
    &-body {
      border-top: 1px solid @border-color;
      span {
        font-size: 14px;
        background-color: #fff;
        padding-right: 10px;
        box-sizing: border-box;
        
      }
      &-content {
        padding: 30px 30px 30px 55px;
        font-size: 14px;
      }
    }
  }

  .container {
    margin-top: 100px;
    overflow: hidden;
  }
  .el-pagination {
    float: right;
    margin-top: 20px;
  }

  .question-item {
    padding-left: 20px;
  }

  .question-desc {
    // margin-bottom: 40px;
    &-image-wrap {
      margin-bottom: 40px;
      img {
        border: 2px solid @blue;
        height: 100px;
        margin-right: 30px;
      }
    }
    &-answer {
      margin-top: 40px;
    }
    &-label-span {
      margin:0 20px 0 10px;
    }

    &-btn {
      display: block;
      margin-top: 40px;
    }
  }

  .el-checkbox,
  .el-radio,
  .el-textarea {
    display: block;
    margin: 15px 0;
    white-space: normal;
    line-height: 1.5;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
</style>
