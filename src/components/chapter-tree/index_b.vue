<template>
  <el-tree class="chapter-tree" :data="$attrs.data" :props="$attrs.props" node-key="id" default-expand-all :expand-on-click-node="false">
    <div class="chapter-tree-node" slot-scope="{node, data}">
      <span class="chapter-tree-node__index">{{node.isLeaf?'.':'、'}}</span>
      <input type="text" class="chapter-tree-node__ipt" v-if="data.canEdit" />
      <span class="chapter-tree-node__txt" v-else>{{node.label}}</span>
      <div class="chapter-tree-node__btn">
        <i class="el-icon-circle-plus-outline" v-if="!node.isLeaf"></i>
        <i class="el-icon-edit"></i>
        <i class="el-icon-delete"></i>
      </div>
    </div>
  </el-tree>
</template>

<script>
export default {}
</script>

<style lang="less">
.chapter-tree {
  &-node {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    &__txt,
    &__ipt {
      flex: 1;
    }
    &__ {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
