<template>
  <div class="m-tree">
    <v-item v-for="(item, index) in data" :data="item" :key="index" :idx="index" :node="data">
      <i class="el-icon-circle-plus-outline"></i>
      <i class="el-icon-edit"></i>
      <i class="el-icon-delete"></i>
    </v-item>
  </div>
</template>

<script>
import vItem from './item'
import Bus from './bus'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    vItem
  },
  mounted() {
    Bus.$on('update', val => {
      console.log(val)
    })
  }
}
</script>
