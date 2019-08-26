/**
 * App模块
 */

import React, { Component } from 'react';
import {Tooltip, Menu, Icon, Loading,Tabs} from 'tinper-bee';
import {actions} from 'mirrorx';
import {singleRecordOper} from "utils/service";
import {deepClone} from "utils";

import ButtonGroup from './ButtonGroup';
import ListView from './ListView';
import FormView from './FormView';
import CalFormView from '../../../../../public/src/routes/calculator/components/CalFormView'


import './index.less';

const {TabPane} = Tabs;


class IndexView extends Component {
    constructor(props) {
        super(props);
        //在路由时带出此节点权限按钮
        /**临时测试数据 */
        props.powerButton = ['Query','Export','Save','Return','ViewFlow','Check','Submit','Edit','Add','View'];
        props.ifPowerBtn = true;
        /**临时测试数据 */
        this.state = {
            showLoading : false, //加载状态
            showListView : '', //显示列表界面
            showFormView : 'none',//显示Form表单
            isEdit : false,//是否可编辑(卡片界面)
            isGrid : true,//是否列表界面
            formObj: {},//当前卡片界面对象
            listObj: [],//列表对象
            ifPowerBtn:props.ifPowerBtn,//是否控制按钮权限
            powerButton: props.powerButton,//按钮权限列表  
            activeKey: "1",
            start: 0,     
            tabBarPosition: "left",     
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        actions.contract.updateState({powerButton:this.props.powerButton});
        actions.contract.updateState({ifPowerBtn:this.props.ifPowerBtn});
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {

    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    //绑定子组件
    onconRef = (ref) => {
        this.conchild = ref;        
    }
    oncalRef = (ref) => {
        this.calchild = ref;        
    }

    /**
     * 切换为列表界面
     */
    switchToListView = () =>{
        this.setState({
            showListView:'',
            showFormView:'none',
            formObj:{},
        })
        actions.contract.updateState({ formObject : {},isGrid : true,isEdit : false});
    }

    /**
     * 切换为卡片界面
     */
    switchToCardView = (obj) =>{
        let _formObj = deepClone(obj);  
        this.setState({
            showListView:'none',
            showFormView:'',
            formObj:_formObj,
        })        
        actions.contract.updateState({ formObject : _formObj,isGrid : false,isEdit : false});
    }

    /**
     * Form表单更改编辑状态
     */
    switchEdit = () =>{
        this.setState({
            isEdit:!this.state.isEdit,
        })
        this.state.formObj['_edit'] = this.state.formObj['_edit'] ? false : true;
        actions.contract.updateState({isEdit : !this.state.isEdit});
    }

    /**
     * 查询方法
     */
    onQuery = (queryParam) =>{        
        // actions.contract.loadList(queryParam);  
        console.log(this.props.list);
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
            actions.contract.updateState({bt:false});
        });
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

    onSave = () => {
        debugger;
        console.log('save save')
        console.log(this);
        let obj = this.conchild.submit();
        let _formObj = deepClone(this.props.formObject);
        Object.assign(_formObj,obj);
        if(this.calchild!=undefined){
            let calobj = this.calchild.submit();
            Object.assign(_formObj.pk_cal,calobj);
        }
        console.log('save form');
        console.log(_formObj);
        actions.contract.updateRowData({'record':_formObj});
        this.switchEdit();
    }


    onChange = (activeKey) => {
        this.setState({
            activeKey,
        });
    }

    onTabClick = (key) => {
        if (key === this.state.activeKey) {
            this.setState({
                activeKey: '',
            });
        }
    }
    

    render() {
        let ButtonPower = {
            PowerButton : this.state.powerButton,
            ifPowerBtn : this.state.ifPowerBtn,
            isGrid : this.state.isGrid,
            isEdit : this.state.isEdit,
        }
        return (            

            <div className='contract'>
                <Loading showBackDrop={true} show={this.state.showLoading} fullScreen={true}/>
                <div>
                    <ButtonGroup
                        BtnPower= {ButtonPower}    
                        Query= {this.onQuery}
                        Edit= {this.onEdit}
                        View={this.onView}
                        Return={this.onReturn}
                        Save={this.onSave}
                        {...this.props}
                    />
                </div>
                <div style={{display:this.state.showListView}}>
                    <ListView {...this.props}/>
                </div>                
                <div style={{display:this.state.showFormView}}>
                <Tabs
                    activeKey={this.state.activeKey}
                    tabBarPosition={this.state.tabBarPosition}
                    onChange={this.onChange}
                    defaultActiveKey="1"
                    className="demo4-tabs"
                >
                    <TabPane tab='合同制作' key="1">
                        <FormView {...this.props} onRef={this.onconRef}/>
                    </TabPane>
                    <TabPane tab='报价方案' key="2">
                        <CalFormView {...this.props} onRef={this.oncalRef}/>
                    </TabPane>
                    <TabPane tab='承租方信息' key="3">Content of Tab Pane 3</TabPane>
                    <TabPane tab='供应商信息' key="4">Content of Tab Pane 4</TabPane>
                    <TabPane tab='出租人信息' key="5">Content of Tab Pane 5</TabPane>
                    <TabPane tab='来源信息' key="6">Content of Tab Pane 6</TabPane>
                    <TabPane tab='担保信息' key="7">Content of Tab Pane 7</TabPane>
                    <TabPane tab='保险信息' key="8">Content of Tab Pane 8</TabPane>
                    <TabPane tab='收付各方' key="9">Content of Tab Pane 9</TabPane>
                    <TabPane tab='付款条件' key="10">Content of Tab Pane 10</TabPane>
                    <TabPane tab='起租条件' key="11">Content of Tab Pane 11</TabPane>
                    <TabPane tab='开票信息' key="12">Content of Tab Pane 12</TabPane>
                    <TabPane tab='收票信息' key="13">Content of Tab Pane 13</TabPane>
                </Tabs>
                    
                </div>
            </div>
            
        );
    }
}

export default IndexView;
