
import React from "react";
import './left-nav.less';
import logo from "../../assets/images/shop-left-nav.png";
import { Link,withRouter } from "react-router-dom";
import { Menu, message } from 'antd';
import { memoryUtils } from "../../utils/memoryUtils";
import {
  MailOutlined,
} from '@ant-design/icons';
import { menuList } from "../../config/menuConfig";
 const { SubMenu } = Menu;
 class LeftNavComponent extends React.Component {

  hasAuth=(item)=>{
      const {key}=item
      const {role}=memoryUtils.user
      if(role.includes(key)){
        return true
      }
      return false
  }
  //动态生成菜单导航，利用map和递归
  getMenuNodes = (menuList) => {
    const {pathname}=this.props.location
    return menuList.map(item => {
     //如果当前user有该菜单权限，才会显示
        if(this.hasAuth(item)){
          if (item.children) {
            if(item.children.findIndex(x=>pathname.indexOf(x.key)===0)>-1){
              this.openKey=item.key
            }      
            return (
              <SubMenu
                key={item.key}
                title={
                  <span>
                    <MailOutlined />
                    <span>{item.title}</span>
                  </span>
                }
              >
                {this.getMenuNodes(item.children)}
              </SubMenu>
            )
    
          } else {
            return (<Menu.Item key={item.key}
            >
              <Link to={item.key}>
              <MailOutlined />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
    
            )
          } 
        }

    })
  }
  //第一次reder之前执行
  componentWillMount=()=>{
      this.menuNodes=this.getMenuNodes(menuList)
  }
  render() {
    //得到当前请求的路径
    let pathname=this.props.location.pathname
    if(`${pathname}`.indexOf('/product')===0){//当前请求是商品或者其子路由
      pathname='/product'
    }
    const menuNodes = this.menuNodes
    const  openKey= this.openKey
    return (
      <div className="left-nav">
        <Link to='/home' className="left-nav-header">
          <img src={logo} alt="shop" />
          <h3>管理后台</h3>
        </Link>
        <Menu
          selectedKeys={[pathname]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {menuNodes}
        </Menu>
      </div>
    )
  }
}

//把非路由组件包装成路由组件
export default withRouter(LeftNavComponent)