<template>
  <el-container style="height: 100%;">
    <el-aside :width="isCollapse?'64px':'200px'" class="l-side" :class="{'is-collapse': isCollapse}">
      <div class="side-logo"></div>
      <div class="side-menu">
        <el-menu :router="true" :default-active="defaultActive" :collapse="isCollapse" background-color="#3587ff" text-color="#fff" active-text-color="#409eff">
          <template v-for="item in menuList">
            <el-submenu :index="item.name" :title="item.name" :key="item.path" v-if="item.children && item.children.length > 0 && item.dropdown">
              <template slot="title">
                <i class="iconfont side-menu__icon" :class="['icon-'+item.icon]"></i>
                <span>{{item.meta && item.meta.title}}</span>
              </template>
              <el-menu-item :route="{name: sub.name}" :title="sub.name" :index="sub.name" v-for="sub in item.children" :key="sub.name" v-if="!sub.hidden">
                <i class="sidebar__sub-icon"></i>
                <span>{{sub.meta && sub.meta.title}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.name" :title="item.name" :route="{name: item.name}" :key="item.path" v-else>
              <i class="iconfont side-menu__icon" :class="['icon-'+item.icon]"></i>
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
          <v-full-screen class="header-bar__btn" v-model="isFullScreen" />
          <v-message-tip class="header-bar__btn" v-model="messageCount" />
          <el-tooltip class="header-bar__btn" effect="dark" content="草稿箱" placement="bottom">
            <router-link :to="{name: 'Paper'}" tag="span">
              <i class="iconfont icon-caogaoxiang"></i>
            </router-link>
          </el-tooltip>
          <el-dropdown class="user-avatar">
            <span class="el-dropdown-link">
              李太白
              <i class="el-icon-arrow-down el-icon--right"></i>
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
import vFullScreen from '@/components/full-screen'
import vMessageTip from '@/components/message-tip'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isCollapse: false,
      isFullScreen: false,
      messageCount: 10
    }
  },
  computed: {
    ...mapState({
      cachePage: state => state.app.cachePage,
      menuList: state => state.app.menuList
    }),
    defaultActive() {
      let matched = this.$route.matched
      console.log(matched)
      console.log(this.$route.name)
      // if (matched instanceof Array && matched.length > 0) {
      //   let
      //   return matched[matched.length - 1].name
      // }
      // console.log(matched)
      // if (matched instanceof Array && matched.length > 0) {
      //   for (let i = matched.length - 1; i >= 0; i--) {
      //     let _route = matched[i]
      //     if (_route.meta && _route.meta.isMenu === 1) {
      //       return _route.path
      //     }
      //   }
      // }
      return this.$route.name
    }
  },
  methods: {
    onCollapse() {
      this.isCollapse = !this.isCollapse
    }
  },
  components: {
    vBreadcrumb,
    vFullScreen,
    vMessageTip
  }
}
</script>

<style lang="less">
@import '../../assets/styles/variables.less';
@sideMenuItemActiveBgc: #daebff;
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
      .el-menu-item.is-active {
        background: @sideMenuItemActiveBgc !important;
        .sidebar__sub-icon {
          background-color: @blue;
        }
      }
    }
  }
  .side-menu__icon {
    color: #fff;
    width: 24px;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    margin-right: 5px;
    font-weight: bold;
  }
  .sidebar__sub-icon {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
    background-color: #fff;
    margin-right: 8px;
  }
  .el-submenu__title i {
    color: #fff;
  }
  &.is-collapse {
    .side-menu {
      overflow-y: visible;
    }
    .side-logo {
      background-image: url('/static/images/min-logo.png');
    }
    .el-submenu.is-active {
      .el-submenu__title {
        background-color: @sideMenuItemActiveBgc !important;
        & > span,
        & > i {
          color: @blue;
        }
      }
    }
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
  &__right {
    display: flex;
    align-items: center;
  }
  .header-bar{
    &__btn{
      margin-left: 20px;
      cursor: pointer;
      &:last-of-type{
        margin-right: 40px;
      }
      i{
        color: #666;
        font-size: 18px;
      }
      &:last-child{
        margin-right: 40px;
      }
    }
  }
  .user-avatar {
    display: flex;
    align-items: center;
    &__img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-left: 10px;
    }
  }
  .el-dropdown-link {
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
