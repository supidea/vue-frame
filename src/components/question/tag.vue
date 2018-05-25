<template>
  <div class="m-qu-tag">
    <span class="m-qu-tag__item" v-for="(item, index) in data" :key="index">{{item.sourceTagName}}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  }
}
</script>

<style lang="less">
.m-qu-tag{
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  &__item{
    white-space: nowrap;
    margin-right: 15px;
    font-size: 1em;
  }
}
</style>
