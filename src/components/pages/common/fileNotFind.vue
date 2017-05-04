<template>
  <div>
    <my-header></my-header>

    <div class="container">
      对不起，文件没有找到！
      {{minute}} 秒后跳转到首页。
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
      minute: 3
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
    this.minuteDescSetTimeout();
  },
  methods: {
    minuteDescSetTimeout() {
      setTimeout(() => {
        this.minute--;
        if (this.minute) {
          this.minuteDescSetTimeout();
        }
        if (!this.minute) {
          this.$router.push('/');
        }
      }, 1000);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../static/assets/css/common.less';

</style>
