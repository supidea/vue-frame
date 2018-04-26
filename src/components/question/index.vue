<template>
  <div class="m-qu">
    <v-tag :data="data.originTagList" v-if="showTag"/>
    <v-item 
      :data="data"
      :show-analy="showAnaly" 
      :show-score="showScore" 
      :show-idx="showIdx" 
      :show-audio="showAudio"
      :show-video="showVideo"
      :show-option="showOption"
    />
  </div>
</template>

<script>
import vTag from './tag'
import vItem from './item'
export default {
  components: {
    vTag,
    vItem
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showAnaly: {
      type: Boolean,
      default: true
    },
    showAudio: {
      type: Boolean,
      default: true
    },
    showVideo: {
      type: Boolean,
      default: true
    },
    showTag: {
      type: Boolean,
      default: true
    },
    showOption: {
      type: Boolean,
      default: true
    },
    showScore: Boolean,
    showIdx: Boolean
  }
}
</script>

<style lang="less">
.m-qu {
  --bg-color: #f7f7f7;
  --text-color-hover: #20a0ff;
  & + & {
    margin-top: 20px;
  }
  line-height: 1.6;
}
</style>
