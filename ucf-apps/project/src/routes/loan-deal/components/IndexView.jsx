import React, { Component } from 'react';
import {Loading} from 'tinper-bee';
import {actions} from 'mirrorx';
import {singleRecordOper} from "utils/service";
import {deepClone} from "utils";

import ButtonGroup from './ButtonGroup';
import ListView from './ListView';
import FormView from './FormView';
import ModalView from './ModalView'
import SearchPanel from './SearchPanel'
import './index.less';


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
            showSearchPanel: false, //显示查询表单
            isEdit : false,//是否可编辑(卡片界面)
            isGrid : true,//是否列表界面
            formObj: {},//当前卡片界面对象
            listObj: [],//列表对象
            ifPowerBtn:props.ifPowerBtn,//是否控制按钮权限
            powerButton: props.powerButton,//按钮权限列表            
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        actions.loandeal.updateState({powerButton:this.props.powerButton});
        actions.loandeal.updateState({ifPowerBtn:this.props.ifPowerBtn});
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {

    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    //绑定子组件
    onRef = (ref) => {
        this.listchild = ref;        
    }

    onmodalRef = (ref) =>{
        this.modalchild = ref;
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
            formObj:{},
        })
        actions.loandeal.updateState({ formObject : {},isGrid : true,isEdit : false});
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
        actions.loandeal.updateState({ formObject : _formObj,isGrid : false,isEdit : false});
    }

    /**
     * Form表单更改编辑状态
     */
    switchEdit = () =>{
        this.setState({
            isEdit:!this.state.isEdit,
        })
        actions.loandeal.updateState({isEdit : !this.state.isEdit});
    }

    /**
     * 查询方法
     */
    onQuery = (queryParam) =>{        
        // actions.loandeal.loadList(queryParam);  
        this.setState({
            showSearchPanel:true
        })
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
            actions.loandeal.updateState({bt:false});
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
        let obj = this.listchild.submit();
        let _formObj = deepClone(this.props.formObject);
        Object.assign(_formObj,obj);
        actions.loandeal.updateRowData({'record':_formObj});
        this.switchEdit(); 

    }

    onAdd = () => {
        let objectForm = localStorage.getItem("addKey");
        if(objectForm){
            let _formObj = deepClone(JSON.parse(objectForm));
            actions.loandeal.updateState({formObjAdd:_formObj});
        }
        actions.loandeal.updateState({showModal:true});
    }

    oncloseSearch = ()=>{
        this.setState({
            showSearchPanel:false,
        })
    }

    onalterSearch = ()=>{
        const dataSource = this.serachRef.alterSerach();
        console.log(dataSource);
        localStorage.setItem('loandealsearch',JSON.stringify(dataSource));
        this.setState({
            showSearchPanel:false,
        })
    }
    

    render() {
        let ButtonPower = {
            PowerButton : this.state.powerButton,
            ifPowerBtn : this.state.ifPowerBtn,
            isGrid : this.state.isGrid,
            isEdit : this.state.isEdit,
        }
        return (            

            <div className='loan-deal'>
                <Loading showBackDrop={true} show={this.state.showLoading} fullScreen={true}/>
                <div>
                    <ButtonGroup
                        BtnPower= {ButtonPower}    
                        Query= {this.onQuery}
                        Edit= {this.onEdit}
                        View={this.onView}
                        Return={this.onReturn}
                        Save={this.onSave}
                        Add={this.onAdd}
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
                    <ModalView {...this.props} onRef={this.onmodalRef}  />
                </div>
                <div>
                    <SearchPanel {...this.props} IfShow = {this.state.showSearchPanel} onRef = {this.onsearchRef} closeSearch={this.oncloseSearch} alterSerach={this.onalterSearch}/>
                </div>
            </div>
            
        );
    }
}

export default IndexView;
