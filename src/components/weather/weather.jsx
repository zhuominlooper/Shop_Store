import React from "react";
import "./weather.less";
import { reqGetAdress, reqGetWeatherData } from "../../api/index";
import { Button, Card, Spin } from "antd";
import posLogo from "./logo/position.png";
import ReactEcharts from "echarts-for-react";
//首页的组件
export default class WeatherPage extends React.Component {
  constructor() {
    super();
    //定义当前页面的显示数据
    this.state = {
      daypower: null, //风力
      daytemp: null, //温度
      dayweather: null, //天气状态
      daywind: null, //风向
      city: null,
      province: null,
      control: 0, //选中的按钮
    };
    this.weatherList = []; //保存天气信息的数据源
  }
  getLogo = (x, control) => {
    let logo;
    switch (x.dayweather) {
      case "小雨":
        logo =
          control === this.state.control
            ? require("./logo/yu1.png")
            : require("./logo/yu.png");
        break;
      case "晴":
        logo =
          control === this.state.control
            ? require("./logo/qing1.png")
            : require("./logo/qing.png");
        break;
      case "多云":
        logo =
          control === this.state.control
            ? require("./logo/duoyun1.png")
            : require("./logo/duoyun.png");
        break;
      case "阴":
        logo =
          control === this.state.control
            ? require("./logo/ying1.png")
            : require("./logo/ying.png");
        break;
      default:
        logo =
          control === this.state.control
            ? require("./logo/def1.png")
            : require("./logo/def.png");
        break;
    }
    return logo;
  };
  clickWeather = (data, index) => {
    this.setState({
      control: index,
    });
    this.bindData(index);
  };
  getWeek = (data) => {
    let week = "";
    switch (data.week) {
      case "1":
        week = "星期一";
        break;
      case "2":
        week = "星期二";
        break;
      case "3":
        week = "星期三";
        break;
      case "4":
        week = "星期四";
        break;
      case "5":
        week = "星期五";
        break;
      case "6":
        week = "星期六";
        break;
      case "7":
        week = "星期天";
        break;
      default:
        break;
    }
    return week;
  };
  getWeatherInfo = () => {
    const { control } = this.state;

    return this.weatherList.casts.map((x, index) => (
      <Button
        key={index}
        className={index === control ? "btn-weather-click" : "btn-weather"}
        onClick={() => this.clickWeather(x, index)}
      >
        <div>
          <img className="img-weather" src={this.getLogo(x, index)} alt="" />
        </div>
        <div>{this.getWeek(x, index)}</div>
        <div className="div-temp">{x.daytemp}°C</div>
      </Button>
    ));
  };
  getLineOption = () => {
    let dayTempList = [];
    let nightTempList = [];
    let weekList = [];
    this.weatherList.casts.forEach((x) => {
      dayTempList.push(x.daytemp);
      nightTempList.push(x.nighttemp);
      weekList.push(this.getWeek(x));
    });

    return {
      title: {
        text: "天气变化趋势",
        textStyle: {
          //---主标题内容样式
          color: "#fff",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        textStyle: {
          color: "#fff", //---所有图例的字体颜色
        },
        data: [
          {
            name: "白天",
            icon: "circle",
            textStyle: {
              color: "#fff",
            },
          },
          {
            name: "夜晚",
            icon: "circle", //----图例的外框样式
            textStyle: {
              color: "#fff", //----单独设置某一个图例的颜色
            },
          },
        ],
      },
      xAxis: {
        show: true, //---是否显示
        type: "category", //---轴类型，默认'category'
        nameLocation: "end", //---轴名称相对位置
        axisLine: {
          //---坐标轴 轴线
          show: true, //---是否显示
          //------------------- 箭头 -------------------------
          symbol: ["none", "arrow"], //---是否显示轴线箭头
          symbolSize: [8, 8], //---箭头大小
          symbolOffset: [0, 7], //---箭头位置
          //------------------- 线 -------------------------
          lineStyle: {
            color: "#fff",
            width: 1,
            type: "solid",
          },
        },
        axisTick: {
          //---坐标轴 刻度
          show: true, //---是否显示
          inside: true, //---是否朝内
          lengt: 3, //---长度
          lineStyle: {
            width: 1,
            type: "solid",
          },
        },
        data: weekList,
      },

      yAxis: {
        type: "value",
        show: true, //---是否显示
        axisLine: {
          //---坐标轴 轴线
          show: true, //---是否显示
          //------------------- 箭头 -------------------------
          symbol: ["none", "arrow"], //---是否显示轴线箭头
          symbolSize: [8, 8], //---箭头大小
          symbolOffset: [0, 7], //---箭头位置
          //------------------- 线 -------------------------
          lineStyle: {
            color: "#fff",
            width: 1,
            type: "solid",
          },
        },
        axisLabel: {
          formatter: "{value}°C",
          //---坐标轴 标签
          show: true, //---是否显示
          inside: false, //---是否朝内
          rotate: 0, //---旋转角度
          margin: 8, //---刻度标签与轴线之间的距离
          //color:'red',				//---默认取轴线的颜色
        },
        splitLine: {
          //---grid 区域中的分隔线
          show: false, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
        },
      },
      series: [
        {
          name: "白天",
          itemStyle: {
            //---图形形状
            color: "rgb(42, 214, 236)",
          },
          type: "line",
          data: dayTempList,
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
        },
        {
          name: "夜晚",
          itemStyle: {
            //---图形形状
            color: "rgb(79, 230, 66)",
          },
          type: "line",
          data: nightTempList,
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
        },
      ],
    };
  };
  componentDidMount = async () => {
    //获取当前本机IP
    this.ipConfig = document.getElementById("ip").innerHTML;
    //获取当前位置信息
    this.adress = await reqGetAdress(this.ipConfig);
    //获取天气信息,使用城市对应的code
    const result = await reqGetWeatherData(this.adress.data.adcode);
    //绑定值
    if (result.status === 200) {
      this.weatherList = result.data.forecasts[0];
      this.getLineOption();
      //取出省会和城市
      this.setState({
        city: this.weatherList.city,
        province: this.weatherList.province,
      });

      this.bindData(0);
    }
  };
  bindData = (control) => {
    const data = this.weatherList.casts[Number(control)];
    const currentHours = new Date().getHours();
    //判断当前是白天还是晚上
    if (6 < currentHours && currentHours < 18) {
      //白天
      this.setState({
        daypower: data.daypower,
        daytemp: data.daytemp,
        dayweather: data.dayweather,
        daywind: data.daywind,
      });
    } else {
      //晚上
      this.setState({
        daypower: data.nightpower,
        daytemp: data.nighttemp,
        dayweather: data.nightweather,
        daywind: data.nightwind,
      });
    }
  };

  render() {
    const {
      daypower,
      daytemp,
      dayweather,
      daywind,
      province,
      city,
    } = this.state;
    return (
      <div className="div-page">
        {dayweather ? (
          <div className="div-weather">
            <div className="div-one">
              <div>
                <h4>温度</h4>
                <b>{daytemp}°C</b>
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
            <div className="div-echats">
              <ReactEcharts
                option={this.getLineOption()}
                notMerge={true}
                lazyUpdate={true}
              />
            </div>
            <div className="div-two">{this.getWeatherInfo()}</div>
            <div className="div-three">
              <img src={posLogo} alt="" /> {province}
              {city}
            </div>
          </div>
        ) : (
          <Spin tip="Loading..."></Spin>
        )}
      </div>
    );
  }
}
