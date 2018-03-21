const status = {
  'AVAILABLE': '未发布',
  'DISABLED': '已发布'
}

export default ctx => [
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
    prop: 'productName',
    label: '产品线',
    width: 100
  },
  {
    label: '状态',
    width: 100,
    render: (h, scope) => (
      <span>
        {status[scope.row.status]}
      </span>
    )
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    width: 160
  },
  {
    label: '操作',
    width: 165,
    align: 'left',
    render: (h, params) => (
      <div class="m-table-btn--opera">
        <i class="iconfont icon-chakan" title="查看" />
        <i class="iconfont icon-fuzhi" title="复制" onClick={() => ctx.copy(params.row)} />
        <i class="iconfont icon-bianji" title="编辑" />
        <i class="iconfont icon-fabu" title="发布" onClick={() => ctx.publish(params.row)} />
        <i class="iconfont icon-shanchu" title="删除" onClick={() => ctx.remove(params)} />
      </div>
    )
  }
]
