<template>
  <div class="do-exam">
    <my-header></my-header>

    <div class="container">
      <header class="do-exam-head">
        <p>当前第 <span class="current">{{currentIndex + 1}}</span> 题，总共 {{list.length}} 题</p>
        <el-progress :percentage="percentage" :stroke-width="15"></el-progress>      
      </header>

      <div class="question-item">
        <p class="question-desc">{{currentIndex + 1}}. 题目描述：{{list[currentIndex].description}}</p>
          <!--单选-->
          <div class="radio" v-if="+list[currentIndex].type === 1">
            <template v-for="(item, index) in list[currentIndex].option">
              <!--这里使用:key="" 绑定一个唯一的id，能够保持住之前选择的题目，防止点击上一题下一题的时候状态丢失-->
              <label :key="index + list[currentIndex]._id"><input type="radio" :name="list[currentIndex]._id + 'radiov'" :value="index"
              v-model="list[currentIndex].radio">{{String.fromCharCode('A'.charCodeAt(0) + index)}}.{{item}}</label>
            </template>
          </div>
          <!--多选-->
          <div class="check-box" v-if="+list[currentIndex].type === 2">
            <template v-for="(item, index) in list[currentIndex].option">
              <label><input type="checkbox" :name="list[currentIndex]._id + 'checkbox'" :value="index"
              v-model="list[currentIndex].checkbox">{{String.fromCharCode('A'.charCodeAt(0) + index)}}.  {{item}}</label>
            </template>
          </div>
          <!--填空、问答-->
          <el-input v-if="+list[currentIndex].type === 3"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入您的答案"
            v-model="list[currentIndex].textarea">
          </el-input>
      </div>
      <el-button-group>
        <el-button @click="goPrev()" type="primary" icon="arrow-left">上一题</el-button>
        <el-button @click="goNext()" type="primary">{{currentIndex === (list.length - 1) ? '提交试卷' : '下一题'}}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>

      <!--提交弹出框-->
      <!--<el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="tiny">
        <span>{{dialogTips}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{dialogCancelBtn}}</el-button>
          <el-button type="primary" @click="confirmToSubmitExam()">{{dialogConfirmBtn}}</el-button>
        </span>
      </el-dialog>-->
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import Header from '../../common/Header.vue'
import Footer from '../../common/Footer.vue'

let util = require('../../../common/util.js');
let moment = require('moment');

export default {
  name: 'hello',
  data () {
    return {
      examStartTime: '',
      examEndTime: '',
      examId: '',
      currentIndex: 0, // 当前做题进度
      percentage: 0, // 进度条
      list: [{
        'description': 'a'
      }],
      result: [{id: 1, option: ['A', 'C']}] // 做题时选中的结果

    }
  },
  components: {
    'my-header': Header,
    'my-footer': Footer
  },
  created: function () {
    this.getExam();
    
    this.calcPercentage();
  },
  watch: {
    'currentIndex': function () {
      this.calcPercentage();
    },
    'list': function () {
      this.calcPercentage();
    }
  },
  methods: {
    calcPercentage(val) {
      this.percentage = ~~(((this.currentIndex + 1) / this.list.length) * 100);
    },
    canDoExam: function () {
      let now = Date.now();
      let tips = '';
      let canDo = false;
      if ((new Date(this.examStartTime)) > now) {
        tips = '试卷还不能开始作答，请稍等';
      } else if (now > (new Date(this.examEndTime))) {
        tips = '很遗憾，试卷已经过期，不能作答';
      } else {
        canDo = true;
        tips = '当前时间在试卷起止时间内，可以作答';
      }
      this.$alert('开始时间：' + this.examStartTime + '。截止时间：' + this.examEndTime + '。' + tips
      , '试卷作答起止时间', {
        confirmButtonText: '我知道了',
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: `action: ${ action }`
          // });
          if (!canDo) {
            this.$router.push('/exam');
          }
        }
      });
    },
    getExam: function () {
      this.examId = location.href.split('/doexam/')[1].split('/')[0];
      this.$http.get('./api/doExamList'
      + '?examId=' + this.examId
      ).then(response => {
        this.examStartTime = moment(response.body.dateRange[0]).format('YYYY-MM-DD HH:mm:ss')
        this.examEndTime = moment(response.body.dateRange[1]).format('YYYY-MM-DD HH:mm:ss')
        
        this.list = response.body.data || {};
        this.list.forEach((item, index) => {
          if (+item.type === 1) {
            item.radio = '';
          } else if (+item.type === 2) {
            item.checkbox = [];
          } else if (+item.type === 3) {
            item.textarea = '';
          }
        });

        this.canDoExam();
        }, response => {
      });
    },
    goPrev: function () {
      if (this.currentIndex === 0) {
        return;
      }
      this.currentIndex--;
      console.log(this.list)
    },
    goNext: function () {
      // 调起弹出框，让用户确认
      var self = this;
      if (this.currentIndex === this.list.length - 1) {
        this.$confirm('确定要提交试卷？提价后不能再次修改请谨慎！', '提示', {
          confirmButtonText: '确定提交',
          cancelButtonText: '再检查一下',
          type: 'warning'
        }).then(() => {
          self.confirmToSubmitExam();
        }).catch(() => {
        });
      } else {
        this.currentIndex++;
      }
      console.log(this.list)
    },
    confirmToSubmitExam () {
      this.dialogVisible = false;
      // 处理数据，提交试卷
      // 检查每一个数据是否都做了
      let haveError = []; // 保存没有做的题目的数组 
      this.list.forEach((item, index) => {
        if (+item.type === 1 && item.radio === ''
         || +item.type === 2 && item.checkbox.length === 0
         || +item.type === 3 && item.textarea === ''
        ) {
          haveError.push(index + 1);
        }
      });
      if (haveError.length) {
        let tip = '您的第 ' + haveError.join(',') + '题目没有作答，请答题后重新提交！';
        this.$alert(tip, '提示', {
          confirmButtonText: '知道啦',
          callback: action => {
          }
        });
      } else {
        // 提交试卷接口
        let token = util.getUserInfoFromToken() || {};
        let params = {
          userId: token.userId,
          examId: this.examId,
          items: []
        };
        // for (let i = 0, len = this.list.length; i < len; i++) {
        //   let array = [];
        //   let item = this.list[i];
        //   if (+item.type === 1) {
        //     array = [item.radio];
        //   } else if (+item.type === 2) {
        //     array = item.checkbox;
        //   } else if (+item.type === 3) {
        //     array = [item.textarea];
        //   }
        //   params.items.push({
        //     'userId': token.userId,
        //     'questionId': item._id,
        //     'answer': array
        //   })
        // }
        this.list.forEach(function (item, index) {
          let array = [];
          if (+item.type === 1) {
            array = [item.radio];
          } else if (+item.type === 2) {
            array = item.checkbox;
          } else if (+item.type === 3) {
            array = [item.textarea];
          }
          params.items.push({
            'userId': token.userId,
            'questionId': item._id,
            'type': +item.type,
            'answer': array
          })
        });
        this.$http.post('api/auth/doExamList', params).then(response => {
          var data = response.body || {};
          if (data.success) {
            this.$message.success('提交成功！');
            this.$router.push('/examdone' + '/' + this.examId);
          } else {
            this.$message.error('提交失败！');
          }
        }, response => {
          this.$message.error('提交失败！');
        });
      }
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
  .do-exam-head {
    .current {
      color: @blue;
    }
    .el-progress-bar {
      width: 50%;
    }
  }

  .question-item {
    margin-top: 80px;
    margin-left: 30px;
    .question-desc {
      margin-bottom: 40px;
      margin-left: -30px;
    }
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

  .el-button-group {
    float: right;
    margin-top: 50px;
  }
</style>
