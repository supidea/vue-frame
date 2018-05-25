<template>
  <div class="m-qu-stem" v-html="contentHtml"></div>
</template>

<script>
export default {
  props: {
    content: String,
    idx: [String, Number],
    tag: String,
    score: Number,
    showScore: Boolean,
    showIdx: Boolean,
    showTag: Boolean,
    isChild: Boolean
  },
  computed: {
    idxHtml() {
      let bol = this.showIdx && this.idx
      let str = this.isChild ? `<span class="m-qu-stem__idx is-child">(${this.idx})</span>` : `<span class="m-qu-stem__idx">${this.idx}、</span>`
      let html = bol ? str : ''
      return html
    },
    tagHtml() {
      let bol = this.showTag && this.tag
      let html = bol ? `<span class="m-qu-stem__tag">【${this.tag}】</span>` : ''
      return html
    },
    scoreHtml() {
      let bol = this.score && this.showScore
      let html = bol ? `<span class="m-qu-stem__score">(${this.score}分)</span>` : ''
      return html
    },
    contentHtml() {
      return this.idxHtml + this.scoreHtml + this.tagHtml + this.content
    }
  }
}
</script>

<style lang="less">
.m-qu-stem {
  img {
    max-width: 100%;
  }
  &__idx{
    white-space: nowrap;
    margin-right: 10px;
  }
  &__score{
    margin-right: 8px;
    color: #f7ba2a;
  }
}
</style>
