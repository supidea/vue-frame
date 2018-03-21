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
    prop: 'regionName',
    label: '地区',
    width: 100
  },
  {
    prop: 'shareUserName',
    label: '分享人',
    width: 100
  },
  {
    prop: 'replicaNum',
    label: '复制次数',
    width: 100
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    width: 160
  },
  {
    label: '操作',
    width: 80,
    align: 'center',
    render: (h, params) => (
      <div class="m-table-btn--opera">
        <i class="iconfont icon-bianji" title="编辑" />
        <i
          class="iconfont icon-shanchu"
          title="删除"
          onClick={() => ctx.remove(params)}
        />
      </div>
    )
  }
]
