import React,{Fragment} from "react";
import './user.less';
import { userTableColumns ,paginationProps,searchUser} from "../../config/tableConfig";
import { reqGetUsers } from "../../api/index";
import { Table, Button, Card,Modal, message } from "antd";

//用户管理的组件
export default class UserPage extends React.Component {
  constructor() {
    super()
    this.state = {
      users: [],//角色列表
      user: {},//选中的role
    }
    //获取table的配置
    this.paginationProps = paginationProps
    this.columns = userTableColumns
    searchUser(this.getUsers)//保存回调函数

  }
  getUsers=async()=>{
    const result=await reqGetUsers()
    if(result.code===200){
      this.setState({
        users:result.data
      })
    }
  }
  rowSelection = {
    onChange: (key,selectRows) => {
    //设置选中的role

     this.setState({
       user:selectRows[0]
     })
    }
  };
  componentDidMount=()=>{
     this.getUsers()
  }

  render() {
    const {rowSelection}=this
    const {users,user}=this.state
    return (
      <Fragment>
         <Card
        >
            <Table
             rowSelection={{
              type: 'radio',
              ...rowSelection,
            }}
                 pagination={this.paginationProps}
                 rowKey='_id'
                 bordered
                 dataSource={users}
                 columns={this.columns}
            >

            </Table>
        </Card>
      </Fragment>
    )
  }

}