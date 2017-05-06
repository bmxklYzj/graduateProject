<template>
  <div>
    <my-header></my-header>

    <div class="container">
      <!-- carsousel 走马灯 -->
      <template>
        <div class="block carsousel container">
          <el-carousel height="440px">
            <el-carousel-item v-for="item in carsousel">
              <img :src="item" alt="img">
            </el-carousel-item>
          </el-carousel>
        </div>
      </template>

      <index-list title="试卷" href="exam"></index-list>
      <index-list title="试题" href="question"></index-list>

    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import Header from '../../common/Header.vue'
import IndexList from '../../IndexList.vue'
import Footer from '../../common/Footer.vue'
export default {
  name: 'hello',
  data () {
    return {
      carsousel: [
        'https://img6.bdstatic.com/img/image/smallpic/x8.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1017904219,2460650030&fm=23&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3129354277,1651273616&fm=23&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2006772353,1636214348&fm=23&gp=0.jpg'
      ]
    }
  },
  components: {
    'my-header': Header,
    'index-list': IndexList,
    'my-footer': Footer
  },
  created: function () {
    // this.$http.get('./api/index_carsousel.ajax').then(response => {
    //   this.carsousel = response.body.data;
    //   // this.swipeArray = response.body.data;
    //   }, response => {
    // });
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .carsousel {
    img {
      width: 100%;
    }
  }
</style>
