<template>
  <div>
    <my-header></my-header>

    <div class="container">

    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import Header from './common/Header.vue'
import Footer from './common/Footer.vue'

export default {
  name: 'hello',
  data () {
    return {

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
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../static/assets/css/common.less';

</style>
