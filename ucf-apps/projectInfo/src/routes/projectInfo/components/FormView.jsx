import React, {Component} from 'react';
import {
    Form,
    Icon,
    Button,
    Label,
    Switch,
    Checkbox,
    DatePicker,
    Radio,
    Select,
    Col,
    Row,
    FormControl,
    Collapse,
    Tree
} from 'tinper-bee';
import {actions} from 'mirrorx';
import {deepClone, getHeight} from "utils";
import {SelectField} from 'components/RowField/SelectField'


import './index.less';
import BaseInfo from "./BaseInfo";
import {ContProvider} from "../../contProvider/container";
import ButtonGroup from "./ButtonGroup";

const TreeNode = Tree.TreeNode;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formHeight: 0,
            showSub: 'baseInfo',
        }
    }


    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        this.resetFormHeight(false);
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.onRef(this);
        actions.projectInfo.getTreeNode();
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    onSelect = (info, node) => {
        let selectedNode = node.node.props.ext;
        if (selectedNode) {
            actions.projectInfo.updateState({subForm:selectedNode.url});
        }

    };
    resetFormHeight = (isopen) => {
        let formHeight = getHeight()-10;
        this.setState({ formHeight });
    };
    /**
     * 返回按钮
     */
    onReturn = () =>{
        if(this.props.parent.state.isEdit){
            this.props.parent.switchEdit();
        }
        this.props.parent.switchToListView();
    };

    render() {

        let customer = {
            name: this.props.formObject.customer_name,
            customer_name: this.props.formObject.customer_name,
            customer_code: this.props.formObject.customer_code,
            code: this.props.formObject.customer_code
        };

        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.title} key={item.key} ext={item.ext}
                                 icon={<Icon type="uf-treefolder"/>}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.title} key={item.key} isLeaf={item.isLeaf} ext={item.ext}
                             icon={<Icon type="uf-list-s-o"/>}/>;
        });
        const treeNodes = loop(this.props.treeData);
        let { formHeight} = this.state;
        return (
            <div>
                <div>
                    <div style={{width: "13%", height: formHeight, float: "left", overflow: "auto"}}>
                        <Tree className="tree" showLine defaultSelectedKeys={"1"} defaultExpandedKeys={"1"}
                              disabled={true}
                              cancelUnSelect={true} onSelect={this.onSelect} showIcon>
                            {treeNodes}
                        </Tree>
                    </div>
                    <div style={{width: "87%", height: formHeight, float: "left", overflow: "auto"}}>
                        <div style={{display: (this.props.subForm === 'baseInfo' ? "" : 'none')}}>
                            <div style={{display:this.state.showListView}}>
                                <ButtonGroup
                                    BtnPower= {this.props.ButtonPower}
                                    Query= {this.onQuery}
                                    Save={this.onSave}
                                    Return={this.onReturn}
                                    {...this.props}
                                />
                            </div>
                            <BaseInfo {...this.props}/>
                        </div>
                        <div style={{display: (this.props.subForm === 'contInfo' ? "" : 'none')}}>
                            {/*<ContProvider  customer={customer} subForm={this.props.subForm}/>*/}
                            <ContProvider   subForm={this.props.subForm}/>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default Form.createForm()(FormView);
