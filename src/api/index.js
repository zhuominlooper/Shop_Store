
//包含应用中所有接口的请求函数
import ajax from "./ajax";
//登录
export const reqLogin=(...args)=>ajax('/login45',...args,"POST")

//注册
export const reqAddUser=(...args)=>ajax('/mnage/user/add',...args,"POST")