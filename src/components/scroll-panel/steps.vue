<template>
  <ul class="scroll-panel-steps">
    <li class="scroll-panel-steps__item">
      <div class="scroll-panel-steps__hd"><span class="scroll-panel-steps__line"></span><i class="scroll-panel-steps__icon"></i></div>
      <div class="scroll-panel-steps__bd">
        <h3 class="scroll-panel-steps__title" @click="jump">斯蒂芬斯第三方第三方</h3>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    active: {
      type: Number,
      default: 0
    }
  },
  methods: {
    jump() {
      this.$emit('jump', this.active)
    }
  }
}
</script>

<style lang="less">
@import url('../../assets/styles/variables.less');
.scroll-panel-steps{
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 200px;
  &__item{
    list-style: none;
    display: flex;
    flex-basis: 40px;
    cursor: pointer;
  }
  &__hd{
    position: relative;
    width: 24px;
  }
  &__icon{
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #add6ff;
    position: relative;
    display: block;
  }
  &__line{
    position: absolute;
    height: 100%;
    border-left: 1px solid #add6ff;
    left: 6px;
    top: 0;
  }
  &__item:last-of-type &__line{
    display: none;
  }
  &__bd{
    position: relative;
    top: -1px;
    padding: 0 0 10px 10px
  }
  &__item.is-active &__icon{
    background-color: @blue
  }
  &__item.is-active &__bd{
    color: @blue
  }
  &__title{
    font-size: 14px;
    font-weight: normal;
    margin: 0;
    padding: 0;
    line-height: 1;
    color: #b9b9b9;
  }
}
</style>
