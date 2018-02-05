<template>
  <v-table :data="tableData" :columns="columns" />
</template>

<script>
import vTable from '../../components/table'
export default {
  components: {
    vTable
  },
  data() {
    return {
      columns: [
        { type: 'index' },
        { prop: 'date', label: '日期', width: 180 },
        { type: 'html', prop: 'name', label: '名称', width: 180 },
        {
          prop: 'address',
          label: '地址',
          render: (h, params) => (
            <span onClick={this.bss.bind(this, params)}>ffffffffffff</span>
            // <span onClick={params => { this.bss(params) }}>ffffffffffff</span>
          )
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎<span>dfdf</span>',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    bss(item) {
      console.log(item)
    }
  }
}
</script>
