<template>
  <section class="topic-filter-panel" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
    <v-item v-bind="$attrs" :label="item.label" :options="item.list" :value="value[item.key]" @handle-select="handleSelect($event, item.key)" v-for="item in baseOptions" :key="item.key" />
  </section>
</template>

<script>
import vItem from './item'
export default {
  components: { vItem },
  props: {
    type: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  inheritAttrs: false,
  data() {
    return {
      isExpand: false,
      loading: false
    }
  },
  computed: {
    baseOptions() {
      return this.$store.getters.getBaseOptions(...this.type)
    }
  },
  methods: {
    handleSelect(item, key) {
      let obj = {}
      obj[key] = item.code
      let newVal = {...this.value, ...obj}
      this.$emit('update:value', newVal)
      this.$emit('change', newVal)
    }
  }
}
</script>

<style lang="less">
@import url(./style.less);
</style>
