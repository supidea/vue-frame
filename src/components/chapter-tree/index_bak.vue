<template>
  <el-tree class="chapter-tree" :data="list" node-key="id" default-expand-all :expand-on-click-node="false">
    <v-node slot-scope="{node, data}" draggable="true" :node="node" :data="data"/>
    <!-- <div class="chapter-tree-node" slot-scope="{node, data}">
      <div class="chapter-tree-node__title">
        <span v-if="!data.canEdit" class="chapter-tree-node__txt" :title="data.label">{{data.label}}</span>
        <input class="chapter-tree-node__ipt" type="text" v-else @blur="editEnd(data)" v-model="data.label">
      </div>
      <div class="chapter-tree-node__btn">
        <i class="el-icon-circle-plus-outline" v-if="!node.isLeaf" @click="add(data)"></i>
        <i class="el-icon-edit" @click="editStart(data)"></i>
        <i class="el-icon-delete"></i>
      </div>
    </div> -->
    <!-- <v-node :data="data" slot-scope="{node, data}">
      <i class="el-icon-circle-plus-outline" @click="edit(node)" v-if="!node.isLeaf"></i>
      <i class="el-icon-edit"></i>
      <i class="el-icon-delete"></i>
    </v-node> -->
  </el-tree>
</template>

<script>
import vNode from './node'
export default {
  components: {
    vNode
  },
  data() {
    return {
      list: [
        {
          id: 1,
          label: '第一章啊啊',
          children: [
            {
              id: 21,
              label:
                '第一一章啊啊一章啊第一一章啊啊一章啊第一一章啊啊一章啊第一一章啊啊一章啊'
            },
            {
              id: 22,
              label: '第一一章啊'
            },
            {
              id: 213,
              label:
                '第一一章啊啊一章啊第一一章啊啊一章啊第一一章啊啊一章啊第一一章啊啊一章啊'
            },
            {
              id: 2211,
              label: '第一一章啊'
            },
            {
              id: 11121,
              label:
                '第一一章啊啊一章啊第一一章啊啊一章啊第一一章啊啊一章啊第一一章啊啊一章啊'
            },
            {
              id: 1122,
              label: '第一一章啊'
            },
            {
              id: 11213,
              label:
                '第一一章啊啊一章啊第一一章啊啊一章啊第一一章啊啊一章啊第一一章啊啊一章啊'
            },
            {
              id: 112211,
              label: '第一一章啊'
            },
            {
              id: 112221,
              label:
                '第一一章啊啊一章啊第一一章啊啊一章啊第一一章啊啊一章啊第一一章啊啊一章啊'
            },
            {
              id: 321222,
              label: '第一一章啊'
            },
            {
              id: 12314213,
              label:
                '第一一章啊啊一章啊第一一章啊啊一章啊第一一章啊啊一章啊第一一章啊啊一章啊'
            },
            {
              id: 52132211,
              label: '第一一章啊'
            }
          ]
        },
        {
          id: 11,
          label: '第一章啊啊',
          children: [
            {
              id: 211,
              label: '第一一章啊'
            },
            {
              id: 212,
              label: '第一一章啊'
            }
          ]
        }
      ]
    }
  },
  methods: {
    editStart(ctx) {
      this.$set(ctx, 'canEdit', true)
    },
    editEnd(ctx) {
      this.$set(ctx, 'canEdit', false)
    },
    add(data) {
      const newChild = { id: '', label: '111111' }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    update(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="less">
// .chapter-tree-node{
//   display: flex;
//   flex: 1;
//   justify-content: space-between;
//   overflow: hidden;
//   &__title{
//     display: flex;
//     flex: 1;
//     overflow: hidden;
//   }
//   &__txt{
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }
//   &__btn{
//     margin-left: 20px;
//   }
// }
// .chapter-tree {
//   &-node {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     flex: 1;
//     padding: 3px 0;
//     &__title{
//       flex: 1;
//       display: flex;
//     }
//     &__txt{
//       display: block;
//       text-overflow: ellipsis;
//       overflow: hidden;
//       white-space: nowrap;
//     }
//   }
// }
</style>
