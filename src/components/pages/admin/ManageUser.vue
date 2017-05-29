<template>
  <div class="admin-exam">
    <my-header></my-header>

    <div class="container">
      <header class="admin-exam-head">
        <span class="title">用户列表</span>
      </header>
      <!--列表-->
      <template>
        <el-table
          :data="list"
          stripe
          style="width: 100%">
          <el-table-column
          prop="userName"
          label="用户名"
          :width="300"

          :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
          prop="studentId"
          label="学号"
          :width="250">
          </el-table-column>
          <el-table-column
          prop="classId"
          label="班号"
          :width="150">
          </el-table-column>
          <el-table-column
          prop="wantToBeAdmin"
          label="是否想成为管理员"
          :width="150">
          </el-table-column>
          <el-table-column
          prop="_id"
          label="更改角色"
          :width="250">
            <template scope="scope">
              <el-select v-model="scope.row.role" placeholder="请选择">
                <el-option
                  v-for="item in scope.row.roleArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-tooltip content="确定修改">
                <i class="el-icon-edit" @click="editItem(_id)"></i>
              </el-tooltip>
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

      list: [],

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
      this.$http.get('/api/auth/manageUser'
      + '?pageSize=' + this.pageSize
      + '&currentPage=' + this.currentPage
      ).then(response => {
        let data = response.body.data;
        this.list = data.list;
        this.totalCnt = data.totalCnt;
        this.list.forEach((item) => {
          // 处理 wantToBeAdmin
          if (item.wantToBeAdmin) {
            item.wantToBeAdmin = '是';
          } else {
            item.wantToBeAdmin = '否';
          }
          // 处理 role
          item.role = util.userRole[item.role];

          item.roleArray = [{
              value: 0,
              label: '注销账号'
            }, {
              value: 1,
              label: '学生'
            }, {
              value: 2,
              label: '教师'
            }];
        });
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
      .el-select {
        width: 150px;
      }
    }

</style>
