<template>
  <div class="m-tree">
    <div class="m-tree-node" v-for="(item, index) in list" :key="item.id">
      <div class="m-tree-node__content">
        <span class="m-tree-node__expand-icon"></span>
        <div class="m-tree-node__title">
          <span class="m-tree-node m-tree-node_idx">{{index}}</span>
          <div class="m-tree-node m-tree-node_txt">{{item.label}}</div>
          <div class="m-tree-node m-tree-node_btn">
            <i class="el-icon-circle-plus-outline"></i>
            <i class="el-icon-edit"></i>
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </div>
      <div class="m-tree-node__children" v-if="item.children && item.children.length > 0">
        <div class="m-tree-node" v-for="(sub, idx) in item.children" :key="sub.id">
          <div class="m-tree-node__content">
            <span class="m-tree-node__expand-icon"></span>
            <div class="m-tree-node__title">
              <span class="m-tree-node m-tree-node_idx">{{idx}}</span>
              <div class="m-tree-node m-tree-node_txt">{{sub.label}}</div>
              <div class="m-tree-node m-tree-node_btn">
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
.m-tree {
  &-node {
    &__content {
      display: flex;
    }
    &__title {
      display: flex;
    }
  }
}
</style>
