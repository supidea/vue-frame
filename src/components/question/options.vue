<template>
  <ul class="m-qu-options">
    <li class="m-qu-options__item" v-for="(item, index) in data" :key="index">
      <div class="m-qu-options__label" split="、">{{item.optionCode}}</div>
      <div class="m-qu-options__con" v-html="item.content"></div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less">
.m-qu-options {
  padding: 0;
  margin: 20px 0 0 0;
  &__item {
    display: flex;
    align-items: baseline;
    list-style: none;
    & + & {
      margin-top: 10px;
    }
  }
  &__label {
    &::after {
      content: attr(split);
      display: inline-block;
    }
  }
  &__con {
    flex: 1;
    margin-left: 5px;
    img {
      max-width: 100%;
    }
  }
}
</style>
