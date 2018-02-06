<template>
  <el-table v-bind="$attrs" v-on="$listeners" style="width: 100%;" header-cell-class-name="hi-table__head-cell">
    <template v-for="(column, index) in columns">
      <table-cell :key="index" :column="column"/>
    </template>
  </el-table>
</template>

<script>
import tableCell from './cell'
export default {
  components: {
    tableCell
  },
  props: ['columns'],
  inheritAttrs: false
}
</script>

<style lang="less">
.el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper{
  overflow-x: hidden;
}
.hi-table {
  &__head-cell {
    background-color: #ecf5ff;
  }
}
</style>
