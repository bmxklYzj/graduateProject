<template>
  <div class="admin-exam">
    <my-header></my-header>

    <div class="container">
      <header class="admin-class-head">
        <span class="title">我创建的班级</span>
        <el-button @click="createClass()" class="button" type="primary">新建班级</el-button>
      </header>
      <!--列表-->
      
      <ul class="cf">
          <li v-for="(item, index) in list">
            <div class="wrap">
              <div class="wrap-content" @click="goClassInfo(item._id)">
                <p class="wrap-name">{{item.className}}</p>
                <div class="wrap-footer">
                    <p class="tag">学科：{{item.subject}}</p>
                    <p class="count">人数：{{item.count}}</p>
                </div>
              </div>
                
              <div class="mask">
                <el-tooltip content="编辑">
                  <i class="el-icon-edit" @click="editClass(item._id, item.className, item.subject)"></i>
                </el-tooltip>
                <el-tooltip content="删除">
                  <i class="el-icon-delete" @click="removeClass(item._id)"></i>
                </el-tooltip>
              </div>
            </div>
          </li>
      </ul>
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
      list: [],

      // 分页
      pageSize: globalConfig.pageSize,
      currentPage: 1,
      totalCnt: 10,
    }
  },
  components: {
    'my-header': AdminHeader,
    'my-footer': Footer
  },
  created: function () {
    this.token = util.getUserInfoFromToken() || {};
    this.getClassList();
  },
  methods: {
    getClassList: function () {
      this.$http.get('/api/auth/AdminClassList'
      + '?createUserId=' + this.token.userId
      ).then(response => {
        let data = response.body.data;
        this.list = data.list;
        this.list.forEach(function(item) {
          item.count = item.student.length;
        }, this);
        }, response => {
      });
    },
    createClass: function () {
      let className = '';
      let subject = '';
      this.$prompt('请输入班级名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.{2,10}/,
        inputErrorMessage: '请输入2至10个字符'
      }).then(({ value }) => {
        className = value;
        this.$prompt('请输入学科分类', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.{2,10}/,
          inputErrorMessage: '请输入2至10个字符'
        }).then(({ value }) => {
          subject = value;
          let params = {
            className: className, 
            subject: subject,
            createUserId: this.token.userId,
            createUserName: this.token.userName
          }
          this.$http.post('/api/auth/AdminNewClass', params).then(response => {
            this.$message.info(response.body.info);
            this.getClassList();
            }, response => {
          });
        }).catch(() => {
        });
      }).catch(() => {
      });
    },
    editClass: function (classId, className, subject) {
      this.$prompt('请输入班级名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: className,
        inputPattern: /.{2,10}/,
        inputErrorMessage: '请输入2至10个字符'
      }).then(({ value }) => {
        className = value;
        this.$prompt('请输入学科分类', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: subject,
          inputPattern: /.{2,10}/,
          inputErrorMessage: '请输入2至10个字符'
        }).then(({ value }) => {
          subject = value;
          let params = {
            classId: classId,
            className: className, 
            subject: subject
          }
          this.$http.put('/api/auth/AdminEditClass', params).then(response => {
            this.$message.info(response.body.info);
            this.getClassList();
            }, response => {
          });
        }).catch(() => {
        });
      }).catch(() => {
      });
    },
    removeClass: function (classId) {
      this.$http.delete('/api/auth/AdminDeleteClass?classId=' + classId).then(response => {
        this.$message.info(response.body.info);
        this.getClassList();
      });
    },
    goClassInfo: function (classId) {
      this.$router.push('/admin/classinfo?classId=' + classId);
    },
    // 分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getExam();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getExam();
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
  .el-pagination {
    float: right;
    margin-top: 20px;
  }

  .admin-class-head {
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

  .wrap {
    position: relative;
    width: 200px;
    height: 200px;
    float: left;
    margin-top: 30px;
    margin-right: 20px;
    box-sizing: border-box;
    background-color: #eee;
    border-radius: 3%;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
    }
    &-name {
      text-align: center;
      font-size: 40px;
      color: #aaa;
    }
    &-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      color: #333;
      .tag {
        float: left;
      }
      .count {
        float: right;
      }
    }
    
    .mask {
      display: none;
      i {
        font-size: 30px;
        margin: 10px;
      }
    }
  }

  .wrap:hover {
    .mask {
      display: block;
      width: 100%;
      position: absolute;
      top: 0;
      background-color: #999;
      z-index: 9999;
    }
  }



</style>
