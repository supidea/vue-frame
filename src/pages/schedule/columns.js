export default ctx => [
  {
    width: 40,
    align: 'center',
    render: (h, params) => {
      return (
        <el-checkbox value={params.row.id === ctx.selectedData.id} onChange={() => ctx.select(params.row)}></el-checkbox>
      )
    }
  },
  {
    prop: 'name',
    label: '讲义套件名称',
    'show-overflow-tooltip': true
  },
  {
    prop: 'gradeName',
    label: '年级',
    width: 100
  },
  {
    prop: 'courseTypeName',
    label: '课程类型',
    width: 100
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    width: 160
  }
]
