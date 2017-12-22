<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="m-breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :key="item.path" v-for="item in list">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    list() {
      return this.$route.matched
    }
  },
  mounted() {
    console.log(this.$route.matched)
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
