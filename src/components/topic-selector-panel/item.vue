<template>
  <dl class="topic-selector-panel__item">
    <dt class="topic-selector-panel__label" :style="{width: labelWidth}">{{label}}：</dt>
    <dd class="topic-selector-panel__tags" ref="tags">
      <span class="topic-selector-panel__tag" :class="{'is-active': item.code === value}" @click="handleSelect(item)" v-for="item in options" :key="item.code">{{item.label}}</span>
    </dd>
    <dd class="topic-selector-panel__more">
      <span v-if="hasExpandBtn" @click="handlerExpand">{{isExpand?'收起':'更多'}}
        <i :class="[isExpand?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
      </span>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    labelWidth: String,
    label: String,
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number],
      default: ''
    },
    handleSelect: Function
  },
  data() {
    return {
      isExpand: false,
      hasExpandBtn: false,
      minHeight: 0,
      maxHeight: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      let tagsEle = document.documentElement.querySelector('.topic-selector-panel__tags')
      let tagEle = document.documentElement.querySelector('.topic-selector-panel__tag')
      this.minHeight = tagEle.clientHeight
      this.maxHeight = tagsEle.clientHeight
      tagsEle.style.height = this.minHeight + 'px'
      if (this.maxHeight > this.minHeight) {
        this.hasExpandBtn = true
        this.isExpand = false
      }
    })
  },
  methods: {
    handlerExpand() {
      this.isExpand = !this.isExpand
    }
  }
}
</script>
