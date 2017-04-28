<template>
  <section class="list">
    <div class="head">{{title}}</div>
    <ul>
      <li v-for="(item, index) in list">
        <span class="title">{{item.title}}</span>
        <span class="heat">热度：{{item.heat}}</span>
        <span class="cnt">作答人数：{{item.finishedCnt}} 人</span>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  name: 'hello',
  props: {
    title: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: []
    }
  },
  components: {
    // 'component-index-header': componentIndexHeader,
    // 'component-arousel': componentCarousel,
    // 'component-grid': componentGrid,
    // 'component-gap': componentGap
  },
  created: function () {
    this.getList();
  },
  methods: {
    getList: function () {
      this.$http.get('./api/index_list.ajax').then(response => {
        this.list = response.body.data;
        // this.swipeArray = response.body.data;
        }, response => {
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../static/assets/css/common.less';
  @height: 50px;

  .list {
    margin-top: 100px;
    color: @text-black;
    .head {
      color: @blue;
      font-size: 24px;
      margin-bottom: 20px;
    }
    ul {
      li {
        padding: 0 15px;
        line-height: @height;
        height: @height;
        border-top: 1px solid @border;

        &:last-child {
          border-bottom: 1px solid @border;
        }

        .title {
          width: 700px;
          .text-ellipsis();
        }
        .cnt,
        .heat {
          float: right;
          width: 150px;
          text-align: right;
          color: @text-gray;
          font-size: 14px;
        }
      }
    }

  }
</style>
