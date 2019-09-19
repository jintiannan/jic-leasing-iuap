/**
 * App模块
 */

import React, { Component } from 'react';
import {Tooltip, Menu, Icon, Loading,Form,Label,FormControl,Col, Row} from 'tinper-bee';
import {actions} from 'mirrorx';
import {singleRecordOper} from "utils/service";
import { deepClone,Info } from "utils";

import ButtonGroup from './ButtonGroup';
import ListView from './ListView';
import FormView from './FormView';
import AddFormView from './AddFormView';
import './index.less';
const FormItem = Form.FormItem;

class IndexView extends Component {
    constructor(props) {
        super(props);
        //在路由时带出此节点权限按钮
        /**临时测试数据 */
        props.powerButton = ['Query','Export','Save','Return','ViewFlow','Check','Submit','Edit','Add','View','Switch'];
        props.ifPowerBtn = true;
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
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        actions.calculatorNormalzt.updateState({powerButton:this.props.powerButton});
        actions.calculatorNormalzt.updateState({ifPowerBtn:this.props.ifPowerBtn});
        
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
     * 切换为列表界面
     */
    switchToListView = () =>{
        this.setState({
            showListView:'',
            showFormView:'none',
            formObject:{},
        })
        actions.calculatorNormalzt.updateState({ formObject : {},isGrid : true,isEdit : false, showForm : false});
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
              
        actions.calculatorNormalzt.updateState({ formObject : _formObj,isGrid : false,isEdit : false, showForm : true});
    }

    /**
     * Form表单更改编辑状态
     */
    switchEdit = () =>{
        this.setState({
            isEdit:!this.state.isEdit,
        })
        this.state.formObject['_edit'] = this.state.formObject['_edit'] ? false : true;
        actions.calculatorNormalzt.updateState({isEdit : !this.state.isEdit});
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
            actions.calculatorNormalzt.updateState({formObject:_formObject});
        }else{
            //新增完成清空form表单
            actions.calculatorNormalzt.updateState({formObject:{}});
        }
        //填出新增窗口
        actions.calculatorNormalzt.updateState({showModal : true});

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
            actions.calculatorNormalzt.updateState({bt:false});
        });
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

    onSave = () => {
        if(!this.props.error){
            Info('子表数据填写不正确');
        }else{
            console.log('save save')
            let obj = this.child.submit();
            let _formObj = deepClone(this.props.formObject);
            Object.assign(_formObj,obj);
            console.log('save form');
            console.log(_formObj);
            actions.calculatorNormalzt.updateRowData({'record':_formObj});
            this.switchEdit();
        }
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
            </div>
            
        );
    }
}

export default Form.createForm()(IndexView);
