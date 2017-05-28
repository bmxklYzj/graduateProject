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
          :default-expand-all="true"
          style="width: 100%">

          </el-table-column>
          <el-table-column type="expand" >
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
                <!--<div class="question-desc-option-wrap" v-if="+props.row.type !== 3">
                  <div class="question-desc-option"  v-for="(item, index) in props.row.option">
                    <span class="question-desc-label-span">
                      {{String.fromCharCode('A'.charCodeAt(0) + index)}}.
                    </span>
                    {{item}}
                  </div>
                </div>-->

                <!--答案-->
                <div class="question-desc-answer">
                  <p>标准答案：</p>
                  <template v-if="+props.row.type !== 3">
                    <span v-for="(item, index) in props.row.answer">{{String.fromCharCode('A'.charCodeAt(0) + item)}}</span>
                  </template>
                  <template v-else>
                    <span v-for="(item, index) in props.row.answer">{{item}}</span>
                  </template>
                </div>
                <div class="question-desc-answer">
                  <p>学生答案：</p>
                  <template v-if="+props.row.type !== 3">
                    <span v-for="(item, index) in props.row.userAnswer">{{String.fromCharCode('A'.charCodeAt(0) + item)}}</span>
                  </template>
                  <template v-else>
                    <span v-for="(item, index) in props.row.userAnswer">{{item}}</span>
                  </template>
                </div>
                <div class="true-or-false">
                   <label><input type="radio" :name="props.row._id + 'radio'" :value="true"
                    v-model="props.row.userAnswerIsRight">正确</label>
                    <label><input type="radio" :name="props.row._id + 'radio'" :value="false"
                    v-model="props.row.userAnswerIsRight">错误</label>
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
          prop="heat"
          label="热度"
          :width="150"
          :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
      </template>

      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 10}"
        placeholder="请输入对学生的寄语、评价"
        v-model="teacherComment">
      </el-input>
      <el-button type="primary" size="big" class="submit-button" @click="submit()">提交</el-button>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
let moment = require('moment');
import AdminHeader from '../../common/AdminHeader.vue'
import Footer from '../../common/Footer.vue'

let util = require('../../../common/util.js');

export default {
  name: 'hello',
  data () {
    return {
      teacherComment: '',
      userId: '',
      examId: '',
      // 图片模态框
      dialogVisible: false,
      dialogImageUrl: '',
      multipleSelection: [], // 多选
      
      question: [],
      checkList: [], // 多选的数组
    }
  },
  components: {
    'my-header': AdminHeader,
    'my-footer': Footer
  },
  created: function () {
    this.getQuestionList();
  },
  methods: {
    getQuestionList: function () {
      let self = this;
      let url = location.href;
      this.userId = url.split('userId=')[1].split('&')[0];
      this.examId = url.split('examId=')[1].split('&')[0];
      this.$http.get('/api/auth/markdetail'
      + '?userId=' + this.userId
      + '&examId=' + this.examId
      ).then((response) => {
        this.question = response.body.data.list;
        this.question.forEach((item, index) => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
          item.userAnswerIsRight = true;
          self.$set(self.question, index, item);
        });
      }, response => {
      });
    },
    submit: function () {
      let submitQuestion = [];
      this.question.forEach((item, index) => {
        submitQuestion.push({
          questionId :item._id,
          result: item.userAnswerIsRight
        })
      });
      let params = {
        userId: this.userId,
        examId: this.examId,
        teacherComment: this.teacherComment,
        question: submitQuestion
      }
      debugger
      this.$http.post('/api/auth/markdetail', params).then((response) => {
        let data = response.data || {};
        if (data.success) {
          this.$message.success('批阅试卷成功！');
          this.$router.push('/admin/marklist');
        } else  {
          this.$message.error('批阅试卷失败！');
        }
      }, response => {
      });
    },
    imagePreview(url) {
      this.dialogVisible = true;
      this.dialogImageUrl = url;
    },
    newQuestion: function () {
      location.hash = '#admin/newquestion';
    },
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
        max-width: 100%;
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
  
  .true-or-false {
    margin-top: 20px;
  }
  .el-textarea {
    margin: 30px 0 20px;
  }
  .submit-button {
    width: 200px;
  }
</style>
