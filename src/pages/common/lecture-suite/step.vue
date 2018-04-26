<template>
  <div class="lecture-suite-steps">
    <span v-for="item in data" :key="item.code" @click="select(item)">{{'+'+item.label}}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    select: Function
  }
}
</script>

<style lang="less">
.lecture-suite-steps{
  display: flex;
  justify-content: space-between;
  line-height: 56px;
  height: 56px;
  border: 1px dashed var(--blue);
  padding: 0 20px;
  & > span{
    color: var(--blue);
    cursor: pointer;
    &:hover{
      color: var(--red);
    }
  }
}
</style>
