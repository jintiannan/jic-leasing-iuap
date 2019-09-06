/**
 * App模块
 */
import React, { Component } from 'react';
import {Tooltip, Menu, Icon, Loading, Form} from 'tinper-bee';
import {actions} from 'mirrorx';
import {singleRecordOper} from "utils/service";
import {deepClone} from "utils";


import ButtonGroup from './ButtonGroup';
import ListView from './ListView';
import FormView from './FormView';
import AddFormView from './AddFormView'
import './index.less';
import {Row} from "../../CustomerCorpModify/components/FormView";


class IndexView extends Component {
    constructor(props) {
        super(props);
        //在路由时带出此节点权限按钮
        /**临时测试数据 */
        props.powerButton = ['Query','Export','Save','Return','ViewFlow','Check','Submit','Edit','Add','View'];
        props.ifPowerBtn = true;
        /**临时测试数据 */
        this.state = {
            showListView : '', //显示列表界面
            showFormView : 'none',//显示Form表单
            isEdit : false,//是否可编辑(卡片界面)
            isGrid : true,//是否列表界面
            formObject: {},//当前卡片界面对象
            listObj: [],//列表对象
            ifPowerBtn:props.ifPowerBtn,//是否控制按钮权限
            powerButton: props.powerButton,//按钮权限列表

        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        actions.customerSource.updateState({powerButton:this.props.powerButton});
        actions.customerSource.updateState({ifPowerBtn:this.props.ifPowerBtn});
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
    };

    /**
     * 切换为列表界面
     */
    switchToListView = () =>{
        this.setState({
            showListView:'',
            showFormView:'none',
            formObj:{},
        });
        actions.customerSource.updateState({ formObject : {},isGrid : true,isEdit : false});
    };

    /**
     * 切换为卡片界面
     */
    switchToCardView = (obj) =>{
        let _formObj = deepClone(obj);
        this.setState({
            showListView:'none',
            showFormView:'',
            formObject :_formObj,
        });
        actions.customerSource.updateState({ formObject : _formObj,isGrid : false,isEdit : false});
    };

    /**
     * Form表单更改编辑状态
     */
    switchEdit = () =>{
        this.setState({
            isEdit:!this.state.isEdit,
        });
        this.state.formObject['_edit'] = this.state.formObject['_edit'] ? false : true;
        actions.customerSource.updateState({isEdit : !this.state.isEdit});
    };

    /**
     * 查询方法
     */
    onQuery = (queryParam) =>{


    };


    /**
     * 修改按钮
     */
    onEdit = () =>{
        singleRecordOper(this.props.selectedList,(param) => {

            this.switchToCardView(param);
            this.switchEdit();
        });
    };

    /**
     * 查看按钮
     */
    onView = () =>{
        singleRecordOper(this.props.selectedList,(param) => {
            this.switchToCardView(param);
            actions.customerSource.updateState({bt:false});
        });
    };

    /**
     * 返回按钮
     */
    onReturn = () =>{
        if(this.state.isEdit){
            this.switchEdit();
        }
        this.switchToListView();
    };

    onSave = () => {
        actions.customerSource.saveOrUpdate(this.props.formObject);

    };

    onDelete = () => {
        singleRecordOper(this.props.selectedList,(param) => {
            let _selected = deepClone(param);
            actions.customerSource.delete(_selected.role_code);
        });
    };

    /**
     * 新增按钮
     */
    onAdd = () =>{
        actions.customerSource.updateState({showModal : true, isEdit: true});
    };
    render() {
        let ButtonPower = {
            PowerButton : this.state.powerButton,
            ifPowerBtn : this.state.ifPowerBtn,
            isGrid : this.state.isGrid,
            isEdit : this.state.isEdit,
        };

        return (
            this.props.parentProps.subForm === 'source'?
            <div>
                <Loading showBackDrop={true} show={this.props.showLoading} fullScreen={true}/>
                <div>
                    <ButtonGroup
                        BtnPower= {ButtonPower}
                        Query= {this.onQuery}
                        Edit= {this.onEdit}
                        View={this.onView}
                        Return={this.onReturn}
                        Save={this.onSave}
                        Add={this.onAdd}
                        Delete={this.onDelete}
                        {...this.props}
                    />
                </div>
                <Row>
                    <div className=''>客户名称： {this.props.parentProps.role_name}</div>
                </Row>
                <div style={{display:this.state.showListView}}>
                    <ListView {...this.props}/>
                </div>
                <div style={{display:this.state.showFormView}}>
                    <FormView {...this.props} onRef={this.onRef}/>
                </div>
                <div>
                    <AddFormView { ...this.props } onRef={this.onRef}/>
                </div>


            </div>:<div></div>

        );
    }
}

export default Form.createForm()(IndexView);
