<template>
  <el-container style="height: 100%;">
    <el-aside :width="sidebar.isCollapse?'64px':'200px'" class="l-side" :class="{'is-collapse': sidebar.isCollapse}">
      <div class="side-logo"></div>
      <v-side></v-side>
    </el-aside>
    <el-container>
      <el-header class="l-header" height="50px">
        <v-header />
      </el-header>
      <el-main class="l-main">
        <v-breadcrumb />
        <keep-alive :include="cachePage">
          <router-view class="l-content"/>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import vSide from './components/side'
import vHeader from './components/header'
import vBreadcrumb from '@/components/breadcrumb'
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      cachePage: state => state.app.cachePage,
      sidebar: state => state.app.sidebar
    })
  },
  components: {
    vBreadcrumb,
    vSide,
    vHeader
  },
  created() {
    this.getBaseData('ALL')
  },
  methods: {
    ...mapActions([
      'getBaseData'
    ])
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
  &.is-collapse .side-logo{
    background-image: url('/static/images/min-logo.png');
  }
}
.l-header{
  background: #fff;
  border-bottom: 1px solid @baseBorderColor;
}
.l-main {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #fff;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: hsla(220, 4%, 58%, 0.5);
  }
}
.l-content {
  flex: 1;
  margin-top: 20px;
}
</style>
