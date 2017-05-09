<template>
  <div class="exam">
    <my-header></my-header>

    <div class="container">
      <!--列表-->
      <template>
        <el-table
          :data="exam"
          stripe
          :row-click="clickTr"
          style="width: 100%">

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

                <!--单选-->
                <div class="radio" v-if="+props.row.type === 1">
                  <template v-for="(item, index) in props.row.option">
                    <label><input type="radio" :name="props.row._id + 'radiov'" :value="index"
                    v-model="props.row.radio">{{String.fromCharCode('A'.charCodeAt(0) + index)}}.{{item}}</label>
                  </template>
                </div>
                <!--多选-->
                <div class="check-box" v-if="+props.row.type === 2">
                  <template v-for="(item, index) in props.row.option">
                    <label><input type="checkbox" :name="props.row._id + 'checkbox'" :value="index"
                    v-model="props.row.checkbox">{{String.fromCharCode('A'.charCodeAt(0) + index)}}.{{item}}</label>
                  </template>
                </div>
                <!--<el-radio-group v-model="props.row.radio" v-if="+props.row.type === 1">
                  <el-radio :label="index" v-for="(item, index) in props.row.option" :key="index">
                    <span class="question-desc-label-span">{{String.fromCharCode('A'.charCodeAt(0) + index)}}.</span>
                    {{index}}
                    {{props.row.radio}}
                  </el-radio>
                </el-radio-group>-->
                <!--多选-->
                <!--<el-checkbox-group v-model="props.row.checkbox" v-if="+props.row.type === 2">
                  <el-checkbox :label="index" v-for="(item, index) in props.row.option">
                    <span class="question-desc-label-span">{{String.fromCharCode('A'.charCodeAt(0) + index)}}.</span>
                    {{index}}
                  </el-checkbox>
                </el-checkbox-group>-->
                <!--填空、问答题-->
                <el-input v-if="+props.row.type === 3"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入您的答案"
                  v-model="props.row.textarea">
                </el-input>
                <el-button :disabled="props.row.showAnswer" @click="answerQuestion(props.$index)" type="primary" class="question-desc-btn">提交答案</el-button>

                <!--答案-->
                <div class="question-desc-answer" v-show="props.row.showAnswer">
                  <p class="question-desc-answer-tips">
                    <template v-if="!props.row.userHaveDone && +props.row.type !== 3">
                      <el-alert
                        v-if="+props.row.userAnswerStatus === 1"
                        title="正确"
                        type="success"
                        show-icon>
                      </el-alert>
                      <el-alert
                        v-else-if="+props.row.userAnswerStatus === 0"
                        title="错误"
                        type="error"
                        show-icon>
                      </el-alert>
                      <el-alert
                        v-else-if="+props.row.userAnswerStatus === 2"
                        title="填空问答为主观题、判题机器人无法识别正误呢。"
                        type="info"
                        show-icon>
                      </el-alert>
                    </template>
                    <el-alert
                      v-if="props.row.userHaveDone"
                      title="已经做过此题，仅可以查看答案，不能继续提交"
                      type="info"
                      show-icon>
                    </el-alert>
                    
                  </p>
                  <p>正确答案：</p>
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
          :width="460"
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
          prop="heat"
          label="热度"
          :width="150">
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
import Header from '../../common/Header.vue'
import Footer from '../../common/Footer.vue'

let moment = require('moment');
let util = require('../../../common/util.js');
let globalConfig = require('../../../common/globalConfig.js');


export default {
  name: 'hello',
  data () {
    return {
      radio: '',
      checkbox: [],
      textarea: '',

      // 图片模态框
      dialogVisible: false,
      dialogImageUrl: '',
      // {
      //   "title": "春季校园招聘-互联网公司面试题：内含题目解答",
      //   "createUser": "张三李四",
      //   "createTime": "2017-04-01",
      //   "finishedCnt": ~~(Math.random() * 10) + 1,
      //   "heat":  ~~(Math.random() * 10) + 1
      // }
      exam: [],
      // checkList: [], // 多选的数组

      // 分页
      pageSize: globalConfig.pageSize,
      currentPage: 1,
      totalCnt: 0,
    }
  },
  components: {
    'my-header': Header,
    'my-footer': Footer
  },
  created: function () {
    this.getQuestion();
  },
  methods: {
    getQuestion: function () {
      let self = this;
      this.$http.get('./api/question'
        + '?pageSize=' + this.pageSize
        + '&currentPage=' + this.currentPage
        ).then(response => {
          let data = response.body.data;
          this.exam = data.list;
          this.totalCnt = data.totalCnt;
          this.exam.forEach((item, index) => {
            /*
            这里遇到了诡异的bug：当 exam数据是直接模拟的、或者是后端返回了radio='',
            那么在table中每个radio是互不影响的。
            但是如果后端没返回，我在这里的forEach中手动加上去，就会有问题，总是不能刷新radio，点击了没反应
            我觉得肯定是跟vue、element-ui的生命周期有关。坑了我三四个小时啊！

            暂时就不解决radio和checkbox了，textarea每个是分离的好使着，就保留着

            2017-5-8 更：最后发现是el-radio在表格中不能更新！
            */
            if (+item.type === 1) {
              item.radio = '';
            } else if (+item.type === 2) {
              item.checkbox = [];
              // self.$set(self.exam, index, )
              // self.exam[index].$add('checkbox', [])
              // self.$set(self.exam[index], 'checkbox', []);
            } else if (+item.type === 3) {
              item.textarea = '';
            }
            item.showAnswer = false;
            item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
            item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
            // 上面的注释内容的原因找到了：vue中对数组使用的时候没有使用变异方法，导致vue不能监听到数组数据的变化 
            self.$set(self.exam, index, item);
          });

        }, response => {
      });
    },
    answerQuestion(index) {
      // console.log(props, row, this, this.checkbox);
      // row.radio = 3;
      // row.answer = [1];
      this.$set(this.exam[index], 'showAnswer', true);
      // this.exam[index].showAnswer = true;
      console.log(this.exam[index]);
      let row = this.exam[index];
      
      let token = util.getUserInfoFromToken() || {};
      let params = {
        userId: token.userId,
        questionId: row._id,
        type: +row.type
      };
      // 单选
      if (+row.type === 1) {
        params.answer = [row.radio];
      } else if (+row.type === 2) {
        params.answer = row.checkbox;
      } else if (+row.type === 3) {
        params.answer = [row.textarea];
      }
      // 用户做某一个题接口
      this.$http.post('api/auth/userDoQuestion', params).then(response => {
        var data = response.body || {};
        if (data.success) {
          this.$message.success('提交成功！');
          data.data = data.data || {};
          this.$set(this.exam[index], 'answer', data.data.answer);
          this.$set(this.exam[index], 'userAnswerStatus', data.data.userAnswerStatus);
          if (data.info === '已经做过此题目！') {
            this.$set(this.exam[index], 'userHaveDone', true);
          }
        } else {
          this.$message.error('提交失败！');
        }
      }, response => {
        this.$message.error('提交失败！');
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
    clickTr: function (row) {
      debugger
      console.log(row, item, index, event);
      item.showContent = !item.showContent;
      this.$set(this.exam, index, item)
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
    .radio,
    .check-box {
      label {
        display: block;
        margin: 10px 0;
      }
      input {
        margin-right: 20px;
      }
    }
  }

  .question-desc {
    // margin-bottom: 40px;
    &-image-wrap {
      margin-bottom: 40px;
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
      margin:0 20px 0 10px;
    }

    &-btn {
      display: block;
      margin-top: 40px;
    }
  }

  .el-checkbox,
  .el-radio,
  .el-textarea {
    display: block;
    margin: 15px 0;
    white-space: normal;
    line-height: 1.5;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
</style>
