<template>
  <el-table v-bind="$attrs" v-on="$listeners" style="width: 100%;overflow:hidden" header-cell-class-name="hi-table__head-cell">
    <template v-for="(column, index) in columns">
      <el-table-column :align="column.align" :type="column.type" :width="column.width" :key="index" v-if="column.type === 'selection' || column.type === 'index'">
      </el-table-column>
      <el-table-column :align="column.align" :type="column.type" :width="column.width" :key="index" v-else-if="column.type === 'expand'">
        <template slot-scope="scope">
          <table-extand :render="column.render" :data="scope" />
        </template>
      </el-table-column>
      <el-table-column :align="column.align" :label="column.label" :width="column.width" :key="index" v-else-if="column.type === 'html'">
        <template slot-scope="scope">
          <div v-html="scope.row[column.prop]"></div>
        </template>
      </el-table-column>
      <el-table-column :align="column.align" :label="column.label" :width="column.width" :key="index" v-else-if="column.render">
        <template slot-scope="scope">
          <table-extand :render="column.render" :data="scope" />
        </template>
      </el-table-column>
      <el-table-column :align="column.align" :prop="column.prop" :label="column.label" :width="column.width" :key="index" v-else>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import tableExtand from './extand'
export default {
  components: {
    tableExtand
  },
  props: ['columns'],
  inheritAttrs: false
}
</script>

<style lang="less">
.hi-table {
  &__head-cell {
    background-color: #ecf5ff;
  }
}
</style>
