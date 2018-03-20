<template>
  <el-tooltip effect="dark" :content="value > 0?`草稿箱有${value}条事项未处理`:'草稿箱'" placement="bottom">
    <div @click="handleClick">
      <el-badge is-dot :hidden="value < 1">
        <i class="iconfont icon-caogaoxiang"></i>
      </el-badge>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleClick() {
      this.$router.push({
        name: 'My_Draft'
      })
    }
  }
}
</script>
