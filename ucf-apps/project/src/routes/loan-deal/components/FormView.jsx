import React, { Component } from 'react';
import {Panel, PanelGroup ,Form, Icon,Tabs, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl, Collapse } from 'tinper-bee';
import { deepClone } from "utils";
import {actions} from 'mirrorx';
import {genGridColumn,checkListSelect} from "utils/service";
import Grid from 'components/Grid';
import './index.less';
import 'components/GridCompnent/index.less'
import { Empty } from 'antd';
import PlanModalView from './PlanModalView'; 
import {singleRecordOper} from "utils/service";
import AccountModalView from './AccountModalView'

const {TabPane} = Tabs;
const FormItem = Form.FormItem;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: '1',
            open1:true,
            open2:true,
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        //调用外部函数渲染表格头
        this.plangridColumn = [...genGridColumn(this.plangrid)];
        this.accountgridColumn = [...genGridColumn(this.accountgrid)];
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.onRef(this);
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    //编辑Panel组是否展开折叠
    handleSelect = (key)=> {
        if(key =='1')
            this.setState({open1:!this.state.open1});
        else if(key=='2'){
            this.setState({open2:!this.state.open2});
        }
    }


    plangrid = [
        {title:'客户名称',key:'customer_name',type:'0'},
        {title:'合同编号',key:'contract_code',type:'0'},
        {title:'计划日期',key:'plan_date',type:'0'},
        {title:'收取期次',key:'time',type:'0'},
        {title:'合同金额',key:'contract_money',type:'0'}
    ]
    accountgrid = [
        {title:'收款方户名',key:'gather_account',type:'0'},
        {title:'收款方账号',key:'gather_number',type:'0'},
        {title:'付款方户名',key:'payer_account',type:'0'},
        {title:'付款方账号',key:'payer_number',type:'0'}
    ]
    plangridColumn = [
    ];
    accountgridColumn = [
    ];


    //给父组件返回表单中的值用于保存
    submit = () => {
        return this.props.form.getFieldsValue();
    }

    //根据tabKey新增子表数据
    onAdd = ()=>{
        if(this.props.tabKey=='loanplan'){
            actions.loandeal.updateState({showModalPlan:true})
        }else if(this.props.tabKey == 'payaccount'){
            actions.loandeal.updateState({showModalAccount:true})  
        }
    }

    //根据tabKey编辑子表数据
    onEdit = ()=>{
        if(this.props.tabKey=='loanplan'){
            singleRecordOper(this.props.selectedPlanList,(param) => {
                let _planformObj = deepClone(this.props.selectedPlanList[0]);
                actions.loandeal.updateState({ifplanAdd:false,planformObj:_planformObj,showModalPlan:true});
            });
        }else if(this.props.tabKey =='payaccount'){
            singleRecordOper(this.props.selectedPayList,(param) => {
                let _accountformObj = deepClone(this.props.selectedPayList[0]);
                actions.loandeal.updateState({ifaccountAdd:false,accountformObj:_accountformObj,showModalAccount:true});
            });  
        }
    }

    //根据tabKey删除子表数据
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
            actions.loandeal.updateState({ payaccountList : newlist,selectedPayList:[] });  
        }
    }

    //选中数据事件  动态调整表格前的复选框
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
                                <Button shape="icon" className="initbtn" size="sm" disabled={!_props.isEdit}  colors="secondary" onClick={this.onAdd}><Icon type='uf-add-c-o'/></Button>
                                <Button shape="icon" className="initbtn" size="sm" disabled={!_props.isEdit}  colors="secondary" onClick={this.onEdit}><Icon type='uf-pencil-s'/></Button>
                                <Button shape="icon" className="initbtn" size="sm" disabled={!_props.isEdit}  colors="secondary" onClick={this.onDelete}><Icon type='uf-del'/></Button>
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
                                        verticalPosition:'none'

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
                                        verticalPosition:'none'
                                    }}
                                    getSelectedDataFunc={this.getSelectedDataFunc}
                                />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                    <div>
                        <PlanModalView {...this.props} />         
                    </div>
                    <div>
                        <AccountModalView {...this.props} /> 
                    </div>
                </div>
                
              
        );
    }
}

export default Form.createForm()(FormView);