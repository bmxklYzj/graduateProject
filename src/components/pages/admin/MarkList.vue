<template>
  <div class="admin-exam">
    <my-header></my-header>

    <div class="container">
      <header class="admin-exam-head">
        <span class="title">未批阅试卷列表</span>
        <!--<el-button @click="newExam()" class="button" type="primary">新建试卷</el-button>-->
      </header>
      <!--列表-->
      <template>
        <el-table
          :data="exam"
          stripe
          @row-click="goQuestionList"
          style="width: 100%">
          <el-table-column
          prop="description"
          label="试卷名称"
          :width="512"
          :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
          prop="userName"
          label="试卷作答人"
          :width="150">
          </el-table-column>
          <el-table-column
          prop="createTime"
          label="创建时间"
          :width="180">
          </el-table-column>
          <el-table-column
          prop="finishedCnt"
          label="已作答人数"
          :width="275">
          </el-table-column>

        </el-table>
      </template>

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

      exam: [],

      // 分页
      pageSize: globalConfig.pageSize,
      currentPage: 1,
      totalCnt: 0,
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
      this.$http.get('/api/auth/marklist'
      + '?pageSize=' + this.pageSize
      + '&currentPage=' + this.currentPage
      ).then(response => {
        let data = response.body.data;
        this.exam = data.list;
        this.totalCnt = data.totalCnt;
        this.exam.forEach((item) => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
          item.finishedCnt = item.userDone.length;
        });
        }, response => {
      });
    },
    goQuestionList: function (row, event, column) {
      this.$router.push('/admin/markdetail/'
      + '?userId=' + row.userId
      + '&examId=' + row._id
      );
    },
    // 分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getExam();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getExam();
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
  .el-pagination {
    float: right;
    margin-top: 20px;
  }

  .admin-exam-head {
    margin: 20px 0;
    position: relative;
    .title {
      font-size: 16px;
      position: relative;
      padding-left: 10px;
      &:before {
        display: inline-block;
        content: "";
        width: 2px;
        height: 16px;
        background-color: @blue;

        position: absolute;
        left: 0;
      }
    }

    .button {
      position: absolute;
      right: 0;
      top: -15px;
    }
  }


</style>
