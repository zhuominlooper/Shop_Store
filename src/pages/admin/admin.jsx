import React from "react";
import { Redirect,Route,Switch } from "react-router-dom";
import { Layout } from "antd";
import { factoryContext } from "../../config/context";
import Cookies from "js-cookie";
import './admin.less';
import LeftNavComponent from "../../components/admin-left-nav/left-nav";
import HeaderComponent from "../../components/admin-header/header";
import UnFindPage from "../../components/404/404";
import HomePage from "../../pages/home/home";
import CategoryPage from "../../pages/category/category";
import BarPage from "../../pages/charts/bar";
import LinePage from "../../pages/charts/line";
import PiePage from "../../pages/charts/pie";
import ProductHomePage from "../../pages/product/home";
import RolePage from "../../pages/role/role";
import UserPage from "../../pages/user/user";
import storageUtils from "../../utils/storageUtils";
//登录的组件
const { Header, Footer, Sider, Content } = Layout;
export default class AdminPage extends React.Component {

  componentWillMount=()=>{
  
  }
    render(){
      factoryContext.memoryUtils.user=storageUtils.getData()

   //判断进入这个页面是否登录,如果没登录就跳转到登录页面
   const isAutoLogin=Cookies.get('is_auto_login')||false
   const rememberLogin=Cookies.get('remember_login')||false
   //说明没设置记住密码
   if(!isAutoLogin&&!rememberLogin){
     return <Redirect to="/login"/>
   }
  const user=factoryContext.memoryUtils.user
  if(!user||!user._id){
      return <Redirect to="/login"/>
  }
   
        return (
        <Layout style={{minHeight:"100%"}} >
        <Sider >
            <LeftNavComponent />
        </Sider>
        <Layout >
          <Header className="ant-layout-header">
              <HeaderComponent/>
          </Header>
          <Content style={{backgroundColor:'#fff',margin:"24px 26px"}}>
            <Switch>
             
             <Route path="/page/home" component={HomePage} />
             <Route path="/page/category" component={CategoryPage} />
             <Route path="/page/product" component={ProductHomePage} />
             <Route path="/page/role" component={RolePage} />
             <Route path="/page/user" component={UserPage} />
             <Route path="/page/chart/bar" component={BarPage} />
             <Route path="/page/chart/line" component={LinePage} />
             <Route path="/page/chart/pie" component={PiePage} />
             <Route path='/page/*' component={UnFindPage} ></Route> 
           </Switch> 
          </Content>
          <Footer className="ant-footer">Footer</Footer>
        </Layout>
      </Layout>
        )
    }

}