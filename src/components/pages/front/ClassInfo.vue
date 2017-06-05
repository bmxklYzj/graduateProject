<template>
  <div class="admin-exam">
    <my-header></my-header>

    <div class="container">
      <header class="admin-class-head">
        <span class="title">班级试卷</span>
        <!-- <el-button @click="newClass()" class="button" type="primary">添加试卷</el-button> -->
      </header>
      <!-- 班级列表 -->

      <template>
        <el-table
          :data="exam"
          stripe
          @row-click="goDoExam"
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
          :width="220">
          </el-table-column>
          <el-table-column
          prop="finishedCnt"
          label="已作答人数"
          :width="220">
          </el-table-column>
         <!--  <el-table-column
          prop="_id"
          label="操作"
          :width="150">
            <template scope="scope">
              <el-tooltip content="编辑">
                <i class="el-icon-edit" @click="editItem(_id)"></i>
              </el-tooltip>
              <el-tooltip content="删除">
                <i class="el-icon-delete" @click="delItem(scope.row._id)"></i>
              </el-tooltip>
              <el-tooltip content="查看试卷统计">
                <i class="el-icon-more" @click="showStatics(scope.row._id)"></i>
              </el-tooltip>
            </template>
          </el-table-column> -->
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


      <!-- 学生列表 -->
      <header class="admin-class-head student-list">
        <span class="title">班级学生</span>
        <!-- <el-button @click="newClass()" class="button" type="primary">添加学生</el-button> -->
      </header>
      <template>
        <el-table
          :data="studentList"
          stripe
          @row-click="goProfile"
          style="width: 100%">
          <el-table-column
          prop="userName"
          label="用户名"
          :width="400"
          :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
          prop="studentId"
          label="学号"
          :width="350">
          </el-table-column>
          <el-table-column
          prop="classId"
          label="班号"
          :width="360">
          </el-table-column>
<!--           <el-table-column
          prop="role"
          label="角色"
          :width="280">
          </el-table-column> -->
         <!--  <el-table-column
          prop="_id"
          label="操作"
          :width="260">
            <template scope="scope">
              <el-tooltip content="从班级中移除此学生">
                <i class="el-icon-delete" @click="editItem(_id)"></i>
              </el-tooltip>
            </template>
          </el-table-column> -->
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
import Header from '../../common/Header.vue'
import Footer from '../../common/Footer.vue'

let util = require('../../../common/util.js');
let globalConfig = require('../../../common/globalConfig.js');

export default {
  name: 'hello',
  data () {
    return {
      token: '',

      classId: '',
      exam: [],
      studentList: [],

      // 分页
      pageSize: globalConfig.pageSize,
      currentPage: 1,
      totalCnt: 10,
    }
  },
  components: {
    'my-header': Header,
    'my-footer': Footer
  },
  created: function () {
    this.token = util.getUserInfoFromToken() || {};
    this.classId = location.href.split('classId=')[1].split('&')[0];


    this.getExamInCalss();
    this.getStudentInClass();
  },
  methods: {
    getExamInCalss: function () {
      this.$http.get('./api/getExamInClass'
      + '?classId=' + this.classId
      ).then(response => {
        let data = response.body.data;
        this.exam = data.list;
        this.exam.forEach((item) => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          item.finishedCnt = item.userDone.length;
        })
        }, response => {
      });
    },
    // 学生
    getStudentInClass: function () {
      this.$http.get('./api/getStudentInClass'
      + '?classId=' + this.classId
      ).then(response => {
        let data = response.body.data;
        this.studentList = data.list;
        this.studentList.forEach((item) => {
          item.role = util.userRole[item.role];
        })
        }, response => {
      });
    },
    goDoExam: function (row, event, column) {
      this.$router.push('/doexam/' + row._id);
    },
    goProfile: function (row, event, colum) {
      this.$router.push('/profile/');
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

  .admin-class-head {
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

  .wrap {
    position: relative;
    width: 200px;
    height: 200px;
    float: left;
    margin-top: 30px;
    margin-right: 20px;
    box-sizing: border-box;
    background-color: #eee;
    border-radius: 3%;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
    }
    &-name {
      text-align: center;
      font-size: 40px;
      color: #aaa;
    }
    &-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      color: #333;
      .tag {
        float: left;
      }
      .count {
        float: right;
      }
    }
  }

  .student-list {
    margin-top: 150px;
  }

</style>
