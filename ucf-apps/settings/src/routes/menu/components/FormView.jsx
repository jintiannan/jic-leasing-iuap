import React, { Component } from 'react';
import {Form,Icon,Label, Radio, Col, Row, FormControl, Collapse, Tree,PageLayout} from 'tinper-bee';
import { deepClone } from "utils";
import { SelectField } from 'components/RowField/SelectField'
import FormSplitHeader from 'components/FormSplitHeader'
import {actions} from 'mirrorx';
import './index.less';


const Content = PageLayout.Content;
const TableContent = PageLayout.TableContent;
const LeftContent = PageLayout.LeftContent;
const RightContent = PageLayout.RightContent;
const TreeNode = Tree.TreeNode;
const FormItem = Form.FormItem;

class FormView extends Component {
    constructor(props) {
        super(props);
        props.selectedValue = "0";
        this.state = {
            open: true,
            fieldName: '节点路径',
            btn_display: 'none'
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        actions.menu.loadList();

    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.onRef(this);
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {

    }
    onSelect = (info, node) => {
        actions.menu.updateState({lastSelectedNode: node.node.props.ext});
        this.onRadioChange(node.node.props.ext.if_menu);
        this.props.form.setFieldsValue(node.node.props.ext)
    };

    onRadioChange = (value) => {
        actions.menu.updateState({selectedValue: value});
        if ("1" === value) {
            this.setState({
                fieldName: '触发事件',
                btn_display: 'block'
            })
        } else {
            this.setState({
                fieldName: '节点路径',
                btn_display: 'none'
            })
        }
    };
    render() {
        let _props = this.props;
        const {getFieldProps} = this.props.form;
        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.key} ext={item.ext} disabled={this.props.treeDisabled}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} ext={item.ext} disabled={this.props.treeDisabled}/>;
        });
        const treeNodes = loop(this.props.treeData);

        return (
            <div className="treeFrom">
                <PageLayout>

                    <Content>
                        <LeftContent>
                            {/*
                            showLine  显示连接线
                            defaultSelectedKeys  默认被选中的节点列表
                            defaultExpandedKeys 默认展开的节点列表
                            cancelUnSelect  选中的节点第二次点击时还是选中，不自动取消选中
                            onSelect  选中节点出触发行为
                            */}
                            <Tree className="tree" showLine defaultExpandedKeys={"1"}
                                  cancelUnSelect={true} onSelect={this.onSelect}>
                                {treeNodes}
                            </Tree>
                        </LeftContent>
                        <RightContent>
                            <TableContent>
                                <div className='form'>
                                    <FormSplitHeader title={'表单信息'}/>
                                    <Form>
                                        <Collapse in={this.state.open}>
                                            <div>
                                                <Row>
                                                    <FormItem>
                                                        <Col md={2} xs={2}>
                                                            <Label><Icon type="uf-mi" className='mast'></Icon>节点编码</Label>
                                                        </Col>
                                                        <Col md={9} xs={9}>
                                                            <FormControl disabled={true}
                                                                         {

                                                                             ...getFieldProps('func_code', {
                                                                                 initialValue: this.props.formObject.func_code,
                                                                                 rules: [{
                                                                                     required: true
                                                                                 }],
                                                                             })
                                                                         }

                                                            />
                                                        </Col>
                                                    </FormItem>
                                                    <FormItem>
                                                        <Col md={2} xs={2}>
                                                            <Label>
                                                                <Icon type="uf-mi" className='mast'></Icon>
                                                                节点名称
                                                            </Label>
                                                        </Col>
                                                        <Col md={9} xs={9}>
                                                            <FormControl disabled={!_props.isEdit}
                                                                         {
                                                                             ...getFieldProps('func_name', {
                                                                                 initialValue: this.props.formObject.func_name,
                                                                                 rules: [{
                                                                                     required: true,
                                                                                 }],
                                                                             })
                                                                         }
                                                            />
                                                        </Col>
                                                    </FormItem>
                                                    <FormItem>
                                                        <Col md={2} xs={2}>
                                                            <Label>
                                                                <Icon type="uf-mi" className='mast'></Icon>
                                                                图标
                                                            </Label>
                                                        </Col>
                                                        <Col md={9} xs={9}>
                                                            <FormControl disabled={!_props.isEdit}
                                                                         {
                                                                             ...getFieldProps('func_icon', {
                                                                                 initialValue: '',
                                                                                 rules: [{
                                                                                     required: true,
                                                                                 }],
                                                                             })
                                                                         }
                                                            />
                                                        </Col>
                                                    </FormItem>
                                                    <FormItem>
                                                        <Col md={2} xs={2}>
                                                            <Label><Icon type="uf-mi" className='mast'></Icon>节点类型</Label>
                                                        </Col>
                                                        <Col md={3} xs={3}>
                                                            <Radio.RadioGroup
                                                                selectedValue={this.props.selectedValue}
                                                                {
                                                                    ...getFieldProps('if_menu', {
                                                                            initialValue: '',
                                                                            onChange: this.onRadioChange
                                                                        }
                                                                    )}


                                                            >
                                                                <Radio value="0" disabled={!_props.isEdit}>功能节点</Radio>
                                                                <Radio value="1" disabled={!_props.isEdit}>按钮</Radio>
                                                                <Radio value="2" disabled={!_props.isEdit}>虚拟节点</Radio>
                                                            </Radio.RadioGroup>
                                                        </Col>
                                                    </FormItem>

                                                    <FormItem>
                                                        <Col md={2} xs={2}>
                                                            <Label><Icon type="uf-mi" className='mast'></Icon>{this.state.fieldName}
                                                            </Label>
                                                        </Col>
                                                        <Col md={9} xs={9}>
                                                            <FormControl disabled={!_props.isEdit}
                                                                         {
                                                                             ...getFieldProps('func_url', {
                                                                                 initialValue: '',
                                                                                 rules: [{
                                                                                     required: true,
                                                                                 }],
                                                                             })
                                                                         }
                                                            />
                                                        </Col>
                                                    </FormItem>
                                                    <FormItem style={{display: this.state.btn_display}}>
                                                        <Col md={2} xs={2}>
                                                            <Label><Icon type="uf-mi" className='mast'></Icon>visible
                                                            </Label>
                                                        </Col>
                                                        <Col md={9} xs={9}>
                                                            <FormControl disabled={!_props.isEdit}
                                                                         {
                                                                             ...getFieldProps('btn_visible', {
                                                                                 initialValue: '',
                                                                                 rules: [{
                                                                                     required: true,
                                                                                 }],
                                                                             })
                                                                         }
                                                            />
                                                        </Col>
                                                    </FormItem>
                                                    <FormItem style={{display: this.state.btn_display}}>
                                                        <Col md={2} xs={2}>
                                                            <Label><Icon type="uf-mi" className='mast'></Icon>disabled
                                                            </Label>
                                                        </Col>
                                                        <Col md={9} xs={9}>
                                                            <FormControl disabled={!_props.isEdit}
                                                                         {
                                                                             ...getFieldProps('btn_disabled', {
                                                                                 initialValue: '',
                                                                                 rules: [{
                                                                                     required: true,
                                                                                 }],
                                                                             })
                                                                         }
                                                            />
                                                        </Col>
                                                    </FormItem>
                                                </Row>
                                            </div>
                                        </Collapse>

                                    </Form>

                                </div>
                            </TableContent>
                        </RightContent>
                    </Content>
                </PageLayout>
            </div>

        );
    }
}

export default Form.createForm()(FormView);
