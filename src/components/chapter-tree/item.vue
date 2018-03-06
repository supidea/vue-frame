<template>
  <div class="m-tree-node" style="padding-left: 30px">
    <div class="m-tree-node__content">
      <span class="m-tree-node__expand-icon el-icon-caret-right" :class="{'is-expand': expand}" @click="expand = !expand" v-if="!isLeaf"></span>
      <div class="m-tree-node__label">
        <div class="m-tree-node__title">
          <span class="m-tree-node__index" v-if="isLeaf">{{soltNum + '.'}}</span>
          <span class="m-tree-node__index" v-else>{{soltNum + '、'}}</span>
          <input type="text" class="m-tree-node__ipt" v-if="canEdit" @blur="blur" v-focus v-model="data.label">
          <span class="m-tree-node__txt" v-else>{{data.label}}</span>
        </div>
        <span class="m-tree-node__btn">
          <i class="el-icon-circle-plus-outline" v-if="!isLeaf"></i>
          <i class="el-icon-edit" @click="canEdit = true"></i>
          <i class="el-icon-delete" @click="remove"></i>
        </span>
      </div>
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
      expand: true,
      canEdit: false
    }
  },
  computed: {
    isLeaf() {
      return !(this.data.children && this.data.children.length > 0)
    },
    soltNum() {
      let index = this.idx + 1
      if (this.isLeaf) {
        if (index < 10) index = '0' + index
        return index
      } else {
        return numberToChinese(index)
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
    blur() {
      this.canEdit = false
    },
    remove() {
      console.log(this.data)
    }
  }
}
</script>

<style lang="less">
.m-tree-node {
  padding-left: 18px;
  white-space: nowrap;
  background: #fff;
  padding: 5px 0;
  &__expand-icon {
    font-size: 18px;
    color: #c0c4cc;
    cursor: pointer;
    transition: transform 0.25s ease-in-out;
    margin-right: 5px;
    &.is-expand {
      transform: rotate(90deg);
    }
  }
  &__label {
    flex: 1;
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: space-between;
    height: 24px;
    line-height: 24px;
  }
  &__title{
    display: flex;
    flex: 1;
    align-items: center;
    overflow: hidden;
    margin-right: 15px;
  }
  &__content {
    display: flex;
    align-items: center;
  }
  &__children {
    overflow: hidden;
  }
  &__index{
    margin-right: 6px;
  }
  &__txt{
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__ipt{
    padding: 0 5px;
    height: 24px;
    border: 1px solid #ddd;
    flex: 1;
    box-sizing: border-box;
    &:focus{
      outline: none;
    }
  }
}
</style>
