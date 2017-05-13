<template>
  <div class="do-exam">
    <my-header></my-header>

    <div class="container">
      <activity-list title="做过的试卷" href="exam"></activity-list>
      <activity-list title="做过的试题" href="exam"></activity-list>

      <!--<activity-list title="我的评论" href="exam"></activity-list>
      <activity-list title="我送出的赞" href="exam"></activity-list>
      <activity-list title="我收到的赞" href="exam"></activity-list>-->
      
      
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import Header from '../../common/Header.vue'
import Footer from '../../common/Footer.vue'
import ActivityList from '../../ActivityList.vue'

export default {
  name: 'hello',
  data () {
    return {
      
    }
  },
  components: {
    'my-header': Header,
    'my-footer': Footer,
    'activity-list': ActivityList
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
    overflow: hidden;
  }
  
</style>
