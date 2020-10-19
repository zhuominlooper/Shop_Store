import React from 'react';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import LoginPage  from "./pages/login/login";
import AdminPage  from "./pages/admin/admin";

export default class App extends React.Component {

  render(){
    return (
        <BrowserRouter>
        <Switch>
        <Route path='/login' component={LoginPage}></Route>
        <Route path='/admin' component={AdminPage}></Route>
        </Switch>
        </BrowserRouter>
    );
  }
}

