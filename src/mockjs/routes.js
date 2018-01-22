const getAsyncRoutes = () => {
  return {
    success: true,
    message: '查询成功！',
    data: [
      {
        path: '/paper',
        name: 'Paper',
        componentPath: 'layout/index',
        meta: {
          title: '试卷库',
          icon: 'shijuan'
        },
        children: [
          {
            path: '',
            name: 'Paper_List',
            componentPath: 'paper/index',
            meta: {
              title: '试卷库'
            }
          }
        ]
      }
    ]
  }
}

export default getAsyncRoutes
