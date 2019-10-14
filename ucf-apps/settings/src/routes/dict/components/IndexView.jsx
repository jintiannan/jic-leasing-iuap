/**
 * App模块
 */
import React, { Component } from 'react';
import {Loading, Form} from 'tinper-bee';
import {actions} from 'mirrorx';
import Message from 'bee-message';
import ButtonGroup from './ButtonGroup';
import ListView from './ListView';
import FormView from './FormView';
import {deepClone} from "utils";
import {singleRecordOper} from "utils/service";
import './index.less';
import { Empty } from 'antd';

class IndexView extends Component {
    constructor(props) {
        super(props);
        /**临时测试数据 */
        props.powerButton = ['Save', 'Edit', 'Add', 'Delete', 'Cancel','Query'];
        props.ifPowerBtn = true;
        /**临时测试数据 */
        this.state = {
            listView:'',
            formView:'none',
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        actions.dict.updateState({powerButton:this.props.powerButton});
        actions.dict.updateState({ifPowerBtn:this.props.ifPowerBtn});
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {

    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }


    //绑定子组件
    onformRef =(ref) =>{
        this.formchild = ref;
    }

    /**
     * 点击button事件
     */
    onAdd = () => {
        this.switchToCardView([]);
        this.switchEdit();
        //需要预置参数编号 根据后台编码规则设置 同时清空另两个值
        this.formchild.resetformValue();
    };
    // 取消功能
    onCancel = () => { 
        this.switchEdit();
        this.formchild.resetvalue();
    };

    // 保存节点
    onSave = () => {
        let obj = this.formchild.submit();
        let dictitemlist= deepClone(this.formchild.itemsubmit());
        let _formObj = deepClone(this.props.formObject);
        if(_formObj.dictitemlist==undefined||_formObj.dictitemlist==null){  //新增时不存在数据  此处特殊处理下
            _formObj = {dictitemlist:[]}
            obj.pkParamType = 'dsalkj';     //自定义生成数据主键
            Object.assign(_formObj,obj);
            if(dictitemlist && dictitemlist.length > 0){   //保存之前更改下编辑态
                dictitemlist.map(item => {
                    item['_edit']=item['_edit']?false:true;
                });
            }
            Object.assign(_formObj.dictitemlist,dictitemlist);
            let _list =deepClone(this.props.list);
            _list.push(_formObj)
            actions.dict.updateState({formObject:_formObj,list:_list});   //更新选中表单数据
            this.switchEdit(); 
        }else{
            Object.assign(_formObj,obj);
            Object.assign(_formObj.dictitemlist,dictitemlist);
            actions.dict.updateRowData({'record':_formObj});   //更新列表行数据
            actions.dict.updateState({formObject:_formObj});         //更新选中表单数据
            this.switchEdit(); 
        }   
    };

    // 删除方法
    onDelete = () => {
        let _list = deepClone(this.props.list);
        let _selectedList = deepClone(this.props.selectedList);
        let _queryObj = deepClone(this.props.queryObj);
        _selectedList.map(item => {
            delete _list[item['_index']];
        });
        let newlist = [];
        _list.map(item => {
            if(item!=Empty){
                newlist.push(item);
            }
        });
        _queryObj.total = _queryObj.total-_selectedList.length;
        _queryObj.totalPages=Math.ceil(_queryObj.total/_queryObj.pageSize);
        actions.dict.updateState({ list : newlist,selectedList:[],dictitemlist:[],queryObj:_queryObj});  
        if(!this.props.isGrid){   //如是表单页删除后重回列表页
            this.switchToListView();
        }
    };

    // 修改
    onEdit = () => {
        singleRecordOper(this.props.selectedList,(param) => {
            this.formchild.alteroldvalue(this.props.formObject);
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
        });
    }

    /**
     * 返回按钮
     */
    onReturn = () =>{
        if(this.props.isEdit){
            this.switchEdit();
        }
        this.switchToListView();
    }

    /**
     * 切换为列表界面
     */
    switchToListView = () =>{
        this.setState({
            listView:'',
            formView:'none',
        })
        actions.dict.updateState({ formObject : {},isGrid : true,isEdit : false});
    }

    /**
     * 切换为卡片界面
     */
    switchToCardView = (obj) =>{
        let _formObj = deepClone(obj);  
        this.setState({
            listView:'none',
            formView:'',
        })        
        actions.dict.updateState({ formObject : _formObj,isGrid : false,isEdit : false});
    }

    /**
     * Form表单更改编辑状态
     */
    switchEdit = () =>{
        let _dictitemlist=deepClone(this.props.dictitemlist);
        this.props.formObject['_edit'] = this.props.formObject['_edit'] ? false : true;
        if(_dictitemlist && _dictitemlist.length > 0){
            _dictitemlist.map(item => {
                item['_edit']=item['_edit']?false:true;
            });
        }
        actions.dict.updateState({isEdit : !this.props.isEdit,dictitemlist:_dictitemlist});
    }


    render() {
        let ButtonPower = {
            PowerButton : this.props.powerButton,
            ifPowerBtn : this.props.ifPowerBtn,
            isEdit : this.props.isEdit,
        };
        return (

            <div>
                <Loading showBackDrop={true} show={this.props.showLoading} fullScreen={true}/>
                <div className="dict_btn">
                    <ButtonGroup
                        BtnPower={ButtonPower}
                        Edit={this.onEdit}
                        Add={this.onAdd}
                        Save={this.onSave}
                        Cancel={this.onCancel}
                        Delete={this.onDelete}
                        View={this.onView}
                        Return={this.onReturn}
                        {...this.props}   
                    />
                </div>

                <div style={{display:this.state.listView}}>
                    <ListView {...this.props} />                
                </div>

                <div className='dict_form' style={{display:this.state.formView}}>
                    <FormView {...this.props} ref="formView" onRef={this.onformRef}/>
                </div>
            </div>

        );
    }
}

export default Form.createForm()(IndexView);
