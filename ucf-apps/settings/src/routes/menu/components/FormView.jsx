import React, { Component } from 'react';
import {Form,Icon,Label, Radio, Col, Row, FormControl, Tree,Checkbox,Tabs,Table,Button,Message} from 'tinper-bee';
import {actions} from 'mirrorx';
import StringModel from 'components/GridCompnent/StringModel';
import './index.less';

const TreeNode = Tree.TreeNode;
const FormItem = Form.FormItem;
const {TabPane} = Tabs;

const transData = [                     //传递测试假数据    后台传递时菜单注册字段也要同时传递进来JSON解析
    {
      func_name: "参数管理",             //节点名称
      key: "parameter_management",  //目前相当于主键
      func_code:1,                       //节点编码
      if_power_menu:false,          //是否过滤数据权限
      menu_property:"first_menu",   //菜单性质: 一级菜单  二级菜单:菜单标题  三级菜单:可执行功能节点
      data_power_property:[],       //数据权限字段
      if_enabled:true,              //是否启用
      first_enable_menu:false,       //首次启用标志(若已首次启用则菜单不可删除))
      parent_key:null,              //父节点主键              
      path:null,                     //url路径
      children:[],
    },
    {
      func_name: "系统管理",
      key: "system_management",
      func_code:2,
      if_power_menu:false,
      menu_property:"first_menu",
      data_power_property:[],
      if_enabled:true,
      first_enable_menu:true,
      parent_key:null,
      path:null,
      children:[],
    },
    {
        func_name: "报价测算",
      key: "quote_calculate",
      func_code:3,
      if_power_menu:false,
      menu_property:"first_menu",
      data_power_property:[],
      if_enabled:false,
      first_enable_menu:false,
      parent_key:null,
      path:null,
      children:[],
    },
    {
        func_name: "资金管理",
      key: "fund_management",
      func_code:4,
      if_power_menu:false,
      menu_property:"first_menu",
      data_power_property:[],
      if_enabled:true,
      first_enable_menu:true,
      parent_key:null,
      path:null,
      children:[],
    },
    {
        func_name: "客户管理",
      key: "customer_management",
      func_code:5,
      if_power_menu:false,
      menu_property:"first_menu",
      data_power_property:[],
      if_enabled:true,
      first_enable_menu:true,
      parent_key:null,
      path:null,
      children:[],
    },
    {
        func_name: "项目管理",
      key: "project_management",
      func_code:6,
      if_power_menu:false,
      menu_property:"first_menu",
      data_power_property:[],
      if_enabled:true,
      first_enable_menu:true,
      parent_key:null,
      path:null,
      children:[],
    },
    {
        func_name: "合同管理",
      key: "cont_management",
      func_code:7,
      if_power_menu:false,
      menu_property:"first_menu",
      data_power_property:[],
      if_enabled:true,
      first_enable_menu:true,
      parent_key:null,
      path:null,
      children:[],
    },
    {
        func_name: "收付款管理",
      key: "payment_management",
      func_code:8,
      if_power_menu:false,
      menu_property:"first_menu",
      data_power_property:[],
      if_enabled:true,
      first_enable_menu:true,
      parent_key:null,
      path:null,
      children:[],
    },
    {
        func_name: "租后管理",
      key: "rent_management",
      func_code:9,
      if_power_menu:false,
      menu_property:"first_menu",
      data_power_property:[],
      if_enabled:true,
      first_enable_menu:true,
      parent_key:null,
      path:null,
      children:[],
    },
    {
        func_name: "票据管理",
      key: "ticket_management",
      func_code:10,
      if_power_menu:false,
      menu_property:"first_menu",
      data_power_property:[],
      if_enabled:true,
      first_enable_menu:true,
      parent_key:null,
      path:null,
      children:[],
    },
    {
        func_name: "规则报价",
      key: "regular_quote",
      func_code:301,
      if_power_menu:false,
      menu_property:"second_menu",
      data_power_property:[],
      if_enabled:true,
      first_enable_menu:false,
      parent_key:"quote_calculate",
      path:null,
      children:[],
    },
    {
        func_name: "不规则报价",
        key: "illregular_quote",
        func_code:302,
        if_power_menu:false,
        menu_property:"second_menu",
        data_power_property:[],
        if_enabled:true,
        first_enable_menu:false,
        parent_key:"quote_calculate",
        path:null,
        children:[],
      },
      {
        func_name: "精算报价",
        key: "calculate-zt",
        func_code:30101,
        if_power_menu:false,
        menu_property:"third_menu",
        data_power_property:[],
        if_enabled:true,
        first_enable_menu:false,
        parent_key:"regular_quote",
        path:null,
        children:[],
      },
      {
        func_name: "快速报价",
        key: "calculate-normalzt",
        func_code:30102,
        if_power_menu:false,
        menu_property:"third_menu",
        data_power_property:[],
        if_enabled:true,
        first_enable_menu:false,
        parent_key:"regular_quote",
        path:null,
        children:[],
      },
      {
        func_name: "不规则报价",
        key: "illregulator_calculate_zt",
        func_code:30201,
        if_power_menu:false,
        menu_property:"third_menu",
        data_power_property:[],
        if_enabled:true,
        first_enable_menu:false,
        parent_key:"illregular_quote",
        path:null,
        children:[],
      },
      {
        func_name: "费率测算",
        key: "rate_calculate",
        func_code:30104,
        if_power_menu:false,
        menu_property:"third_menu",
        data_power_property:[],
        if_enabled:true,
        first_enable_menu:false,
        parent_key:"illregular_quote",
        path:null,
        children:[],
      },
];                      
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
            transData:transData,
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
        // actions.menu.loadList();
        if(this.state.transData.length>0){
            this.state.transData.map((item)=>{
                if(item.menu_property=='first_menu'){
                    result_menu.push(item);
                }else if(item.menu_property=='second_menu'){
                    second_menu.push(item);
                }else if(item.menu_property=='third_menu'){
                    third_menu.push(item);
                }
            });
            //菜单级别过滤
            result_menu.map((item)=>{
                second_menu.map((value2)=>{
                    if(value2.parent_key==item.key){
                        item.children.push(value2);
                        third_menu.map((value3)=>{
                            if(value3.parent_key==value2.key){
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
            _formObj['func_name'] = node.node.props.title;
            _formObj['func_code'] = node.node.props.ext.func_code;
            _formObj['data_power_property'] = node.node.props.ext.data_power_property;
            _formObj['first_enable_menu'] = node.node.props.ext.first_enable_menu;
            _formObj['if_power_menu'] = node.node.props.ext.if_power_menu;
            _if_data_checked = _formObj['if_power_menu'];           //过滤数据权限
            _formObj['if_enabled'] = node.node.props.ext.if_enabled;
            if(_formObj['if_enabled']==false){
                _if_start_value = '0';                              //是否启用
            }else if(_formObj['if_enabled']==true){
                _if_start_value = '1';
            }
            _formObj['if_power_menu'] = node.node.props.ext.if_power_menu;
            _formObj['menu_property'] = node.node.props.ext.menu_property;
            if(_formObj['menu_property']=='first_menu'){             //级联菜单修改
                _MenuSelectedValue='0';
            }else if(_formObj['menu_property']=='second_menu'){
                _MenuSelectedValue='1';
            }else if(_formObj['menu_property']=='third_menu'){
                _MenuSelectedValue='2';
            }
            _formObj['key']=info[0];
            _formObj['parent_key'] = node.node.props.ext.parent_key;
            _formObj['path'] = node.node.props.ext.path;
            this.setState({MenuSelectedValue:_MenuSelectedValue,if_start_value:_if_start_value,if_data_checked:_if_data_checked});
            actions.menu.updateState({SelectformObj:_formObj});
            this.props.form.setFieldsValue({'func_name':_formObj['func_name'],'path':_formObj['path']==null ?'':_formObj['path']});
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

    changeCheckBox = ()=>{
        this.setState({if_data_checked:!this.state.if_data_checked});
    }

    //修改表单内部数据   只改变可修改的值   其他值不动
    alterformvalue = (node) =>{
        if(node.if_power_menu){
            this.setState({if_data_checked:true});
        }else{
            this.setState({if_data_checked:false});
        }
        this.props.form.setFieldsValue({'func_name':node.func_name,'path':node.path==null ?'':node.path});
        actions.menu.updateState({isEdit: false,treeDisabled: true});
    }


    render() {
        let _props=this.props;
        const {getFieldProps} = this.props.form;
        const loop = data => data.map((item)=>{
            if(item.children && item.children.length){
                return <TreeNode title={item.func_name} key={item.key} icon={<Icon type="uf-list-s-o" />} ext={{'func_code':item.func_code,'if_power_menu':item.if_power_menu,'menu_property':item.menu_property,'data_power_property':item.data_power_property,'if_enabled':item.if_enabled,'first_enable_menu':item.first_enable_menu,'parent_key':item.parent_key,'path':item.path}} >
                    {loop(item.children)}
                </TreeNode>
            }
            if(item.menu_property=="third_menu"){
                return <TreeNode title={item.func_name} key={item.key} icon={<Icon type="uf-book" />} ext={{'func_code':item.func_code,'if_power_menu':item.if_power_menu,'menu_property':item.menu_property,'data_power_property':item.data_power_property,'if_enabled':item.if_enabled,'first_enable_menu':item.first_enable_menu,'parent_key':item.parent_key,'path':item.path}} />
            }
            return <TreeNode title={item.func_name} key={item.key} icon={<Icon type="uf-list-s-o" />} ext={{'func_code':item.func_code,'if_power_menu':item.if_power_menu,'menu_property':item.menu_property,'data_power_property':item.data_power_property,'if_enabled':item.if_enabled,'first_enable_menu':item.first_enable_menu,'parent_key':item.parent_key,'path':item.path}} />
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
                        <TreeNode title="功能注册" key="function_register" icon={<Icon type="uf-treefolder"/>} ext={{'func_code':'0','if_power_menu':'','menu_property':'','data_power_property':[],'if_enabled':'0','first_enable_menu':true,'parent_key':null,'path':null}} >
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

                                                             ...getFieldProps('func_code', {
                                                                 initialValue: _props.SelectformObj.func_code,
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
                                                             ...getFieldProps('func_name', {
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
                                                    ...getFieldProps('menu_property', {
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
                                                             ...getFieldProps('path', {
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
                                                    ...getFieldProps('if_power_menu', {
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
                                            ...getFieldProps('if_enabled', {
                                                    initialValue: this.state.if_start_value,
                                                    onChange: this.onRadioMenuChange
                                                }
                                            )}
                                            >
                                                <Radio value="0" disabled>是</Radio>
                                                <Radio value="1" disabled>否</Radio>
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
