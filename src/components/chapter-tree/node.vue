<template>
  <div class="chapter-tree-node" @mousedown="test($event)">
    <div class="chapter-tree-node__title">
      <input type="text" class="chapter-tree-node__ipt" :value="data.label" v-if="data.canEdit" @blur="handlerBlur($event.target.value, data)" ref="ipt" v-focus/>
      <span class="chapter-tree-node__txt" :title="data.label" v-else>{{title}}</span>
    </div>
    <div class="chapter-tree-node__btn">
      <i class="el-icon-circle-plus-outline" @click="handlerAdd(data)" v-if="!node.isLeaf"></i>
      <i class="el-icon-edit" @click="handlerEdit(data)"></i>
      <i class="el-icon-delete" @click="handlerRemove(node, data)"></i>
    </div>
  </div>
</template>

<script>
import { numberToChinese } from '../../utils'
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
  computed: {
    title() {
      const parent = this.node.parent
      const children = parent.data.children || parent.data
      let index = children.findIndex(d => d.id === this.data.id) + 1

      let isLeaf = this.node.isLeaf
      if (isLeaf) {
        if (index < 10) index = '0' + index
        return index + '.' + this.data.label
      } else {
        return numberToChinese(index) + '、' + this.data.label
      }
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },
  methods: {
    handlerAdd(data) {
      const newChild = { id: '', label: '', canEdit: true }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    handlerEdit(data) {
      this.$set(data, 'canEdit', true)
      this.$nextTick(() => {
        this.$refs['ipt'].focus()
      })
    },
    handlerRemove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    handlerBlur(val, data) {
      if (val.trim() === '') {
        return console.log('xxxxxxx')
      }
      data.label = val
      this.$set(data, 'canEdit', false)
    },
    test(ele) {
      const currentEle = ele.currentTarget
      console.log(currentEle.parentNode.parentNode)
    }
  }
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
