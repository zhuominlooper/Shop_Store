import React from "react";
import './weather.less';
import { reqGetAdress, reqGetWeatherData } from "../../api/index";
import { Button, Card } from 'antd';
import posLogo from "./logo/position.png";
//首页的组件
export default class WeatherPage extends React.Component {
    constructor() {
        super()
        //定义当前页面的显示数据
        this.state = {
            daypower: null,//风力
            daytemp: null,//温度
            dayweather: null,//天气状态
            daywind: null,//风向
            city: null,
            province: null,
            control: 0//选中的按钮
        }
        this.weatherList = []//保存天气信息的数据源
    }
    getLogo = (x,control) => {
        let logo
      switch(x.dayweather){
          case '小雨':

            logo=control===this.state.control?require('./logo/yu1.png'):  require('./logo/yu.png')  
              break
              case '晴':

            logo=control===this.state.control?require('./logo/qing1.png'):  require('./logo/qing.png')  
              break
              case '多云':

            logo=control===this.state.control?require('./logo/duoyun1.png'):  require('./logo/duoyun.png')  
              break
              case '阴':
            logo=control===this.state.control?require('./logo/ying1.png'):  require('./logo/ying.png')  
              break
            default:
                logo=control===this.state.control?require('./logo/def1.png'):  require('./logo/def.png')  
                break

      }
        return logo
    }
    clickWeather = (data, index) => {
        this.setState({
            control: index
        })
        this.bindData(index)

    }
    getWeek = (data) => {
        let week = ''
        switch (data.week) {
            case '1':
                week = '星期一'
                break;
            case '2':
                week = '星期二'
                break;
            case '3':
                week = '星期三'
                break;
            case '4':
                week = '星期四'
                break;
            case '5':
                week = '星期五'
                break;
            case '6':
                week = '星期六'
                break;
            case '7':
                week = '星期天'
                break;
            default:
                break

        }
        return week

    }
    getWeatherInfo = () => {
        const { control } = this.state

        return this.weatherList.casts.map((x, index) => (
            <Button key={index} className={index === control ? 'btn-weather-click' : 'btn-weather'} onClick={() => this.clickWeather(x, index)}>
                <div>
                    <img className='img-weather' src={this.getLogo(x,index)} alt=''/>
                </div>
                <div>
                    {this.getWeek(x,index)}
                </div>
                <div className='div-temp'>
                    {x.daytemp}°
                   </div>
            </Button>
        )

        )
    }


    componentDidMount = async () => {
        //获取当前本机IP
        this.ipConfig = document.getElementById('ip').innerHTML
        //获取当前位置信息
        this.adress = await reqGetAdress(this.ipConfig)
        //获取天气信息,使用城市对应的code
        const result = await reqGetWeatherData(this.adress.data.adcode)
        //绑定值
        if (result.status === 200) {
            this.weatherList = result.data.forecasts[0]
            //取出省会和城市
            this.setState({
                city: this.weatherList.city,
                province: this.weatherList.province,
            })

            this.bindData(0)
        }

    }
    bindData=(control)=>{
        console.log(control)
        const data=this.weatherList.casts[Number(control)]
        console.log('data',data)
        const currentHours = new Date().getHours()
        //判断当前是白天还是晚上
        if (6 < currentHours && currentHours < 18) {//白天
            this.setState({
                daypower: data.daypower,
                daytemp: data.daytemp,
                dayweather: data.dayweather,
                daywind: data.daywind,
            })
        }
        else {//晚上
            this.setState({
                daypower: data.nightpower,
                daytemp: data.nighttemp,
                dayweather: data.nightweather,
                daywind: data.nightwind,
            })
        }

    }

    render() {
        const { daypower, daytemp, dayweather, daywind,province,city } = this.state
        return <div>

            {dayweather ? (<div className='div-weather' >
                <div className='div-one'>
                    <div>
                        <h4>温度</h4>
                        <b>{daytemp}°</b>
                    </div>
                    <div>
                        <h4>天气</h4>
                        <b>{dayweather}</b>
                    </div>
                    <div>
                        <h4>风速</h4>
                        <b>{daypower}</b>
                    </div>

                    <div>
                        <h4>风向</h4>
                        <b>{daywind}</b>
                    </div>
                </div>

                <div className='div-two'>
                    {this.getWeatherInfo()}
                </div>
                <div className='div-three'>
                 <img src={posLogo} alt=''/>  {province}{city}
                </div>
            </div>) : null}
        </div>

    }

}