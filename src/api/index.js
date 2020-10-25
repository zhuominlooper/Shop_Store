
//包含应用中所有接口的请求函数
import ajax from "./ajax";
//登录
export const reqLogin=(...args)=>ajax('/login',...args,"POST")

//注册
export const reqAddUser=(...args)=>ajax('/mnage/user/add',...args,"POST")

//获取验证码
export const reqGetConfCode=(...args)=>ajax('/login/code',...args,"POST")

//注册
export const reqRegister=(...args)=>ajax('/login/register',...args,"POST")

//重置密码
export const reqForgetPwd=(...args)=>ajax('/login/forgetpwd',...args,"PUT")