<template>
  <div class="lecture-suite-item">
    <div class="left">
      <span class="lecture-suite-item__step">课后作业:</span>
      <span class="lecture-suite-item__type">【讲义】</span>
      <span class="lecture-suite-item__name">测试20170914001_副本(7)_副本(3)_副本测试20170914001_副本(7)_副本(3)_副本测试20170914001_副本(7)_副本(3)_副本测试20170914001_副本(7)_副本(3)_副本测试20170914001_副本(7)_副本(3)_副本</span>
    </div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>

<style lang="less">
@import url(../../../assets/styles/variables.less);
.lecture-suite-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: @bodyBackground;
  padding: 15px 20px;
  & > .left {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  & > .right {
    margin-left: 20px;
  }
  &__name{
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
