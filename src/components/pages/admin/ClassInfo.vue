<template>
  <div class="admin-exam">
    <my-header></my-header>

    <div class="container">
      <header class="admin-class-head">
        <span class="title">班级试卷</span>
        <el-button @click="classAddExam()" class="button" type="primary">添加试卷</el-button>
      </header>
      <!-- 班级列表 -->

      <template>
        <el-table
          :data="exam"
          stripe
          @cell-click="goExamQuestion"
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
              <el-tooltip content="移除">
                <i class="el-icon-delete" @click="removeExamInClass(scope.row._id)"></i>
              </el-tooltip>
              <el-tooltip content="查看试卷统计">
                <i class="el-icon-more" @click="showStatics(scope.row._id)"></i>
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


      <!-- 学生列表 -->
      <header class="admin-class-head student-list">
        <span class="title">班级学生</span>
        <el-button @click="classAddStudent()" class="button" type="primary">添加学生</el-button>
      </header>
      <template>
        <el-table
          :data="studentList"
          stripe
          @cell-click="goProfile"
          style="width: 100%">
          <el-table-column
          prop="userName"
          label="用户名"
          :width="350"
          :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
          prop="studentId"
          label="学号"
          :width="300">
          </el-table-column>
          <el-table-column
          prop="classId"
          label="班号"
          :width="250">
          </el-table-column>
          <el-table-column
          prop="_id"
          label="操作"
          :width="200">
            <template scope="scope">
              <el-tooltip content="从班级中移除此学生">
                <i class="el-icon-delete" @click="removeStudentInClass(scope.row._id)"></i>
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


      <!-- 在班级中新增试题时候的列表 -->
      <div class="mask-bg" v-if="maskShow" @click="maskShow = false"></div>
      <div class="mask-exam-select" v-if="maskShow">
        <template>
          <el-table
            :data="examSelectList"
            stripe
            @cell-click="goQuestionList"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
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
          </el-table>
        </template>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange3"
          @current-change="handleCurrentChange3"
          :current-page="currentPage3"
          :page-sizes="[2, 5, 20, 50, 100, 200, 500]"
          :page-size="pageSize3"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCnt3">
        </el-pagination>

        <el-button @click="confirmClassAddExam()" class="button" type="primary">确认添加试卷</el-button>
      </div>
      
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
      classId: '',
      exam: [],
      examSelectList: [],
      examSelectListPost: [],
      maskShow: false,
      studentList: [],

      // 分页
      pageSize: globalConfig.pageSize,
      currentPage: 1,
      totalCnt: 10,

      // 添加试卷时选择已有试卷列表
      pageSize3: globalConfig.pageSize,
      currentPage3: 1,
      totalCnt3: 10
    }
  },
  components: {
    'my-header': AdminHeader,
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
      this.$http.get('/api/auth/AdminGetExamIdInClass'
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
    getExamSelectList: function () {
      this.maskShow = true;
      this.$http.get('/api/auth/exam'
      + '?userId=' + this.token.userId
      + '&pageSize=' + this.pageSize3
      + '&currentPage=' + this.currentPage3
      ).then(response => {
        let data = response.body.data;
        this.examSelectList = data.list;
        this.totalCnt = data.totalCnt;
        this.examSelectList.forEach((item) => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
        });
        }, response => {
      });
    },


    goQuestionList: function (row, event, cell) {
      if (cell.cellIndex === 1) {
        this.$router.push('/admin/questionlist/' + row._id);
      }
    },
    classAddExam: function () {
      this.getExamSelectList();
    },
    confirmClassAddExam: function () {
      this.maskShow = false;
      let examIdArray = [];
      this.examSelectListPost.forEach((item) => {
        examIdArray.push(item._id);
      });
      let params = {
        classId: this.classId,
        examIdArray: examIdArray
      }
      this.$http.post('/api/auth/AdminClassAddExam', params).then(response => {
        this.$message.info(response.body.info);
        this.getExamInCalss();
      }, response => {
      });
    },
    removeExamInClass: function (examId) {
      this.$http.delete('/api/auth/AdminClassRemoveExam'
      + '?classId=' + this.classId
      + '&examId=' + examId
      ).then(response => {
        this.$message.info(response.body.info);
        this.getExamInCalss();
      }, response => {
      });
    },


    // 学生
    getStudentInClass: function () {
      this.$http.get('/api/auth/AdminGetStudentIdInClass'
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
    classAddStudent: function () {
      let studentId = '';
      this.$prompt('请输入学生学号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{2,15}/,
        inputErrorMessage: '请输入2至15个字符'
      }).then(({ value }) => {
        studentId = value;
        let params = {
          classId: this.classId,
          studentId: studentId
        }
        this.$http.post('/api/auth/AdminClassAddStudent', params).then(response => {
          this.$message.info(response.body.info);
          this.getStudentInClass();
          }, response => {
        });
      }).catch(() => {
      });
    },
    removeStudentInClass: function (studentId) {
      this.$http.delete('/api/auth/AdminClassRemoveStudent'
      + '?classId=' + this.classId
      + '&studentId=' + studentId
      ).then(response => {
        this.$message.info(response.body.info);
        this.getStudentInClass();
      }, response => {
      });
    },

    handleSelectionChange: function (val) {
      this.examSelectListPost = val;
    },
    goExamQuestion: function (row, event, cell) {
      if (cell.cellIndex === 0) {
        this.$router.push('/admin/questionlist/' + row._id);
      }
    },
    goProfile: function (row, event, cell) {
      if (cell.cellIndex !== 3) {
        this.$router.push('/profile');
      }
    },
    showStatics: function (questionId) {
      this.$router.push('/admin/questionstatistic?questionId=' + questionId);
    },
    newClass: function () {
      this.$router.push('/admin/question');
    },

    // 分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.getExam();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // this.getExam();
    },

    handleCurrentChange3(val) {
      this.currentPage3 = val;
      this.getExamSelectList();
    },
    handleSizeChange3(val) {
      this.pageSize3 = val;
      this.getExamSelectList();
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

  // 选择试题列表 的弹框
  .mask-exam-select {
    background-color: #fff;
    padding: 40px;
    overflow: scroll;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 1000px;
    height: 400px;
    z-index: 2;
    transform: translate(-50%, -50%);

    
  }
  .mask-bg {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      background-color: #999;
      opacity: .5;
    }

</style>
