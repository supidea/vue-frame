const getAsyncRoutes = () => {
  return {
    success: true,
    message: '查询成功！',
    data: [
      {
        path: '/paper',
        name: 'Paper',
        componentPath: 'layout/index',
        children: [
          {
            path: '',
            name: 'Paper_List',
            componentPath: 'paper/index'
          }
        ]
      }
    ]
  }
}

export default getAsyncRoutes
