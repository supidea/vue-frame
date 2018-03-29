export default ctx => [
  {
    prop: 'pointName',
    label: '知识点'
  },
  {
    prop: 'requireName',
    label: '考试要求',
    width: 80
  },
  {
    prop: 'requireDetail',
    label: '具体要求'
  },
  {
    prop: 'frequencyName',
    label: '考查频率',
    width: 100
  },
  {
    label: '操作',
    width: 80,
    align: 'center',
    render: (h, params) => (
      <div class="m-table-btn--opera">
        <i
          class="iconfont icon-shanchu"
          title="删除"
          onClick={() => ctx.remove(params)}
        />
      </div>
    )
  }
]
