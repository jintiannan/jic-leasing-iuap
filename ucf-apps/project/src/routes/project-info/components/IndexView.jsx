/**
 * App模块
 */

import React, { Component } from 'react';
import {Tooltip, Menu, Icon, Loading} from 'tinper-bee';
import {actions} from 'mirrorx';
import {checkListSelect} from "utils/service";
import {deepClone} from "utils";

import ButtonGroup from './ButtonGroup';
import ListView from './ListView';
import FormView from './FormView';
import './index.less';


class IndexView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading : false, //加载状态
            showListView : '', //显示列表界面
            showFormView : 'none',//显示Form表单
            isEdit : false,//是否可编辑(卡片界面)
            formObj: {},//当前卡片界面对象
            listObj: [],//列表对象
            powerButton: [],//按钮权限列表            
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {       
        
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        actions.projectInfo.powerButton();
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
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
        actions.projectInfo.updateState({ formObject : {} });
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
        actions.projectInfo.updateState({ formObject : _formObj });
    }

    /**
     * Form表单更改编辑状态
     */
    switchEdit = () =>{
        this.setState({
            isEdit:!this.state.isEdit,
        })
        this.state.formObj['_edit'] = this.state.formObj['_edit'] ? false : true;
    }

    /**
     * 查询方法
     */
    onQuery = (queryParam) =>{        
        // actions.projectInfo.loadList(queryParam);  
    }

    /**
     * 修改按钮
     */
    onEdit = () =>{
        checkListSelect(this.props.selectedList,(param) => {
            this.switchToCardView(param);
            this.switchEdit();
        });        
    }

    /**
     * 查看按钮
     */
    onView = () =>{
        checkListSelect(this.props.selectedList,(param) => {
            this.switchToCardView(param);
        });
    }
    
    render() {
        let ButtonPower = {
            PowerButton : this.props.powerButton,
            isGrid : this.state.isGrid,
            isEdit : this.state.isEdit,
        }
        return (            

            <div className='project-info'>
                <Loading showBackDrop={true} show={this.state.showLoading} fullScreen={true}/>
                <ButtonGroup
                BtnPower= {ButtonPower}    
                Query= {this.onQuery}
                Edit= {this.onEdit}
                />
                <div style={{display:this.state.showListView}}>
                    <ListView {...this.props}/>
                </div>                
                <div style={{display:this.state.showFormView}}>
                    <FormView {...this.props} formObj={this.state.formObj}/>
                </div>
            </div>
            
        );
    }
}

export default IndexView;
