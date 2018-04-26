<template>
  <ul class="m-qu-analy">
    <li class="m-qu-analy__item" v-if="data.diffLevelValue">
      <div class="m-qu-analy__label">难度：</div>
      <div class="m-qu-analy__con">
        <el-rate :value="data.diffLevelValue" disabled>
        </el-rate>
      </div>
    </li>
    <li class="m-qu-analy__item" v-if="data.points">
      <div class="m-qu-analy__label">考点：</div>
      <div class="m-qu-analy__con">{{data.points}}</div>
    </li>
    <li class="m-qu-analy__item" v-if="data.answer">
      <div class="m-qu-analy__label">答案：</div>
      <div class="m-qu-analy__con">{{data.answer}}</div>
    </li>
    <li class="m-qu-analy__item" v-if="data.detail">
      <div class="m-qu-analy__label">解析：</div>
      <div class="m-qu-analy__con">{{data.detail}}</div>
    </li>
    <li class="m-qu-analy__item" v-if="showAudio && data.audios && data.audios.length > 0">
      <div class="m-qu-analy__label">音频：</div>
      <div class="m-qu-analy__con">
        <v-audio :data="item" v-for="(item, index) in data.audios" :key="index" />
      </div>
    </li>
    <li class="m-qu-analy__item" v-if="showVideo && data.videos && data.videos.length > 0">
      <div class="m-qu-analy__label">视频：</div>
      <div class="m-qu-analy__con">
        <v-video :data="item" v-for="(item, index) in data.videos" :key="index" />
      </div>
    </li>
  </ul>
</template>

<script>
import vAudio from './audio'
import vVideo from './video'
export default {
  components: {
    vAudio,
    vVideo
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showVideo: Boolean,
    showAudio: Boolean
  }
}
</script>

<style lang="less">
.m-qu-analy {
  padding: 20px;
  margin: 20px 0 0 0;
  background: var(--bg-color);
  &__item {
    display: flex;
    align-items: baseline;
    list-style: none;
    & + & {
      margin-top: 20px;
    }
  }
  &__label{
    white-space: nowrap;
  }
  &__con {
    flex: 1;
    margin-left: 15px;
  }
}
</style>
