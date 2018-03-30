<template>
  <div class="lecture-suite-content">
    <div class="lecture-suite-item" v-for="(item, index) in data" :key="item.code">
      <div class="left">
        <span class="lecture-suite-item__step">{{item.teachingStepsName}}:</span>
        <span class="lecture-suite-item__type">【{{setTypeName(item.refType)}}】</span>
        <span class="lecture-suite-item__name" :title="item.templateName">{{item.templateName}}</span>
      </div>
      <div class="right">
        <slot :row="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    data: Array
  },
  computed: {
    ...mapState({
      types: state => state.app.types
    })
  },
  methods: {
    setTypeName(type) {
      return this.types[type]
    }
  }
}
</script>

<style lang="less">
@import url(../../../assets/styles/variables.less);
.lecture-suite-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: @bodyBackground;
  padding: 15px 20px;
  & + & {
    margin-top: 20px;
  }
  & > .left {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  & > .right {
    margin-left: 20px;
  }
  &__name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
