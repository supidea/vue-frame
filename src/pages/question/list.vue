<template>
  <div>
    <v-search-bar class="l-mb" placeholder="请输入sdfsdfsf内容" v-model="value" size="small" style="width: 300px" />
    <v-topic-selector-panel class="l-mb" label-width="80px" type="PAPER" :value.sync="selectorValue" @change="change" />
    <v-table border :data="tableData" :columns="columns" />
    <div class="l-mt l-tar">
      <el-pagination background layout="total, prev, pager, next" :total="1000" class="m-pagination">
      </el-pagination>
    </div>
    <el-dialog class="m-dialog" title="收货地址" :visible.sync="dialogTableVisible">
      斯蒂芬斯发第三方第三方第三方的
    </el-dialog>
  </div>
</template>

<script>
import vTable from '../../components/table'
import vTopicSelectorPanel from '../../components/topic-filter-panel'
import vSearchBar from '../../components/search-bar'
export default {
  components: {
    vTable,
    vTopicSelectorPanel,
    vSearchBar
  },
  data() {
    return {
      value: '',
      selectorValue: {},
      dialogTableVisible: false,
      radio: '1',
      columns: [
        { type: 'selection', align: 'center' },
        {
          prop: 'date',
          label: '日期',
          width: 180,
          'show-overflow-tooltip': true
        },
        { type: 'html', prop: 'name', label: '名称' },
        {
          prop: 'address',
          label: '地址',
          fixed: 'right',
          width: 100,
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
      ],
      list: [
        {
          id: 111,
          name: '3测试111',
          children: [
            {
              id: 2232,
              name: '22测试232323'
            },
            {
              id: 32232,
              name: '33测试232323'
            }
          ]
        },
        {
          id: 4111,
          name: '4测试111',
          children: [
            {
              id: 52232,
              name: '444测试232323'
            },
            {
              id: 62232,
              name: '555测试232323'
            }
          ]
        }
      ]
    }
  },
  watch: {
    selectorValue(val) {
      console.log('xxxxxx')
      console.log(val)
    }
  },
  methods: {
    bss(item) {
      console.log(item)
    },
    change(val) {
      console.log(val)
    },
    handlerSelect(val) {
      console.log(val)
    }
  }
}
</script>
