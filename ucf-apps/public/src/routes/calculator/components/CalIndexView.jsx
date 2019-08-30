/**
 * App模块
 */

import React, { Component } from 'react';
import {Tooltip, Menu, Icon, Loading} from 'tinper-bee';
import {actions} from 'mirrorx';
import {singleRecordOper} from "utils/service";
import {deepClone} from "utils";

import ButtonGroup from './ButtonGroup';
import CalListView from './CalListView';
import CalFormView from './CalFormView';
import './index.less';


class CalIndexView extends Component {
    constructor(props) {
        super(props);
        //在路由时带出此节点权限按钮
        this.state = {
            showLoading : false, //加载状态
            showListView : '', //显示列表界面
            showFormView : 'none',//显示Form表单
            formObj: {},//当前卡片界面对象          
        };
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
            formObj:{},
        })
        actions.contract.updateState({ CalformObject : {},isCalGrid : true,isCalEdit : false});
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
        actions.contract.updateState({ CalformObject : _formObj,isCalGrid : false,isCalEdit : false});
    }

    /**
     * Form表单更改编辑状态
     */
    switchEdit = () =>{
        this.setState({
            isEdit:!this.state.isEdit,
        })
        this.state.formObj['_edit'] = this.state.formObj['_edit'] ? false : true;
        actions.contract.updateState({isCalEdit : !this.state.isEdit});
    }

    /**
     * 修改按钮
     */
    onEdit = () =>{
        singleRecordOper(this.props.selectedCalList,(param) => {
            this.switchToCardView(param);
            this.switchEdit();
        });        
    }

    /**
     * 查看按钮
     */
    onView = () =>{
        singleRecordOper(this.props.selectedCalList,(param) => {
            this.switchToCardView(param);
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
        console.log('save save')
        let obj = this.child.submit();
        let _formObj = deepClone(this.props.CalformObject);
        Object.assign(_formObj,obj);
        actions.contract.updateRowData({'record':_formObj});
        this.switchEdit();

    }
    

    render() {
        let ButtonPower = {
            PowerButton : this.props.powerButton,
            ifPowerBtn : this.props.ifPowerBtn,
            isGrid : this.props.isCalGrid,
            isEdit : this.props.isCalEdit,
        }
        return (            

            <div className='contract'>
                <Loading showBackDrop={true} show={this.state.showLoading} fullScreen={true}/>
                <div>
                    <ButtonGroup
                        BtnPower= {ButtonPower}    
                        Edit= {this.onEdit}
                        View={this.onView}
                        Return={this.onReturn}
                        Save={this.onSave}
                        {...this.props}
                    />
                </div>
                <div style={{display:this.state.showListView}}>
                    <CalListView {...this.props}/>
                </div>                
                <div style={{display:this.state.showFormView}}>
                    <CalFormView {...this.props} onRef={this.onRef}/>
                </div>
            </div>
            
        );
    }
}

export default CalIndexView;
