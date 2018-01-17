<template>
  <div class="levelbar">
    <el-tooltip effect="dark" :content="isFullScreen?'退出全屏':'全屏'" placement="bottom">
      <div class="levelbar__item" @click="changeFullScreen">
        <i class="iconfont levelbar__icon" :class="[isFullScreen?'icon-tuichuquanping':'icon-quanping']"></i>
      </div>
    </el-tooltip>
    <el-tooltip effect="dark" :content="messageCount > 0?`有${messageCount}条未读消息`:'无未读消息'" placement="bottom">
      <router-link :to="{name: 'Paper'}" class="levelbar__item" tag="span">
        <el-badge is-dot :hidden="messageCount < 1">
          <i class="iconfont icon-tixing levelbar__icon"></i>
        </el-badge>
      </router-link>
    </el-tooltip>
    <el-tooltip effect="dark" content="草稿箱" placement="bottom">
      <router-link :to="{name: 'Paper'}" class="levelbar__item" tag="span">
        <i class="iconfont icon-caogaoxiang levelbar__icon"></i>
      </router-link>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFullScreen: false,
      messageCount: 1
    }
  },
  methods: {
    changeFullScreen() {
      let main = document.body
      if (this.isFullscreen) {
        console.log(this.isFullScreen)
        document.webkitCancelFullScreen && document.webkitCancelFullScreen()
      } else {
        main.webkitRequestFullScreen && main.webkitRequestFullScreen()
      }
    }
  },
  mounted() {
    let isFullscreen =
      document.webkitFullscreenElement || document.webkitIsFullScreen
    isFullscreen = !!isFullscreen
    document.addEventListener('webkitfullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen
      console.log(this.isFullScreen)
    })
    this.isFullScreen = isFullscreen
  }
}
</script>

<style lang="less">
.levelbar {
  display: inline-flex;
  margin-right: 40px;
  &__item {
    width: 18px;
    height: 18px;
    cursor: pointer;
    & + & {
      margin-left: 20px;
    }
  }
  &__icon {
    font-size: 18px;
    color: #666;
  }
}
</style>
