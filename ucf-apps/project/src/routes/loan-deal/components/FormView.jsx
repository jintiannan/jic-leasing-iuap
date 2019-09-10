import React, { Component } from 'react';
import {Panel, PanelGroup ,Form, Icon,Tabs, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl, Collapse } from 'tinper-bee';
import { deepClone } from "utils";
import {actions} from 'mirrorx';
import FormSplitHeader from 'components/FormSplitHeader'
import {genGridColumn,checkListSelect} from "utils/service";
import Grid from 'components/Grid';
import './index.less';
import 'components/GridCompnent/index.less'
import { Empty } from 'antd';

const {TabPane} = Tabs;
const FormItem = Form.FormItem;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formObj: {},
            planIndex: 0,   //业务申请单索引
            accountIndex: 0,  //付款账户索引
            activeKey: '1',
            open1:true,
            open2:true,
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        // this.plangridColumn = [...genGridColumn(this.plangrid)];
        // this.accountgridColumn = [...genGridColumn(this.accountgrid)];
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.onRef(this);
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    mainForm = [
        {}
    ]

    /**
     *
     * @param {Number} pageIndex 当前分页值 第几页
     * @param {string} tableObj 分页 table 名称
     */
    freshData = (pageIndex, tableObj) => {
        this.onPageSelect(pageIndex, 0, tableObj);
    }


    /**
     *
     * @param {number} pageIndex 当前分页值 第几条
     * @param {number} value 分页条数
     * @param {string} tableObj 分页table名称
     */
    onDataNumSelect = (pageIndex, value, tableObj) => {
        this.onPageSelect(value, 1, tableObj);
    }

    /**
     *
     *
     * @param {number} value  pageIndex 或者 pageSize值
     * @param {string} type  type为0标识为 pageIndex,为1标识 pageSize,
     * @param {string} tableName 分页table名称
     */
    onPageSelect = (value, type, tableName) => {
        let queryParam = deepClone(this.props.queryParam); // 深拷贝查询条件从 action 里
        if(tableName ==="loanplanObj"){   //业务申请单分页
            if (type === 0) {
                queryParam.planIndex= value;
            } else {
                queryParam.planpageSize = value.toLowerCase() !== 'all' && value || 1;
                queryParam.planIndex = 1;
            }
            actions.loandeal.loadSubList(queryParam);
        }
        else if(tableName ==="payaccountObj") {   //付款账户分页
            if (type === 0) {
                queryParam.accountIndex= value;
            } else {
                queryParam.accountpageSize= value.toLowerCase() !== 'all' && value || 1;
                queryParam.accountIndex = 1;
            }
            actions.loandeal.loadSubList(queryParam);
        }
    }

    handleSelect = (key)=> {
        if(key =='1')
            this.setState({open1:!this.state.open1});
        else if(key=='2'){
            this.setState({open2:!this.state.open2});
        }
    }

    handleChange = (index, key) => {
        return value => {
          if(this.props.tabKey=="loanplan"){
            let _loanplanList = deepClone(this.props.loanplanList);
            _loanplanList[index][key] = value ;
            actions.loandeal.updateState({ loanplanList : _loanplanList }); 
          }else if(this.props.tabKey=="payaccount"){
            let _payaccountList = deepClone(this.props.payaccountList);
            _payaccountList[index][key] = value ;
            actions.loandeal.updateState({ payaccountList : _payaccountList }); 
          }
        };
      };

    plangrid = [
        {title:'客户名称',key:'customer_name',type:'0'},
        {title:'合同编号',key:'contract_code',type:'0'},
        {title:'计划日期',key:'plan_date',type:'0'},
        {title:'收取期次',key:'time',type:'0'}
    ]
    accountgrid = [
        {title:'收款方户名',key:'gather_account',type:'0'},
        {title:'收款方账号',key:'gather_number',type:'0'},
        {title:'付款方户名',key:'payer_account',type:'0'},
        {title:'付款方账号',key:'payer_number',type:'0'}
    ]
    plangridColumn = [
        {
            title: "客户名称",
            dataIndex: "customer_name",
            key: "customer_name",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div>
                        {record._edit ?<div className="string_model">
                        <FormControl
                            placeholder="请输入..."
                            defaultValue={text}
                            onChange={this.handleChange(index,"customer_name")}
                            /></div> : <div>{text ? text : ""}</div>}
                    </div>
                );
            }
        },
        {
            title: "合同编号",
            dataIndex: "contract_code",
            key: "contract_code",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div>
                        {record._edit ?<div className="string_model">
                        <FormControl
                            placeholder="请输入..."
                            defaultValue={text}
                            onChange={this.handleChange(index,"contract_code")}
                            /></div> : <div>{text ? text : ""}</div>}
                    </div>
                );
            }
        },
        {
            title: "计划日期",
            dataIndex: "plan_date",
            key: "plan_date",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div>
                        {record._edit ?<div className="string_model">
                        <FormControl
                            placeholder="请输入..."
                            defaultValue={text}
                            onChange={this.handleChange(index,"plan_date")}
                            /></div> : <div>{text ? text : ""}</div>}
                    </div>
                );
            }
        },
        {
            title: "收取期次",
            dataIndex: "time",
            key: "time",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div>
                        {record._edit ?<div className="string_model">
                        <FormControl
                            placeholder="请输入..."
                            defaultValue={text}
                            onChange={this.handleChange(index,"time")}
                            /></div> : <div>{text ? text : ""}</div>}
                    </div>
                );
            }
        },
    ];
    accountgridColumn = [
        {
            title: "收款方户名",
            dataIndex: "gather_account",
            key: "gather_account",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div>
                        {record._edit ?<div className="string_model">
                        <FormControl
                            placeholder="请输入..."
                            defaultValue={text}
                            onChange={this.handleChange(index,"gather_account")}
                            /></div> : <div>{text ? text : ""}</div>}
                    </div>
                );
            }
        },
        {
            title: "收款方账号",
            dataIndex: "gather_number",
            key: "gather_number",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div>
                        {record._edit ?<div className="string_model">
                        <FormControl
                            placeholder="请输入..."
                            defaultValue={text}
                            onChange={this.handleChange(index,"gather_number")}
                            /></div> : <div>{text ? text : ""}</div>}
                    </div>
                );
            }
        },
        {
            title: "付款方户名",
            dataIndex: "payer_account",
            key: "payer_account",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div>
                        {record._edit ?<div className="string_model">
                        <FormControl
                            placeholder="请输入..."
                            defaultValue={text}
                            onChange={this.handleChange(index,"payer_account")}
                            /></div> : <div>{text ? text : ""}</div>}
                    </div>
                );
            }
        },
        {
            title: "付款方账号",
            dataIndex: "payer_number",
            key: "payer_number",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div>
                        {record._edit ?<div className="string_model">
                        <FormControl
                            placeholder="请输入..."
                            defaultValue={text}
                            onChange={this.handleChange(index,"payer_number")}
                            /></div> : <div>{text ? text : ""}</div>}
                    </div>
                );
            }
        },
    ];

    submit = () => {
        return this.props.form.getFieldsValue();
    }

    tableonesubmit = ()=>{
        return this.props.loanplanList;
    }

    tabletwosubmit = ()=>{
        return this.props.payaccountList;
    }

    onAdd = (tabKey)=>{
        if(tabKey=='loanplan'){
            const plandataList = this.props.loanplanList;
            const currentIndex  = plandataList.length;
            plandataList.push({
                index: currentIndex,
                _edit:true
            });
            actions.loandeal.updateState({ loanplanList : plandataList });  
        }else if(tabKey == 'payaccount'){
            const accountdataList = this.props.payaccountList;
            const currentIndex  = accountdataList.length;
            accountdataList.push({
                index: currentIndex,
                _edit:true
            });
            actions.loandeal.updateState({ payaccountList : accountdataList });  
        }
    }

    onDelete = ()=>{
        if(this.props.tabKey =='loanplan'){
            let selectedPlanList = deepClone(this.props.selectedPlanList);
            let planlist = deepClone(this.props.loanplanList);
            selectedPlanList.map(item => {
                delete planlist[item['_index']];
            });
            let newlist = [];
            planlist.map(item => {
                if(item!=Empty){
                    newlist.push(item);
                }
            });
            actions.loandeal.updateState({ loanplanList : newlist,selectedPlanList:[] });  
        }else if(this.props.tabKey=='payaccount'){
            let selectedPayList = deepClone(this.props.selectedPayList);
            let paylist = deepClone(this.props.payaccountList);
            selectedPayList.map(item => {
                delete paylist[item['_index']];
            });
            let newlist = [];
            paylist.map(item => {
                if(item!=Empty){
                    newlist.push(item);
                }
            });
            actions.loandeal.updateState({ payaccountList : paylist,selectedPayList:[] });  
        }
    }


    getSelectedDataFunc = (selectedList,record,index) => {
        if(this.props.tabKey =='loanplan'){
            let {loanplanList} = this.props;
            let _loanplanList = deepClone(loanplanList);
            let _selectedPlanList = deepClone(selectedList);
            if(index!=undefined){
                _loanplanList[index]['_checked'] = !_loanplanList[index]['_checked'];
            }else {
                if(_selectedPlanList && _selectedPlanList.length > 0){
                    _loanplanList.map(item => {
                        if (!item['_disabled']) {
                            item['_checked'] = true;
                        }
                    });
                } else {
                    _loanplanList.map(item => {
                        if (!item['_disabled']) {
                            item['_checked'] = false;
                        }
                    });
                }            
            }
            actions.loandeal.updateState({ loanplanList : _loanplanList,selectedPlanList : _selectedPlanList});
        }else if(this.props.tabKey =='payaccount'){
            let {payaccountList} = this.props;
            let _payaccountList = deepClone(payaccountList);
            let _selectedPayList = deepClone(selectedList);
            if(index!=undefined){
                _payaccountList[index]['_checked'] = !_payaccountList[index]['_checked'];
            }else {
                if(_selectedPayList && _selectedPayList.length > 0){
                    _payaccountList.map(item => {
                        if (!item['_disabled']) {
                            item['_checked'] = true;
                        }
                    });
                } else {
                    _payaccountList.map(item => {
                        if (!item['_disabled']) {
                            item['_checked'] = false;
                        }
                    });
                }            
            }
        actions.loandeal.updateState({ payaccountList : _payaccountList,selectedPayList : _selectedPayList});
        }
        
    }

    /**
     *
     *tab 切换
     * @param {string}
     */
    onChangeTab = (tabKey) => {
        actions.loandeal.updateState({tabKey});
        actions.loandeal.loadSubList(this.props.queryParam);
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let formObj = this.props.formObject;
        let _props = this.props;
        return (

                <div className='form'>
                    <div className = 'panelform'>
                    <PanelGroup activeKey={this.state.activeKey} >
                    <Panel header="基本信息" eventKey="1" collapsible defaultExpanded="true" expanded={this.state.open1} onSelect={this.handleSelect.bind(this,'1')} >
                    <Form>
                    <Row> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    单据状态
                                </Label>
                                
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    // data={[{key:'审核通过',value:'9'},{key:'暂存',value:'20'},{key:'审核中',value='204'},{key:'初始',value='99'}]}
                                    {...getFieldProps('billstatus', {
                                        initialValue: formObj.billstatus,                                        
                                        rules: [{
                                            required: true, message: '请选择单据状态!',
                                        }],
                                    })}  
                                />):(<FormControl
                                disabled={!_props.isEdit}
                                // data={[{key:'审核通过',value:'9'},{key:'暂存',value:'20'},{key:'审核中',value='204'},{key:'初始',value='99'}]}
                                {...getFieldProps('billstatus', {
                                    initialValue: formObj.billstatus,                                        
                                    rules: [{
                                        required: true, message: '请选择单据状态!',
                                    }],
                                })} 
                                />)}                           
                            </FormItem>
                        </Col>
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    付款申请编号
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('loan_code', {
                                        initialValue: formObj.loan_code,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('loan_code', {
                                        initialValue: formObj.loan_code,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    付款类别
                                </Label>
                                {!_props.isEdit ? (<FormControl   style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('pay_type', {
                                        initialValue: formObj.pay_type,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl  
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('pay_type', {
                                        initialValue: formObj.pay_type,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    收款方名称
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('gather_name', {
                                        initialValue: formObj.gather_name,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('gather_name', {
                                        initialValue: formObj.gather_name,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    收款账号
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('gather_account', {
                                        initialValue: formObj.gather_account,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('gather_account', {
                                        initialValue: formObj.gather_account,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        </Row>                                
                        </Form>
                        </Panel>
                        <Panel header="立项详情" eventKey="2" collapsible defaultExpanded="true" expanded={this.state.open2} onSelect={this.handleSelect.bind(this,'2')} >
                        <Form>
                        <Row>                                
                    
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    收款账户
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('gather_cust', {
                                        initialValue: formObj.gather_cust,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('gather_cust', {
                                        initialValue: formObj.gather_cust,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>                                 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户名称
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('customer_name', {
                                        initialValue: formObj.customer_name,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('customer_name', {
                                        initialValue: formObj.customer_name,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    合同编号
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('cont_code', {
                                        initialValue: formObj.cont_code,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('cont_code', {
                                        initialValue: formObj.cont_code,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    部门
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('pk_dept', {
                                        initialValue: formObj.pk_dept,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('pk_dept', {
                                        initialValue: formObj.pk_dept,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    实际支付金额
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('fact_pay_amount', {
                                        initialValue: formObj.fact_pay_amount,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('fact_pay_amount', {
                                        initialValue: formObj.fact_pay_amount,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    项目类型
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('project_type', {
                                        initialValue: formObj.project_type,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('project_type', {
                                        initialValue: formObj.project_type,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    签约主体
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('pk_mainorg', {
                                        initialValue: formObj.pk_mainorg,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('pk_mainorg', {
                                        initialValue: formObj.pk_mainorg,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    机构
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('pk_org', {
                                        initialValue: formObj.pk_org,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('pk_org', {
                                        initialValue: formObj.pk_org,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    租赁方式
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('rent_type', {
                                        initialValue: formObj.rent_type,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('rent_type', {
                                        initialValue: formObj.rent_type,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    合同管理人
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('cont_manager', {
                                        initialValue: formObj.cont_manager,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('cont_manager', {
                                        initialValue: formObj.cont_manager,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    币种
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('currency', {
                                        initialValue: formObj.currency,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('currency', {
                                        initialValue: formObj.currency,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户规模
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('customer_scale', {
                                        initialValue: formObj.customer_scale,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('customer_scale', {
                                        initialValue: formObj.customer_scale,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    租赁物门类
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('renting_type', {
                                        initialValue: formObj.renting_type,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('renting_type', {
                                        initialValue: formObj.renting_type,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    保证金金额
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('deposit', {
                                        initialValue: formObj.deposit,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('deposit', {
                                        initialValue: formObj.deposit,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    手续费金额
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('srvfee', {
                                        initialValue: formObj.srvfee,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('srvfee', {
                                        initialValue: formObj.srvfee,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    付款申请人
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('pk_operator', {
                                        initialValue: formObj.pk_operator,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('pk_operator', {
                                        initialValue: formObj.pk_operator,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    新增测试人
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('pk_operator', {
                                        initialValue: formObj.pk_operator,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('pk_operator', {
                                        initialValue: formObj.pk_operator,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>
                        </Row>                                
                        </Form>
                        </Panel>
                    </PanelGroup>      

                    </div>
                    <div>
                    <Tabs
                        defaultActiveKey={_props.tabKey}
                        onChange={this.onChangeTab}
                        extraContent={
                            <div className="initbtn" >
                                <Button shape="icon" className="initbtn" size="sm" disabled={!_props.isEdit}  colors="secondary" onClick={this.onAdd.bind(this,_props.tabKey)}><Icon type='uf-add-c-o'/></Button>
                                <Button shape="icon" className="initbtn" size="sm" disabled={!_props.isEdit}  colors="secondary" onClick={this.onDelete}><Icon type='uf-reduce-c-o'/></Button>
                            </div>
                            }
                        >
                        <TabPane tab='业务资金付款申请单' key="loanplan">
                            <div>
                                <Grid
                                    ref="grid" //存模版
                                    data={this.props.loanplanList}
                                    rowKey={(r, i) => {r._index = i; return i}} //生成行的key
                                    columns={this.plangridColumn}
                                    showHeaderMenu={true}
                                    multiSelect={true}  //false 单选，默认多选                        
                                    scroll={{y: 145}} //滚动轴高度 //滚动轴高度
                                    height={28} //行高度
                                    bordered //表格有边界
                                    headerDisplayInRow={true}//表头换行用...来表示
                                    bodyDisplayInRow={true}//表体换行用...来表示
                                    headerHeight={40} //表头高度
                                    bodyStyle={{'height':145,'background-color':'rgb(241, 242, 245)'}} //表体样式
                                    sheetHeader={{height: 30, ifshow: false}} //设置excel导出的表头的样式、支持height、ifshow
                                    hideHeaderScroll={false} //无数据时是否显示表头
                                    //分页
                                    paginationObj={{
                                        // activePage : this.props.queryParam.planIndex,//活动页
                                        // total : this.props.loanplanList.length,//总条数
                                        // items: this.props.loanplanObj.totalPages,//总页数
                                        // freshData: (pageSize) => {
                                        //     this.freshData(pageSize, "loanplanObj");
                                        // },
                                        // onDataNumSelect: (index, value) => {
                                        //     this.onDataNumSelect(index, value, "loanplanObj");
                                        // },
                                        // dataNumSelect:['5','10','20','30'],
                                        // dataNum:0,
                                        verticalPosition:'none'

                                    }}
                                    onRowClick={(record, index) => {
                                        this.setState({planIndex: index});
                                    }}
                                    rowClassName={(record, index, indent) => {
                                        if (this.state.planIndex === index) {
                                            return 'selected';
                                        } else {
                                            return '';
                                        }
                                    }}
                                    getSelectedDataFunc={this.getSelectedDataFunc}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab='付款账户信息' key="payaccount">
                            <div>
                                <Grid
                                    ref={(el) => this.accountgrid = el} //存模版
                                    data={this.props.payaccountList}
                                    rowKey={(r, i) => {r._index = i; return i}} //生成行的key
                                    columns={this.accountgridColumn}
                                    showHeaderMenu={true}
                                    multiSelect={true}  //false 单选，默认多选                        
                                    scroll={{y: 145}} //滚动轴高度
                                    height={28} //行高度
                                    bordered //表格有边界
                                    headerDisplayInRow={true}//表头换行用...来表示
                                    bodyDisplayInRow={true}//表体换行用...来表示
                                    headerHeight={40} //表头高度
                                    bodyStyle={{'height':145,'background-color':'rgb(241, 242, 245)'}} //表体样式
                                    sheetHeader={{height: 30, ifshow: false}} //设置excel导出的表头的样式、支持height、ifshow
                                    hideHeaderScroll={false} //无数据时是否显示表头
                                    // 分页
                                    paginationObj={{
                                        // activePage : this.props.queryParam.accountIndex,//活动页
                                        // total : this.props.payaccountList.length,//总条数
                                        // items: this.props.payaccountObj.totalPages,//总页数
                                        // freshData: (pageSize) => {
                                        //     this.freshData(pageSize, "payaccountObj");
                                        // },
                                        // onDataNumSelect: (index, value) => {
                                        //     this.onDataNumSelect(index, value, "payaccountObj");
                                        // },
                                        // dataNumSelect:['5','10','20','30'],
                                        verticalPosition:'none'
                                    }}
                                    onRowClick={(record, index) => {
                                        this.setState({accountIndex: index});
                                    }}
                                    rowClassName={(record, index, indent) => {
                                        if (this.state.accountIndex === index) {
                                            return 'selected';
                                        } else {
                                            return '';
                                        }
                                    }}
                                    getSelectedDataFunc={this.getSelectedDataFunc}
                                />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                </div>
                
              
        );
    }
}

export default Form.createForm()(FormView);