import React, { Component } from 'react';
import {Form,Icon,Label, Radio, Col, Row, FormControl, Tree,Checkbox,Tabs,Table,Button,Message} from 'tinper-bee';
import {actions} from 'mirrorx';
import StringModel from 'components/GridCompnent/StringModel';
import './index.less';

const TreeNode = Tree.TreeNode;
const FormItem = Form.FormItem;
const {TabPane} = Tabs;
                   
const result_menu = [];   //一级菜单  结果集菜单
const second_menu = [];   //二级菜单 过滤用
const third_menu = [];    //三级菜单  过滤用


//测试列表数据
const list_dataSource=[
    {
        column_name:'列表名称',
        column_type:'列表',
    },
    {
        column_name:'列表名称',
        column_type:'列表',
    },
    {
        column_name:'列表名称',
        column_type:'列表',
    },
    {
        column_name:'列表名称',
        column_type:'列表',
    },
    {
        column_name:'列表名称',
        column_type:'列表',
    },
    {
        column_name:'列表名称',
        column_type:'列表',
    },
    {
        column_name:'列表名称',
        column_type:'列表',
    },
    {
        column_name:'列表名称',
        column_type:'列表',
    },
    {
        column_name:'列表名称',
        column_type:'列表',
    },
    {
        column_name:'列表名称',
        column_type:'列表',
    },
    {
        column_name:'列表名称',
        column_type:'列表',
    },
    {
        column_name:'列表名称',
        column_type:'列表',
    },
    {
        column_name:'列表名称',
        column_type:'列表',
    },
];

const form_dataSource=[
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
    {
        column_name:'表单名称',
        column_type:'表单',
    },
];

const btn_dataSource=[
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },

    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },

    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
    {
        column_name:'按钮名称',
        column_type:'按钮',
    },
];

class FormView extends Component {
    constructor(props) {
        super(props);
        this.columns=[     //测试表头
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 80, 
                render(text, record, index) {
                    return index + 1;
                }
            },
            {
                title: "字段名称",dataIndex: "column_name",key: "column_name",width: 200,
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "字段类型",dataIndex: "column_type",key: "column_type",width: 200,
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
        ],
        this.state = {
            expandedKeys: ['function_register'],
            result_menu :[],
            tabKey:'table_list',
            columns:this.columns,
            list_dataSource:list_dataSource,
            form_dataSource:form_dataSource,
            btn_dataSource:btn_dataSource,
            //以下内容均为显示内容的值
            MenuSelectedValue:'',
            if_start_value:'',
            if_data_checked:false,
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        this.loadList();
        console.log(this.props.treeData);  
    }

    async loadList(){
        var menus = await actions.menu.loadList(this.props.queryParam);
        if(menus.length>0){
            menus.map((item)=>{
                if(item.menuProperty=='first_menu'){
                    item.children=[];
                    result_menu.push(item);
                }else if(item.menuProperty=='second_menu'){
                    item.children=[];
                    second_menu.push(item);
                }else if(item.menuProperty=='third_menu'){
                    item.children=[];
                    third_menu.push(item);
                }
            });
            //菜单级别过滤
            result_menu.map((item)=>{
                second_menu.map((value2)=>{
                    if(value2.pkParent.pkFuncmenu==item.pkFuncmenu){
                        item.children.push(value2);
                        third_menu.map((value3)=>{
                            if(value3.pkParent.pkFuncmenu==value2.pkFuncmenu){
                                value2.children.push(value3);
                            }
                        })
                    }
                })
            })
        }
        this.setState({result_menu:result_menu});
        actions.menu.updateState({treeData:result_menu});
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.onRef(this);
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {

    }
    onTreeRowSelect = (info, node) => {
        if(this.props.treeDisabled){
            let _formObj = {};
            let _MenuSelectedValue = 1;
            let _if_start_value = 1;
            let _if_data_checked = false;
            _formObj['funcName'] = node.node.props.title;
            _formObj['funcCode'] = node.node.props.ext.funcCode;
            _formObj['ifFirstEnabled'] = node.node.props.ext.ifFirstEnabled;
            _formObj['ifPower'] = node.node.props.ext.ifPower;
            if(_formObj['ifPower']=='0'){
                _if_data_checked = true;
            }else{
                _if_data_checked = false;
            }
            //_if_data_checked = _formObj['ifPower'];           //过滤数据权限
            _formObj['ifEnabled'] = node.node.props.ext.ifEnabled;
            if(_formObj['ifEnabled']==0){
                _if_start_value='0';
            }else{
                _if_start_value='1';
            }
            // _if_start_value = _formObj['ifEnabled'];
            // if(_formObj['ifEnabled']==false){
            //     _if_start_value = '0';                              //是否启用
            // }else if(_formObj['ifEnabled']==true){
            //     _if_start_value = '1';
            // }
            _formObj['menuProperty'] = node.node.props.ext.menuProperty;
            if(_formObj['menuProperty']=='first_menu'){             //级联菜单修改
                _MenuSelectedValue='0';
            }else if(_formObj['menuProperty']=='second_menu'){
                _MenuSelectedValue='1';
            }else if(_formObj['menuProperty']=='third_menu'){
                _MenuSelectedValue='2';
            }
            _formObj['pk']=info[0];
            _formObj['ts']=node.node.props.ext.ts;
            _formObj['key']=info[0];
            _formObj['pkFuncmenu']=info[0];
            _formObj['pkParent'] = node.node.props.ext.pkParent;
            _formObj['menuPath'] = node.node.props.ext.menuPath;
            _formObj['pkSystem'] = node.node.props.ext.pkSystem;
            this.setState({MenuSelectedValue:_MenuSelectedValue,if_start_value:_if_start_value,if_data_checked:_if_data_checked});
            actions.menu.updateState({SelectformObj:_formObj});
            this.props.form.setFieldsValue({'funcName':_formObj['funcName'],'menuPath':_formObj['menuPath']==null ?'':_formObj['menuPath']});
        }else{
            Message.create({ content: "请退出编辑态再次更换选中节点", color : 'danger'});
        }
    };

    /**
     *tab 切换
     * @param {string}
     */
    onChangeTab = (tabKey) => {
        this.setState({
            tabKey
        })
      }

    onRadioMenuChange = (value) =>{
        this.setState({if_start_value:value})
    }

    changeCheckBox = (value)=>{
        this.setState({if_data_checked:!this.state.if_data_checked});
    }

    //修改表单内部数据   只改变可修改的值   其他值不动
    alterformvalue = (node) =>{
        if(node.ifPower){
            this.setState({if_data_checked:true});
        }else{
            this.setState({if_data_checked:false});
        }
        this.props.form.setFieldsValue({'funcCode':node.funcCode,'menuPath':node.menuPath==null ?'':node.menuPath});
        actions.menu.updateState({isEdit: false,treeDisabled: true});
    }


    render() {
        let _props=this.props;
        const {getFieldProps} = this.props.form;
        const loop = data => data.map((item)=>{
            if(item.children && item.children.length){
                return <TreeNode title={item.funcName} key={item.pkFuncmenu} icon={<Icon type="uf-list-s-o" />} ext={{'funcCode':item.funcCode,'ifPower':item.ifPower,'menuProperty':item.menuProperty,'ifEnabled':item.ifEnabled,'ifFirstEnabled':item.ifFirstEnabled,'pkParent':item.pkParent,'menuPath':item.menuPath,'pkSystem':item.pkSystem,'pk':item.pkFuncmenu,'ts':item.ts}} >
                    {loop(item.children)}
                </TreeNode>
            }
            if(item.menuProperty=="third_menu"){
                return <TreeNode title={item.funcName} key={item.pkFuncmenu} icon={<Icon type="uf-book" />} ext={{'funcCode':item.funcCode,'ifPower':item.ifPower,'menuProperty':item.menuProperty,'ifEnabled':item.ifEnabled,'ifFirstEnabled':item.ifFirstEnabled,'pkParent':item.pkParent,'menuPath':item.menuPath,'pkSystem':item.pkSystem,'pk':item.pkFuncmenu,'ts':item.ts}}  />
            }
            return <TreeNode title={item.funcName} key={item.pkFuncmenu} icon={<Icon type="uf-list-s-o" />} ext={{'funcCode':item.funcCode,'ifPower':item.ifPower,'menuProperty':item.menuProperty,'ifEnabled':item.ifEnabled,'ifFirstEnabled':item.ifFirstEnabled,'pkParent':item.pkParent,'menuPath':item.menuPath,'pkSystem':item.pkSystem,'pk':item.pkFuncmenu,'ts':item.ts}}  />
        })
        const treeNodes = loop(this.props.treeData);

        return (
            <div className="register_form_body">
                <div className="register_form_body_left">
                        <Tree
                        defaultExpandedKeys={this.state.expandedKeys}
                        showIcon 
                        showLine
                        openIcon={<Icon type="uf-minus" />}
                        closeIcon={<Icon type="uf-plus" />}  
                        getScrollContainer={() => {
                            return document.querySelector('.register_form_body_left')
                        }}
                        onSelect = {this.onTreeRowSelect}
                    >
                        <TreeNode title="功能注册" key="function_register" icon={<Icon type="uf-treefolder"/>} ext={{'funcCode':'80L','ifPower':'','menuProperty':'','ifEnabled':0,'ifFirstEnabled':0,'pkParent':null,'menuPath':null}} >
                            {treeNodes}
                        </TreeNode>
                    </Tree>
                </div>
                <div className="register_form_body_right">
                    <div className = "register_form_body_right_top">
                        <div className="form">
                        <Form>
                            <div>
                                <Row>
                                    <FormItem>
                                        <Col md={2} xs={2}>
                                            <Label><Icon type="uf-mi" className='mast'></Icon>节点编码:</Label>
                                        </Col>
                                        <Col md={9} xs={9}>
                                            <FormControl disabled={true}
                                                         {

                                                             ...getFieldProps('funcCode', {
                                                                 initialValue: _props.SelectformObj.funcCode,
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
                                                节点名称:
                                            </Label>
                                        </Col>
                                        <Col md={9} xs={9}>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('funcName', {
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
                                                菜单性质:
                                            </Label>
                                        </Col>
                                        <Col md={9} xs={9}>
                                                <Radio.RadioGroup
                                                    selectedValue={this.state.MenuSelectedValue}
                                                    {
                                                    ...getFieldProps('menuProperty', {
                                                            initialValue: this.state.MenuSelectedValue,
                                                        }
                                                    )}
                                                >
                                                    <Radio value="0" disabled>一级菜单</Radio>
                                                    <Radio value="1" disabled>菜单标题</Radio>
                                                    <Radio value="2" disabled>可执行功能节点</Radio>
                                                </Radio.RadioGroup>
                                        </Col>
                                    </FormItem>
                                    <FormItem>
                                        <Col md={2} xs={2}>
                                            <Label><Icon type="uf-mi" className='mast'></Icon>节点路径:</Label>
                                        </Col>
                                        <Col md={9} xs={9}>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('menuPath', {
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
                                            <Label><Icon type="uf-mi" className='mast'></Icon>是否过滤数据权限:
                                            </Label>
                                        </Col>
                                        <Col md={9} xs={9}>
                                                <Checkbox 
                                                disabled={!_props.isEdit}
                                                checked={this.state.if_data_checked} 
                                                {
                                                    ...getFieldProps('ifPower', {
                                                            onChange: this.changeCheckBox
                                                        }
                                                    )}
                                                >
                                                </Checkbox>
                                        </Col>
                                    </FormItem>
                                    <FormItem>
                                        <Col md={2} xs={2}>
                                            <Label><Icon type="uf-mi" className='mast'></Icon>是否启用:
                                            </Label>
                                        </Col>
                                        <Col md={9} xs={9}>
                                            <Radio.RadioGroup
                                            selectedValue={this.state.if_start_value}
                                            {
                                            ...getFieldProps('ifEnabled', {
                                                    onChange:this.onRadioMenuChange
                                                }
                                            )}
                                            >
                                                <Radio value='0' disabled={!_props.isEdit}>是</Radio>
                                                <Radio value='1' disabled={!_props.isEdit}>否</Radio>
                                    </Radio.RadioGroup>
                                        </Col>
                                    </FormItem>
                                </Row>
                            </div>
                    </Form>
                        </div>
                    </div>
                    <div className = "register_form_body_right_bottom">
                        <div className="form">
                            <Tabs
                            defaultActiveKey={this.state.tabKey}
                            onChange={this.onChangeTab}
                            extraContent={
                            <div className="initbtn" >
                                <Button shape="icon" size="sm" disabled={!_props.isEdit}  colors="secondary" onClick={this.onAdd}><Icon type='uf-add-c-o'/></Button>
                                <Button shape="icon" size="sm" disabled={!_props.isEdit}  colors="secondary" onClick={this.onDelete}><Icon type='uf-reduce-c-o'/></Button>
                            </div>
                            }
                            >
                                <TabPane tab="列表字段" key="table_list">
                                    <Table
                                    data={this.state.list_dataSource}  //传递数据
                                    columns={this.state.columns}  //表格表头
                                    showRowNum={true}       //显示行序号
                                    height={40}       //行定高
                                    headerHeight={30}  //表头定高
                                    scroll={{ y:"calc(100vh*0.36)" }}
                                    />                                     
                                </TabPane>
                                <TabPane tab="表单字段" key="table_form">
                                    <Table
                                    data={this.state.form_dataSource}  //传递数据
                                    columns={this.state.columns}  //表格表头
                                    showRowNum={true}       //显示行序号
                                    height={40}       //行定高
                                    headerHeight={30}  //表头定高
                                    scroll={{ y:"calc(100vh*0.36)" }}
                                    />                                     
                                </TabPane>
                                <TabPane tab="按钮" key="table_btn">
                                    <Table
                                    data={this.state.btn_dataSource}  //传递数据
                                    columns={this.state.columns}  //表格表头
                                    showRowNum={true}       //显示行序号
                                    height={40}       //行定高
                                    headerHeight={30}  //表头定高
                                    scroll={{ y:"calc(100vh*0.36)" }}
                                    />                                     
                                </TabPane>
                            </Tabs> 
                        </div>
                    </div>
                </div>           
            </div>

        );
    }
}

export default Form.createForm()(FormView);
