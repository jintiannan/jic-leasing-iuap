import React, { Component } from 'react';
import {Table,Notification,Badge} from 'tinper-bee';
import StringModel from 'components/GridCompnent/StringModel';
import TimeModel from 'components/GridCompnent/TimeModel';
import {deepClone} from "utils";

let notification = null;
Notification.newInstance({position: 'bottomRight'}, n => notification = n);

const dataSource = [
      {
        theme:"北京市场1部侯莹莹合同HT2019-09170001合同资管部已审核通过,预计下周付款",
        send_date:"2019-02-05 19:05:03",
        key:1
      },
      {
        theme:"北京市场1部侯莹莹立项HT2019-09170002合同资管部已审核通过,准备制作合同",
        send_date:"2019-02-05 19:05:03",
        key:2
      },
      {
        theme:"北京市场1部侯莹莹合同HT2019-09170003付款申请已由领导审核,待主管提交审核付款处理",
        send_date:"2019-02-05 19:05:03",
        key:3
      },
      {
        theme:"北京市场1部侯莹莹合同HT2019-09170004合同已结清,需要领导同意封存",
        send_date:"2019-02-05 19:05:03",
        key:4
      },
      {
        theme:"天津市场1部侯莹莹合同HT2019-09170005合同资管部已审核通过,预计下周付款",
        send_date:"2019-02-05 19:05:03",
        key:5
      },
      {
        theme:"上海市场2部阚天天合同HT2019-09170006合同资管部已审核通过,预计下周付款",
        send_date:"2019-02-05 19:05:03",
        key:6
      },
      {
        theme:"上海市场3部何媛媛合同HT2019-09170007合同资管部已审核通过,预计下周付款",
        send_date:"2019-02-05 19:05:03",
        key:7
      },
      {
        theme:"天津市场4部侯莹莹合同HT2019-09170008合同资管部已审核通过,预计下周付款",
        send_date:"2019-02-05 19:05:03",
        key:1
      },
      {
        theme:"北京市场1部侯莹莹合同HT2019-09170009合同资管部已审核通过,预计下周付款",
        send_date:"2019-02-05 19:05:03",
        key:8
      },
      {
        theme:"天津市场1部侯莹莹合同HT2019-09170010合同资管部已审核通过,预计下周付款",
        send_date:"2019-02-05 19:05:03",
        key:9
      },
      {
        theme:"北京市场1部侯莹莹合同HT2019-09170011合同资管部已审核通过,预计下周付款",
        send_date:"2019-02-05 19:05:03",
        key:10
      },
      {
        theme:"天津市场1部侯莹莹合同HT2019-09170012合同资管部已审核通过,预计下周付款",
        send_date:"2019-02-05 19:05:03",
        key:11
      },
      {
        theme:"北京市场1部侯莹莹合同HT2019-09170013合同资管部已审核通过,预计下周付款",
        send_date:"2019-02-05 19:05:03",
        key:12
      },
      {
        theme:"天津市场1部侯莹莹合同HT2019-09170014合同资管部已审核通过,预计下周付款",
        send_date:"2019-02-05 19:05:03",
        key:13
      },

];

class NoticeView extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "消息主题",dataIndex: "theme",key: "theme",width: 350, textAlign:'center',
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "发出时间",dataIndex: "send_date",key: "send_date",width: 130,textAlign:'center', 
                render: (text, record, index) => {
                    return <TimeModel text={text} record={record} index={index} dateFormatTime={"YYYY-MM-DD HH:mm:ss"}/>
                }
            },
];
          this.state = {
            dataSource: dataSource,
            columns:this.columns,
          };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
      //this.props.onnoticeRef(this);
    }

    //表格标题
    bodyttitle =()=>{
        return <Badge dataBadge={this.state.dataSource.length} colors="primary" dataBadgePlacement="top">
        <span style={{color:'black'}}>通知消息</span>
    </Badge>;
    }

    onRowClick = (record,index,event)=>{    //如需要则后台需要处理
        notification.notice({
           title: '通知',
           content: "'"+record.theme+"'"+",您已阅读,此消息3秒后自动消失",
           color: 'light'
        });
        let _dataSource = deepClone(this.state.dataSource);
        _dataSource.splice(index,1);
        this.setState({dataSource:_dataSource});
    }

    render() {
        return (
        <div>
            <Table size="lg"
            title={this.bodyttitle}
            data={this.state.dataSource}  //传递数据
            columns={this.state.columns}  //表格表头
            onRowClick={this.onRowClick}
            scroll={{ y:"calc(100vh*0.452)" }}
            /> 
        </div>
        );
    }
}


export default NoticeView
