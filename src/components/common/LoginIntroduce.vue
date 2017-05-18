<template>
  <div class="intorduce">
    <el-row :gutter="100">
      <el-col :md="12" v-if="imgIsLeft">
        <div class="img-wrap">
          <img :src="src" alt="introduce-img">
        </div>
      </el-col>
      <el-col :md="12">
        <h2>{{h2}}</h2>
        <h3>{{h.row1}}</h3>
        <h3>{{h.row2}}</h3>
        <h3>{{h.row3}}</h3>
      </el-col>
      <el-col :md="12" v-if="!imgIsLeft">
        <div class="img-wrap">
          <img :src="src" alt="introduce-img">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {

    }
  },
  props: {
    imgIsLeft: {
      type: Boolean,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    h2: {
      type: String,
      required: true
    },
    h: {
      type: Object,
      required: true
    }
  },
  components: {
    // 'component-index-header': componentIndexHeader,
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
  @import '../../../static/assets/css/common.less';
  @itemGap: 200px;

  .img-wrap {
    width: 500px;
    height: 240px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .intorduce {
    color: #1F2D3D;
    margin: @itemGap 0;
  }
  h3 {
    font-weight: normal;
  }
  h2 {
    font-size: 20px;
    margin: 50px 0 30px;
  }
  h3 {
    font-size: 16px;
    margin: 5px 0;
  }
</style>
