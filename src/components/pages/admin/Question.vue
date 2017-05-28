<template>
  <div class="exam">
    <my-header></my-header>

    <div class="container">
      <header class="admin-exam-head">
        <span class="title">试题列表</span>
        <el-button @click="newQuestion()" class="button" type="primary">新建试题</el-button>
      </header>
      <!--列表-->
      <template>
        <el-table
          :data="question"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange">

          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column type="expand">
            <template scope="props">
              <div class="question-item">
                <p class="question-desc">题目描述：{{props.row.description}}</p>
                <!--图片-->
                <div class="question-desc-image-wrap">
                  <img @click="imagePreview(item)" v-for="(item, index) in props.row.image" :src="item" alt="image">
                </div>
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>

                <!--单选1、多选2：展示选项-->
                <div class="question-desc-option-wrap" v-if="+props.row.type !== 3">
                  <div class="question-desc-option"  v-for="(item, index) in props.row.option">
                    <span class="question-desc-label-span">
                      {{String.fromCharCode('A'.charCodeAt(0) + index)}}.
                    </span>
                    {{item}}
                  </div>
                </div>

                <!--答案-->
                <div class="question-desc-answer">
                  <p>答案：</p>
                  <template v-if="+props.row.type !== 3">
                    <span v-for="(item, index) in props.row.answer">{{String.fromCharCode('A'.charCodeAt(0) + item)}}</span>
                  </template>
                  <template v-else>
                    <span v-for="(item, index) in props.row.answer">{{item}}</span>
                  </template>
                </div>
                
              </div>
            </template>
          </el-table-column>

          <el-table-column
          prop="description"
          label="试卷名称"
          :width="410"
          :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
          prop="createUserName"
          label="创建人"
          :width="150"
          :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
          prop="createTime"
          label="创建时间"
          :width="180"
          :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
          prop="finishedCnt"
          label="已作答人数"
          :width="120"
          :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
          prop="_id"
          label="热度"
          :width="150"
          :show-overflow-tooltip="true">
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

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top" class="question-new-exam">
        <el-form-item label="试卷标题" prop="examDescription">
          <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6}"
          v-model="ruleForm.examDescription"></el-input>
        </el-form-item>
        <el-form-item label="试卷要求" prop="examRequirement">
          <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6}"
          v-model="ruleForm.examRequirement"></el-input>
        </el-form-item>
      </el-form>
      <div class="date-range">
        <p>选择试卷可以作答的时间段：</p>
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          placeholder="选择时间范围">
        </el-date-picker>
      </div>

      <el-button @click="createExam('ruleForm')" class="admin-exam-create-exam" type="primary">将选中的试题创建新的试卷</el-button>
      
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

      // 分页
      pageSize: globalConfig.pageSize,
      currentPage: 1,
      totalCnt: 300,

      // 图片模态框
      dialogVisible: false,
      dialogImageUrl: '',
      multipleSelection: [], // 多选
      
      question: [],
      checkList: [], // 多选的数组
      dateRange: [Date.now(), Date.now()],

      ruleForm: {
        examDescription: '', // 创建试卷时的描述
        examRequirement: '' // 创建试卷时的教师要求
      },
      rules: {
        examDescription: [
          { required: true, message: '请输入试卷标题', trigger: 'blur' },
          { min: 3, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur' }
        ],
        examRequirement: [
          { required: true, message: '请输入试卷要求', trigger: 'blur' },
          { min: 3, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur' }
        ]
      }
      
    }
  },
  components: {
    'my-header': AdminHeader,
    'my-footer': Footer
  },
  created: function () {
    this.token = util.getUserInfoFromToken() || {};
    this.getQuestion();
  },
  methods: {
    getQuestion: function () {
      this.$http.get('./api/auth/question'
      + '?userId=' + this.token.userId
      + '&pageSize=' + this.pageSize
      + '&currentPage=' + this.currentPage
      ).then((response) => {
        let data = response.body.data;
        this.question = data.list;
        this.totalCnt = data.totalCnt;
        this.question.forEach((item) => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
        })
      }, response => {
      });
    },
    newQuestion: function () {
      location.hash = '#admin/newquestion';
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item._id);
      });
    },
    createExam(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message.error("请先输入试卷标题！");
          return false;
        } else {
          // 判断是否选择了题目，没选不能提交
          if (!this.multipleSelection.length) {
            this.$message.error("请先选择试题！");
            return;
          }
          let params = {
            createUserId: this.token.userId,
            createUserName: this.token.userName,
            description: this.ruleForm.examDescription,
            requirement: this.ruleForm.examRequirement,
            question: this.multipleSelection,
            dateRange: this.dateRange
          };
          this.$http.post('./api/auth/exam', params).then((response) => {
            var data = response.body || {};
            if (data.success) {
              this.$message.success('创建成功！');
              this.$router.push('/admin/exam');
            } else {
              this.$message.error('创建失败！');
            }
          }, response => {
            this.$message.error('创建失败！');
          });
        }
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

    // 对试题的操作
    editItem: function () {
      this.$router.push('admin/newquestion');
    },
    delItem: function (questionId) {
      this.$confirm('确定要删除此试题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          userId: this.token.userId,
          questionId: questionId
        }
        this.$http.delete('/api/auth/question'
        + '?userId=' + this.token.userId
        + '&questionId=' + questionId
        ).then(response => {
          let data = response.body;
          if (data.success) {
            this.getQuestion();
            this.$message({
              type: 'info',
              message: '删除成功！'
            });
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

  .el-pagination {
    float: right;
    margin-top: 20px;
  }

  .question-item {
    padding-left: 20px;
  }

  .question-desc {
    line-height: 1.5;
    &-image-wrap {
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
      margin: 10px 20px 0 10px;
    }
    &-option {
      &-wrap {
        margin-top: 40px;
      }
      margin: 10px 0;
      line-height: 1.5;

    }

    &-btn {
      margin-top: 20px;
    }
  }


  @width: 400px;
  .admin-exam-create-exam {
    margin-top: 20px;
    width: @width;
  }

  .question-new-exam {
    margin-top: 60px;
    width: @width;
  }
  // 操作按钮
  .cell {
    i {
      margin-right: 10px;
      cursor: pointer;
    }
  }

</style>
