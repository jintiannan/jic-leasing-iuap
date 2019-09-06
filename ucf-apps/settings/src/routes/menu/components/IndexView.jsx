/**
 * App模块
 */
import React, { Component } from 'react';
import {Menu, Loading, Form} from 'tinper-bee';
import {actions} from 'mirrorx';
import Message from 'bee-message';
import ButtonGroup from './ButtonGroup';
import FormView from './FormView';
import './index.less';

class IndexView extends Component {
    constructor(props) {
        super(props);
        //在路由时带出此节点权限按钮
        /**临时测试数据 */
        props.powerButton = ['Save', 'Edit', 'Add', 'Delete', 'Cancel'];
        props.ifPowerBtn = true;
        props.treeDisabled = false;
        /**临时测试数据 */
        this.state = {
            isEdit : false,//是否可编辑(卡片界面)
            formObject: {},//当前卡片界面对象
            treeData:[],
            ifPowerBtn:props.ifPowerBtn,//是否控制按钮权限
            powerButton: props.powerButton,//按钮权限列表
            lastSelectedNode: {},
            selectedValue: '0',
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

    /**
     * 点击button事件
     */
    onAdd = () => {
        if (this.props.lastSelectedNode.func_code === undefined) {
            Message.create({ content: "请选中父节点", color : 'danger'});
        } else {
            this.child.onRadioChange('0');
            actions.menu.updateState({isEdit: true, treeDisabled: true});
            this.props.form.setFieldsValue(this.initFormObj());
        }

    };
    // 取消功能
    onCancel = () => {
        let node = this.props.lastSelectedNode;
        this.child.onRadioChange(node.if_menu);
        actions.menu.updateState({isEdit: false,treeDisabled: false});
        this.props.form.setFieldsValue(node);
    };

    // 保存节点
    onSave = () => {
        let key = this.props.lastSelectedNode.func_code;
        let nodeItem = this.props.form.getFieldsValue();
        let node = {
            key: nodeItem.func_code,
            name: nodeItem.func_name,
            parent:key,
            ext: nodeItem
        };
        let oldNode = this.getNodeByKey(this.props.treeData, nodeItem.func_code);
        if (oldNode) {

            this.doUpdate(nodeItem);
        } else {
            this.addNode(key, node);
        }


        actions.menu.updateState({isEdit: false, treeDisabled: false});
    };

    // 删除方法
    onDelete = () => {

        this.doDelete(this.props.treeData);
        // 刷新树

    };

    // 修改
    onEdit = () => {
        if (this.props.lastSelectedNode.key !== '1') {
            actions.menu.updateState({isEdit: true});
        }

    };
    doDelete = (nodes) => {
        let key = this.props.lastSelectedNode.func_code;
        let data = nodes;
        for (let i = 0; i < data.length; i++) {
            if (data[i].key === key) {
                data.splice(i, 1);
                return (true);
            } else if (data[i].children && data[i].children.length > 0) {
                this.doDelete(data[i].children);
            }
        }
    };
    /**
     * 修改节点
     * @param node 更新节点
     * @param data 查找树节点集合
     */
    doUpdate = (node, data) => {
        for (let i = 0; i < data.length; i++) {
            if (data.key === node.func_code) {
                data[i] = node;
                return true;
            } else if (data[i].children && data[i].children.length > 0) {
                this.doUpdate(node, data[i].children)
            }
        }
    };

    initFormObj = () => {
        return {
            func_code: this.getFuncCode(),
            func_name: '',
            func_icon: '',
            if_menu: '0',
            func_url: '',
            btn_visible: '',
            btn_disabled: ''

        }
    };

    // 获取新增节点的功能编码
    getFuncCode = () => {
        let func_code = '';
        let data = this.props.treeData;
        let parentKey = this.props.lastSelectedNode.func_code;
        let parNode = this.getNodeByKey(data, parentKey);
        if (parNode.children) {
            let length = parNode.children.length;
            if (length < 9) {
                func_code = parentKey + "0" + (length + 1);
            } else {
                func_code = parentKey + (length + 1);
            }
        } else {
            func_code = parentKey + "01";
        }
        return func_code;
    };

    /**
     * 增加节点
     * @param prKey
     * @param nodeItem
     */
    addNode(prKey, nodeItem) {
        const data = this.props.treeData;
        let parNode;
        if (prKey) {
            // 如果prKey存在则搜索父节点进行添加
            parNode = this.getNodeByKey(data, prKey);
            //如果父节点存在的话，添加到父节点上
            if (parNode) {
                if (!parNode.children) {
                    parNode.children = [];
                }
                parNode.children.push(nodeItem);
                actions.menu.save(data);
            }
        }
    }

    getNodeByKey = (data, key) => {
        this.parentNode = undefined;
        for (let i = 0; i < data.length; i++) {
            if (data[i].key === key) {
                this.parentNode = data[i];
                break;
            } else if (data[i].children) {
                this.getNodeByKey(data[i].children, key);
            }
        }
        return this.parentNode;
    };

    render() {
        let ButtonPower = {
            PowerButton : this.state.powerButton,
            ifPowerBtn : this.state.ifPowerBtn,
            isEdit : this.state.isEdit,
        };
        return (

            <div>
                <Loading showBackDrop={true} show={this.props.showLoading} fullScreen={true}/>
                <div>
                    <ButtonGroup
                        BtnPower={ButtonPower}
                        Edit={this.onEdit}
                        Add={this.onAdd.bind(this)}
                        Save={this.onSave}
                        Cancel={this.onCancel.bind(this)}
                        Delete={this.onDelete}
                        {...this.props}
                    />
                </div>

                <div>
                    <FormView {...this.props} ref="formView" onRef={this.onRef}/>
                </div>
            </div>

        );
    }
}

export default Form.createForm()(IndexView);
