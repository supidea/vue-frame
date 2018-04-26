<template>
  <div class="m-qu-stem" v-html="html"></div>
</template>

<script>
export default {
  props: {
    content: String,
    score: Number,
    showScore: Boolean
  },
  computed: {
    html() {
      let bol = this.score && this.showScore
      let str = bol
        ? `<span class="m-qu-stem__score">(${this.score}分)</span>`
        : ''
      return str + this.content
    }
  }
}
</script>

<style lang="less">
.m-qu-stem {
  img {
    max-width: 100%;
  }
  &__score {
    margin-right: 8px;
  }
}
</style>
