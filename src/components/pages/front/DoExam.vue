<template>
  <div class="do-exam">
    <my-header></my-header>

    <div class="container">
      <header class="do-exam-head">
        <p>当前第 <span class="current">{{currentIndex}}</span> 题，总共 10 题</p>
        <el-progress :percentage="percentage" :stroke-width="15"></el-progress>      
      </header>

      <div class="question-item">
        <p class="question-desc">{{currentIndex}}. 题目描述：{{list[currentIndex].title}}</p>
          <!--多选-->
          <el-checkbox-group v-model="checkList" v-if="+list[currentIndex].type === 2">
            <!--<div v-for="(item, index) in props.row.options" class="question-desc-label">-->

              <el-checkbox v-model="result[0].options" :label="index" v-for="(item, index) in list[currentIndex].options">
                <span class="question-item-label-span">{{String.fromCharCode('A'.charCodeAt(0) + index)}}.</span>
                {{item}}
              </el-checkbox>
            <!--</div>-->
          </el-checkbox-group>
      </div>
      <el-button-group>
        <el-button @click="goPrev()" type="primary" icon="arrow-left">上一题</el-button>
        <el-button @click="goNext()" type="primary">{{currentIndex === dataRec.totalCnt ? '提交试卷' : '下一题'}}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
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
      currentIndex: 1, // 当前做题进度
      percentage: 80, // 进度条
      dataRec: '',
      list: [],
      checkList: [], // 多选的数组
      result: [{id: 1, options: ['A', 'C']}] // 做题时选中的结果
    }
  },
  components: {
    'my-header': Header,
    'my-footer': Footer
  },
  created: function () {
    this.getExam();
  },
  methods: {
    getExam: function () {
      this.$http.get('./api/doexam_list.ajax').then(response => {
        this.dataRec = response.body.data || {};
        this.list = this.dataRec.list || [];
        }, response => {
      });
    },
    goPrev: function () {
      
    },
    goNext: function () {
      this.currentIndex++;
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
  }

  .question-item {
    margin-top: 80px;
    margin-left: 30px;
    .question-desc {
      margin-bottom: 40px;
      margin-left: -30px;
    }
    &-label-span {
      margin:0 20px 0 10px;
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
  }

  .el-button-group {
    float: right;
  }
</style>
