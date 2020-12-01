import React from "react";
import './product.less';
import { Switch,Route,Redirect } from "react-router-dom";
import ProductHandlePage from "./component/product-add-update";
import ProductDteailPage from "./component/product-detail";
import ProductPage from "./product";

//商品管理
export default class ProductHomePage extends React.Component {

    render(){
      return(
         <Switch>
             {/* exact表示精确匹配 */}
         
           <Route path='/page/product/addupdate' component={ProductHandlePage} ></Route>
           <Route path='/page/product/detail' component={ProductDteailPage} ></Route>
           <Route path='/page/product' component={ProductPage} ></Route>
         </Switch>
      )
    }

}