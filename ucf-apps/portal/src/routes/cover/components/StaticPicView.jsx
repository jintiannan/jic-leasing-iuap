import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入饼状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';




class StaticPicView extends React.Component {
    constructor(props) {
        super(props);
          this.state = {
          };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        // 柱状图echarts
        var columnChart = echarts.init(document.getElementById('column'));
        // 饼状图echarts
        var roundChart = echarts.init(document.getElementById('round'));
        // 绘制柱状图图表
        columnChart.setOption({
            color: ['#003366', '#006699', '#4cabce', '#e5323e'],
            title: {subtext: '签订数目(条)' },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['立项申请', '制作合同', '起租合同', '结清合同'],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: ['市场一部', '市场二部', '市场三部', '市场四部', '市场五部']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '立项申请',
                    type: 'bar',
                    barGap: 0,
                    data: [320, 332, 301, 334, 390]
                },
                {
                    name: '制作合同',
                    type: 'bar',
                    data: [220, 182, 191, 234, 290]
                },
                {
                    name: '起租合同',
                    type: 'bar',
                    data: [150, 232, 201, 154, 190]
                },
                {
                    name: '结清合同',
                    type: 'bar',
                    data: [98, 77, 101, 99, 40]
                }
            ]
        });

        // 绘制饼状图图表
        roundChart.setOption({
                    title : {
                        subtext: '金额单位:(亿元)',
                        x:'right'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['市场一部','市场二部','市场三部','市场四部','市场五部']
                    },
                    series : [
                        {
                            name: '投放金额',
                            type: 'pie',
                            radius : '60%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'市场一部'},
                                {value:310, name:'市场二部'},
                                {value:234, name:'市场三部'},
                                {value:135, name:'市场四部'},
                                {value:1548, name:'市场五部'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });

    }

    render() {
        return (
            <div className = "static_echart">
                <div className="echart_left" id="column"></div>
                <div className="echart_right" id="round"></div>
            </div>
        );
    }
}


export default StaticPicView
