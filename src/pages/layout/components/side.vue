<template>
  <div class="side-menu">
    <el-menu :router="true" default-active="Paper_List" :collapse="sidebar.isCollapse" background-color="#3587ff" text-color="#fff" active-text-color="#409eff">
      <template v-for="item in routes">
        <el-menu-item :index="item.path" :route="item" :key="item.path" v-if="item.meta.noDropdown">
          <i class="sidebar__icon" :class="['sidebar__icon-'+item.meta.icon]"></i>
          <span slot="title">{{item.meta && item.meta.title}}</span>
        </el-menu-item>
        <el-submenu :index="item.path" :key="item.path" v-else-if="item.children && item.children.length > 0">
          <template slot="title">
            <i class="sidebar__icon" :class="['sidebar__icon-'+item.meta.icon]"></i>
            <span :title="item.path">{{item.meta && item.meta.title}}</span>
          </template>
          <el-menu-item v-if="sub.meta && sub.meta.isMenu === 1" :title="sub.path" :index="sub.path" v-for="sub in item.children" :key="sub.path" :route="sub">
            <i class="sidebar__sub-icon"></i>
            <span>{{sub.meta && sub.meta.title}}</span>
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
    })
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
      .sidebar__sub-icon {
        background-color: @blue;
      }
    }
  }
  &__icon {
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
