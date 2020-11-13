
import React from "react";
import './header.less'
import moment from "moment";
import { reqGetAdress, reqGetWeatherData } from "../../api/index";
import { memoryUtils } from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import weatherLogo from "../../assets/images/weather.png";
import adressLogo from "../../assets/images/adress.png";
import temperatureLogo from "../../assets/images/temperature.png";
import {menuList  } from "../../config/menuConfig";
import {withRouter } from "react-router-dom";
import { Modal,Button } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
 class HeaderComponent extends React.Component {
    constructor() {
        super()
        this.ipConfig = null//当前ip
        this.adress = null//当前位置信息
        this.state = {
            username: memoryUtils.user.username,
            currentImg: null,
            currentWeather: null,
            currentAdress: null,
            temperature:null,
            currentPage:null 
        }
    }
    //第一次reder执行，执行一次，执行异步操作，发请求，定时器
    //每隔一秒去更新
    componentDidMount = async () => {
        //获取当前本机IP
        this.ipConfig = document.getElementById('ip').innerHTML
        //获取当前位置信息
        this.adress = await reqGetAdress(this.ipConfig)
        //获取天气信息,使用城市对应的code
        const result = await reqGetWeatherData(this.adress.data.adcode)
        //绑定值
        this.setState({
            currentAdress: result.data.lives[0].city,
            currentWeather: result.data.lives[0].weather,//晴，阴，多云
            temperature:result.data.lives[0].temperature
        })
    }
    loginOut=()=>{
        confirm({
            title: '确定要退出吗?',
            icon: <ExclamationCircleOutlined />,
            onOk:()=> {
             //删除本地保存的user缓存
             storageUtils.removeUser()
             memoryUtils.user={}
             this.props.history.replace('/login')
            },
            onCancel() {
            },
          });
    }
    //销毁
    componentWillUnmount = () => {
    }
    getByTitle=(data)=>{
        let title
        menuList.forEach(item=>{
            if(item.key===data){
                title= item.title
            }
            if(item.children){
               const cItem= item.children.find(x=>`${data}`.indexOf( x.key)===0)
               if(cItem){
                title= cItem.title
               }
            }
        })
        return title
    }
    render() {
        const { username, currentAdress, currentWeather,temperature } = this.state
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    <Button type="link" onClick={this.loginOut}>退出</Button>
                </div>
                <div className="header-bottom">
        <div className="left">{this.getByTitle(this.props.location.pathname)}</div>
                    <div className="right">                    
                       
                        <img src={temperatureLogo} alt="加载失败"></img>
                       <span>{temperature}℃</span>
                        <img src={weatherLogo} alt="加载失败"></img>
                        <span>{currentWeather}</span>
                        <img src={adressLogo} alt="加载失败"></img>
                        <span>{currentAdress}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HeaderComponent)