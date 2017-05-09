<template>
  <div class="new-question">
    <my-header></my-header>

    <div class="container">
      <section>
        <p class="title">1. 请选择题目类型：</p>
        <div class="content">
          <el-radio class="radio" v-model="type" label="1">单选</el-radio>
          <el-radio class="radio" v-model="type" label="2">多选</el-radio>
          <el-radio class="radio" v-model="type" label="3">填空、问答题</el-radio>
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
          <p>添加题目图片素材（可选）</p>
          <el-upload
            action="./api/admin/imageUpload"
            list-type="picture-card"
            :on-success="imageSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </section>
      <!-- type 为1或2 既单选、多选有option，而type 3填空问答没有option-->
      <section v-if="+type === 1 || +type === 2">
        <p class="title">3. 题目选项：</p>
        <div class="content">
          <div class="item" v-for="(item, index) in option">
            <el-form>
              <el-form-item :label="String.fromCharCode('A'.charCodeAt(0) + index) + '.'">
                <el-input v-model="option[index]" placeholder="请输入内容"></el-input>
                <el-button class="remove" @click="removeOption(index)" type="danger">X</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-button class="add-option" @click="addOption()">+ 添加选项</el-button>
        </div>
      </section>

      <section class="new-question-answer">
        <p class="title">{{+type === 3 ? '3': '4'}}. 答案：</p>
        <template v-if="+type === 1">
          <span class="radio" v-for="(item, index) in option">
            <el-radio class="radio" v-model="answerTypeOneOrThree" :label="index">{{String.fromCharCode('A'.charCodeAt(0) + index)}}</el-radio>
          </span>
        </template>
        <template v-if="+type === 2">
          <el-checkbox-group v-model="answer">
            <el-checkbox :label="index" v-for="(item, index) in option">{{String.fromCharCode('A'.charCodeAt(0) + index)}}</el-checkbox>
          </el-checkbox-group>
        </template>
        <template v-if="+type === 3">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 10}"
            placeholder="请输入题目描述"
            v-model="answerTypeOneOrThree">
          </el-input>
        </template>
      </section>

      <el-button @click="createQuestion()" class="btn-create-question" type="primary">创建试题</el-button>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
import AdminHeader from '../../common/AdminHeader.vue'
import Footer from '../../common/Footer.vue'

let util = require('../../../common/util.js');

export default {
  name: 'hello',
  data () {
    return {
      type: '1',
      description: '',
      option: ['', '', '', ''],
      answer: [],
      image: [],
      answerTypeOneOrThree: '', // 因为题目的type为 1时时radio时数字，为3时是textarea，采用此变量过度，提交表单时将其放入answer数组中

      dialogImageUrl: '',
      dialogVisible: false
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
      this.option.push('');
    },
    removeOption: function (index) {
      this.option.splice(index, 1);
    },
    createQuestion: function () {
      // type is 1 or 3, 数组只有一个元素
      if (+this.type === 1 || +this.type === 3) {
        this.answer = [this.answerTypeOneOrThree];
      }
      let token = util.getUserInfoFromToken() || {};
      var params = {
        createUserId: token.userId,
        createUserName: token.userName,
        type: this.type,
        description: this.description,
        option: this.option,
        answer: this.answer,
        image: this.image
      };
      this.$http.post('api/auth/question', params).then(response => {
        var data = response.body || {};
        if (data.success) {
          this.$message.success('创建成功！');
          this.$router.push('/admin/question');
        } else {
          this.$message.error('创建失败！');
        }
      }, response => {
        this.$message.error('创建失败！');
      });
    },

    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let remoteImage = file.response.imageUrl;
      let index = this.image.indexOf(remoteImage);
      this.image.splice(index, 1);
      // 这里其实还应该发送请求给后端remove掉对应的图片
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    imageSuccess(res, file) {
      this.dialogImageUrl = res.imageUrl || '';
      this.image.push(res.imageUrl || '');
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

    &-answer {
      .radio {
        margin-right: 10px;
      }
      .el-textarea {
        width: 80%;
      }
    }
    .btn-create-question {
        width: 80%;
        margin-top: 50px;
      }
  }
</style>
