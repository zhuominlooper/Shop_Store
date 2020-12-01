import React ,{Fragment}from "react";
import {Card ,DatePicker } from "antd";
import moment from 'moment';
import { reqGetTimeUsers } from "../../api/index";
import ReactEcharts from 'echarts-for-react';

//条形图
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
export default class LinePage extends React.Component {
  constructor(){
    super()
    this.startDate=moment().subtract('days',6).format('YYYY/MM/DD 00:00:00')
    this.endDate=moment().subtract().format('YYYY/MM/DD 23:59:59')
    //根据时间返回横坐标
    this.legend=[]
    for(let i=6;i>=0;i--){
      this.legend.push(moment().subtract('days',i).format('YYYY/MM/DD'))       
    }
    this.state={
      registerUsers:[]
    }
  }
  //返回图形的配置对象
  getOption=()=>{
       return{
        title: {
          text: '注册人数过去7天的注册趋势'
      },
      tooltip: {},
      legend: {
          data:['注册人数']
      },
      xAxis: {
          data: this.legend //横坐标渲染
      },
      yAxis: {},
      series: [{
          name: '注册人数',
          type: 'line',
          data: this.state.registerUsers
      }]
       }
  }
   componentDidMount=async()=>{
     //获取过去7天的注册人数
     const result=await reqGetTimeUsers(
       {
         startDate:moment(this.startDate).valueOf(),
         endDate:moment(this.endDate).valueOf()
       }
     ) 
     if(result.code===200){
      if(result.data===null||result.data.length<1){
        this.setState({
          registerUsers:[0,0,0,0,0,0,0]
        })
      }
      else{
        //把返回的数据重新组装
        let data=[]
        for(let i=6;i>=0;i--){
          data.push({
            start:moment(moment().subtract('days',i).format('YYYY/MM/DD 00:00:00')).valueOf() ,
            end:moment(moment().subtract('days',i).format('YYYY/MM/DD 23:59:59')).valueOf() 
          })   
        }
        let dateNum=[]
        data.forEach(x=>{
           let count=0
           result.data.forEach(y=>{          
             if(x.start<=y.create_time&&x.end>=y.create_time){     
              count+=1
             }
           })
           dateNum.push(count)   
        })
        this.setState({
          registerUsers:dateNum
        })
      }
     }
   }
    render(){
      const title=(<Fragment>
 <RangePicker

 disabled
      defaultValue={[moment(this.startDate), moment(this.endDate, dateFormat)]}
    />
      </Fragment>)
      return(

<Card
          title={title}
          >
            <ReactEcharts
            style={{marginTop:'80px'}}
    option={this.getOption()}/>
          </Card>

         
      )
    }

}