<template>
  <div class="m-tree-node">
    <div class="m-tree-node__content">
      <span class="m-tree-node__expand-icon el-icon-caret-right" :class="{'is-expand': expand}" @click="expand = !expand" v-if="!isLeaf"></span>
      <div class="m-tree-node__label">{{title+'.'+data.label}}</div>
    </div>
    <el-collapse-transition>
      <div class="m-tree-node__children" v-if="!isLeaf" v-show="expand">
        <tree-node v-for="(item, index) in data.children" :key="index" :data="item" :idx="index"></tree-node>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { numberToChinese } from '../../utils'
export default {
  name: 'treeNode',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    idx: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      expand: true
    }
  },
  computed: {
    isLeaf() {
      return !(this.data.children && this.data.children.length > 0)
    },
    title() {
      let index = this.idx + 1
      if (this.isLeaf) {
        if (index < 10) index = '0' + index
        return index + '、' + this.data.label
      } else {
        index = numberToChinese(index)
        return index + '.' + this.data.label
      }
    }
  }
}
</script>

<style lang="less">
.m-tree-node {
  padding-left: 18px;
  white-space: nowrap;
  &__expand-icon {
    font-size: 18px;
    color: #c0c4cc;
    cursor: pointer;
    transition: transform 0.25s ease-in-out;
    &.is-expand {
      transform: rotate(90deg);
    }
  }
  &__label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__content {
    display: flex;
    align-items: center;
    padding: 5px 0;
  }
  &__children {
    overflow: hidden;
  }
}
</style>
