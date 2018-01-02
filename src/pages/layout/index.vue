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
              <el-menu-item :route="{name: sub.name}" :index="sub.path" v-for="sub in item.children" :key="sub.path" v-if="!sub.hidden">
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
        <div class="l-header__left"></div>
        <div class="l-header__right">
          <span class="full-screen">sd</span>
          <el-dropdown class="user-avatar">
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <img class="user-avatar__img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg" alt="">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="l-main">
        <v-breadcrumb />
        <keep-alive :include="cachePage">
          <router-view class="l-content" />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import vBreadcrumb from '@/components/breadcrumb'
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
  },
  components: {
    vBreadcrumb
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  &__right{
    display: flex;
    align-items: center;
  }
  .user-avatar{
    display: flex;
    align-items: center;
    &__img{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-left: 10px;
    }
  }
  .el-dropdown-link{
    cursor: pointer;
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
</style>
