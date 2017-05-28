<template>
  <div class="admin-exam">
    <my-header></my-header>

    <div class="container">
      <header class="admin-class-head">
        <span class="title">我创建的班级</span>
        <el-button @click="newClass()" class="button" type="primary">新建班级</el-button>
      </header>
      <!-- 班级列表 -->
      
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
      <!--列表-->
      <template>
        <el-table
          class="student-list"
          :data="studentList"
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
          prop="role"
          label="角色"
          :width="150">
          </el-table-column>
          <el-table-column
          prop="_id"
          label="操作"
          :width="260">
            <template scope="scope">
              <el-tooltip content="从班级中移除此学生">
                <i class="el-icon-delete" @click="editItem(_id)"></i>
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

      exam: [
        {
          "_id": "5929ab25d26187f867da229f",
          "createUserId": "590d3ecde64acf257fc3f262",
          "createUserName": "杨宗军2",
          "description": "创建一个试卷起止时间已经过期的试卷测试",
          "requirement": "试卷已过期，不能作答",
          "__v": 0,
          "userDone": [],
          "dateRange": [
            "2017-05-20T16:00:00.000Z",
            "2017-05-24T16:00:00.000Z"
          ],
          "question": [
            "591034ca995d4a7c1f4d48df",
            "59103493995d4a7c1f4d48de"
          ],
          "updateTime": "2017-05-27T16:36:53.098Z",
          "createTime": "2017-05-27T16:36:53.098Z",
          "finishedCnt": 0
        },
        {
          "_id": "5929a3ea805392f6a77dcd08",
          "createUserId": "590d3ecde64acf257fc3f262",
          "createUserName": "杨宗军2",
          "description": "最新试卷：2个填空、2个单选、2个多选。有试卷起止日期",
          "requirement": "试卷要求：必须在规定的起止日期作答试卷！",
          "__v": 0,
          "userDone": [],
          "dateRange": [
            "2017-05-27T16:00:00.000Z",
            "2017-05-30T16:00:00.000Z"
          ],
          "question": [
            "591034ca995d4a7c1f4d48df",
            "59103493995d4a7c1f4d48de",
            "591033f5995d4a7c1f4d48dc",
            "591033c2995d4a7c1f4d48db",
            "590daf56e7f9332c75bc39b7",
            "590daefde7f9332c75bc39b6"
          ],
          "updateTime": "2017-05-27T16:06:02.306Z",
          "createTime": "2017-05-27T16:06:02.306Z",
          "finishedCnt": 0
        },
        {
          "_id": "591034f8995d4a7c1f4d48e0",
          "createUserId": "590d3ecde64acf257fc3f262",
          "createUserName": "杨宗军2",
          "description": "单选、多选、填空 分别3个试卷",
          "__v": 0,
          "userDone": [
            "590d3fe6e64acf257fc3f264",
            "590d3ecde64acf257fc3f262"
          ],
          "dateRange": [],
          "question": [
            "591034ca995d4a7c1f4d48df",
            "59103493995d4a7c1f4d48de",
            "59103462995d4a7c1f4d48dd",
            "591033f5995d4a7c1f4d48dc",
            "591033c2995d4a7c1f4d48db",
            "59103330995d4a7c1f4d48da",
            "590daf56e7f9332c75bc39b7",
            "590daefde7f9332c75bc39b6",
            "590d3fe6e64acf257fc3f264"
          ],
          "updateTime": "2017-05-08T09:06:00.342Z",
          "createTime": "2017-05-08T09:06:00.342Z",
          "finishedCnt": 2
        }],

        
      studentList: [
        {
          "_id": "5907575d78730caf6262de5b",
          "userName": "杨宗军",
          "password": "202cb962ac59075b964b07152d234b70",
          "age": "22",
          "sex": "男",
          "school": "西北工业大学",
          "studentId": "2013303442",
          "classId": "14011307",
          "avator": "",
          "introduce": "软件工程-杨宗军-毕业设计项目",
          "interest": "高数,英语,计算机,软件",
          "comment": [],
          "__v": 0,
          "like": [],
          "exam": [],
          "question": [],
          "wantToBeAdmin": false,
          "role": "1"
        },
        {
          "_id": "590757c9f08e34b0064d040d",
          "userName": "yzj",
          "password": "123",
          "age": "",
          "sex": "",
          "school": "",
          "studentId": "2013303444",
          "classId": "14011307",
          "avator": "",
          "introduce": "",
          "interest": "",
          "comment": [],
          "__v": 0,
          "like": [],
          "exam": [
            {
              "score": 75,
              "teacherReviewed": false,
              "examId": "590dafb6e7f9332c75bc39bd"
            },
            {
              "score": 50,
              "teacherReviewed": true,
              "examId": "591034f8995d4a7c1f4d48e0"
            }
          ],
          "question": [
            {
              "result": true,
              "answer": [
                1
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            },
            {
              "result": false,
              "answer": [
                0
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            }
          ],
          "wantToBeAdmin": false,
          "role": "2"
        },
        {
          "_id": "590d3ecde64acf257fc3f262",
          "userName": "杨宗军2",
          "password": "202cb962ac59075b964b07152d234b70",
          "age": "23",
          "sex": "男",
          "school": "西北工业大学",
          "studentId": "2013303442",
          "classId": "14011307",
          "avator": "",
          "introduce": "计算机、web开发",
          "interest": "高数,计算机",
          "comment": [],
          "__v": 0,
          "like": [],
          "exam": [
            {
              "score": 75,
              "teacherReviewed": false,
              "examId": "590dafb6e7f9332c75bc39bd"
            },
            {
              "score": 50,
              "teacherReviewed": false,
              "examId": "591034f8995d4a7c1f4d48e0"
            },
            {
              "teacherReviewed": false,
              "examId": "591034f8995d4a7c1f4d48e0"
            }
          ],
          "question": [
            {
              "result": 1,
              "answer": [
                1
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            },
            {
              "result": false,
              "answer": [
                0
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            },
            {
              "result": false,
              "answer": [
                0
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            },
            {
              "result": 1,
              "answer": [
                1
              ],
              "questionId": "590d3fe6e64acf257fc3f264"
            },
            {
              "result": false,
              "answer": [
                2
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            },
            {
              "result": true,
              "answer": [
                1
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            },
            {
              "result": true,
              "answer": [
                1
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            },
            {
              "result": true,
              "answer": [
                1
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            },
            {
              "result": 1,
              "answer": [
                2
              ],
              "questionId": "590daefde7f9332c75bc39b6"
            },
            {
              "result": false,
              "answer": [
                4
              ],
              "questionId": "590d3fe6e64acf257fc3f264"
            },
            {
              "result": false,
              "answer": [
                0
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            },
            {
              "result": false,
              "answer": [
                1
              ],
              "questionId": "590daefde7f9332c75bc39b6"
            },
            {
              "result": false,
              "answer": [
                0
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            },
            {
              "result": false,
              "answer": [
                0
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            },
            {
              "result": false,
              "answer": [
                0
              ],
              "questionId": "590daf56e7f9332c75bc39b7"
            },
            {
              "result": true,
              "answer": [
                2
              ],
              "questionId": "590daefde7f9332c75bc39b6"
            },
            {
              "result": false,
              "answer": [
                4
              ],
              "questionId": "59069b687a617495d3ca2eeb"
            },
            {
              "result": 0,
              "answer": [
                2
              ],
              "questionId": "590d3f92e64acf257fc3f263"
            },
            {
              "result": false,
              "answer": [
                "asdf"
              ],
              "questionId": "59070861972128a63250c1de"
            },
            {
              "result": 2,
              "answer": [
                "snmp"
              ],
              "questionId": "591034ca995d4a7c1f4d48df"
            },
            {
              "result": 2,
              "answer": [
                "snmpa"
              ],
              "questionId": "59103493995d4a7c1f4d48de"
            },
            {
              "result": 2,
              "answer": [
                "snmpab"
              ],
              "questionId": "59103462995d4a7c1f4d48dd"
            },
            {
              "result": 0,
              "answer": [
                1
              ],
              "questionId": "591033f5995d4a7c1f4d48dc"
            },
            {
              "result": 0,
              "answer": [
                0
              ],
              "questionId": "591033c2995d4a7c1f4d48db"
            },
            {
              "result": 0,
              "answer": [
                1,
                2
              ],
              "questionId": "59103330995d4a7c1f4d48da"
            }
          ],
          "wantToBeAdmin": false,
          "role": "2"
        }
      ],

      // 分页
      pageSize: globalConfig.pageSize,
      currentPage: 1,
      totalCnt: 10,
    }
  },
  components: {
    'my-header': AdminHeader,
    'my-footer': Footer
  },
  created: function () {
    this.token = util.getUserInfoFromToken() || {};
    
    // 角色处理
    this.studentList.forEach(function(item, index) {
      item.role = util.userRole[item.role];
    }, this);
  },
  methods: {

    newClass: function () {
      this.$router.push('/admin/question');
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
