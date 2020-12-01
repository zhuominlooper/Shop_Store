
import React from "react";
import './header.less'
import { reqGetAdress, reqGetWeatherData } from "../../api/index";
import adressLogo from "../../assets/images/adress.png";
import feedBackLogo from "../../assets/images/feedback.png";
import weatherLogo from "../../assets/images/天气.png";
import infoLogo from "../../assets/images/铃铛.png";
import emailLogo from "../../assets/images/信封.png";
import { factoryContext } from "../../config/context";
import celarCache from "../../utils/clear-cache";
import { withRouter } from "react-router-dom";
import WeatherPage from "../weather/weather";
import { Modal, Badge , Avatar,Popover  } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
class HeaderComponent extends React.Component {
    constructor() {
        super()
        this.ipConfig = null//当前ip
        this.adress = null//当前位置信息
        this.state = {
            username: factoryContext.memoryUtils.user.username,
            currentImg: null,
            currentWeather: null,
            currentAdress: null,
            temperature: null,
            currentPage: null
        }
    }
    //第一次reder执行，执行一次，执行异步操作，发请求，定时器
    //每隔一秒去更新
    componentDidMount = async () => {
        
    }
    loginOut = () => {
        confirm({
            title: '确定要退出吗?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                //删除本地和浏览器的缓存
                celarCache()
            },
            onCancel() {
            },
        });
    }
    //销毁
    componentWillUnmount = () => {
    }
    getByTitle = (data) => {
        let title = '404'//默认是404页面
        factoryContext.menuList.forEach(item => {
            if (item.key === data) {
                title = item.title
            }
            if (item.children) {
                const cItem = item.children.find(x => `${data}`.indexOf(x.key) === 0)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }
    render() {
        const content = (
            <div>
             <WeatherPage/>
            </div>
          );
        const { username, currentAdress, currentWeather, temperature } = this.state
        return (
            <div className="header">
                <div className="header-top">
                    <div className="flex">
                    <Popover content={content} trigger="click" placement="bottomRight" style={{padding:'0px'}}>
                    <Badge dot offset={[-8,8]}>
                        <img className='img' src={weatherLogo}  alt=''/>
                        </Badge>
                    </Popover>
                      
                      </div>
                    <div className="flex">
                         <Badge size='small'  count={3}  overflowCount={20}>
                         <img className='img' src={emailLogo}   alt=''/>
                         </Badge>
                       </div>
                    <div className="flex">
                    <Badge size='small'  count={100}  overflowCount={99} style={{ backgroundColor: '#52c41a' }}>
                    <img className='img' src={infoLogo}   alt=''/>
                    </Badge>
                      </div>
                    <div className="flex"><img className='img' src={feedBackLogo}  alt='' /></div> 
                    <div className="flex">  <Avatar style={{ backgroundColor: 'azure', width: '32', height: '32' }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></div>

                </div>


                <div className="header-bottom">
                    <div className="left">{this.getByTitle(this.props.location.pathname)}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(HeaderComponent)