<template>
  <div class="m-qu-item">
    <div class="m-qu-idx" v-if="showIdx" split="、">{{data.showNo || idx}}</div>
    <div class="m-qu-con">
      <v-stem :content="data.content" :score="data.itemScore" :show-score="showScore"/>
      <template v-if="data.subItems && data.subItems.length > 0">
        <qu-item 
          class="is-child"
          v-for="(child, index) in data.subItems" 
          :key="index" 
          :data="child" 
          :show-analy="showAnaly" 
          :show-score="showScore" 
          :show-idx="showIdx" 
          :show-audio="showAudio"
          :show-video="showVideo"
          :show-option="showOption"
          :idx="child.showNo || index + 1"
        />
      </template>
      <template v-else>
        <v-options :data="data.options" v-if="showOption && data.options && data.options.length > 0"/>
        <v-analy :data="analy" :show-audio="showAudio" :show-video="showVideo" v-if="showAnaly"/>
      </template>
    </div>
  </div>
</template>

<script>
import vStem from './stem'
import vOptions from './options'
import vAnaly from './analy'
export default {
  name: 'qu-item',
  components: {
    vStem,
    vOptions,
    vAnaly
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    score: {
      type: Number,
      default: 0
    },
    idx: String,
    showAnaly: Boolean,
    showScore: Boolean,
    showIdx: Boolean,
    showAudio: Boolean,
    showVideo: Boolean,
    showOption: Boolean
  },
  computed: {
    analy() {
      const { diffLevelValue, points, answer, detail, videos, audios } = this.data
      return { diffLevelValue, points, answer, detail, videos, audios }
    }
  }
}
</script>

<style lang="less">
.m-qu{
  &-item{
    display: flex;
    align-items: baseline;
  }
  &-item.is-child{
    margin-top: 20px;
  }
  &-idx{
    white-space: nowrap;
    &::after{
      content: attr(split);
      display: inline-block;
    }
  }
  &-con{
    flex: 1;
  }
}
</style>
