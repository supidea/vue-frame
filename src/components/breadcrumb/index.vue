<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="m-breadcrumb">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item :key="item.name" v-for="item in list" v-if="!item.redirect">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    list() {
      return this.$route.matched
    }
  }
}
</script>

<style lang="less">
.m-breadcrumb {
  font-size: 12px;
  .el-breadcrumb__inner,
  .el-breadcrumb__inner a {
    font-weight: normal;
  }
}
</style>
