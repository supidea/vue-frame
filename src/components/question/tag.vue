<template>
  <div class="m-qu-tag" v-if="data && data.length > 0">
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
  padding: 0 20px;
  &__item{
    background: var(--bg-color);
    white-space: nowrap;
    color: var(--text-color-hover);
    margin-right: 15px;
    margin-bottom: 10px;
    padding: 0.2em 1em;
    font-size: 1em;
  }
}
</style>
