<template>
  <section class="list">
    <div class="head">精华{{title}}推荐</div>
    <ul>
      <li v-for="(item, index) in list">
        <span class="title">{{item.description}}</span>
        <span class="heat">热度：{{item.heat}}</span>
        <span class="cnt">作答人数：{{item.finishedCnt}} 人</span>
      </li>
    </ul>
    <a :href="'#/' + href" class="list-href"><el-button type="primary">更多精华{{title}}</el-button></a>
  </section>
</template>

<script>
let globalConfig = require('../../src/common/globalConfig.js');

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
      list: [],

      // 分页
      pageSize: globalConfig.indexListCnt,
      currentPage: 1
      
    }
  },
  components: {

  },
  created: function () {
    this.getList();
  },
  methods: {
    getList: function () {
      let urlType = 'exam';
      if (this.title === '试题') {
        urlType = 'question';
      }
      this.$http.get('./api/' + urlType
        + '?pageSize=' + this.pageSize
        + '&currentPage=' + this.currentPage
      ).then(response => {
        let data = response.body.data;
        this.list = data.list;
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

    .el-button {
        width: 100%;
        margin-top: 20px;
        line-height: 20px;
        font-size: 16px;
    }
  }
</style>
