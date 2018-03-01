<template>
  <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <span>{{ node.label }}</span>
      <span>
        <el-button type="text" size="mini" @click="() => append(data)">
          Append
        </el-button>
        <el-button type="text" size="mini" @click="() => remove(node, data)">
          Delete
        </el-button>
      </span>
    </span>
  </el-tree>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  }
}
</script>
