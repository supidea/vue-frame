<template>
  <el-tooltip effect="dark" :content="value?'退出全屏':'全屏'" placement="bottom">
    <div @click="handleChange">
      <i class="iconfont" :class="[value?'icon-tuichuquanping':'icon-quanping']"></i>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    let isFullscreen =
      document.webkitFullscreenElement || document.webkitIsFullScreen
    isFullscreen = !!isFullscreen
    document.addEventListener('webkitfullscreenchange', () => {
      this.$emit('input', !this.value)
    })
    this.$emit('input', isFullscreen)
  },
  methods: {
    handleChange() {
      let main = document.body
      if (this.value) {
        document.webkitCancelFullScreen && document.webkitCancelFullScreen()
      } else {
        main.webkitRequestFullScreen && main.webkitRequestFullScreen()
      }
    }
  }
}
</script>
