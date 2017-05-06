<template>
  <div class="exam">
    <my-header></my-header>

    <div class="container">
      <!--列表-->
      <template>
        <el-table
          :data="exam"
          stripe
          style="width: 100%">
          <el-table-column
          prop="description"
          label="试卷名称"
          :width="512"
          :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
          prop="createUserName"
          label="创建人"
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
          :width="120">
          </el-table-column>
          <el-table-column
          prop="heat"
          label="热度"
          :width="150">
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
import Header from '../../common/Header.vue'
import Footer from '../../common/Footer.vue'

let moment = require('moment');
let globalConfig = require('../../../common/globalConfig.js');

export default {
  name: 'hello',
  data () {
    return {
      // {
      //   "title": "春季校园招聘-互联网公司面试题：内含题目解答",
      //   "createUser": "张三李四",
      //   "createTime": "2017-04-01",
      //   "finishedCnt": ~~(Math.random() * 10) + 1,
      //   "heat":  ~~(Math.random() * 10) + 1
      // }
      exam: [],

      // 分页
      pageSize: globalConfig.pageSize,
      currentPage: 1,
      totalCnt: 300,
    }
  },
  components: {
    'my-header': Header,
    'my-footer': Footer
    // 'component-arousel': componentCarousel,
    // 'component-grid': componentGrid,
    // 'component-gap': componentGap
  },
  created: function () {
    this.getExam();
  },
  methods: {
    getExam: function () {
      this.$http.get('./api/exam'
      + '?pageSize=' + this.pageSize
      + '&currentPage=' + this.currentPage
      ).then(response => {
        let data = response.body.data;
        this.exam = data.list;
        this.totalCnt = data.totalCnt;
        this.exam.forEach((item) => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
        })
        }, response => {
      });
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

  .exam {
    .container {
      margin-top: 100px;
      overflow: hidden;
    }
    .el-pagination {
      float: right;
      margin-top: 20px;
    }

    .el-table tr {
      cursor: pointer;
    }
  }

</style>
