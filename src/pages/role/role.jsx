import React from "react";
import './role.less';
import { reqGetRoles } from "../../api/index";
import { roleTableColumns ,searchRoles,paginationProps} from "../../config/tableConfig";
import {  dateFormat} from "../../utils/utils";
import   SettingRolePage from "./components/auth-role";
import  AddRolePage from "./components/add-role";
import { Table, Button, Card,Modal, message } from "antd";
import { reqAddRoles ,reqUpdateRoles} from "../../api/index";
import { memoryUtils } from "../../utils/memoryUtils";

//角色的组件
export default class RolePage extends React.Component {
  constructor() {
    super()
    this.addRoleRef=React.createRef()
    this.state={
      roles:[],//角色列表
      role:{},//选中的role
      showAddModel:false,
      showSettingRole:false
    }
    //添加role的from
    this.addRoleFormData={}
    this.paginationProps = paginationProps
    this.columns = roleTableColumns
  }
  
   rowSelection = {
    onChange: (key,selectRows) => {
    //设置选中的role
     this.setState({
       role:selectRows[0]
     })
    }
  };
  //添加role
  addRole=async()=>{
    const role_name=this.addRoleFormData.current.getFieldValue('role_name')
    if(role_name.length<2||role_name.length>4){
      return
    }
    //保存角色
     const result=await reqAddRoles({role_name})
       if(result.code===200){
         message.success('角色添加成功!')
         this.addRoleFormData.current.resetFields();
         this.handleCancel()
         this.getRoleList() 
       }
  }
  updateRole=async()=>{
    const menus= this.addRoleRef.current.getCheckMenus()
    const {role}=this.state
     const result=await reqUpdateRoles(
       {
        ...role,...{
          auth_name: memoryUtils.user.username?memoryUtils.user.username:'system',
          auth_time:Date.now(),
          create_time:Date.now(role.create_time),
          menus
        }
       }
     )
     if(result.code===200){
       message.success('角色授权成功')
       this.getRoleList()
       this.handleCancel()
     }
  }
  //取消模态框
  handleCancel=()=>{
    this.setState({
      showAddModel:false,
      showSettingRole:false
    })
  }

  getRoleList=async()=>{

      const result=await reqGetRoles()
      if(result.code===200){ 
        this.setState({
          role:{...result.data[0]},
          roles:result.data.map(x=>{        
            x.auth_time=dateFormat(x.auth_time)
            x.create_time=dateFormat(x.create_time) 
            return x
          })
        })
      }

    }
  componentDidMount=async()=>{
    searchRoles(this.getRoleList)
  this.getRoleList()
  }

  render() {
    const {rowSelection}=this
    const {roles,role,showAddModel,showSettingRole}=this.state
    const title = (
      <span>
        <Button className='btn-role-margin' type='primary' onClick={()=>{this.setState({showAddModel:true})}}>创建角色</Button>
        <Button  disabled={!role._id}  onClick={()=>{this.setState({showSettingRole:true})}} >设置角色权限</Button>
      </span>
    )
    return (
      <div>
        <Card
         title={title}
        >
            <Table
             rowSelection={{
              type: 'radio',
              ...rowSelection,
            }}
                 pagination={this.paginationProps}
                 rowKey='_id'
                 bordered
                 dataSource={roles}
                 columns={this.columns}
            >

            </Table>
        </Card>
        <Modal
          maskClosable={false}
          title="添加角色"
          visible={showAddModel}
           onOk={this.addRole}
           onCancel={this.handleCancel}
        >
           <AddRolePage getFormValue={(value)=>{this.addRoleFormData=value}}></AddRolePage>
        </Modal>
        <Modal
          maskClosable={false}
          title="设置角色权限"
           visible={showSettingRole}
           onOk={this.updateRole}
           onCancel={this.handleCancel}
        >
           <SettingRolePage ref={this.addRoleRef} role={role}></SettingRolePage>
        </Modal>
      </div>
    )
  }

}