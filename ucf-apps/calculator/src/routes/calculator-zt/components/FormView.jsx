import React, { Component } from 'react';
import { Form, Icon, Button, Label,InputNumber, Switch, Checkbox,  Radio, Select, Col, Row, FormControl, Collapse, Tabs, ButtonGroup } from 'tinper-bee';
import { deepClone } from "utils";
import { SelectField } from 'components/RowField/SelectField'
import FormSplitHeader from 'components/FormSplitHeader'
import DatePicker from "tinper-bee/lib/Datepicker";

import ChildListView from './ChildListView';
import TableFormRef from 'components/FormRef/TableFormRef';
//参照组件职级
import { RefWalsinLevel } from 'components/RefViews';
const { TabPane } = Tabs;

import './index.less';

const FormItem = Form.FormItem;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true, //各个标签
            open2: true,
            open3: true,
            open4:true,
            open5:true,
            open6:true,
            open7:true,
            open8:true,
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {

    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.onRef(this); //绑定子组件
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    //保存方法
    submit = () => {
        console.log(this.props.form.getFieldsValue());
        console.log(this.state.dataSource + "子表数据");
        return this.props.form.getFieldsValue();
    }

    //子表切换子标签
    onChange = (activeKey) => {
        console.log(`onChange ${activeKey} o-^-o`);
        this.setState({
            activeKey,
        });
    }

    //字表添加数据
    add=()=>{
        let dataSource = deepClone(this.child.state.dataSource);
        let index = dataSource.length + 1;
        let newData = {
            a: index,  //序号
            editable: true,
            cIsEdit: true, //转为c字段提供 可不可编辑判断
        };
        dataSource.push(newData);
        this.child.setState({
            dataSource:dataSource
        });
    }
    //字表删除数据
    del=(key)=>{
        let dataSource = deepClone(this.child.state.dataSource);
        dataSource.splice(dataSource.length-1,1);
        this.child.setState({
            dataSource:dataSource
        });
    }

    //onChange事件
    handleChange = (value) =>{
        if(value == '01'){
            
        }
    }

    //绑定子组件
    onRef = (ref) => {
        this.child = ref;        
    }

    //投放信息
    mainForm = [
        {label:'测算方案名称',field:'quot_name',com:FormControl,required:true},
        {label:'限额方案',field:'pk_limit_plan',com:TableFormRef,required:true,isEdit:true,ref:'tableRefAdd'},
        {label:'租赁方式',field:'lease_method',com:Select,required:true,data:[{key:'直租',value:'0'},{key:'回租',value:'1'}]},
        {label:'本金是否开票',field:'if_corpus_tickets',com:Select,required:true,data:[{key:'是',value:'0'},{key:'否',value:'1'}]},
        {label:'租金税率',field:'rent_tax_rate',com:Select,required:true,data:[{key:'0%',value:'0'},{key:'3%',value:'3'},{key:'6%',value:'6'},{key:'10%',value:'10'}]},
        {label:'税种',field:'pk_currtype',com:Select,required:true,data:[{key:'增值税',value:'1'},{key:'营业税',value:'2'},{key:'复合税',value:'3'},{key:'无',value:'0'}]},
        {label:'投放日期',field:'plan_date_loan',com:DatePicker,required:true,format:'YYYY-MM-DD'},
        {label:'投放金额',field:'total_amount_equipment',com:InputNumber,required:true,iconStyle:'one',toThousands :true,precision:2},
        {label:'租赁本金',field:'fact_cash_loan',com:InputNumber,required:true,iconStyle:'one',toThousands :true,precision:2},
        {label:'首付款比例',field:'down_payment_ratio',com:InputNumber,required:true,iconStyle:'one',precision:4,format:'1'},
        {label:'首付款金额',field:'down_payment',com:InputNumber,required:true,iconStyle:'one',toThousands :true,precision:2},
        {label:'净融资比例',field:'net_finance_ratio',com:InputNumber,required:true,iconStyle:'one',precision:4},
        {label:'净融资额(元)',field:'net_finance_cash',com:InputNumber,required:true,iconStyle:'one',toThousands :true,precision:2},
        {label:'留购价款(元)',field:'nominal_price',com:InputNumber,required:true,iconStyle:'one',toThousands :true,precision:2},
        {label:'资产余值',field:'assets_margin',com:InputNumber,required:true,iconStyle:'one',toThousands :true,precision:2},
    ];

    //保证金信息
    secondForm = [
        {label:'保证金收取方式',field:'deposit_method',com:Select,required:true,data:[{key:'手工维护',value:'1'},{key:'期初收取',value:'2'}]},
        {label:'保证金比例',field:'deposit_ratio',com:InputNumber,required:true,iconStyle:'one',toThousands :true,precision:4},
        {label:'保证金金额',field:'deposit_cash',com:InputNumber,required:true,iconStyle:'one',precision:2},
        {label:'保证金退回方式',field:'return_method_depos',com:Select,required:true,data:[{key:'期末退回',value:'1'},{key:'冲抵租金',value:'2'},{key:'冲抵两期租金',value:'3'},{key:'冲抵兼退回',value:'4'}]},
        {label:'保证金是否计息',field:'if_interest_depos',com:Select,required:true,data:[{key:'是',value:'0'},{key:'否',value:'1'}]},
        {label:'保证金利率',field:'final_rate_depos',com:InputNumber,required:true,iconStyle:'one',toThousands :true,precision:4},

    ];

    //手续费
    thirdForm = [
        {label:'手续费收取方式',field:'srvfee_method_in',com:FormControl,required:true},
        {label:'手续费计算基数',field:'srvfee_base',com:Select,required:true,data:[{key:'投放本金',value:'0'},{key:'剩余本金',value:'1'}]},
        {label:'手续费比例',field:'srvfee_ratio_in',com:InputNumber,required:true,iconStyle:'one',toThousands :true,precision:4},
        {label:'首期手续费金额(元)',field:'srvfee_cash_in_ft',com:InputNumber,required:true,iconStyle:'one',precision:2},
        {label:'手续费总金额(元)',field:'srvfee_cash_in',com:InputNumber,required:true,iconStyle:'one',precision:2},
        {label:'手续费收入税率(增值税)',field:'srvfee_taxrate_in',com:Select,required:true,data:[{key:'0%',value:'0'},{key:'3%',value:'3'},{key:'6%',value:'6'},{key:'10%',value:'10'}]},
    ];

    //中间费
    fourthForm = [
        {label:'中间费用支出方式',field:'srvfee_method_out',com:Select,required:true,data:[{key:'指定支付',value:'0'},{key:'每满一年支出',value:'1'},{key:'手工维护',value:'2'},{key:'每年年初支付',value:'3'}]},
        {label:'首期中间费用支出时间',field:'srvfee_date_out_ft',com:DatePicker,required:true,format:'YYYY-MM-DD'},
        {label:'中间费用支出计算基数',field:'srvfee_base_out',com:Select,required:true,data:[{key:'投放本金',value:'0'},{key:'剩余本金',value:'1'}]},
        {label:'中间费用支出税率(增值税)',field:'srvfee_taxrate_out',com:Select,required:true,data:[{key:'3%',value:'0'},{key:'6%',value:'1'},{key:'17%',value:'2'},{key:'0%',value:'3'},{key:'13%',value:'4'},{key:'11%',value:'5'},{key:'16%',value:'6'},{key:'10%',value:'7'},{key:'9%',value:'8'}]},
        {label:'中间费用支出比例',field:'srvfee_ratio_out',com:InputNumber,required:true,iconStyle:'one',toThousands :true,precision:4},
        {label:'首期中间费用支出金额(元)',field:'srvfee_cash_out_ft',com:InputNumber,required:true,iconStyle:'one',precision:2},
        {label:'中间费用支出总金额(元)',field:'srvfee_cash_out',com:InputNumber,required:true,iconStyle:'one',precision:2},   
    ];

    //收租设置
    fifthForm = [
        {label:'租赁期限(月)',field:'lease_times',com:InputNumber,required:true,iconStyle:'one'},
        {label:'计划收租日',field:'srvfee_base_out',com:Select,required:true,data:[{key:'随起租日',value:'0'},{key:'1',value:'1'},{key:'2',value:'2'},{key:'3',value:'3'},{key:'4',value:'4'}
        ,{key:'5',value:'5'},{key:'6',value:'6'},{key:'7',value:'7'},{key:'8',value:'8'},{key:'9',value:'9'},{key:'10',value:'10'}
        ,{key:'11',value:'11'},{key:'12',value:'12'},{key:'13',value:'13'},{key:'14',value:'14'},{key:'15',value:'15'},{key:'16',value:'16'},
        {key:'17',value:'17'},{key:'18',value:'18'},{key:'19',value:'19'},{key:'20',value:'20'},{key:'21',value:'21'},{key:'22',value:'22'},
        {key:'23',value:'23'},{key:'24',value:'24'},{key:'25',value:'25'},{key:'26',value:'26'},{key:'27',value:'27'},{key:'28',value:'28'},
        {key:'29',value:'29'},{key:'30',value:'30'},{key:'31',value:'31'}]},
        {label:'先付后付标志',field:'prepay_or_not',com:Select,required:true,data:[{key:'后付',value:'0'},{key:'先付',value:'1'}]},
        {label:'报价利息计算方式',field:'lease_cal_method',com:Select,required:true,data:[{key:'常规',value:'0'},{key:'平息法',value:'1'}]},
        {label:'延迟期(日)',field:'delay_period',com:InputNumber,required:true,iconStyle:'one'},
        {label:'是否指定首期收租日',field:'has_first_lease_date',com:Select,required:true,data:[{key:'是',value:'0'},{key:'否',value:'1'}]},
        {label:'首期收租日期',field:'first_lease_date',com:DatePicker,required:true,format:'YYYY-MM-DD'},
        {label:'现金流日期计算方式',field:'year_days_flow',com:Select,required:true,data:[{key:'360',value:'0'},{key:'365',value:'1'}]},
        {label:'总投放金额的计息方式',field:'interest_method_total_loan',com:Select,required:true,data:[{key:'约定计息(按第一笔投放)',value:'0'},{key:'按投放时点计息',value:'1'}]},
    ];
    //利率设置
    sixthForm = [
        {label:'报价利率',field:'final_rate',com:InputNumber,required:true,iconStyle:'one',precision:6},
        {label:'基准利率',field:'interrate',com:InputNumber,required:true,iconStyle:'one',precision:6},
        {label:'计算精度',field:'cal_digit',com:Select,required:true,data:[{key:'分',value:'0'},{key:'元',value:'1'}]},
        {label:'年化天数',field:'year_days',com:Select,required:true,data:[{key:'360',value:'0'},{key:'365',value:'1'}]},
        {label:'利率类型',field:'interrate_type',com:Select,required:true,data:[{key:'浮动',value:'0'},{key:'固定',value:'1'}]},
        {label:'币种',field:'pk_currtype',com:TableFormRef,required:true},
        {label:'利率浮动方式',field:'float_method',com:Select,required:true,data:[{key:'百分比',value:'0'},{key:'绝对值',value:'1'}]},
        {label:'利率生效日期',field:'pk_interrate',com:DatePicker,required:true,format:'YYYY-MM-DD'},
        {label:'利率档次',field:'interrate_level',com:Select,required:true,data:[{key:'六个月以内(含一年)',value:'0'},{key:'六个月至一年(含一年)',value:'1'},{key:'一至三年(含三年)',value:'2'},{key:'三至五年(含五年)',value:'3'},{key:'五年以上',value:'4'}]},
        {label:'利率浮动值(%)',field:'float_value',com:InputNumber,required:true,iconStyle:'one',precision:6},
    ];
    //IRR信息
    seventhForm = [
        {label:'会计IRR按最新算法',field:'finace_irr_method',com:Select,required:true,data:[{key:'是',value:'0'},{key:'否',value:'1'}]},
        {label:'会计IRR算法启用年份',field:'finace_irr_year',com:Select,required:true,data:[{key:'2016',value:'0'},{key:'2017',value:'1'}]},
        {label:'市场IRR',field:'project_irr',com:InputNumber,required:true,iconStyle:'one',precision:6},
        {label:'市场去税IRR',field:'project_notax_irr',com:InputNumber,required:true,iconStyle:'one',precision:6},
        {label:'会计IRR',field:'finance_irr',com:InputNumber,required:true,iconStyle:'one',precision:6},
        {label:'会计去税IRR',field:'finance_notax_irr',com:InputNumber,required:true,iconStyle:'one',precision:6},
    ];
    //特殊期设置
    eighthForm = [
        {label:'特殊期类别',field:'special_type',com:Select,required:true,data:[{key:'无',value:'0'},{key:'远期支付',value:'1'},{key:'在建期',value:'2'},{key:'租前息',value:'3'}]},
        {label:'远期支付日期',field:'time_pay_date',com:DatePicker,required:true,format:'YYYY-MM-DD'},
        {label:'特殊期期限(月)',field:'special_limit',com:InputNumber,required:true,iconStyle:'one'},
        {label:'特殊期利息支付频率',field:'repayment_interest_period',com:Select,required:true,data:[{key:'月',value:'0'},{key:'双月',value:'1'},{key:'季',value:'2'},{key:'四月',value:'3'},{key:'半年',value:'4'},{key:'年',value:'5'}]},
        {label:'特殊期还本频率',field:'repayment_corpus_period',com:Select,required:true,data:[{key:'月',value:'0'},{key:'双月',value:'1'},{key:'季',value:'2'},{key:'四月',value:'3'},{key:'半年',value:'4'},{key:'年',value:'5'}]},
        {label:'特殊期还本金额',field:'repayment_corpus_cash',com:InputNumber,required:true,iconStyle:'one',precision:3},
        {label:'特殊期利率',field:'special_final_rate',com:InputNumber,required:true,iconStyle:'one',precision:4},
        {label:'特殊期利率档次',field:'special_interrate_level',com:Select,required:true,data:[{key:'六个月以内(含一年)',value:'0'},{key:'六个月至一年(含一年)',value:'1'},{key:'一至三年(含三年)',value:'2'},{key:'三至五年(含五年)',value:'3'},{key:'五年以上',value:'4'}]},
        {label:'特殊期基准利率',field:'special_interrate',com:InputNumber,required:true,iconStyle:'one',precision:4},
        {label:'特殊期利率类型',field:'special_interrate_type',com:Select,required:true,data:[{key:'浮动',value:'0'},{key:'固定',value:'1'},{key:'无利率',value:'2'}]},
        {label:'特殊期利率浮动方式',field:'special_float_method',com:Select,required:true,data:[{key:'百分比',value:'0'},{key:'绝对值',value:'1'}]},
        {label:'特殊期利率浮动值',field:'special_float_value',com:InputNumber,required:true,iconStyle:'one',precision:4},
        {label:'特殊期利率生效日期',field:'pk_special_interrate',com:DatePicker,required:true,format:'YYYY-MM-DD'},
        {label:'计息金额计算方式',field:'calinterest_amount_style',com:Select,required:true,data:[{key:'全额起息',value:'0'},{key:'按已投放本金',value:'1'}]},
    ];

    onformat = (value) =>{
        value = value + '%';
        return value;
    }


    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let _formObject = this.props.formObject;
        let formObject = deepClone(_formObject);
        let _props = this.props;
        if(_props.showForm){
            return (
                <div>
                <div className='calculatorNormalztForm'>
                    <div>
                        <span onClick={() => this.setState({ open: !this.state.open })} >
                        <FormSplitHeader title={'投放信息'} />
                        </span>
    
                    <Collapse in={this.state.open}>
                            <Form>
                           
                                        <div>
                                            {
                                                this.mainForm.map((value,key) => {
                                                    return (
                                                    <Col md={4} xs={4} sm={4}>
                                                        <FormItem>
                                                            <Label>
                                                                <Icon type="uf-mi" className='mast'></Icon>
                                                                {value.label}
                                                            </Label>
                                                            <value.com {...this.props}                                               
                                                                title={value.label} 
                                                                name = {value.field}
                                                                data ={value.data}
                                                                iconStyle={value.iconStyle}
                                                                toThousands={value.toThousands}
                                                                precision={value.precision}
                                                                disabled={!_props.isEdit}
                                                                format={value.format=='1'?this.onformat:value.format}
                                                                {
                                                                    ...getFieldProps(value.field, {
                                                                        initialValue: formObject[value.field],
                                                                        rules: [{
                                                                            required: true, 
                                                                        }],
                                                                    })
                                                                }
                                                               >
                                                            </value.com>
                                                        </FormItem>    
                                                    </Col>)
                                                })
                                            }
                                            
                                           </div>
    
                            </Form>
    
                    </Collapse>
                    </div>
    
    
                    <div>
                        <span onClick={() => this.setState({ open2: !this.state.open2 })} >
                        <FormSplitHeader title={'保证金设置'} />
                    </span>
    
                        <Collapse in={this.state.open2}>
    
                        <Form>
                           
                        <div>
                        {
                            this.secondForm.map((value,key) => {
                                return (
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            {value.label}
                                        </Label>
                                        <value.com {...this.props}                                               
                                            title={value.label} 
                                            name = {value.field}
                                            data ={value.data}
                                            iconStyle={value.iconStyle}
                                            toThousands={value.toThousands}
                                            precision={value.precision}
                                            format={value.format}
                                            disabled={!_props.isEdit}
                                            {
                                                ...getFieldProps(value.field, {
                                                    initialValue: formObject[value.field],
                                                    rules: [{
                                                        required: true, 
                                                    }],
                                                })
                                            }
                                           >
                                        </value.com>
                                    </FormItem>    
                                </Col>)
                            })
                        }
                        
                       </div>
                          
    
                            </Form>
    
                        </Collapse>
                    </div>
    
                    <div>
                        <span onClick={() => this.setState({ open3: !this.state.open3 })} >
                        <FormSplitHeader title={'手续费设置'} />
                    </span>
    
                        <Collapse in={this.state.open3}>
    
                        <Form>
                        <div>
                        {
                            this.thirdForm.map((value,key) => {
                                return (
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            {value.label}
                                        </Label>
                                        <value.com {...this.props}                                               
                                            title={value.label} 
                                            name = {value.field}
                                            data ={value.data}
                                            iconStyle={value.iconStyle}
                                            toThousands={value.toThousands}
                                            precision={value.precision}
                                            format={value.format}
                                            disabled={!_props.isEdit}
                                            {
                                                ...getFieldProps(value.field, {
                                                    initialValue: formObject[value.field],
                                                    rules: [{
                                                        required: true, 
                                                    }],
                                                })
                                            }
                                           >
                                        </value.com>
                                    </FormItem>    
                                </Col>)
                            })
                        }
                        </div>
                      
    
                        </Form>
    
                        </Collapse>
                    </div>
                    <div>
                        <span onClick={() => this.setState({ open4: !this.state.open4 })} >
                        <FormSplitHeader title={'中间费用支出设置'} />
                    </span>
    
                        <Collapse in={this.state.open4}>
    
                        <Form>
                        <div>
                        {
                            this.fourthForm.map((value,key) => {
                                return (
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            {value.label}
                                        </Label>
                                        <value.com {...this.props}                                               
                                            title={value.label} 
                                            name = {value.field}
                                            data ={value.data}
                                            iconStyle={value.iconStyle}
                                            toThousands={value.toThousands}
                                            precision={value.precision}
                                            format={value.format}
                                            disabled={!_props.isEdit}
                                            {
                                                ...getFieldProps(value.field, {
                                                    initialValue: formObject[value.field],
                                                    rules: [{
                                                        required: true, 
                                                    }],
                                                })
                                            }
                                           >
                                        </value.com>
                                    </FormItem>    
                                </Col>)
                            })
                        }
                        </div>
                      
    
                        </Form>
    
                        </Collapse>
                    </div>
                    <div>
                        <span onClick={() => this.setState({ open5: !this.state.open5 })} >
                        <FormSplitHeader title={'收租设置'} />
                    </span>
    
                        <Collapse in={this.state.open5}>
    
                        <Form>
                        <div>
                        {
                            this.fifthForm.map((value,key) => {
                                return (
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            {value.label}
                                        </Label>
                                        <value.com {...this.props}                                               
                                            title={value.label} 
                                            name = {value.field}
                                            data ={value.data}
                                            iconStyle={value.iconStyle}
                                            toThousands={value.toThousands}
                                            precision={value.precision}
                                            format={value.format}
                                            disabled={!_props.isEdit}
                                            {
                                                ...getFieldProps(value.field, {
                                                    initialValue: formObject[value.field],
                                                    rules: [{
                                                        required: true, 
                                                    }],
                                                })
                                            }
                                           >
                                        </value.com>
                                    </FormItem>    
                                </Col>)
                            })
                        }
                        </div>
                      
    
                        </Form>
    
                        </Collapse>
                    </div>
                    <div>
                        <span onClick={() => this.setState({ open6: !this.state.open6 })} >
                        <FormSplitHeader title={'利率设置'} />
                    </span>
    
                        <Collapse in={this.state.open6}>
    
                        <Form>
                        <div>
                        {
                            this.sixthForm.map((value,key) => {
                                return (
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            {value.label}
                                        </Label>
                                        <value.com {...this.props}                                               
                                            title={value.label} 
                                            name = {value.field}
                                            data ={value.data}
                                            iconStyle={value.iconStyle}
                                            toThousands={value.toThousands}
                                            precision={value.precision}
                                            format={value.format}
                                            disabled={!_props.isEdit}
                                            {
                                                ...getFieldProps(value.field, {
                                                    initialValue: formObject[value.field],
                                                    rules: [{
                                                        required: true, 
                                                    }],
                                                })
                                            }
                                           >
                                        </value.com>
                                    </FormItem>    
                                </Col>)
                            })
                        }
                        </div>
                      
    
                        </Form>
    
                        </Collapse>
                    </div>
                    <div>
                        <span onClick={() => this.setState({ open7: !this.state.open7 })} >
                        <FormSplitHeader title={'IRR信息'} />
                    </span>
    
                        <Collapse in={this.state.open7}>
    
                        <Form>
                        <div>
                        {
                            this.seventhForm.map((value,key) => {
                                return (
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            {value.label}
                                        </Label>
                                        <value.com {...this.props}                                               
                                            title={value.label} 
                                            name = {value.field}
                                            data ={value.data}
                                            iconStyle={value.iconStyle}
                                            toThousands={value.toThousands}
                                            precision={value.precision}
                                            format={value.format}
                                            disabled={!_props.isEdit}
                                            {
                                                ...getFieldProps(value.field, {
                                                    initialValue: formObject[value.field],
                                                    rules: [{
                                                        required: true, 
                                                    }],
                                                })
                                            }
                                           >
                                        </value.com>
                                    </FormItem>    
                                </Col>)
                            })
                        }
                        </div>
                      
    
                        </Form>
    
                        </Collapse>
                    </div>
                    <div>
                        <span onClick={() => this.setState({ open8: !this.state.open8 })} >
                        <FormSplitHeader title={'特殊期设置'} />
                    </span>
    
                        <Collapse in={this.state.open8}>
    
                        <Form>
                        <div>
                        {
                            this.eighthForm.map((value,key) => {
                                return (
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            {value.label}
                                        </Label>
                                        <value.com {...this.props}                                               
                                            title={value.label} 
                                            name = {value.field}
                                            data ={value.data}
                                            iconStyle={value.iconStyle}
                                            toThousands={value.toThousands}
                                            precision={value.precision}
                                            format={value.format}
                                            disabled={!_props.isEdit}
                                            {
                                                ...getFieldProps(value.field, {
                                                    initialValue: formObject[value.field],
                                                    rules: [{
                                                        required: true, 
                                                    }],
                                                })
                                            }
                                           >
                                        </value.com>
                                    </FormItem>    
                                </Col>)
                            })
                        }
                        </div>
                      
    
                        </Form>
    
                        </Collapse>
                    </div>
                    </div>
    
                    <div className="childListView">
                    <Tabs
                        defaultActiveKey="1"
                        onChange={this.onChange}
                        className="demo1-tabs"
                        extraContent={
                            <div className="addAndDelChildList demoPadding" style={{display:_props.isEdit?'':'none'}} >
                                 <ButtonGroup style={{ margin: 1 }}>
                                    <Button shape='border' onClick={this.add.bind(this)}><Icon type='uf-add-c-o' /></Button>
                                    <Button shape='border' onClick={this.del.bind(this)}><Icon type='uf-reduce-c-o' /></Button>
                                  </ButtonGroup>
                            </div>
                            }
                    >
                        <TabPane tab='投放计划' key="1"> <ChildListView { ...this } ref="onTheLoan" onRef={this.onRef}/></TabPane>
                        <TabPane tab='保证金计划' key="2"> <ChildListView { ...this } ref="marginLoan" /></TabPane>
                        <TabPane tab='手续费计划' key="3"> <ChildListView { ...this } ref="commissionLoan" /></TabPane>
                        <TabPane tab='中间费用支出计划' key="4"> <ChildListView { ...this } ref="middleCostLoan" /></TabPane>
                        <TabPane tab='其他收支计划' key="5"> <ChildListView { ...this } ref="otherLoan" /></TabPane>
                        <TabPane tab='租金计划' key="6"> <ChildListView { ...this } ref="rentLoan" /></TabPane>
                    </Tabs>
                    </div>
                </div>  
            );
            
        }else{
            return <div></div>
        }
        
    }
}

export default Form.createForm()(FormView);