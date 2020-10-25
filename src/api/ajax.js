import axios from "axios";
import {  message } from 'antd';
import PubSub from 'pubsub-js'
//发送异步ajax请求的模块,封装axios
//统一处理异常优化
export default function ajax(url, data = {}, type = "GET") {
    return new Promise((resolve,reject)=>{
        PubSub.publish('Loading','show');
        let promise
        //执行请求
        switch (type) {
            case "GET":
                promise= axios.get(url, {
                    params: data
                });break
            case "POST":
                promise= axios.post(url, data);break
            case "PUT":
                promise= axios.put(url, data);break
                break
            case "DELETE":
                break
            default:
                break
        }
        promise.then(response=>{
            PubSub.publish('Loading','hide');
         if([404,500,400,503,502].indexOf(response.data.code)>-1){
            message.warning(response.data.msg)
             return
         }
        resolve(response.data)
        }).catch(err=>{
            message.error(err.message)
        }).finally(()=>{
            PubSub.publish('Loading','hide');
        })
    }) 
}