<template>
  <div class="m-qu-analy-video">
    <el-button type="text" slot="reference" size="mini"><i class="iconfont icon-shipin"></i>{{data.videoName}}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="less">
.m-qu-analy-video{
  .iconfont{
    vertical-align: -2px;
    margin-right: 5px;
  }
}
</style>
