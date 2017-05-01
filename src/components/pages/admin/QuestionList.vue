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
          prop="heat"
          label="热度"
          :width="150"
          :show-overflow-tooltip="true">
          </el-table-column>
        </el-table>
      </template>

      
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
      let url = location.href;
      let examId =  location.href.split('/admin/questionlist/')[1].split('/')[0];
      this.$http.get('./api/admin/examquestionlist/' + examId).then((response) => {
        this.question = response.body.data;
        this.question.forEach((item) => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
        })
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
</style>
