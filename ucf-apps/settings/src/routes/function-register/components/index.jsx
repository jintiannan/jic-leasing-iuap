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
    Tree,
    PageLayout
} from 'tinper-bee';
import FormSplitHeader from 'components/FormSplitHeader'
import {actions} from 'mirrorx';
import './index.less';
import ButtonGroup from "./ButtonGroup";

const FormItem = Form.FormItem;
const Header = PageLayout.Header;
const Content = PageLayout.Content;
const TableContent = PageLayout.TableContent;
const LeftContent = PageLayout.LeftContent;
const RightContent = PageLayout.RightContent;

const TreeNode = Tree.TreeNode;

class FormView extends Component {
    constructor(props) {
        super(props);
        /**临时测试数据 */
        props.treeData = [
            {
                key: '1',
                name: '功能注册',
                ext: {
                    func_code: '1',
                    func_name: '功能注册',
                    if_menu: '2',
                    func_icon: '无',
                    func_url: '/'
                }
            }
        ];
        props.formObject = props.lastSelectedNode = props.treeData[0].ext;

        props.selectedValue = '2';
        props.powerButton = ['Save', 'Edit', 'Add', 'Delete', 'Cancel'];
        props.ifPowerBtn = false;
        /**临时测试数据 */

        this.state = {
            open: true,
            fieldName: "节点路径",
            parentNode: {},

            tempTreeData : []

        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        actions.func_register.updateState({
            treeData: this.props.treeData,
            lastSelectedNode: this.props.lastSelectedNode,
            selectedValue: this.props.selectedValue
        });

    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.form.setFieldsValue(this.props.formObject)
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    onSelect = (info, node) => {
        actions.func_register.updateState({lastSelectedNode: node.node.props.ext});
        // actions.func_register.updateState({formObject: node.node.props.ext});
        this.props.form.setFieldsValue(node.node.props.ext)
    };

    onRadioChange = (value) => {
        alert(value);
        actions.func_register.updateState({selectedValue: value});
        // this.setState({selected : value});
        if ("0" === value) {
            this.setState({selectedValue: value});
            this.setState({
                fieldName: '节点路径'
            });
        } else if ("1" === value) {
            this.setState({
                fieldName: '触发事件'
            })
        } else if ("2" === value) {
            this.setState({
                fieldName: '节点路径'
            })
        }
    };

    /**
     * 点击button事件
     */
    onAdd = () => {
        actions.func_register.updateState({selectedValue: '0'});
        // this.setState({selected : '0'});
        actions.func_register.updateState({isEdit: true});
        this.props.form.setFieldsValue(this.initFormObj());
    };
    // 取消功能
    onCancel = () => {
        actions.func_register.updateState({isEdit: false});
        this.props.form.setFieldsValue(this.props.lastSelectedNode);
    };

    // 保存节点
    onSave = () => {
        let data = this.props.treeData;
        let key = this.props.lastSelectedNode.func_code;
        let nodeItem = this.props.form.getFieldsValue();
        let node = {
            key: nodeItem.func_code,
            name: nodeItem.func_name,
            ext: nodeItem
        };
        let oldNode = this.getNodeByKey(this.props.treeData, nodeItem.func_code);
        if (oldNode) {

            this.doUpdate(nodeItem);
        } else {
            this.addNode(key, node);
        }


        actions.func_register.updateState({isEdit: false});
    };

    // 删除方法
    onDelete = () => {

        this.doDelete(this.props.treeData);
        // 刷新树

    };

    // 修改
    onEdit = () => {
        if (this.props.lastSelectedNode.key !== '1') {
            actions.func_register.updateState({isEdit: true});
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
            func_url: ''
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
                // 如果key不存在就动态生成一个
                if (!nodeItem.key) {
                    nodeItem.key = this.getFuncCode()
                }
                parNode.children.push(nodeItem);
            }
        }

        this.setState({
            data
        });
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
        const {getFieldProps, getFieldError} = this.props.form;
        let ButtonPower = {
            PowerButton: this.state.powerButton,
            ifPowerBtn: this.state.ifPowerBtn,
            isGrid: this.props.isGrid,
            isEdit: this.props.isEdit,
        };
        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.key} ext={item.ext}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} ext={item.ext}/>;
        });
        const treeNodes = loop(this.props.treeData);
        let _props = this.props;
        return (
            <div className="treeFrom">
                <PageLayout>
                    <Header>
                        <div>
                            <ButtonGroup
                                BtnPower={ButtonPower}
                                Edit={this.onEdit}
                                Add={this.onAdd.bind(this)}
                                Save={this.onSave.bind(this)}
                                Cancel={this.onCancel.bind(this)}
                                Delete={this.onDelete.bind(this)}
                                {...this.props}
                            />
                        </div>
                    </Header>
                    <Content>
                        <LeftContent>
                            {/*
                            showLine  显示连接线
                            defaultSelectedKeys  默认被选中的节点列表
                            defaultExpandedKeys 默认展开的节点列表
                            cancelUnSelect  选中的节点第二次点击时还是选中，不自动取消选中
                            onSelect  选中节点出触发行为
                            */}
                            <Tree className="tree" showLine defaultSelectedKeys={"1"} defaultExpandedKeys={"1"} disabled={true}
                                  cancelUnSelect={true} onSelect={this.onSelect.bind(this)}>
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
                                                            <Label><Icon type="uf-mi"
                                                                         className='mast'></Icon>节点编码</Label>
                                                        </Col>
                                                        <Col md={9} xs={9}>
                                                            <FormControl disabled={!_props.isEdit}
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
                                                            <Label><Icon type="uf-mi"
                                                                         className='mast'></Icon>节点类型</Label>
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
                                                            <Label><Icon type="uf-mi"
                                                                         className='mast'></Icon>{this.state.fieldName}
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
