<template>
  <div class="side-menu">
    <el-menu :router="true" :default-active="defaultActive" :collapse="sidebar.isCollapse" background-color="#3587ff" text-color="#fff" active-text-color="#409eff">
      <template v-for="item in routes" v-if="item.meta && !item.meta.hidden && item.children && item.children.length > 0">
        <el-menu-item :index="item.path" :route="item" :key="item.path" v-if="item.noDropdown">
          <i class="side-menu__icon iconfont" :class="[item.icon]"></i>
          <span slot="title">{{item.meta && item.meta.title}}</span>
        </el-menu-item>
        <el-submenu :index="item.path" :key="item.path" v-else>
          <template slot="title">
            <i class="side-menu__icon iconfont" v-if="item.icon" :class="[item.icon]"></i>
            <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
          </template>
          <el-menu-item :title="sub.path" :index="sub.path" v-for="sub in item.children" :key="sub.path" :route="sub" v-if="!sub.meta.hidden">
            <i class="side-menu__sub-icon"></i>
            <span v-if="sub.meta && sub.meta.title">{{sub.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      routes: state => state.permission.addRoutes,
      sidebar: state => state.app.sidebar
    }),
    defaultActive () {
      let matched = this.$route.matched
      if (matched instanceof Array && matched.length > 0) {
        for (let i = matched.length - 1; i >= 0; i--) {
          let _route = matched[i]
          if (_route.meta && !_route.meta.hidden) {
            return _route.path
          }
        }
      }
      return this.$route
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/styles/variables.less';
@sideMenuItemActiveBgc: #daebff;
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
      .side-menu__sub-icon {
        background-color: @blue;
      }
    }
  }
  & &__icon {
    color: #fff;
    width: 24px;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    margin-right: 5px;
    font-weight: bold;
  }
  &__sub-icon {
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
  .is-collapse & {
    overflow-y: visible;
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
</style>
