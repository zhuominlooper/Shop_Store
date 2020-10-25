
import React from "react";
import './left-nav.less';
import logo from "../../assets/images/shop-left-nav.png";
import { Link } from "react-router-dom";
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
export default class LeftNavComponent extends React.Component{

    render(){
        return (
            <div  className="left-nav">
              <Link to='/home' className="left-nav-header">
              <img  src={logo} alt="shop" />
                <h3>管理后台</h3>
              </Link>
              <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={false}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            首页
          </Menu.Item>



          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="商品">
            <Menu.Item key="9">品类管理</Menu.Item>
            <Menu.Item key="10">商品管理</Menu.Item>
          </SubMenu>
        </Menu>
            </div>

        )
    }
}