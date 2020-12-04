import React from "react";
import "./home.less";
import ReactEcharts from "echarts-for-react";
import CountUp from "react-countup";
import { Card, Table } from "antd";
export default class PiePage extends React.Component {
  getLineOption = () => {
    return {
      title: {
        text: "当周交易记录",
        subtext: "(每周7天交易记录)",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["所有订单", "已完成", "未完成"],
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar"] },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value}件",
        },
      },
      series: [
        {
          name: "所有订单",
          itemStyle: {
            //---图形形状
            color: "black",
          },
          type: "line",
          data: [140, 111, 123, 141, 92, 152, 99],
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
        },
        {
          name: "已完成",
          itemStyle: {
            //---图形形状
            color: "green",
          },
          type: "line",
          data: [130, 81, 63, 71, 14, 61, 65],
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
        },

        {
          name: "未完成",
          itemStyle: {
            //---图形形状
            color: "red",
          },
          type: "line",
          data: [23, 61, 13, 51, 72, 42, 49],
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },

          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
        },
      ],
    };
  };
  getOption = () => {
    return {
      title: { text: "年总销量", subtext: "(月份)", padding: [0, 0, 100, 100] },
      legend: {
        //图例
        type: "scroll", //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
        top: "1%", //----图例相对容器位置,top\bottom\left\right
        selected: {
          销量: true, //----图例选择,图形加载出来会显示选择的图例，默认为true
        },

        tooltip: {
          //图例提示框，默认不显示
          show: true,
          color: "red",
        },
        data: [
          //----图例内容
          {
            name: "销量",
            // icon:'circle',			//----图例的外框样式
          },
        ],
      },

      tooltip: {
        //提示框
        show: true, //---是否显示提示框,默认为true
        trigger: "item", //---数据项图形触发
        axisPointer: {
          //---指示样式
          type: "shadow",
          axis: "auto",
        },
        padding: 5,
      },

      grid: {
        //grid区域
        show: true, //---是否显示直角坐标系网格
        // top:80,						//---相对位置，top\bottom\left\right
        tooltip: {
          //---鼠标焦点放在图形上，产生的提示框
          show: true,
          trigger: "item", //---触发类型
        },
      },

      xAxis: {
        //x轴
        show: true, //---是否显示
        name: "月份", //---轴名称
        nameLocation: "end", //---轴名称相对位置
        nameGap: 10, //---坐标轴名称与轴线之间的距离
        //nameRotate:270,			//---坐标轴名字旋转
        axisLine: {
          //---坐标轴 轴线
          show: true, //---是否显示
          //------------------- 箭头 -------------------------
          symbol: ["none", "arrow"], //---是否显示轴线箭头
          symbolSize: [8, 8], //---箭头大小
          symbolOffset: [0, 7], //---箭头位置

          //------------------- 线 -------------------------
          lineStyle: {
            width: 1,
            type: "solid",
          },
        },
        splitLine: {
          //---grid 区域中的分隔线
          show: true, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
          lineStyle: {
            //color:'red',
            //width:1,
            //type:'solid',
          },
        },
        splitArea: {
          //--网格区域
          show: true, //---是否显示，默认false
        },
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ], //内容
      },

      yAxis: {
        show: true, //---是否显示
        name: "销量", //---轴名称
        nameLocation: "end", //---轴名称相对位置value
        nameTextStyle: {
          //---坐标轴名称样式
          padding: [5, 0, 0, 5], //---坐标轴名称相对位置
        },
        nameGap: 15, //---坐标轴名称与轴线之间的距离
        //nameRotate:270,			//---坐标轴名字旋转

        axisLine: {
          //---坐标轴 轴线
          show: true, //---是否显示
          //------------------- 箭头 -------------------------
          symbol: ["none", "arrow"], //---是否显示轴线箭头
          symbolSize: [8, 8], //---箭头大小
          symbolOffset: [0, 7], //---箭头位置

          //------------------- 线 -------------------------
          lineStyle: {
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
            //color:'red',			//---默认取轴线的颜色
            width: 1,
            type: "solid",
          },
        },

        axisLabel: {
          //---坐标轴 标签
          show: true, //---是否显示
          inside: false, //---是否朝内
          rotate: 0, //---旋转角度
          margin: 8, //---刻度标签与轴线之间的距离
          //color:'red',				//---默认取轴线的颜色
        },
        splitLine: {
          //---grid 区域中的分隔线
          show: true, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
          lineStyle: {
            width: 1,
            type: "dashed", //---类型
          },
        },
        splitArea: {
          //--网格区域
          show: true, //---是否显示，默认false
        },
      },

      series: [
        {
          name: "销量", //---系列名称
          type: "bar", //---类型
          legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
          label: {
            //---图形上的文本标签
            show: false,
            position: "insideTop", //---相对位置
            rotate: 0, //---旋转角度
          },
          itemStyle: {
            //---图形形状
            color: "chocolate",
            barBorderRadius: [8, 8, 0, 0],
          },
          barWidth: "20", //---柱形宽度
          data: [
            3020,
            4800,
            3600,
            6050,
            4320,
            6200,
            5050,
            7200,
            4521,
            6700,
            8000,
            5020,
          ],
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
  getPieOption = () => {
    return {
      title: {
        text: "商品出售比例",
        subtext: "(模拟数据)",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "100px",
        data: ["衣服", "裤子", "电脑", "肉类", "其他"],
      },
      series: [
        {
          name: "出售比例",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "衣服" },
            { value: 310, name: "裤子" },
            { value: 234, name: "电脑" },
            { value: 135, name: "肉类" },
            { value: 948, name: "其他" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  };

  render() {
    const dataSource = [
      {
        key: "1",
        index: 1,
        item_id: 356562,
        item_name: "安踏球鞋",
        item_count: 5645,
      },
      {
        key: "2",
        index: 2,
        item_id: 356562,
        item_name: "安踏球鞋",
        item_count: 5645,
      },
      {
        key: "3",
        index: 3,
        item_id: 356562,
        item_name: "安踏球鞋",
        item_count: 5645,
      },
      {
        key: "4",
        index: 4,
        item_id: 356562,
        item_name: "安踏球鞋",
        item_count: 5645,
      },
      {
        key: "5",
        index: 5,
        item_id: 356562,
        item_name: "安踏球鞋",
        item_count: 5645,
      },
      {
        key: "6",
        index: 6,
        item_id: 356562,
        item_name: "安踏球鞋",
        item_count: 5645,
      },
      {
        key: "7",
        index: 7,
        item_id: 356562,
        item_name: "安踏球鞋",
        item_count: 5645,
      },
      {
        key: "8",
        index: 8,
        item_id: 356562,
        item_name: "安踏球鞋",
        item_count: 5645,
      },
      {
        key: "9",
        index: 9,
        item_id: 356562,
        item_name: "安踏球鞋",
        item_count: 5645,
      },
      {
        key: "10",
        index: 10,
        item_id: 356562,
        item_name: "安踏球鞋",
        item_count: 5645,
      },
    ];

    const columns = [
      {
        width: "50px",
        title: "排名",
        render: (x) => {
          console.log(x);
          let element;
          switch (x.index) {
            case 1:
              element = (
                <div>
                  <img
                    src={require("./icon/1.png")}
                    alt=""
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
              );
              break;
            case 2:
              element = (
                <div>
                  <img
                    src={require("./icon/2.png")}
                    alt=""
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
              );
              break;
            case 3:
              element = (
                <div>
                  <img
                    src={require("./icon/3.png")}
                    alt=""
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
              );
              break;
            default:
              element = <div className="div-rad">{x.index}</div>;
              break;
          }
          return element;
        },
      },
      {
        title: "商品编号",
        dataIndex: "item_id",
        key: "item_id",
      },
      {
        title: "商品名称",
        dataIndex: "item_name",
        key: "item_name",
      },
      {
        title: "销售数量",
        dataIndex: "item_count",
        key: "item_count",
      },
    ];
    return (
      <div>
        <div className="well">
          <div className="div-layout">
            <div className="panel panel-one">
              <div className="panel-heading">
                <h4 className="panel-title">今日收入</h4>
                <h3>
                  {" "}
                  <CountUp
                    start={0}
                    end={160526}
                    duration={3}
                    useGrouping={true}
                    separator=","
                    suffix={"￥"}
                  />{" "}
                </h3>
                <div className="div-position">
                  <img src={require("./icon/钱.png")} alt="" />
                </div>
              </div>
            </div>

            <div className="panel  panel-two">
              <div className="panel-heading">
                <h4 className="panel-title">订单总量</h4>
                <h3>
                  {" "}
                  <CountUp
                    start={0}
                    end={1634526}
                    duration={3}
                    useGrouping={true}
                    separator=","
                    suffix={" 个"}
                  />{" "}
                </h3>
                <div className="div-position">
                  <img src={require("./icon/购物车.png")} alt="" />{" "}
                </div>
              </div>
            </div>

            <div className="panel panel-three">
              <div className="panel-heading">
                <h4 className="panel-title">今日订单</h4>
                <h3>
                  {" "}
                  <CountUp
                    start={0}
                    end={162566}
                    duration={3}
                    useGrouping={true}
                    separator=","
                    suffix={" 个"}
                  />{" "}
                </h3>
                <div className="div-position">
                  {" "}
                  <img src={require("./icon/订单.png")} alt="" />
                </div>
              </div>
            </div>

            <div className="panel panel-four">
              <div className="panel-heading">
                <h4 className="panel-title">访问总量</h4>
                <h3>
                  <CountUp
                    start={0}
                    end={34574}
                    duration={3}
                    useGrouping={true}
                    separator=","
                    suffix={" 次"}
                  />{" "}
                </h3>
                <div className="div-position">
                  <img src={require("./icon/用户.png")} alt="" />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="well">
          <div className="div-layout-chat">
            <div className="div-flex-1">
              <div className="div-bar">
                <ReactEcharts
                  option={this.getOption()}
                  notMerge={true}
                  lazyUpdate={true}
                />
              </div>
              <hr />
              <div className="div-pie">
                <ReactEcharts
                  option={this.getPieOption()}
                  notMerge={true}
                  lazyUpdate={true}
                />
              </div>
            </div>
            <div className="div-flex-2">
              <Card title=" 商品销量排行">
                <Table
                  bordered
                  pagination={false}
                  dataSource={dataSource}
                  size="small"
                  columns={columns}
                />
              </Card>
            </div>
          </div>
        </div>

        <div className="well shop">
          <div className="shop_left">
            <ReactEcharts
              option={this.getLineOption()}
              notMerge={true}
              lazyUpdate={true}
            />
          </div>
          <div className="shop_right">
            <Card title={<h4>店铺详情</h4>} actions={[
              <div style={{marginLeft:'18px',textAlign:'left'}}>
              <b>
                <small>店铺介绍:</small>&nbsp;&nbsp;&nbsp;&nbsp;
               <strong>这是一家综合的店铺，只要你想要的东西，这里都会有，而且售后有保障，快来愉快的购物吧！</strong> 
                </b>
             
            </div>
            ]}>
              <div className="div-flex">
                <div className="div-img">
                  <img src={require("./icon/logo.png")} alt=''/>
                </div>
                <div className="div-info">
                  <div>
                    <h5>
                      <small>商城名称:</small>
                    </h5>
                    季风购物
                  </div>
                  <div>
                    <h5>
                      <small>店铺等级:</small>
                    </h5>
                    三级
                  </div>
                  <div>
                    <h5>
                      <small>店铺类型:</small>
                    </h5>
                    电子商务
                  </div>
                  <div>
                    <h5>
                      <small>开通时间:</small>
                    </h5>
                    2020/11/5
                  </div>
                  <div>
                    <h5>
                      <small>店铺ID:</small>
                    </h5>
                    324456
                  </div>
                </div>

                <div className="div-score">
                  <div>
                    <h5>店铺评分</h5>
                  </div>
                  <div>
                    <h5>
                      <small>相符描述:</small>
                    </h5>
                    7.5分
                  </div>
                  <div>
                    <h5>
                      <small>服务态度:</small>
                    </h5>
                    8.8分
                  </div>
                  <div>
                    <h5>
                      <small>发货速度:</small>
                    </h5>
                    7.6分
                  </div>
                  <div>
                    <h5>
                      <small>货品质量:</small>
                    </h5>
                    9.6分
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
