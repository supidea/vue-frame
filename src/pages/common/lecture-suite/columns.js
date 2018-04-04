export const lectureColumns = ctx => [
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
    label: '讲义名称',
    'show-overflow-tooltip': true
  },
  {
    prop: 'gradeName',
    label: '年级',
    width: 80
  },
  {
    prop: 'courseTypeName',
    label: '课程类型',
    width: 100
  },
  {
    prop: 'regionName',
    label: '知识体系',
    width: 100
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    width: 160
  }
]

export const paperColumns = ctx => [
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
    prop: 'paperName',
    label: '试卷名称',
    'show-overflow-tooltip': true
  },
  {
    prop: 'grade',
    label: '年级',
    width: 80
  },
  {
    prop: 'paperType',
    label: '试卷类型',
    width: 100
  },
  {
    prop: 'updateUser',
    label: '更新人',
    width: 100
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    width: 160
  }
]
