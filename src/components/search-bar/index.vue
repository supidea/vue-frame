<template>
  <el-input v-bind="$attrs" class="search-bar">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</template>

<style lang="less">
.search-bar .el-input-group__append {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}
</style>
