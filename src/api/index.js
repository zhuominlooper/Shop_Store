
//包含应用中所有接口的请求函数
import ajax from "./ajax";
import axios from "axios";
import { resolveOnChange } from "antd/lib/input/Input";
import { message } from "antd";
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

//使用jsonp发送请求获取天气,不准确
// export const reqWeather=(city)=>{
//     return new Promise((resolve,reject)=>{
//         const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBW72`
//         jsonp(url,{},function test(err,result){
//             //判断成功还是失败
//              if(!err&&result.status==='success'){
//                 resolve({code:200,data:result.results})
//              }else{
//                  console.log(err)
//                  message.error('获取信息失败')
//                resolve({code:500,data:{}})
//              }
//         })
//     })   
// }

//获取当前ip的位置
export const reqGetAdress=(ip)=>{
    return axios.get(`https://restapi.amap.com/v3/ip?ip=${ip}&output=json&key=9e07ec400caac94e137736435057c07e`)
}
//获取天气信息

export const reqGetWeatherData=(cityCode)=>{
    return axios.get(`https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=e29de05a3343d8f53d9e8a4f3a2fee15`)
}
