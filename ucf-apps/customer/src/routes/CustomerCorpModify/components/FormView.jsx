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
import PageLayout from 'bee-page-layout';
import {actions} from 'mirrorx';
import {SelectField} from 'components/RowField/SelectField'


import './index.less';
import BaseInfo from "./BaseInfo";
import {CustomerSource} from "../../CustomerSource/container";

const Header = PageLayout.Header;
const Content = PageLayout.Content;
const LeftContent = PageLayout.LeftContent;
const RightContent = PageLayout.RightContent;
const TreeNode = Tree.TreeNode;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSub: 'baseInfo',
        }
    }


    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {

    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.onRef(this);
        actions.customerCorpModify.getTreeNode();
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    //绑定子组件
    onFromRef = (ref) => {
        this.child = ref;
    };

    onSelect = (info, node) => {
        let selectedNode = node.node.props.ext;
        if (selectedNode) {
            actions.customerCorpModify.updateState({subForm:selectedNode.url});
            // this.setState({
            //     subForm: selectedNode.url
            // })
        }

    };

    render() {

        let _props = this.props;

        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.title} key={item.key} ext={item.ext}
                                 icon={<Icon type="uf-treefolder"/>}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.title} key={item.key} isLeaf={item.isLeaf} ext={item.ext}
                             icon={<Icon type="uf-list-s-o"/>}/>;
        });
        const treeNodes = loop(this.props.treeData);
        return (
            <div>
                <PageLayout>
                    <Content>
                        <LeftContent md={2} xs={2} sm={2}>
                            <Tree className="tree" showLine defaultSelectedKeys={"1"} defaultExpandedKeys={"1"}
                                  disabled={true}
                                  cancelUnSelect={true} onSelect={this.onSelect} showIcon>
                                {treeNodes}
                            </Tree>
                        </LeftContent>
                        <RightContent md={10} xs={10} sm={10}>
                            {/*<Row style={{display: (this.props.subForm === 'baseInfo' ? "none" : '')}}>*/}
                                {/*<div className='cust-name'>客户名称： {this.props.formObject. role_name}</div>*/}
                            {/*</Row>*/}
                            {/*<div className="cust-name" style={{display: (this.props.subForm === 'baseInfo' ? "none" : '')}}>*/}
                                {/*客户名称： {this.props.formObject. role_name}*/}
                            {/*</div>*/}


                            <div style={{display: (this.props.subForm === 'baseInfo' ? "" : 'none')}}>
                                <BaseInfo {...this.props} onRef={this.onFromRef}/>
                            </div>
                            <div style={{display: (this.props.subForm === 'source' ? "" : 'none')}}>
                                <CustomerSource onRef={this.onFromRef}/>
                            </div>

                        </RightContent>
                    </Content>
                </PageLayout>
            </div>


        );
    }
}

export default Form.createForm()(FormView);
