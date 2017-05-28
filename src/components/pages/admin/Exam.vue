<template>
  <div class="admin-exam">
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
          @cell-click="goQuestionList"
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
          prop="_id"
          label="操作"
          :width="150">
            <template scope="scope">
              <i class="el-icon-edit" @click="editItem(_id)"></i>
              <i class="el-icon-delete" @click="delItem(scope.row._id)"></i>
              <i class="el-icon-more" @click="showStatics(scope.row._id)"></i>
            </template>
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
      this.$http.get('/api/auth/exam'
      + '?userId=' + this.token.userId
      + '&pageSize=' + this.pageSize
      + '&currentPage=' + this.currentPage
      ).then(response => {
        let data = response.body.data;
        this.exam = data.list;
        this.totalCnt = data.totalCnt;
        this.exam.forEach((item) => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
        });
        }, response => {
      });
    },
    newExam: function () {
      this.$router.push('/admin/question');
    },
    goQuestionList: function (row, event, cell) {
      if (cell.cellIndex === 0) {
        this.$router.push('/admin/questionlist/' + row._id);
      }
    },
    // 分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getExam();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getExam();
    },

    // 对试题的操作
    editItem: function () {
      this.$router.push('admin/question');
    },
    delItem: function (examId) {
      this.$confirm('确定要删除此试题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          userId: this.token.userId,
          examId: examId
        }
        this.$http.delete('/api/auth/exam'
        + '?userId=' + this.token.userId
        + '&examId=' + examId
        ).then(response => {
          let data = response.body;
          if (data.success) {
            this.getExam();
          } else {
            this.$message({
              type: 'info',
              message: data.info
            }); 
          }
        }, response => {
          this.$message({
            type: 'error',
            message: data.info
          }); 
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    showStatics: function () {

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

    // 操作按钮
    .cell {
      i {
        margin-right: 10px;
        cursor: pointer;
      }
    }

</style>
