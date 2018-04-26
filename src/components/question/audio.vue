<template>
  <div class="m-qu-analy-audio">
    <el-popover placement="right" width="300" trigger="click">
      <audio controls :src="data.linkUrl" class="m-qu-analy-audio__ctr"></audio>
      <el-button type="text" slot="reference" size="mini"><i class="iconfont icon-yinpin"></i>{{data.audioName}}</el-button>
    </el-popover>
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
.m-qu-analy-audio{
  &__ctr{
    display: block;
  }
  .iconfont{
    vertical-align: -2px;
    margin-right: 5px;
  }
}
</style>
