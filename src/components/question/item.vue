<template>
  <div class="m-qu-item">
    <v-stem :content="data.content" :score="data.itemScore" :tag="data.originTag" :show-score="showScore" :show-idx="showIdx" :idx="idx" :show-tag="showTag" :is-child="isChild" />
    <template v-if="data.subItems && data.subItems.length > 0">
      <qu-item 
        class="m-qu-child"
        v-for="(child, index) in data.subItems" 
        :key="index" 
        :data="child" 
        :show-analy="showAnaly" 
        :show-score="showScore" 
        :show-idx="showIdx" 
        :show-audio="showAudio"
        :show-video="showVideo"
        :show-option="showOption"
        :show-tag="showTag"
        :show-src-tag="showSrcTag"
        :idx="child.showNo || index + 1"
        :is-child="true"
      />
    </template>
    <template v-else>
      <v-options :data="data.options" v-if="showOption && data.options && data.options.length > 0"/>
      <v-analy :data="analy" :show-audio="showAudio" :show-video="showVideo" v-if="showAnaly" :show-src-tag="showSrcTag"/>
    </template>
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
    idx: {
      type: String,
      required: true
    },
    showAnaly: Boolean,
    showScore: Boolean,
    showIdx: Boolean,
    showAudio: Boolean,
    showVideo: Boolean,
    showOption: Boolean,
    showSrcTag: Boolean,
    showTag: Boolean,
    isChild: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    analy() {
      const { diffLevelValue, points, answer, detail, videos, audios, originTagList } = this.data
      return { diffLevelValue, points, answer, detail, videos, audios, originTagList }
    }
  }
}
</script>

<style lang="less">
.m-qu-child{
  margin-top: 20px;
}
</style>
