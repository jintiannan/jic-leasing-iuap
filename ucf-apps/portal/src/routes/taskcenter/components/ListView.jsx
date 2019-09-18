import React, {Component} from 'react';
import {actions} from 'mirrorx';
import Grid from 'components/Grid';
import { Tabs,Tag,Badge,Form,FormControl,Col,Row,Radio,Label } from 'tinper-bee';
import {deepClone} from "utils";
import StringModel from 'components/GridCompnent/StringModel';
import TimeModel from 'components/GridCompnent/TimeModel';
import './index.less';

const { TabPane } = Tabs;
const FormItem = Form.FormItem;
const wait_dataSource = [
    {
      priority: {type:'danger' ,desc:'紧急'},
      status: "未处理",
      source_type:"立项申请审批",
      theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
      sender:"何媛媛",
      send_date:"2018-12-01",
      key:1     //对应主键  传入数据做处理
    },
    {
      priority:{type:'danger' ,desc:'紧急'},
      status: "未处理",
      source_type:"立项申请审批",
      theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
      sender:"何媛媛",
      send_date:"2018-12-02",
      key:2
    },
    {
      priority: {type:'danger' ,desc:'紧急'},
      status: "未处理",
      source_type:"立项申请审批",
      theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
      sender:"何媛媛",
      send_date:"2018-12-03",
      key:3
    },
    {
      priority: {type:'success' ,desc:'正常'},
      status: "未处理",
      source_type:"立项申请审批",
      theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
      sender:"何媛媛",
      send_date:"2018-12-04",
      key:4
    },
    {
      priority: {type:'success' ,desc:'正常'},
      status: "未处理",
      source_type:"立项申请审批",
      theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
      sender:"何媛媛",
      send_date:"2018-12-05",
      key:5
    },
    {
      priority: {type:'success' ,desc:'正常'},
      status: "未处理",
      source_type:"立项申请审批",
      theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
      sender:"何媛媛",
      send_date:"2019-02-05",
      key:6
    },
    {
      priority: {type:'success' ,desc:'正常'},
      status: "未处理",
      source_type:"立项申请审批",
      theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
      sender:"何媛媛",
      send_date:"2019-03-05",
      key:7,
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "未处理",
      source_type:"立项申请审批",
      theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
      sender:"何媛媛",
      send_date:"2019-04-05",
      key:8 
    },
    {
      priority: {type:'success' ,desc:'正常'},
      status: "未处理",
      source_type:"立项申请审批",
      theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
      sender:"何媛媛",
      send_date:"2019-04-06",
      key:9
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "未处理",
      source_type:"立项申请审批",
      theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
      sender:"何媛媛",
      send_date:"2019-04-06",
      key:10
    },
];

const already_dataSource = [
    {
      priority: {type:'danger' ,desc:'紧急'},
      status: "已处理",
      source_type:"立项申请审批",
      theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
      sender:"何媛媛",
      send_date:"2017-11-05",
      key:1
    },
    {
      priority:{type:'danger' ,desc:'紧急'},
      status: "已处理",
      source_type:"立项申请审批",
      theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
      sender:"何媛媛",
      send_date:"2017-12-05",
      key:2
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "已处理",
      source_type:"合同制作审批",
      theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
      sender:"侯莹莹",
      send_date:"2018-10-05",
      key:2
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "已处理",
      source_type:"合同制作审批",
      theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
      sender:"侯莹莹",
      send_date:"2018-10-04",
      key:3
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "已处理",
      source_type:"合同制作审批",
      theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
      sender:"侯莹莹",
      send_date:"2018-10-03",
      key:4
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "已处理",
      source_type:"合同制作审批",
      theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
      sender:"侯莹莹",
      send_date:"2018-09-05",
      key:5
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "已处理",
      source_type:"合同制作审批",
      theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
      sender:"侯莹莹",
      send_date:"2018-08-05",
      key:6
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "已处理",
      source_type:"合同制作审批",
      theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
      sender:"侯莹莹",
      send_date:"2018-07-05",
      key:7
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "已处理",
      source_type:"合同制作审批",
      theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
      sender:"侯莹莹",
      send_date:"2018-06-05",
      key:9
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "已处理",
      source_type:"合同制作审批",
      theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
      sender:"侯莹莹",
      send_date:"2018-05-05",
      key:10
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "已处理",
      source_type:"合同制作审批",
      theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
      sender:"侯莹莹",
      send_date:"2018-04-05",
      key:11
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "已处理",
      source_type:"合同制作审批",
      theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
      sender:"侯莹莹",
      send_date:"2018-03-05",
      key:12
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "已处理",
      source_type:"合同制作审批",
      theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
      sender:"侯莹莹",
      send_date:"2018-02-05",
      key:13
    },
    {
      priority:{type:'success' ,desc:'正常'},
      status: "已处理",
      source_type:"合同制作审批",
      theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
      sender:"侯莹莹",
      send_date:"2018-01-05",
      key:14
    },
    {
        priority:{type:'success' ,desc:'正常'},
        status: "已处理",
        source_type:"合同制作审批",
        theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
        sender:"侯莹莹",
        send_date:"2018-01-05",
        key:15
      },
      {
        priority:{type:'success' ,desc:'正常'},
        status: "已处理",
        source_type:"合同制作审批",
        theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
        sender:"侯莹莹",
        send_date:"2018-01-05",
        key:16
      },
  ];

class ListView extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "优先级",dataIndex: "priority",key: "priority",width: 100, textAlign:'center',
                render: (text, record, index) => {
                    return <Tag style={{"margin-right":0}} colors={text.type}>{text.desc}</Tag>
                }
            },
            {
                title: "状态",dataIndex: "status",key: "status",width: 100, textAlign:'center',
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "单据类型",dataIndex: "source_type",key: "source_type",width: 100, textAlign:'center',
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "主题",dataIndex: "theme",key: "theme",width: 700, textAlign:'center',
                render: (text, record, index) => {    //此处需要用超链接处理待办详情审批页面跳转  暂未处理
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "发送人",dataIndex: "sender",key: "sender",width: 100, textAlign:'center',
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "发送日期",dataIndex: "send_date",key: "send_date",width: 150,textAlign:'center', 
                render: (text, record, index) => {
                    return <TimeModel text={text} record={record} index={index} dateFormatTime={"YYYY-MM-DD HH:mm:ss"}/>
                }
            },
];
        this.state = {
            wait_dataSource:wait_dataSource,     //待办测试数据
            already_dataSource:already_dataSource,  //已办测试数据
            columns:this.columns,                //表头 因为超链接  此处需要自定义
            tabKey:'pending_wait',               //初始默认tab页签
            firstformvalue:'任务标题/单据类型',                   //初始模糊搜索框内容
            selectedValue:'today',   //单选按钮组初始默认不选中
        }
    }
    

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    onfirstSearch = (value)=>{
        console.log(value);
    }

    onfirstChange = (value)=>{
        this.setState({firstformvalue: value});
    }

    handleRadioChange = (value) =>{
        this.setState({selectedValue: value});
        //改变执行查询
    }

    /**
     *tab 切换
     */
    onChangeTab = (tabKey) => {
        this.setState({
            tabKey
        })
    }

    /**
     * 跳转到指定页数据
     * @param {Number} pageIndex 跳转指定页数
     */
    freshData = (pageIndex) => {
        let queryParam = deepClone(this.props.queryParam); // 深拷贝查询条件从 action 里
        queryParam['pageIndex'] = pageIndex;
        actions.taskcenter.loadList(queryParam);
    }

    /**
     * 设置每页显示行数
     * @param {Number} index 跳转指定页数
     * @param {Number} value 设置一页数据条数
     */
    onDataNumSelect = (index, value) => {
        let queryParam = deepClone(this.props.queryParam); // 深拷贝查询条件从 action 里
        queryParam['pageSize'] = value;
        queryParam['pageIndex'] = 0;
        if (value && value.toString().toLowerCase() === "all") { // 对分页 pageSize 为 all 进行处理，前后端约定
            pageSize = 1;
        }
        actions.taskcenter.loadList(queryParam);
    }

    render() {
        let paginationObj ={
            activePage : this.props.queryParam.pageIndex,//活动页
            total : this.state.wait_dataSource.length,//总条数
            items: this.props.queryObj.totalPages,//总页数
            freshData: this.freshData, //活动页改变,跳转指定页数据
            onDataNumSelect: this.onDataNumSelect, //每页行数改变,跳转首页
            verticalPosition:'bottom'
        }
        const { getFieldProps } = this.props.form;
        return (         
            <div>
            <div className="task_center_search">
                            <Form>
                                <Row>
                                    <Col xs={12} sm={12} md={12}>
                                    <div className='first_form'>
                                        <FormItem>
                                                <Label>模糊搜索:</Label>
                                                <FormControl
                                                    value={this.state.firstformvalue}
                                                    onSearch={this.onfirstSearch}
                                                    onChange={this.onfirstChange}
                                                    type="search"
                                                />
                                        </FormItem>
                                    </div>
                                    </Col>
                                </Row>
                            </Form>
                                <Row>
                                    <Col xs={12} sm={12} md={12}>
                                        <FormItem>
                                                <Label>时间范围:</Label>
                                                <Radio.RadioGroup
                                                    name="date_area"
                                                    selectedValue={this.state.selectedValue}
                                                    onChange={this.handleRadioChange}
                                                    >
                                                    <Radio.RadioButton value="today">今日</Radio.RadioButton>
                                                    <Radio.RadioButton value="thisweek">本周</Radio.RadioButton>
                                                    <Radio.RadioButton value="thismonth">本月</Radio.RadioButton>
                                                    <Radio.RadioButton value="all">全部</Radio.RadioButton>
                                                </Radio.RadioGroup>
                                        </FormItem>
                                    </Col>
                                </Row>
            </div>
            <div className="task_center_table">
            <Tabs
            defaultActiveKey={this.state.tabKey}
            onChange={this.onChangeTab}
            >
                <TabPane tab={<Badge dataBadge={this.state.wait_dataSource.length} colors="primary" dataBadgePlacement="top">
                <span style={{color:'black'}}>待办任务</span>
            </Badge>} key="pending_wait">
                        <Grid
                        ref="wait_taskref"  //存模版
                        columns={this.state.columns}
                        data={this.state.wait_dataSource}
                        rowKey={(r, i) => i} //生成行的key
                        paginationObj={paginationObj} //分页
                        multiSelect={false}  //false 单选，默认多选
                        columnFilterAble={false}
                        scroll={{ y:"calc(100vh*0.68)" }}
                        height={40}//表格单行高度
                        bordered
                        showHeaderMenu={false}
                        headerHeight={30}
                        />                                  
                </TabPane>
                <TabPane tab={<Badge dataBadge={this.state.already_dataSource.length} colors="primary" dataBadgePlacement="top">
                <span style={{color:'black'}}>已办任务</span>
            </Badge>} key="pending_already">
                        <Grid
                        ref="already_taskref"  //存模版
                        columns={this.state.columns}
                        data={this.state.already_dataSource}
                        rowKey={(r, i) => i} //生成行的key
                        paginationObj={paginationObj} //分页
                        multiSelect={false}  //false 单选，默认多选
                        columnFilterAble={false}
                        scroll={{ y:"calc(100vh*0.68)" }}
                        height={40}//表格单行高度
                        bordered
                        showHeaderMenu={false}
                        headerHeight={30}
                        />                                   
                </TabPane>
            </Tabs> 
            </div>  
            </div>        
        );
    }
}

export default Form.createForm()(ListView);