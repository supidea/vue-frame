<template>
  <el-input @keyup.enter.native="search" v-bind="$attrs" v-model="keyWord" class="search-bar">
    <el-button slot="append" icon="el-icon-search" @click="search" :loading="loading"></el-button>
  </el-input>
</template>

<script>
export default {
  props: {
    value: String,
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      keyWord: this.value
    }
  },
  watch: {
    value(val) {
      this.keyWord = val
    }
  },
  methods: {
    search() {
      this.$emit('search', this.keyWord)
    }
  }
}
</script>

<style lang="less">
.search-bar .el-input-group__append {
  background-color: var(--blue);
  border-color: var(--blue);
  color: #fff;
}
</style>
