

//role列表配置
export const roleTableColumns= [
    {
      width: 300,
      title: '角色名称',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      width: 300,
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },

    {
      width: 300,
      title: '授权时间',
      dataIndex: 'auth_time',
      key: 'auth_time',
    },
    {
      width: 300,
      title: '授权人',
      dataIndex: 'auth_name',
      key: 'auth_name',
    },
   
  ]

//统一的table页码配置

export const paginationProps = {
    showQuickJumper: true,
    responsive: true,
     hideOnSinglePage: true,
    pageSize: 8,
  };