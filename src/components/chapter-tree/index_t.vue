<template>
  <div class="m-tree">
    <div class="m-tree-node" v-for="(item, index) in data" :key="item.id">
      <div class="m-tree-node__content">
        <span class="m-tree-node__expand-icon el-icon-caret-right" @click="expand(item)" :class="{'is-expand': item.expand && item.children && item.children.length > 0}"></span>
        <div class="m-tree-node__label">
          <div class="m-tree-node__title">
            <span class="m-tree-node__index">{{sortNo(index+1, false)+'、'}}</span>
            <input type="text" class="m-tree-node__ipt" v-if="item.canEdit" v-model="item.name" v-focus @blur="handlerBlur(item)">
            <span class="m-tree-node__txt" v-else :title="item.name">{{item.name}}</span>
          </div>
          <div class="m-tree-node__btn">
            <i class="el-icon-circle-plus-outline" @click="handlerAdd(item)"></i>
            <i class="el-icon-edit" @click="handlerEdit(item)"></i>
            <i class="el-icon-delete" @click="handlerRemove(data, index)"></i>
          </div>
        </div>
      </div>
      <el-collapse-transition>
        <div class="m-tree-node__children" v-if="item.children && item.children.length > 0" v-show="!item.expand">
          <div class="m-tree-node" v-for="(sub, idx) in item.children" :key="sub.id" style="padding-left: 30px;">
            <div class="m-tree-node__content">
              <div class="m-tree-node__label">
                <div class="m-tree-node__title">
                  <span class="m-tree-node__index">{{sortNo(idx+1, true)+'.'}}</span>
                  <input type="text" class="m-tree-node__ipt" v-if="sub.canEdit" v-model="sub.name" v-focus @blur="handlerBlur(sub)">
                  <span class="m-tree-node__txt" @click="handlerSelect(sub)" v-else :title="sub.name">{{sub.name}}</span>
                </div>
                <div class="m-tree-node__btn">
                  <i class="el-icon-edit" @click="handlerEdit(sub)"></i>
                  <i class="el-icon-delete" @click="handlerRemove(item.children, idx)"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import { numberToChinese } from '../../utils'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },
  data() {
    return {
      canDo: true
    }
  },
  methods: {
    handlerAdd(item) {
      if (!this.canDo) return false
      const newChild = { id: '', name: '', canEdit: true }
      if (!item.children) {
        this.$set(item, 'children', [])
      }
      item.children.push(newChild)
    },
    handlerEdit(item) {
      if (!this.canDo) return false
      this.$set(item, 'canEdit', true)
    },
    handlerBlur(item) {
      if (item.name.trim()) {
        this.$set(item, 'canEdit', false)
      } else {
        this.canDo = false
      }
    },
    handlerRemove(parent, index) {
      if (parent[index].name.trim() === '') {
        this.canDo = true
      }
      this.$emit('handler-remove', index)
      parent.splice(index, 1)
    },
    handlerSelect(item) {
      this.$emit('handler-select', item)
    },
    expand(item) {
      this.$set(item, 'expand', !item.expand)
    },
    sortNo(idx, isLeaf) {
      let index = idx
      if (isLeaf) {
        if (index < 10) index = '0' + index
      } else {
        index = numberToChinese(index)
      }
      return index
    }
  }
}
</script>

<style lang="less">
.m-tree {
  &-node {
    padding: 5px 0;
    &__expand-icon {
      font-size: 18px;
      color: #c0c4cc;
      cursor: pointer;
      transition: transform 0.25s ease-in-out;
      margin-right: 5px;
      transform: rotate(90deg);
      &.is-expand {
        transform: rotate(0deg);
      }
    }
    &__label {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 24px;
      line-height: 24px;
      overflow: hidden;
    }
    &__content {
      display: flex;
    }
    &__title {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    &__index {
      margin-right: 8px;
    }
    &__txt,
    &__ipt {
      flex: 1;
    }
    &__txt {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    &__ipt {
      padding: 0 5px;
      height: 24px;
      border: 1px solid #ddd;
      box-sizing: border-box;
      &:focus {
        outline: none;
      }
    }
    &__btn {
      margin-left: 15px;
    }
  }
}
</style>
