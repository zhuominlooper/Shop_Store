import React from "react";
import echarts from "echarts";
import '../../../node_modules/echarts/map/js/china'
import './epidemic.less';
import { reqGetEpidemicData, reqGetEpidemicNewsData } from "../../api/index";
export default class EpidemicPage extends React.Component {
    constructor() {
        super()
        this.state = {
            news: []
        }
    }

    componentDidMount = async () => {
        //加载疫情数据
        const result = await reqGetEpidemicData()
        if (result.data.newslist.length > 0) {
            //组装数据
            let mapBoxEchart = echarts.init(document.getElementById("mapBox"));
            let mapData = []
            result.data.newslist.forEach((x) => {
                mapData.push({
                    name: x.provinceShortName,
                    value: x.suspectedCount,
                    deadCount: x.deadCount,
                });
            });
            mapData.sort((a, b) => {
                return b.value - a.value;
            });
            var provinceData = JSON.parse(JSON.stringify(mapData));//clone

            console.log(provinceData)

            var option = {
                title: [
                    {
                        //标题
                        text: "疑似病例分布图",
                        subtext: "(省份)",
                        left: "left",
                    },
                    {
                        //右上角全部
                        text: "省份疑似病例前五排行榜",
                        right: "50%",
                        width: 100,
                        textStyle: {
                            color: "#555",
                            fontSize: 16,
                        },
                    },
                ],
                tooltip: {
                    trigger: "item",
                },
                visualMap: {
                    //左下角拉条
                    min: 0,
                    max: 400,
                    left: "left",
                    top: "50",
                    text: ["高", "低"],
                    calculable: true,
                    colorLightness: [0.2, 100],
                    color: ["rgb(146, 5, 5)", "rgb(248, 174, 113)"],
                },
                toolbox: {
                    //右边工具栏
                    show: true,
                     left: "60px",
                     top: "25px",
                    feature: {
                        dataView: {
                            readOnly: false,
                        },
                        restore: {},
                        saveAsImage: {},
                    },
                },
                // toolbox: {
                //     show: true,
                //     feature: {
                //       dataZoom: {
                //         yAxisIndex: "none",
                //       },
                //       dataView: { readOnly: false },
                //       magicType: { type: ["line", "bar"] },
                //       restore: {},
                //       saveAsImage: {},
                //     },
                //   },
                grid: {
                    //右边的bar
                    right: "30%",
                    top: 100,
                    bottom: 40,
                    height: "40%",
                    width: "30%",
                },
                xAxis: [
                    {
                        position: "top",
                        type: "value",
                        boundaryGap: false,
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            rotate: 45, //刻度旋转45度角
                            textStyle: {},
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "category",
                        data: mapData.map((x) => x.name).splice(0, 5).reverse(),
                    },
                ],
                series: [
                    {
                        //地图
                        z: 1,
                        name: "疑似病例",
                        type: "map",
                        map: "china",
                        left: "10",
                        right: "70%",
                        top: 100,
                        bottom: "35%",
                        zoom: 1,
                        label: {
                            normal: {
                                show: true,
                            },
                            emphasis: {
                                show: true,
                            },
                        },
                        //roam: true,
                        data: provinceData,
                    },
                    {
                        name: '疑似病例',				//---系列名称
                        type: 'bar',				//---类型
                        legendHoverLink: true,		//---是否启用图例 hover 时的联动高亮
                        label: {						//---图形上的文本标签
                            show: false,
                            position: 'insideTop',	//---相对位置
                            rotate: 0,				//---旋转角度
                        },
                        itemStyle: {					//---图形形状
                            color: 'chocolate',
                            barBorderRadius: [8, 8, 0, 0],
                        },
                        barWidth: '20',				//---柱形宽度
                        data: mapData.splice(0, 5).reverse(),
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                    }
                ],
            };
            mapBoxEchart.setOption(option);
            // echart图表自适应
            window.addEventListener("resize", function () {
                mapBoxEchart.resize();
            });
        }
        const newsResult = await reqGetEpidemicNewsData()
        if (newsResult.data && newsResult.data.newslist.length > 0) {
            if (newsResult.data.newslist[0].news.length > 0) {
                this.setState({
                    news: newsResult.data.newslist[0].news
                })
            }

        }

    }
    getNews = () => {
        const { news } = this.state
        return news.map((x,index) => {
            return (<div className="panel panel-primary" key={index}>
                <div className="panel-heading">
                    <div>   <img src={require('./tip.png')} alt =''/></div>
                 <div><strong>{x.title} </strong><h6 style={{ display: 'inline' }}><small style={{ color: 'azure' }}>--({x.pubDateStr})</small></h6></div>
                    </div>
                <div className="panel-body">{x.summary}&nbsp;&nbsp;<a href={x.sourceUrl} target='_blank'>查看详情</a></div>
            </div>)
        })
    }
    render() {
        const { news } = this.state
        return <div className='div-page'>
            <div id="mapBox" className="center_item"></div>
            {news.length > 0 ? <div className='new_item well'>
                {this.getNews()}
            </div> : null}
        </div>
    }
}