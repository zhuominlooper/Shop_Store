import React from "react";
import './role.less';
import { reqGetRoles } from "../../api/index";
import { roleTableColumns ,paginationProps} from "../../config/tableConfig";
import {  dateFormat} from "../../utils/utils";
import { Table, Button, Card,Radio } from "antd";

//角色的组件
export default class RolePage extends React.Component {
  constructor() {
    super()
    this.state={
      roles:[],//角色列表
      role:{},//选中的role
    }
    this.paginationProps = paginationProps
    this.columns = roleTableColumns
  }
  
   rowSelection = {
    onChange: (key,selectRows) => {
    //设置选中的role
     this.setState({
       role:selectRows[0],
       isCanSetting:true
     })
    }
  };

  componentDidMount=async()=>{
    //获取列表数据
    const result=await reqGetRoles()
    if(result.code===200){ 
      this.setState({
        roles:result.data.map(x=>{        
          x.auth_time=dateFormat(x.auth_time)
          x.create_time=dateFormat(x.create_time) 
          return x
        })
      })
    }
  }

  render() {
    const {rowSelection}=this
    const {roles,role}=this.state
    const title = (
      <span>
        {this.state.isCanSetting}
        <Button className='btn-role-margin' type='primary'>创建角色</Button>
        <Button  disabled={!role._id}>设置角色权限</Button>
      </span>
    )
    return (
      <div>
        <Card
          {...title}
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
      </div>
    )
  }

}