<template>
  <div class="chapter-tree-node">
    <div class="chapter-tree-node__title">
      <input type="text" class="chapter-tree-node__ipt" :value="data.label" @input="update($event.target.value)" v-if="canEdit" @blur="handlerBlur" ref="ipt" />
      <span class="chapter-tree-node__txt" :title="data.label" v-else>{{data.label}}</span>
    </div>
    <div class="chapter-tree-node__btn">
      <i class="el-icon-circle-plus-outline" @click="handlerAdd" v-if="!node.isLeaf"></i>
      <i class="el-icon-edit" @click="handlerEdit"></i>
      <i class="el-icon-delete" @click="handlerRemove"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    node: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      canEdit: false
    }
  },
  methods: {
    handlerAdd() {},
    handlerEdit() {
      this.canEdit = true
      this.$nextTick(() => {
        this.$refs['ipt'].focus()
      })
    },
    handlerRemove() {
      this.$emit('handler-remove')
    },
    handlerBlur() {
      this.canEdit = false
      console.log(this.data)
    },
    update(val) {
      console.log(val)
    }
  },
  mounted() {}
}
</script>

<style lang="less">
.chapter-tree-node {
  display: flex;
  flex: 1;
  justify-content: space-between;
  overflow: hidden;
  &__title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__btn {
    width: 60px;
    text-align: right;
    margin-left: 20px;
  }
}
</style>
