export default ctx => [
  {
    prop: 'paperName',
    label: '试卷名称',
    'show-overflow-tooltip': true
  },
  {
    prop: 'productName',
    label: '产品线',
    width: 100
  },
  {
    prop: 'year',
    label: '年份',
    width: 100
  },
  {
    prop: 'region',
    label: '地区',
    width: 100
  },
  {
    prop: 'grade',
    label: '年级',
    width: 100
  },
  {
    prop: 'paperType',
    label: '类型',
    width: 100
  },
  {
    label: '操作',
    width: 80,
    align: 'center',
    render: (h, params) => {
      return (
        <div class="m-table-btn--opera">
          <router-link tag="i" class="iconfont icon-chakan" title="查看" to={{ name: 'Paper_Detail', params: { id: params.row.id } }}></router-link>
        </div>
      )
    }
  }
]
