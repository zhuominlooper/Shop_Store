import { message } from 'antd'
import axios from 'axios'  //引入axios
import StorageUtils from "../utils/storageUtils";
import Cookies from "js-cookie";
import celarCache from "../utils/clear-cache";
//创建axios实例
let instance = axios.create({
  timeout:5000
})

//请求拦截器
instance.interceptors.request.use(
    config => {
      //添加一个对界面操作的拦截器，如果用户超过60分钟没调用api，则视为登录过期，需要重新登录
      //第一次调用api,如果该属性还没设置，就设置一个初始值
      let currentTime=new Date().getTime()
      if(!Cookies.get('expires_date')){
        Cookies.set('expires_date',currentTime)//设置当前时间戳
      }else{
         let expiresDate=Number(Cookies.get('expires_date'))   
           if(expiresDate +1000*60*60<currentTime){//过期，重新登录
                //清除所有缓存
                let timer=setTimeout(()=>{
                  celarCache()
                  clearTimeout(timer)
                },1500)
                message.warn('由于长时间没操作,登录过期!') 
               return           
           }else{
            Cookies.set('expires_date',currentTime)//设置当前时间戳
           }

      }
      const token =StorageUtils.getData('token')
      if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.jwt =`Bearer ${token}`   //请求头加上token
      }
       return config
    },
    err => {
      console.log('errr',err)
      return Promise.reject(err)
    })

//返回拦截器
instance.interceptors.response.use(
    response => {
      //拦截响应，做统一处理 
      return response
    },
    //接口错误状态处理，相应错误时候处理
    err => {
           if(!err.response){//由于请求超时没有返回，所以需要单独处理
            err.response={}
            err.response.status=408 
           }
      switch(err.response.status){
        case 400:
          message.error(err.response.data.msg)
        break;
        case 401://标识授权过期，需要重新登录
          message.error('授权已经过期,请重新登录')
         // window.location.replace('/login')
          //清空缓存，需要重新登录
        break;
        case 403:
          message.error(err.response.data.msg)
        break;
        case 404:
          message.error(err.response.data.msg)
        break;
        case 408:
          message.error('请求超时,请重试')
        break;
        case 500:
          message.error(typeof err.response.data==='string'?'服务器请求异常,请重试':err.response.data.msg)
        break;
        case 503:
          message.error('服务器超载,正在维护系统')
        break;
        default:
          break;
      }
      return err.response
    })

    export default instance