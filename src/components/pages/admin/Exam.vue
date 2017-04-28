<template>
  <div class="exam">
    <my-header></my-header>

    <div class="container">
      <header class="admin-exam-head">
        <span class="title">试卷列表</span>
        <el-button @click="newExam()" class="button" type="primary">新建试卷</el-button>
      </header>
      <!--列表-->
      <template>
        <el-table
          :data="exam"
          stripe
          style="width: 100%">
          <el-table-column
          prop="title"
          label="试卷名称"
          :width="512"
          :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
          prop="createUser"
          label="创建人"
          :width="150">
          </el-table-column>
          <el-table-column
          prop="createTime"
          label="创建时间"
          :width="150">
          </el-table-column>
          <el-table-column
          prop="finishedCnt"
          label="已作答人数"
          :width="150">
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
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import AdminHeader from '../../common/AdminHeader.vue'
import Footer from '../../common/Footer.vue'

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
      exam: []
    }
  },
  components: {
    'my-header': AdminHeader,
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
      this.$http.get('./api/exam.ajax').then(response => {
        this.exam = response.body.data;
        }, response => {
      });
    },
    newExam: function () {
      location.hash = '#admin/question';
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
