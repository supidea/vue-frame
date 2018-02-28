<template>
  <div class="scroll-panel">
    <div class="scroll-panel__left" ref="left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="scroll-panel__con">
      <slot></slot>
    </div>
    <div class="scroll-panel__right">
      <v-steps @jump="jump"></v-steps>
    </div>
  </div>
</template>

<script>
import vSteps from './steps'
import { throttle } from '../../utils'
export default {
  components: {
    vSteps
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$slots.default)
      let scrollPanel = document.documentElement.querySelector('.l-main')
      scrollPanel.addEventListener('scroll', throttle(() => {
        console.log(scrollPanel.scrollTop)
      }), 200, 200)
    })
  },
  methods: {
    jump(index) {
      console.log(index)
    }
  }
}
</script>

<style lang="less">
.scroll-panel{
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  // &__con{
  //   overflow-y: auto;
  //   &::-webkit-scrollbar{
  //     width: 10px;
  //     background-color: #fff;
  //   }
  //   &::-webkit-scrollbar-thumb{
  //     border-radius: 10px;
  //     background-color: hsla(220,4%,58%,.3);
  //     display: none;
  //   }
  //   &:hover::-webkit-scrollbar-thumb{
  //     display: block;
  //   }
  // }
  &__left{
    background-color: #fff;
    padding: 20px;
  }
  &__right{
    padding: 20px;
    width: 200px;
  }
}
</style>
