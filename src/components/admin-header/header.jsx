
import React from "react";
import './header.less'
import html2canvas from "html2canvas";
import picLogo from "../../assets/images/截图.png";
import feedBackLogo from "../../assets/images/feedback.png";
import weatherLogo from "../../assets/images/天气.png";
import infoLogo from "../../assets/images/铃铛.png";
import emailLogo from "../../assets/images/信封.png";
import { factoryContext } from "../../config/context";
import { withRouter } from "react-router-dom";
import WeatherPage from "../weather/weather";
import PersonalPage from "../personal-center/personal";
import {  Badge, Popover, message } from "antd";


class HeaderComponent extends React.Component {
    constructor() {
        super()
        this.ipConfig = null//当前ip
        this.adress = null//当前位置信息
    }
    //第一次reder执行，执行一次，执行异步操作，发请求，定时器
    //每隔一秒去更新
    componentDidMount = async () => {

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
    getPic=()=>{
        html2canvas(document.body, {
            allowTaint: false,
            useCORS: true,
        }).then(function (canvas) {
            // toImage
            const dataImg = new Image()
            dataImg.src = canvas.toDataURL('image/png')
            const alink = document.createElement("a");
            alink.href = dataImg.src;
            alink.download = `${new Date().getTime()}.png`;
            alink.click();
            message.success('截图成功!')
        
        })
    }
    render() {
        const content = (
            <div>
                <WeatherPage />
            </div>
        );
        return (
            <div className="header">
                <div className="header-top">
                <div  className="flex">
                <div id="capture"></div>
                   <img onClick={this.getPic} className='img' src={picLogo} alt='' />
                    </div>

                    <div className="flex">
                        <Popover content={content} trigger="click" placement="bottomRight" style={{ padding: '0px' }}>
                            <Badge dot offset={[-8, 8]}>
                                <img className='img' src={weatherLogo} alt='' />
                            </Badge>
                        </Popover>
                    </div>

                    <div className="flex">
                        <Badge size='small' count={3} overflowCount={20}>
                            <img className='img' src={emailLogo} alt='' />
                        </Badge>
                    </div>
                    <div className="flex">
                        <Badge size='small' count={100} overflowCount={99} style={{ backgroundColor: '#52c41a' }}>
                            <img className='img' src={infoLogo} alt='' />
                        </Badge>
                    </div>
                    <div className="flex"><img className='img' src={feedBackLogo} alt='' /></div>
                    <div className="flex"> 
                    <PersonalPage/>
                    </div>

                </div>
                <div className="header-bottom">
                    <div className="left">{this.getByTitle(this.props.location.pathname)}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(HeaderComponent)