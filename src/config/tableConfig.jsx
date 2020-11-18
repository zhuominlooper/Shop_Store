import React from "react";
import { Button,Tag, message } from "antd";
import { reqDeleteRoles,reqUpdateStatusRoles,reqUpdateUsersStatus,reqDeleteUser } from "../api/index";
//role列表配置
let callBackGetRoles=null//回调函数
let callBackGetUser=null//查询user的回调函数

export const userTableColumns=[
  {
    width: 300,
    title: '用户名称',
    dataIndex: 'username',
    key: 'username',
  },
  {
    width: 300,
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '角色权限',
    dataIndex: 'role_name',
    key: 'role_name',
  },
  {
    title: '角色状态',
    render:(user)=>{
      console.log(234234,user)
      return   (
       <span>
       <Button  style={{marginRight:'16px'}}  onClick={()=>{updateUserStatus(user)}} type={user.status==='active'?"primary":"Default"}>{user.status==='active'?'冻结':"激活"}</Button>
      <span>{user.status==='active'? <Tag color="green">ACTIVE</Tag>: <Tag color="red">INACTIVE</Tag>}</span>
     </span>
         )
   }
  },
  {
    title: '操作',
    render:(user)=>(
      <Button type='link' danger onDoubleClick={()=>{deleteCurrentUser(user)}}>
      删除&nbsp;<span style={{color:'grey'}}>(双击)</span>
  </Button>
    )
  },

]
let deleteCurrentUser=async(user)=>{
 const result=await reqDeleteUser({
   _id:user._id
 })
 if(result.code===200){
  message.success('用户删除修改成功')
  callBackGetUser()
}
}
let updateUserStatus= async(user)=>{
    const result=await reqUpdateUsersStatus({
      _id:user._id,
      status:user.status==='active'?'stop':'active'
    })
    if(result.code===200){
      message.success('用户状态修改成功')
      callBackGetUser()
    }
}
export const searchUser=(callBack)=>{
  callBackGetUser=callBack//保存函调函数
}


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
    {
      width: 300,
      title: '状态',
      render:(role)=>{
         return   (
          <span>
          <Button  style={{marginRight:'16px'}}  onClick={()=>{updateStatus(role)}} type={role.status==='active'?"primary":"Default"}>{role.status==='active'?role.role_name==='admin'?'默认':'停用':"启用"}</Button>
         <span>{role.status==='active'? <Tag color="green">{role.role_name==='admin'?"启动中 (不可更改)":'启动中'}</Tag>: <Tag color="red">停用中</Tag>}</span>
        </span>
            )
      }
    },
    {
      width: 300,
      title: '操作',
      render:(role)=>{
         return   (
              <Button type='link' danger onDoubleClick={()=>{deleteCurrentRole(role)}}>
                  删除&nbsp;<span style={{color:'grey'}}>(双击)</span>
              </Button>
            )
      }
    },
   
  ]
  const deleteCurrentRole= async(role)=>{
       const result=await reqDeleteRoles({
         _id:role._id
       })
       if(result.code===200){
         message.success(`${role.role_name}删除成功!`)
         callBackGetRoles()
       }
  }
  const updateStatus=async(role)=>{
    if(role.role_name==='admin'){
      return
    }
    const result=await reqUpdateStatusRoles({
      _id:role._id,
      status:role.status==='active'?'stop':'active'
    })
    if(result.code===200){
      message.success(`状态更新成功!`)
      callBackGetRoles()
    }
  }
  export const searchRoles=(callBack)=>{
    callBackGetRoles=callBack//保存函调函数
  }

//统一的table页码配置
export const paginationProps = {
    showQuickJumper: true,
    responsive: true,
     hideOnSinglePage: true,
    pageSize: 8,
  };