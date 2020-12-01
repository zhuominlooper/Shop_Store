import React from "react";
import {Card  } from "antd";
import ReactEcharts from 'echarts-for-react';

//条形图
export default class BarPage extends React.Component {
  //返回图形的配置对象
  getOption=()=>{
       return{
        title: {
          text: '条形图实例'
      },
      tooltip: {},
      legend: {
          data:['销量']
      },
      xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
       }
  }
    render(){
      return(
          <Card
          title="条形图"
          >
            <ReactEcharts
    option={this.getOption()}/>
          </Card>
      )
    }

}