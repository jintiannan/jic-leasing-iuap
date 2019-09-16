/**
 * App模块
 */

import React, { Component } from 'react';
import {Table,Tooltip, Menu, Icon,Tabs, Loading,Drawer,Button,Form,Label,FormControl,Col, Row} from 'tinper-bee';
import {actions} from 'mirrorx';
import {singleRecordOper} from "utils/service";
import {deepClone} from "utils";

import ButtonGroup from './ButtonGroup';
import ListView from './ListView';
import FormView from './FormView';
import AddFormView from './AddFormView';
import './index.less';
import StringModel from 'components/GridCompnent/StringModel';
import Grid from 'components/Grid';
const {TabPane} = Tabs;
const FormItem = Form.FormItem;

const dataSource = [
    {
        flow_code:'1001',
        oper_name:'市场部负责人(天津)',
        pk_operator:'李蛟',
        oper_date:'2016-11-30',
        oper_time:'20:08:48',
        wait_operator:'李蛟',
        already_operator:'李蛟',
        oper_result:'提交负责人(审批)',
        oper_advice:'请予以审批',
        result_date:'2016-11-30',
        result_time:'20:08:49',
        result_status:'已处理',
        solid_time:'1秒',
        key:1,
    },
    {
        flow_code:'1001',
        oper_name:'市场部负责人(天津)',
        pk_operator:'李蛟',
        oper_date:'2016-11-30',
        oper_time:'20:08:48',
        wait_operator:'李蛟',
        already_operator:'李蛟',
        oper_result:'提交负责人(审批)',
        oper_advice:'请予以审批',
        result_date:'2016-11-30',
        result_time:'20:08:49',
        result_status:'已处理',
        solid_time:'1秒',
        key:2,
    },
    {
        flow_code:'1001',
        oper_name:'市场部负责人(天津)',
        pk_operator:'李蛟',
        oper_date:'2016-11-30',
        oper_time:'20:08:48',
        wait_operator:'李蛟',
        already_operator:'李蛟',
        oper_result:'提交负责人(审批)',
        oper_advice:'请予以审批',
        result_date:'2016-11-30',
        result_time:'20:08:49',
        result_status:'已处理',
        solid_time:'1秒',
        key:3,
    },
    {
        flow_code:'1001',
        oper_name:'市场部负责人(天津)',
        pk_operator:'李蛟',
        oper_date:'2016-11-30',
        oper_time:'20:08:48',
        wait_operator:'李蛟',
        already_operator:'李蛟',
        oper_result:'提交负责人(审批)',
        oper_advice:'请予以审批',
        result_date:'2016-11-30',
        result_time:'20:08:49',
        result_status:'已处理',
        solid_time:'1秒',
        key:4,
    },
    {
        flow_code:'1001',
        oper_name:'市场部负责人(天津)',
        pk_operator:'李蛟',
        oper_date:'2016-11-30',
        oper_time:'20:08:48',
        wait_operator:'李蛟',
        already_operator:'李蛟',
        oper_result:'提交负责人(审批)',
        oper_advice:'请予以审批',
        result_date:'2016-11-30',
        result_time:'20:08:49',
        result_status:'已处理',
        solid_time:'1秒',
        key:5,
    },
    {
        flow_code:'1001',
        oper_name:'市场部负责人(天津)',
        pk_operator:'李蛟',
        oper_date:'2016-11-30',
        oper_time:'20:08:48',
        wait_operator:'李蛟',
        already_operator:'李蛟',
        oper_result:'提交负责人(审批)',
        oper_advice:'请予以审批',
        result_date:'2016-11-30',
        result_time:'20:08:49',
        result_status:'已处理',
        solid_time:'1秒',
        key:6,
    },
    {
        flow_code:'1001',
        oper_name:'市场部负责人(天津)',
        pk_operator:'李蛟',
        oper_date:'2016-11-30',
        oper_time:'20:08:48',
        wait_operator:'李蛟',
        already_operator:'李蛟',
        oper_result:'提交负责人(审批)',
        oper_advice:'请予以审批',
        result_date:'2016-11-30',
        result_time:'20:08:49',
        result_status:'已处理',
        solid_time:'1秒',
        key:7,
    },
    {
        flow_code:'1001',
        oper_name:'市场部负责人(天津)',
        pk_operator:'李蛟',
        oper_date:'2016-11-30',
        oper_time:'20:08:48',
        wait_operator:'李蛟',
        already_operator:'李蛟',
        oper_result:'提交负责人(审批)',
        oper_advice:'请予以审批',
        result_date:'2016-11-30',
        result_time:'20:08:49',
        result_status:'已处理',
        solid_time:'1秒',
        key:8,
    },
    {
        flow_code:'1001',
        oper_name:'市场部负责人(天津)',
        pk_operator:'李蛟',
        oper_date:'2016-11-30',
        oper_time:'20:08:48',
        wait_operator:'李蛟',
        already_operator:'李蛟',
        oper_result:'提交负责人(审批)',
        oper_advice:'请予以审批',
        result_date:'2016-11-30',
        result_time:'20:08:49',
        result_status:'已处理',
        solid_time:'1秒',
        key:9,
    },
    {
        flow_code:'1001',
        oper_name:'市场部负责人(天津)',
        pk_operator:'李蛟',
        oper_date:'2016-11-30',
        oper_time:'20:08:48',
        wait_operator:'李蛟',
        already_operator:'李蛟',
        oper_result:'提交负责人(审批)',
        oper_advice:'请予以审批',
        result_date:'2016-11-30',
        result_time:'20:08:49',
        result_status:'已处理',
        solid_time:'1秒',
        key:10,
    },
];

class IndexView extends Component {
    constructor(props) {
        super(props);
        //在路由时带出此节点权限按钮
        /**临时测试数据 */
        props.powerButton = ['Query','Export','Save','Return','ViewFlow','Check','Submit','Edit','Add','View','Switch'];
        props.ifPowerBtn = true;
        this.columns = [
            {
            title: "流程号",dataIndex: "flow_code",key: "flow_code",width: 80, 
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
              title: "操作名称",
              dataIndex: "oper_name",
              key: "oper_name",
              width:130,
              render: (text, record, index) => {
                return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
              title: "提交人",
              dataIndex: "pk_operator",
              key: "pk_operator",
              width:80,
              render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
              title: "提交日期",
              dataIndex: "oper_date",
              key: "oper_date",
              width: 100,
              render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "提交时间",
                dataIndex: "oper_time",
                key: "oper_time",
                width: 100,
                render: (text, record, index) => {
                      return <StringModel text={text} record={record} index={index}/>
                  }
              },
              {
                title: "待处理人",
                dataIndex: "wait_operator",
                key: "wait_operator",
                width: 100,
                render: (text, record, index) => {
                      return <StringModel text={text} record={record} index={index}/>
                  }
              },
              {
                title: "处理人",
                dataIndex: "already_operator",
                key: "already_operator",
                width: 80,
                render: (text, record, index) => {
                      return <StringModel text={text} record={record} index={index}/>
                  }
              },
              {
                title: "处理结果",
                dataIndex: "oper_result",
                key: "oper_result",
                width: 130,
                render: (text, record, index) => {
                      return <StringModel text={text} record={record} index={index}/>
                  }
              },
              {
                title: "处理意见",
                dataIndex: "oper_advice",
                key: "oper_advice",
                width: 100,
                render: (text, record, index) => {
                      return <StringModel text={text} record={record} index={index}/>
                  }
              },
              {
                title: "处理日期",
                dataIndex: "result_date",
                key: "result_date",
                width: 100,
                render: (text, record, index) => {
                      return <StringModel text={text} record={record} index={index}/>
                  }
              },
              {
                title: "处理时间",
                dataIndex: "result_time",
                key: "result_time",
                width: 100,
                render: (text, record, index) => {
                      return <StringModel text={text} record={record} index={index}/>
                  }
              },
              {
                title: "处理状态",
                dataIndex: "result_status",
                key: "result_status",
                width: 100,
                render: (text, record, index) => {
                      return <StringModel text={text} record={record} index={index}/>
                  }
              },
              {
                title: "持续时间",
                dataIndex: "solid_time",
                key: "solid_time",
                width: 100,
                render: (text, record, index) => {
                      return <StringModel text={text} record={record} index={index}/>
                  }
              },
              
  ];
        /**临时测试数据 */
        this.state = {
            showLoading : false, //加载状态
            showListView : '', //显示列表界面
            showListViewLead : 'none', //显示领导列表界面
            showFormView : 'none',//显示Form表单
            showFormViewLead : 'none',//显示Form表单
            isEdit : false,//是否可编辑(卡片界面)
            showForm:false, //是否加载 详情修改页
            isGrid : true,//是否列表界面
            formObject: {},//当前卡片界面对象
            listObj: [],//列表对象
            ifPowerBtn:props.ifPowerBtn,//是否控制按钮权限
            powerButton: props.powerButton,//按钮权限列表   
            showViewFlow:false,   
            dataSource:dataSource,    
            tabKey:'flow_picture',  
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        actions.calculatorzt.updateState({powerButton:this.props.powerButton});
        actions.calculatorzt.updateState({ifPowerBtn:this.props.ifPowerBtn});
        
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
        
    }
    

    //绑定子组件
    onRef = (ref) => {
        this.child = ref;        
    }

    /**
     *
     *tab 切换
     * @param {string}
     */
    onChangeTab = (tabKey) => {
        this.setState({
            tabKey
        })
    }

    /**
     * 切换为列表界面
     */
    switchToListView = () =>{
        this.setState({
            showListView:'',
            showFormView:'none',
            formObject:{},
        })
        actions.calculatorzt.updateState({ formObject : {},isGrid : true,isEdit : false, showForm : false});
    }

    /**
     * 切换为卡片界面
     */
    switchToCardView = (obj) =>{
        let _formObj = deepClone(obj);  
        this.setState({
            showListView:'none',
            showFormView:'',
            formObject:_formObj,
        }) 
              
        actions.calculatorzt.updateState({ formObject : _formObj,isGrid : false,isEdit : false, showForm : true});
    }

    /**
     * Form表单更改编辑状态
     */
    switchEdit = () =>{
        this.setState({
            isEdit:!this.state.isEdit,
        })
        this.state.formObject['_edit'] = this.state.formObject['_edit'] ? false : true;
        actions.calculatorzt.updateState({isEdit : !this.state.isEdit});
    }

    /**
     * 查询方法
     */
    onQuery = (queryParam) =>{        
        console.log(this.props.list);
    }

     /**
     * 新增按钮
     */
    onAdd = () =>{
        console.log("点击新增");
        let objectForm = localStorage.getItem("addKey");
        if(objectForm){
            let _formObject = deepClone(JSON.parse(objectForm));
            actions.calculatorzt.updateState({formObject:_formObject});
        }else{
            //新增完成清空form表单
            actions.calculatorzt.updateState({formObject:{}});
        }
        //填出新增窗口
        actions.calculatorzt.updateState({showModal : true});

        // singleRecordOper(param => {
        //     this.switchToCardView(param);
        // });        
    }


    /**
     * 修改按钮
     */
    onEdit = () =>{
        singleRecordOper(this.props.selectedList,(param) => {
            this.switchToCardView(param);
            this.switchEdit();
        });        
    }

    /**
     * 查看按钮
     */
    onView = () =>{
        singleRecordOper(this.props.selectedList,(param) => {
            this.switchToCardView(param);
            actions.calculatorzt.updateState({bt:false});
        });
    }

    /**
     * 查看流程图
     */
    onViewFlow =()=>{
        this.setState({
            showViewFlow:true,
        })
    }

    closeViewFlow = ()=>{
        this.setState({
            showViewFlow:false,
        })
    }


    /**
     * 导出数据按钮
     *
     */
    onClickExport = () => {
        this.grid.exportExcel();
    }

    /**
     * 返回按钮
     */
    onReturn = () =>{
        if(this.state.isEdit){
            this.switchEdit();
        }
        this.switchToListView();
    }

    exporflowtExcel = ()=>{
        this.refs.draw_audit_table.exportExcel();
    }

    onSave = () => {
        console.log('save save')
        let obj = this.child.submit();
        let _formObj = deepClone(this.props.formObject);
        Object.assign(_formObj,obj);
        console.log('save form');
        console.log(_formObj);
        actions.calculatorzt.updateRowData({'record':_formObj});
        this.switchEdit();

    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        
        let ButtonPower = {
            PowerButton : this.state.powerButton,
            ifPowerBtn : this.state.ifPowerBtn,
            isGrid : this.state.isGrid,
            isEdit : this.state.isEdit,
        }



        return (            

            <div className='project-info'>
                <Loading showBackDrop={true} show={this.state.showLoading} fullScreen={true}/>
                <div>
                    <ButtonGroup
                        BtnPower= {ButtonPower}    
                        Query= {this.onQuery}
                        Edit= {this.onEdit}
                        Add= {this.onAdd.bind(this)}
                        View={this.onView}
                        Return={this.onReturn}
                        Save={this.onSave}
                        ViewFlow={this.onViewFlow}
                        {...this.props}
                    />
                </div>
                <div style={{display:this.state.showListView}}>
                    <ListView {...this.props}/>
                </div>      
                <div style={{display:this.state.showFormView}}>
                    <FormView {...this.props} onRef={this.onRef}/>
                </div>
                <div>
                    <AddFormView { ...this.props } />
                </div>
                <Drawer showMask={true} maskClosable={false} className = "drawer_view" closeIcon={<Icon type="uf-close-c"/>}  hasHeader={false} show={this.state.showViewFlow} placement='right' destroyOnClose={false}>
                <div className="drawer-content">
                    <div className="drawer-tab">
                    <Tabs
                    defaultActiveKey={this.state.tabKey}
                    onChange={this.onChangeTab}
                    >
                        <TabPane tab='审批流程图' key="flow_picture">
                            <div className="picture">
                                <img src={require('static/images/2.jpg')} />                                      
                            </div>
                        </TabPane>
                        <TabPane tab='审批流程列表' key="flow_table">
                                {/*<Table data={this.state.dataSource} columns={this.columns}  height={30}/> */}
                                <Grid  ref="draw_audit_table"
                                exportFileName="立项申请审批意见"
                                data={this.state.dataSource}
                                columns={this.columns}
                                height={30}
                                paginationObj={{verticalPosition:'none'}}
                                headerDisplayInRow={true}//表头换行用...来表示
                                bodyDisplayInRow={true}//表体换行用...来表示
                                columnFilterAble={false}
                                multiSelect={{type:"none"}}
                                />
                        </TabPane>
                    </Tabs>
                    </div>
                    <div className ="drawer-button">
                        <div className = "button_flow">
                            <Button  size="sm" colors="info" shape="round" style={{ marginRight: 8,marginLeft:10,marginTop:5 }} onClick={this.exporflowtExcel}><Icon type='uf-export'/>导出审批意见</Button>
                            <Button  size="sm" colors="warning" shape="round" style={{marginTop:5 }} onClick={this.closeViewFlow}><Icon type='uf-close-c-o'/>关闭</Button>
                        </div>
                    </div>
                </div>    
                </Drawer>
                
            </div>
            
        );
    }
}

export default Form.createForm()(IndexView);
