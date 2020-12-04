import React from "react";
import "./persoanl.less";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Avatar, Popover } from "antd";
import celarCache from "../../utils/clear-cache";
const { confirm } = Modal;
export default class PersonalPage extends React.Component {
  constructor() {
    super();
    this.state={
      setting:[{title:'修改密码',tip:require('./icon/修改密码.png'),func:this.loginOut},{title:'个人中心', tip:require('./icon/个人中心.png'),func:this.loginOut},{title:'退出登录',tip:require('./icon/退出.png'),func:this.loginOut}]
    }
    
  }
  loginOut = () => {
    confirm({
        title: '确定要退出吗?',
        icon: <ExclamationCircleOutlined />,
        onOk: () => {
            //删除本地和浏览器的缓存
            celarCache()
        },
        onCancel() {
        },
    });
}
getPersonalSetting=()=>{
  const {setting}=this.state

  return setting.map((x,index)=>{
    return <li key={index}>
    <a className="a-nav" href="#">
      <img src={x.tip} alt=''/>
  <span onClick={()=>{x.func()}}>{x.title}</span>
    </a>
  </li>
  })
}
  render() {
    const picContent = (
      <div>
        <ul class="nav nav-pills nav-stacked">
          {this.getPersonalSetting()}
        </ul>
      </div>
    );
    return (
      <Popover placement="bottomRight" content={picContent} trigger="click">
        <Avatar
          style={{ backgroundColor: "azure", width: "32", height: "32" }}
          src={require('../../assets/images/touxiang.png')}
        />
      </Popover>
    );
  }
}
