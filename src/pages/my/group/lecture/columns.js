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
    width: 80
  },
  {
    prop: 'courseTypeName',
    label: '课程类型',
    width: 80
  },
  {
    prop: 'source',
    label: '来源',
    width: 70,
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
    width: 90
  },
  {
    label: '状态',
    width: 80,
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
    width: 80
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
        <router-link tag="i" class="iconfont icon-chakan" title="查看" to={{ name: 'My_Group_Lecture_Detail', params: { id: params.row.id } }}></router-link>
        <i class="iconfont icon-fuzhi" title="复制" />
        <i class="iconfont icon-fenxiang" title="分享" />
        <router-link tag="i" class="iconfont icon-bianji" title="编辑" to={{ name: 'My_Group_Lecture_Edit', params: { id: params.row.id } }}></router-link>
        <i class="iconfont icon-fabu" title="发布" />
        <i class="iconfont icon-shanchu" title="删除" onClick={() => ctx.remove(params)}/>
      </div>
    )
  }
]
