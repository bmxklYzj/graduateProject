<template>
  <div>
    <my-header></my-header>

    <div class="container">
      <div class="img-wrap">
        <img src="../../../../static/assets/img/403-forbidden.jpg" alt="fileNotFound">
      </div>
      <div class="text">
        对不起，您没有权限访问此页面！
      </div>
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

    }
  },
  components: {
    'my-header': Header,
    'my-footer': Footer
  },
  created: function () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../static/assets/css/common.less';

  .container {
    margin-top: 40px;
    text-align: center;
    img {
      height: 400px;
    }
    .text {
      font-size: 20px;
      margin-top: 20px;
    }
  }
</style>
