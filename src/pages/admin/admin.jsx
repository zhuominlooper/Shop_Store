import React from "react";
import { Redirect,Route,Switch } from "react-router-dom";
import { Layout } from "antd";
import { memoryUtils } from "../../utils/memoryUtils";
import './admin.less';
import LeftNavComponent from "../../components/admin-left-nav/left-nav";
import HeaderComponent from "../../components/admin-header/header";

import HomePage from "../../pages/home/home";
import CategoryPage from "../../pages/category/category";
import BarPage from "../../pages/charts/bar";
import LinePage from "../../pages/charts/line";
import PiePage from "../../pages/charts/pie";
import ProductPage from "../../pages/product/product";
import RolePage from "../../pages/role/role";
import UserPage from "../../pages/user/user";

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
          <Content>
           <Switch>
             <Route path="/home" component={HomePage}/>
             <Route path="/category" component={CategoryPage}/>
             <Route path="/product" component={ProductPage}/>
             <Route path="/role" component={RolePage}/>
             <Route path="/user" component={UserPage}/>
             <Route path="/chart/bar" component={BarPage}/>
             <Route path="/chart/line" component={LinePage}/>
             <Route path="/chart/pie" component={PiePage}/>
             <Redirect to='/home'/>
           </Switch>
          </Content>
          <Footer className="ant-footer">Footer</Footer>
        </Layout>
      </Layout>
        )
    }

}