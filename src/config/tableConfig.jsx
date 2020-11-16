import React from "react";
import { Modal, Button, Space,Tag, message } from "antd";
import { reqDeleteRoles,reqUpdateStatusRoles } from "../api/index";
//role列表配置
let callBackGetRoles=null//回调函数
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
          <Button style={{marginRight:'16px'}}  onClick={()=>{updateStatus(role)}} type={role.status==='active'?"primary":"Default"}>{role.status==='active'?"停用":"启用"}</Button>
          <span>{role.status==='active'? <Tag color="green">启动中</Tag>: <Tag color="red">停用中</Tag>}</span>
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