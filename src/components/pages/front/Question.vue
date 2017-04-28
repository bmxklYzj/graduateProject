<template>
  <div class="exam">
    <my-header></my-header>

    <div class="container">
      <!--列表-->
      <template>
        <el-table
          :data="exam"
          stripe
          style="width: 100%">

          <el-table-column type="expand">
            <template scope="props">
              <div class="question-item">
                <p class="question-desc">题目描述：{{props.row.title}}</p>
                  <!--多选-->
                  <el-checkbox-group v-model="checkList" v-if="+props.row.type === 2">
                    <!--<div v-for="(item, index) in props.row.options" class="question-desc-label">-->

                      <el-checkbox :label="index" v-for="(item, index) in props.row.options">
                        <span class="question-desc-label-span">{{String.fromCharCode('A'.charCodeAt(0) + index)}}.</span>
                        {{item}}
                      </el-checkbox>
                    <!--</div>-->
                    <el-button type="primary" class="question-desc-btn">提交答案</el-button>
                  </el-checkbox-group>
              </div>
            </template>
          </el-table-column>

          <el-table-column
          prop="title"
          label="试卷名称"
          :width="460"
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
import Header from '../../common/Header.vue'
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
    'my-header': Header,
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../static/assets/css/common.less';
  .container {
    margin-top: 100px;
    overflow: hidden;
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
      margin:0 20px 0 10px;
    }

    &-btn {
      margin-top: 20px;
    }
  }

  .el-checkbox {
    display: block;
    margin: 15px 0;
    white-space: normal;
    line-height: 1.5;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
</style>
