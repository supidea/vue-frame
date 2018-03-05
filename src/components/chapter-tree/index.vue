<template>
  <div class="m-tree">
    <v-item v-for="(item, index) in list" :data="item" :key="index" :idx="index"></v-item>
    <!-- <div class="m-tree-node" v-for="(item, index) in list" :key="index">
      <div class="m-tree-node__content">{{item.label}}</div>
      <div class="m-tree-node" v-for="(sub, idx) in item.children" :key="idx">
        <div class="m-tree-node__content">{{sub.label}}</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import vItem from './item'
export default {
  components: {
    vItem
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
  }
}
</script>

<style lang="less">
.chapter-tree {
  &-node {
    padding-left: 18px;
  }
}
</style>
