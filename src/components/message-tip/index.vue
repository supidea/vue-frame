<template>
  <el-tooltip effect="dark" :content="value > 0?`有${value}条未读消息`:'无未读消息'" placement="bottom">
    <div @click="handleClick">
      <el-badge is-dot :hidden="value < 1">
        <i class="iconfont icon-tixing"></i>
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
        name: 'Paper'
      })
    }
  }
}
</script>
