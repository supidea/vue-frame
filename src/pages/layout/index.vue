<template>
  <el-container style="height:100%;">
    <el-aside width="200px" class="main-side" :class="{'hide-side': isCollapse}">
      <div class="side-logo" style="height:50px;">
        <img class="side-logo__img" src="static/images/min-logo.png" alt="" v-if="isCollapse">
        <img class="side-logo__img" src="static/images/logo.png" alt="" v-else>
      </div>
      <el-menu default-active="1-1" class="side-menu" :collapse="isCollapse" background-color="#3587ff" text-color="#fff" active-text-color="#ffd04b">
        <template v-for="item in menuList">
          <el-menu-item :index="item.path" :key="item.path">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.meta && item.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container class="l-main">
      <el-header class="main-header" height="50px">
        <span class="side-collapse iconfont icon-zhankai" :class="{'is-collapse': isCollapse}" @click="collapse"></span>
      </el-header>
      <el-main>
        <keep-alive :include="cachePage">
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapState({
      cachePage: state => state.app.cachePage,
      menuList: state => state.app.menuList
    })
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
