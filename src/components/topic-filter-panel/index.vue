<template>
  <section class="topic-filter-panel" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
    <v-item v-bind="$attrs" :label="item.label" :options="item.list" :value="value[item.key]" @handle-select="handleSelect($event, item.key)" v-for="item in list" :key="item.key" />
  </section>
</template>

<script>
import vItem from './item'
import { app } from '../../api'
export default {
  components: { vItem },
  props: {
    type: {
      type: String,
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
      list: [],
      loading: false
    }
  },
  created() {
    this.getOptionsData(this.type)
  },
  methods: {
    async getOptionsData(type) {
      this.loading = true
      try {
        let res = await app.getDictData(type)
        this.list = res.data
      } catch (err) {
        this.$message.error(err)
      }
      this.loading = false
    },
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
