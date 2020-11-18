
//包含应用中所有接口的请求函数
import ajax from "./ajax";
import axios from "axios";
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

//获取一级/二级商品分类列表
export const reqCategotyList=(...args)=>ajax('/manage/category/list',...args)

//添加分类
export const reqAddCategoty=(...args)=>ajax('/manage/category/add',...args,"POST")

//更新分类
export const reqUpdateCategoty=(...args)=>ajax('/manage/category/update',...args,"PUT")

//分页获取商品的显示
export const reqProducts=(...args)=>ajax('/manage/product/list',...args,"POST")

//根据商品名称或者描述查询
export const reqSearchProducts=(...args)=>ajax('/manage/product/search',...args,"POST")

//根据id获取分类
export const reqCategory=(...args)=>ajax('/manage/category/info',...args)

//更新商品上架或者下架
export const reqUpdateStatus=(...args)=>ajax('/manage/product/updatestatus',...args,"POST")

//删除图片
export const reqDeleteImg=(...args)=>ajax('/manage/img/delete',...args,"POST")

//添加或者更新商品
export const reqAddOrUpdateProduct=(product)=>ajax(`/manage/product/${product._id?'update':'add'}`,product,"POST")

//获取角色的数据
export  const reqGetRoles=()=>ajax('/manage/role/list')

//添加角色
export  const reqAddRoles=(...args)=>ajax('/manage/role/add',...args,"POST")

//更新角色权限
export  const reqUpdateRoles=(...args)=>ajax('/manage/role/update',...args,"POST")

//删除角色
export  const reqDeleteRoles=(...args)=>ajax('/manage/role/delete',...args,"DELETE")

//更改角色状态
export  const reqUpdateStatusRoles=(...args)=>ajax('/manage/role/status',...args,"PUT")

//获取用户列表
export  const reqGetUsers=()=>ajax('/manage/user/list')
//冻结或者激活用户
export  const reqUpdateUsersStatus=(...args)=>ajax('/manage/user/status',...args,'PUT')

//
export  const reqDeleteUser=(...args)=>ajax('/manage/user/delete',...args,"DELETE")

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
