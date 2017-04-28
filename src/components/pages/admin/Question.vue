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
          :data="exam"
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
                <p class="question-desc">题目描述：{{props.row.title}}</p>
                  <!--多选-->
                  <div v-if="+props.row.type === 2"  v-for="(item, index) in props.row.options">
                    <span class="question-desc-label-span">
                      {{String.fromCharCode('A'.charCodeAt(0) + index)}}.
                    </span>
                    {{item}}
                  </div>
                  
              </div>
            </template>
          </el-table-column>

          <el-table-column
          prop="title"
          label="试卷名称"
          :width="410"
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

      <el-button class="admin-exam-create-exam" type="primary">将选中的试题创建新的试卷</el-button>
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
      exam: [],
      checkList: [] // 多选的数组
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
    this.getQuestion();
  },
  methods: {
    getQuestion: function () {
      this.$http.get('./api/question.ajax').then(response => {
        this.exam = response.body.data;
        }, response => {
      });
    },
    newQuestion: function () {
      location.hash = '#admin/newquestion';
    },
    handleSelectionChange(val) {
      // this.multipleSelection = val;
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
    &-label-span {
      margin: 10px 20px 0 10px;
      line-height: 1.5;
    }

    &-btn {
      margin-top: 20px;
    }
  }



  .admin-exam-create-exam {
    margin-top: 20px;
  }
</style>
