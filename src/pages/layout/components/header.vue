<template>
  <div class="main-header">
    <span class="side-collapse iconfont icon-zhankai" :class="{'is-collapse': sidebar.isCollapse}" @click="toggleSideBar"></span>
    <div class="main-header__left">
      <v-select-subject-panel />
    </div>
    <div class="main-header__right">
      <v-full-screen class="header-bar__btn" v-model="isFullScreen" />
      <v-message-tip class="header-bar__btn" v-model="messageCount" />
      <v-draft-tip class="header-bar__btn" v-model="draftCount"/>
      <el-dropdown class="user-avatar">
        <span class="el-dropdown-link">
          李太白
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <img class="user-avatar__img" src="../../../assets/images/avatar.svg" alt="">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vFullScreen from '@/components/full-screen'
import vMessageTip from '@/components/message-tip'
import vDraftTip from '@/components/draft-tip'
import vSelectSubjectPanel from '@/components/select-subject-panel'
export default {
  components: {
    vFullScreen,
    vMessageTip,
    vDraftTip,
    vSelectSubjectPanel
  },
  data() {
    return {
      isFullScreen: false,
      messageCount: 3,
      draftCount: 10
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSidebar')
    }
  }
}
</script>

<style lang="less">
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  position: relative;
  .side-collapse {
    position: absolute;
    left: -33px;
    top: 12px;
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background-color: var(--blue);
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
  .header-bar {
    &__btn {
      margin-left: 20px;
      cursor: pointer;
      i {
        color: #666;
        font-size: 18px;
      }
    }
  }
  .user-avatar {
    display: flex;
    align-items: center;
    margin-left: 40px;
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
</style>
