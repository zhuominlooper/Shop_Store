import React from "react";
import { Redirect } from "react-router-dom";
import { Layout } from "antd";
import { memoryUtils } from "../../utils/memoryUtils";
import './admin.less';
import LeftNavComponent from "../../components/admin-left-nav/left-nav";
import HeaderComponent from "../../components/admin-header/header";

//登录的组件
const { Header, Footer, Sider, Content } = Layout;
export default class AdminPage extends React.Component {

    
    render(){
      //判断进入这个页面是否登录,如果没登录就跳转到登录页面
      const user=memoryUtils.user
     if(!user||!user._id){
         return <Redirect to="/login"/>
     }

        return (
        <Layout style={{height:"100%"}} >
        <Sider >
            <LeftNavComponent/>
        </Sider>
        <Layout >
          <Header className="ant-layout-header">
              <HeaderComponent/>
          </Header>
          <Content>Content</Content>
          <Footer className="ant-footer">Footer</Footer>
        </Layout>
      </Layout>
        )
    }

}