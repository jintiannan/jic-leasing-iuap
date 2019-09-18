import React, { Component } from 'react';
import {Table} from 'tinper-bee';
import StringModel from 'components/GridCompnent/StringModel';

const dataSource = [
      {
        title:"停机发版",
        content:"系统预计于2019-02-05 19:05:03停机维护发版,请提前做好准备",
        key:1
      },
      {
        title:"停机发版",
        content:"系统预计于2019-02-04 19:05:03停机维护发版,请提前做好准备",
        key:2
      },
      {
        title:"停机发版",
        content:"系统预计于2019-02-03 19:05:03停机维护发版,请提前做好准备",
        key:3
      },
      {
        title:"停机发版",
        content:"系统预计于2019-02-02 19:05:03停机维护发版,请提前做好准备",
        key:4
      },
      {
        title:"停机发版",
        content:"系统预计于2019-02-01 19:05:03停机维护发版,请提前做好准备",
        key:5
      },
      {
        title:"停机发版",
        content:"系统预计于2019-01-05 19:05:03停机维护发版,请提前做好准备",
        key:6
      },
      {
        title:"停机发版",
        content:"系统预计于2019-01-04 19:05:03停机维护发版,请提前做好准备",
        key:7
      },

];

class AnnouceView extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "标题",dataIndex: "title",key: "title",width: 50, textAlign:'center',
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "公告内容",dataIndex: "content",key: "content",width: 180,textAlign:'center', 
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
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
        return "系统公告"
    }

    render() {
        return (
        <div>
            <Table size="lg"
            title={this.bodyttitle}
            data={this.state.dataSource}  //传递数据
            columns={this.state.columns}  //表格表头
            scroll={{ y:"calc(100vh*0.31)" }} 
            /> 
        </div>
        );
    }
}


export default AnnouceView
