const status = {
  'AVAILABLE': '未发布',
  'DISABLED': '已发布'
}

const source = {
  'USER_DEFINED': '自创',
  'SYSTEM_IMPORT': '系统导入',
  'USER_COPY': '分享库'
}

export default ctx => [
  {
    prop: 'name',
    label: '讲义名称',
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
    prop: 'source',
    label: '来源',
    width: 90,
    render: (h, scope) => (
      <span>
        {source[scope.row.source]}
      </span>
    )
  },
  {
    prop: 'productName',
    label: '产品线',
    width: 100
  },
  {
    prop: 'shareUserName',
    label: '分享人',
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
    label: '是否分享',
    width: 80,
    render: (h, scope) => (
      <span>
        {scope.row.shareFlag ? '已分享' : '未分享'}
      </span>
    )
  },
  {
    prop: 'replicaNum',
    label: '复制次数',
    width: 90
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    width: 160
  },
  {
    label: '操作',
    width: 190,
    align: 'left',
    render: (h, params) => (
      <div class="m-table-btn--opera">
        <i class="iconfont icon-chakan" title="查看" />
        <i class="iconfont icon-fuzhi" title="复制" />
        <i class="iconfont icon-fenxiang" title="分享" />
        <i class="iconfont icon-bianji" title="编辑" />
        <i class="iconfont icon-fabu" title="发布" />
        <i
          class="iconfont icon-shanchu"
          title="删除"
          onClick={() => ctx.remove(params)}
        />
      </div>
    )
  }
]
