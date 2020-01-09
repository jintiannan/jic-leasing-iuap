/**
 * 自定义初始默认模块
 */

import React, { Component } from 'react';
import { Loading,Form } from 'tinper-bee';
import {actions} from 'mirrorx';
import {singleRecordOper} from "utils/service";
import { deepClone,Info } from "utils";
import ButtonGroup from './ButtonGroup';
import ListView from './ListView';
import FormView from './FormView';
import AccountingShareView from './AccountingShareView';
import CashView from './CashView';
import AccruedView from './AccruedView';
import SearchPanel from './SearchPanel'
import moment from 'moment';
import './index.less';

class IndexView extends Component {
    /**
     * 当前界面内部构造函数 固定格式需添加super(props) 仅需当前界面内部使用的数据可以定义在this.state中
     */
    constructor(props) {
        super(props);
        //在路由时带出此节点权限按钮  后续会从后台传入
        /**临时测试数据 */
        props.powerButton = ['Query','Export','Report','Return'];
        props.ifPowerBtn = true;

        //在路由时带出此节点字段权限  后续会从后台传入
        /**临时测试数据 */
        // props.gridColumn = ['plan_cash_loan','fact_cash_loan','deposit_cash','srvfee_cash_in','finace_irr_method','finace_irr_year'
        //     ,'project_irr','finance_irr'];
        // props.ifGridColumn = true;
        /**临时测试数据 */

        this.state = {
            showListView : '', //显示列表界面
            showFormView : 'none',//显示Form表单
            isEdit : false,//是否可编辑(卡片界面)
            showForm:false, //是否加载 详情修改页
            isGrid : true,//是否列表界面
            formObject: {},//当前卡片界面对象
            listObj: [],//列表对象
            showSearchPanel:false,
            ifPowerBtn:props.ifPowerBtn,//是否控制按钮权限
            powerButton: props.powerButton,//按钮权限列表
            ifGridColumn:props.ifGridColumn,//是否自定义显示字段
            gridColumn: props.gridColumn,//显示字段
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        actions.communicationContract.updateState({powerButton:this.props.powerButton});
        actions.communicationContract.updateState({ifPowerBtn:this.props.ifPowerBtn});
        actions.communicationContract.updateState({gridColumn:this.props.gridColumn});
        actions.communicationContract.updateState({ifGridColumn:this.props.ifGridColumn});

    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {

    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {

    }


    //绑定子组件的引用  使用子组件的地方添加此方法的实现 其中 formchild为调用子组件方法时使用的名字 通过this.formchlc.+方法名调用子组件的方法
    onRef = (ref) => {
        this.child = ref;
    }

    onListRef = (ref) =>{
        this.listchild = ref;
    }

    onRefCash = (ref) =>{
        this.listchildCash = ref;
    }

    onRefAccountingShare = (ref) =>{
        this.listchildAccountingShare = ref;
    }

    onRefAccrued = (ref) =>{
        this.listchildAccrued = ref;
    }

    onsearchRef = (ref) =>{
        this.serachRef = ref;
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
        actions.communicationContract.updateState({ formObject : {},isGrid : true,isEdit : false, showForm : false});
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

        actions.communicationContract.updateState({ formObject : _formObj,isGrid : false,isEdit : false, showForm : true});
    }

    /**
     * Form表单更改编辑状态
     */
    switchEdit = () =>{
        this.setState({
            isEdit:!this.state.isEdit,
        })
        actions.communicationContract.updateState({isEdit : !this.state.isEdit});
    }

    /**
     * 查询方法
     */
    onQuery = () =>{
        this.setState({
            showSearchPanel:true
        })
    }

    oncloseSearch = () =>{
        this.setState({
            showSearchPanel:false,
        })
    }

    onalterSearch = () =>{
        const queryData = this.serachRef.alterSerach();
        let queryParam = {
            pageIndex: 1,
            pageSize: this.props.queryParam.pageSize,
            queryData: '{}'==JSON.stringify(queryData)?null:queryData
        };
        actions.communicationContract.loadList(queryParam);
        //console.log(queryData);
        //localStorage.setItem('testdemosearch',JSON.stringify(queryData));
        this.setState({
            showSearchPanel:false,
        })
    }

    /**
     * 当前页按钮点击事件  添加数据  所有页面内部函数统一采用Es6箭头函数语法形式 避免this指针获取不到存在错误的问题
     */
    onAdd = () =>{
        
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
        singleRecordOper(this.props.selectedList,(param) => {  //查看选中项数据前进行一次单选校验
            this.switchToCardView(param);
            actions.communicationContract.updateState({bt:false});
        });
    }

    /**
     * 导出数据按钮 使用GridMain组件中定义的引用ref直接调用即可导出数据
     */
    onClickExport = (key) => {
        //先判断选定是导出当前选中数据还是当前页数据 
        this.listchild.setExportList(key);
        // this.listchild.refs.mainlist.exportExcel();
    }

    /**
     * 报表查看
     */
    onClickReport = (key) => {
        singleRecordOper(this.props.selectedList,(param) => {  //查看选中项数据前进行一次单选校验
            if(key == 1) {
                //现金流量
                actions.communicationContract.updateState({showCashModal : true});
                this.listchildCash.getList(this.props.selectedList[0]);
            }else if(key == 2) {
                //会计分摊表
                actions.communicationContract.updateState({showAccountingShareModal : true});
                this.listchildAccountingShare.getList(this.props.selectedList[0]);
            }else if(key == 3) {
                //计提表
                actions.communicationContract.updateState({showAccruedModal : true});
                this.listchildAccrued.getList(this.props.selectedList[0]);
            }else{
                Info("系统不能识别您要查看什么报表数据，请联系管理员");
            }
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

    // 保存当前界面的编辑数据
    onSave = () => {
        let obj = this.child.submit();
        let _formObj = deepClone(this.props.formObject);
        Object.assign(_formObj,obj);
        actions.communicationContract.updateRowData({'record':_formObj});
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
                {/**Loadging组件 页面内部加载图标 showBackDrop对应是否显示遮罩层 show为是否展示属性 fullScreen对应是否全屏遮罩 */}
                <Loading showBackDrop={true} show={this.props.showLoading} fullScreen={true}/>
                <div>
                    <ButtonGroup
                        BtnPower= {ButtonPower}
                        Query= {this.onQuery}
                        Export={this.onClickExport}
                        Report={this.onClickReport}
                        Edit= {this.onEdit}
                        Add= {this.onAdd}
                        View={this.onView}
                        Return={this.onReturn}
                        Save={this.onSave}
                        {...this.props}
                    />
                </div>
                {/**所有页面内部添加组件必须由html内部标签如div标签等包裹 便于维护样式 且避免报错 */}
                <div style={{display:this.state.showListView}}>
                    <ListView {...this.props}　onListRef={this.onListRef} />
                </div>
                <div style={{display:this.state.showFormView}}>
                    <FormView {...this.props} onRef={this.onRef}/>
                </div>
                <div>
                    <CashView { ...this.props } onListRef={this.onRefCash}/>
                </div>
                <div>
                    <AccountingShareView { ...this.props } onListRef={this.onRefAccountingShare}/>
                </div>
                <div>
                    <AccruedView { ...this.props } onListRef={this.onRefAccrued}/>
                </div>
                <div>
                    <SearchPanel {...this.props} IfShow = {this.state.showSearchPanel} onRef = {this.onsearchRef} closeSearch={this.oncloseSearch} alterSerach={this.onalterSearch}/>
                </div>
            </div>

        );
    }
}

export default Form.createForm()(IndexView);
