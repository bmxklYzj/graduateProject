<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-head">友情链接</div>
      <div class="footer-link">
        <a href="http://www.nwpu.edu.cn/">西北工业大学</a>
        <a href="http://rjwdz.nwpu.edu.cn/">西北工业大学软件与微电子学院</a>
        <a href="https://github.com/bmxklYzj">关于我</a>
      </div>
      <div class="copyright">西北工业大学 杨宗军 {{date}}</div>
    </div>
  </footer>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      date: (new Date()).getFullYear() + '.' + (new Date()).getMonth()
    }
  },
  components: {

  },
  created: function () {
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../static/assets/css/common.less';

  .footer {
    margin-top: 100px;
    height: 141px;
    width: 100%;
    background-color: @bg-blue;
    color: #fff;

    a {
      color: #fff;
      margin-right: 30px;
      &:hover {
        color: @blue;
      }
    }

    &-head {
      padding: 20px 0;
    }
    .copyright {
      color: #ccc;
      text-align: center;
      margin-top: 40px;
    }
  }
</style>
