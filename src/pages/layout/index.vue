<template>
  <el-container style="height: 100%;">
    <el-aside :width="isCollapse?'64px':'200px'" class="l-side" :class="{'is-collapse': isCollapse}">
      <div class="side-logo"></div>
      <div class="side-menu">
        <el-menu :router="true" default-active="1-1" :collapse="isCollapse" background-color="#3587ff" text-color="#fff" active-text-color="#ffd04b">
          <template v-for="item in menuList">
            <el-submenu :index="item.path" :key="item.path" v-if="item.children && item.children.length > 0 && item.dropdown">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{item.meta && item.meta.title}}</span>
              </template>
              <el-menu-item :title="sub.path" :route="{path: item.path}" :index="sub.path" v-for="sub in item.children" :key="sub.path">
                <i class="sidebar__sub-icon"></i>
                <span>{{sub.meta && sub.meta.title}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.path" :route="{path: item.path}" :key="item.path" v-else>
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.meta && item.meta.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header class="l-header" height="50px">
        <span class="side-collapse iconfont icon-zhankai" :class="{'is-collapse': isCollapse}" @click="onCollapse"></span>
      </el-header>
      <el-main class="l-main">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="m-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <keep-alive :include="cachePage">
          <router-view class="l-content" />
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
    onCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/variables.less';
.l-side {
  background: @blue;
  display: flex;
  flex-direction: column;
  overflow: visible;
  transition: width 0.3s ease-in-out;
  .side-logo {
    height: 50px;
    background-image: url('/static/images/logo.png');
    background-repeat: no-repeat;
    background-position: center center;
  }
  &.is-collapse .side-logo {
    background-image: url('/static/images/min-logo.png');
  }
  .side-menu {
    flex: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0px;
    }
    .el-menu {
      width: 64px;
      border-right: 0 none;
      &:not(.el-menu--collapse) {
        width: 200px;
      }
    }
  }
  &.is-collapse .side-menu {
    overflow-y: visible;
  }
}
.l-header {
  background: #fff;
  position: relative;
  border-bottom: 1px solid @baseBorderColor;
  .side-collapse {
    position: absolute;
    left: -13px;
    top: 12px;
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background-color: @blue;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.3s ease-out;
    &.is-collapse {
      transform: rotate(180deg);
    }
  }
}
.l-main {
  display: flex;
  flex-direction: column;
}
.l-content {
  flex: 1;
  margin-top: 20px;
}
.m-breadcrumb{
  font-size: 12px;
  .el-breadcrumb__inner, .el-breadcrumb__inner a{
    font-weight: normal;
  }
}
</style>
