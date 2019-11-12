/**
 * App模块
 */
import React, { Component } from 'react';
import {Loading, Form} from 'tinper-bee';
import {actions} from 'mirrorx';
import Message from 'bee-message';
import ButtonGroup from './ButtonGroup';
import FormView from './FormView';
import {deepClone} from "utils";
import AddModalView from './AddModalView';
import './index.less';

class IndexView extends Component {
    constructor(props) {
        super(props);
        /**临时测试数据 */
        props.powerButton = ['Save', 'Edit', 'Add', 'Delete', 'Cancel'];
        props.ifPowerBtn = true;
        /**临时测试数据 */
        this.state = {
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        actions.menu.updateState({powerButton:this.props.powerButton});
        actions.menu.updateState({ifPowerBtn:this.props.ifPowerBtn});
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

    //绑定新增模态框子组件
    onaddmodalRef =(ref) =>{
        this.addmoalRef = ref;
    }

    /**
     * 点击button事件
     */
    onAdd = () => {
        if (this.props.SelectformObj.funcCode === undefined) {
            Message.create({ content: "请选中父节点", color : 'danger'});
        }else if(this.props.SelectformObj.menuProperty=='third_menu'){
            Message.create({ content: "可执行功能节点无法继续新增子节点", color : 'danger'});
        }
         else {
            actions.menu.updateState({showaddModal: true});
            if(this.props.SelectformObj.pkFuncmenu == 'function_register'){    //选中主菜单  默认添加一级菜单
                this.props.form.setFieldsValue({funcCode1:this.getFuncCode(),funcName1:'',menuPath1:'',menuProperty1:'first_menu',ifPower:false});
            }else if(this.props.SelectformObj.menuProperty=='first_menu'){   //选中一级菜单 默认生成二级菜单
                this.props.form.setFieldsValue({funcCode1:this.getFuncCode(),funcName1:'',menuPath1:'',menuProperty1:'second_menu',ifPower:false});
            }else if(this.props.SelectformObj.menuProperty=='second_menu'){  //选中二级菜单 默认生成三级菜单
                this.props.form.setFieldsValue({funcCode1:this.getFuncCode(),funcName1:'',menuPath1:'',menuProperty1:'third_menu',ifPower:false});
            }
        }
    };
    // 取消功能
    onCancel = () => {
        let node = this.props.SelectformObj;
        node.funcName=node.funcName ==null ? '':node.funcName;
        node.menuPath=node.menuPath ==null ? '':node.menuPath;
        this.child.alterformvalue(node);
    };

    // 保存节点
    onSave = () => {
        let nodeItem = this.props.form.getFieldsValue();
        //先更新表单数据  
        const formObj = deepClone(this.props.SelectformObj);
        formObj.funcName= nodeItem.funcName;
        formObj.menuPath=nodeItem.menuPath;
        if(nodeItem.ifPower){
            formObj.ifPower='0';
        }else{
            formObj.ifPower='1';
        }
        formObj.ifEnabled = nodeItem.ifEnabled;
        //后更新树节点数据
        this.doUpdate(this.props.treeData,nodeItem);
        //调用后台接口更新数据库中的数据
        actions.menu.updateData({vo:formObj})
        actions.menu.updateState({SelectformObj:formObj,isEdit: false,treeDisabled: true});
    };

    // 删除方法
    onDelete = () => {
        //调用后台接口删除数据库中的vo
        actions.menu.deleteData({vo:this.props.SelectformObj});
        //更新树节点数据
        this.doDelete(this.props.treeData);
    };

    // 修改
    onEdit = () => {
        actions.menu.updateState({isEdit: true,treeDisabled: false});
    };
    doDelete = (nodes) => {
        let pkFuncmenu = this.props.SelectformObj.pkFuncmenu;
        let data = nodes;
        for (let i = 0; i < data.length; i++) {
            if (data[i].pkFuncmenu == pkFuncmenu) {
                data.splice(i, 1);
            } else if (data[i].children && data[i].children.length > 0) {
                this.doDelete(data[i].children);
            }
        }
        actions.menu.updateState({SelectformObj:{},treeData:data});
    };
    /**
     * 修改节点
     * @param key 节点主键
     * @param nodeItem 数据集合
     */
    doUpdate = (data,nodeItem) => {
        let pkFuncmenu = this.props.SelectformObj.pkFuncmenu;
        data.map((item)=>{
            if(item.pkFuncmenu == pkFuncmenu){
                item.funcName=nodeItem.funcName;
                item.menuPath=nodeItem.menuPath;
                item.ifPower=nodeItem.ifPower;
            }else if(item.children && item.children.length > 0){
                this.doUpdate(item.children,nodeItem);
            }
        })
        actions.menu.updateState({treeData:data});
    };

    // 获取新增节点的功能编码
    getFuncCode = () => {
        let funcCode = '';
        let data = this.props.treeData;
        let parentKey = this.props.SelectformObj.pkFuncmenu;
        let parNode = this.getNodeByKey(data, parentKey);
        let _func_code = this.props.SelectformObj.funcCode;
        if (parNode.children) {
            let length = parNode.children.length;
            if (length < 9) {
                funcCode = _func_code + "0" + (length + 1);
            } else {
                funcCode = _func_code + (length + 1);
            }
        } else {
            funcCode = _func_code + "01";
        }
        return funcCode;
    };

    getNodeByKey = (data, key) => {
        this.parentNode = undefined;
        for (let i = 0; i < data.length; i++) {
            if(key == 'function_register'){   //新建一级菜单 key为功能注册主键
                this.parentNode = key;
                return this.parentNode;
            }else if (data[i].pkFuncmenu === key) {
                this.parentNode = data[i];
                // break;
                return this.parentNode;
            } else if (data[i].children&&data[i].children.length>0) {
                this.getNodeByKey(data[i].children, key);
            }
        }
        return this.parentNode;
    };

    render() {
        let ButtonPower = {
            PowerButton : this.props.powerButton,
            ifPowerBtn : this.props.ifPowerBtn,
            isEdit : this.props.isEdit,
        };
        return (

            <div>
                <Loading showBackDrop={true} show={this.props.showLoading} fullScreen={true}/>
                <div className="register_btn">
                    <ButtonGroup
                        BtnPower={ButtonPower}
                        Edit={this.onEdit}
                        Add={this.onAdd}
                        Save={this.onSave}
                        Cancel={this.onCancel}
                        Delete={this.onDelete}
                        {...this.props}   
                    />
                </div>

                <div className="register_form">
                    <FormView {...this.props} ref="formView" onRef={this.onRef}/>
                </div>

                <div>
                    <AddModalView {...this.props} onaddmodalRef={this.onaddmodalRef} />
                </div>
            </div>

        );
    }
}

export default Form.createForm()(IndexView);
