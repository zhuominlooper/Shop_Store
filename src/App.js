import React from 'react';
import { BrowserRouter,Route,Switch,Redirect } from "react-router-dom";
import LoginPage  from "./pages/login/login";
import AdminPage  from "./pages/admin/admin";
export default class App extends React.Component {

  render(){
    return (
        <BrowserRouter>
        <Switch>
        <Route path='/login' component={LoginPage} exact></Route>
        <Route path='/page' component={AdminPage} ></Route>
        <Redirect to='/page'/>
        </Switch>
        </BrowserRouter>
    );
  }
}

