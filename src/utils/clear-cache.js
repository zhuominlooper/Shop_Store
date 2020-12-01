import Cookies from "js-cookie";
import storageUtils from "./storageUtils";
import {factoryContext  } from "../config/context";
//在token过期或者用户退出时候清除浏览器和本地的缓存
export default function celarCache(){
  
//清除cookie
Cookies.remove('expires_date')
Cookies.remove('remember_login')
Cookies.remove('is_auto_login')

//清除localsroage
storageUtils.remove()
storageUtils.remove('token')

//删除本地上下文的缓存
factoryContext.memoryUtils.user={}

//跳转到登录页面
window.location.href='/login'
}