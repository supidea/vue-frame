<template>
  <div>
    <v-topic-selector-panel style="margin-bottom: 20px;" label-width="60px"/>
    <v-table border :data="tableData" :columns="columns" />
  </div>
</template>

<script>
import vTable from '../../components/table'
import vTopicSelectorPanel from '../../components/topic-selector-panel'
export default {
  components: {
    vTable,
    vTopicSelectorPanel
  },
  data() {
    return {
      columns: [
        { type: 'selection', align: 'center' },
        {
          prop: 'date',
          label: '日期',
          width: 180,
          'show-overflow-tooltip': true
        },
        { type: 'html', prop: 'name', label: '名称', width: 180 },
        {
          prop: 'address',
          label: '地址',
          fixed: 'right',
          render: (h, params) => (
            <span onClick={this.bss.bind(this, params)}>ffffffffffff</span>
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
          date: '2016-05-04fffffffffffffffffffffffffffffffffffffffffffff',
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
