<template>
  <div class="new-question">
    <my-header></my-header>

    <div class="container">
      <section>
        <p class="title">1. 请选择题目类型：</p>
        <div class="content">
          <label><input type="radio" name="type" value="1">单选</label>
          <label><input type="radio" name="type" value="2">多选</label>
          <label><input type="radio" name="type" value="3">填空、问答题</label>
        </div>
      </section>
      <section>
        <p class="title">2. 题目描述：</p>
        <div class="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 10}"
            placeholder="请输入题目描述"
            v-model="description">
          </el-input>
          <p>添加题目图片素材（可选）
            <input type="file">
          </p>
        </div>
      </section>
      <section>
        <p class="title">3. 题目选项：</p>
        <div class="content">
          <div class="item" v-for="(item, index) in options">
            <el-form>
              <el-form-item :label="String.fromCharCode('A'.charCodeAt(0) + index) + '.'">
                <el-input v-model="options[index]" placeholder="请输入内容"></el-input>
                <el-button class="remove" @click="removeOption(index)" type="danger">X</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-button class="add-option" @click="addOption()">+ 添加选项</el-button>
        </div>
      </section>

      <el-button class="btn-create-question" type="primary">创建试题</el-button>
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
      description: '',
      options: ['1', '2', '3', '4']
    }
  },
  components: {
    'my-header': AdminHeader,
    'my-footer': Footer
  },
  created: function () {
  },
  methods: {
    addOption: function () {
      this.options.push('');
    },
    removeOption: function (index) {
      this.options.splice(index, 1);
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
  .new-question {
    section {
      padding-bottom: 20px;
    }
    .content {
      label {
        margin-right: 10px;
      }
      input {
        margin: 0 10px 0;
      }
      .el-textarea {
        width: 80%;
      }
      .el-input {
        width: 73%;
      }
      .add-option {
        margin-left: 25px;
      }
      .remove {
        margin-left: 10px;
      }
      
    }
    .btn-create-question {
        width: 80%;
        margin-top: 50px;
      }
  }
</style>
