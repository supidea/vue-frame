<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="m-breadcrumb">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <template v-for="(item, index) in list">
      <el-breadcrumb-item :key="item.name" v-if="!item.redirect||index===list.length-1">{{item.meta.title}}</el-breadcrumb-item>
      <el-breadcrumb-item :key="item.name" :to="item.path" v-else>{{item.meta.title}}</el-breadcrumb-item>
    </template>
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
