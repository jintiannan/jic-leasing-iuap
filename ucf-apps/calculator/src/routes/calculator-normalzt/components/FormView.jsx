import React, { Component } from 'react';
import { Form, Icon, Button, Label, Switch, Checkbox, Radio, Select, Col, Row, FormControl, Collapse, Tabs, ButtonGroup } from 'tinper-bee';
import { deepClone,Info } from "utils";
import { SelectField } from 'components/RowField/SelectField'
import FormSplitHeader from 'components/FormSplitHeader'
import DatePicker from "tinper-bee/lib/Datepicker";
import FormInputNumber from 'components/FormRef/FormInputNumber';
import ChildListView1 from './ChildListView1';
import ChildListView2 from './ChildListView2';
import ChildListView3 from './ChildListView3';
import ChildListView4 from './ChildListView4';
import ChildListView5 from './ChildListView5';
import ChildListView6 from './ChildListView6';
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
            activeKey: 1,
            open: true, //各个标签
            open2: true,
            open3: true,
            open4: true,
            open5: true,
            open6: true,
            
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
        //console.log(`onChange ${activeKey} o-^-o`);
        this.setState({
            activeKey,
        });
    }

    //字表添加数据
    add=()=>{
        let key = this.state.activeKey;
        let childs = "child" + key;
        let dataSource = deepClone(this[childs].state.dataSource);
        let index = dataSource.length + 1;
        let newData = {
            index: index,  //序号
            cIsEdit: true, //转为c字段提供 可不可编辑判断
        };
        let isEditArray = this[childs].state.isEditArray;
        isEditArray.push([]);
        dataSource.push(newData);
        this[childs].setState({
            dataSource:dataSource,
            isEditArray: isEditArray
        });
    }
    //字表删除数据
    del=(index)=>{
        let key = this.state.activeKey;
        let childs = "child" + key;
        let dataSource = deepClone(this[childs].state.dataSource);
        dataSource.splice(dataSource.length-1,1);
        this[childs].setState({
            dataSource:dataSource
        });
    }

    //onChange事件
    handleChange = (value) =>{
        if(value == '01'){
            
        }
    }

    //绑定子组件
    onRef1 = (ref) => {
        this.child1 = ref;        
    }

    //绑定子组件2
    onRef2 = (ref) => {
        this.child2 = ref;        
    }

    //绑定子组件3
    onRef3 = (ref) => {
        this.child3 = ref;        
    }
    //绑定子组件4
    onRef4 = (ref) => {
        this.child4 = ref;        
    }
    //绑定子组件5
    onRef5 = (ref) => {
        this.child5 = ref;        
    }

    //绑定子组件6
    onRef6 = (ref) => {
        this.child6 = ref;        
    }

    mainForm1 = [
        {label:'测算方案名称',field:'quot_name',com:FormControl,required:true},
        {label:'限额方案',field:'pk_limit_plan',com:TableFormRef,required:true},
        {label:'租赁方式',field:'lease_method',com:Select,required:true,data:[{key:'直租',value:'0'},{key:'回租',value:'1'}]},
        {label:'本金是否开票',field:'if_corpus_tickets',com:Select,required:true,data:[{key:'是',value:'0'},{key:'否',value:'1'}]},
        {label:'租金税率',field:'rent_tax_rate',com:Select,required:true,data:[{key:'0%',value:'0'},{key:'3%',value:'3'},{key:'6%',value:'6'},{key:'10%',value:'10'}]},
        {label:'税种',field:'pk_currtype',com:Select,required:true,data:[{key:'增值税',value:'1'},{key:'营业税',value:'2'},{key:'复合税',value:'3'},{key:'无',value:'0'}]},
        {label:'投放日期',field:'plan_date_loan',com:DatePicker,required:true,format:'YYYY-MM-DD'},
        {label:'投放金额',field:'total_amount_equipment',com:FormInputNumber,required:true,toThousands:true,precision:2},
        {label:'租赁本金',field:'fact_cash_loan',com:FormInputNumber,required:true,toThousands:true,precision:2},
        {label:'净融资比例',field:'project_manager',com:FormInputNumber,required:true,toPercent:true,precision:4},
        {label:'净融资额(元)',field:'net_finance_cash',com:FormInputNumber,required:true,toThousands:true,precision:2},
    ]

    mainForm2 = [
        {label:'留购价款(元)',field:'nominal_price',com:FormInputNumber,toThousands:true,precision:2,required:true},
        {label:'保证金比例',field:'deposit_ratio',com:FormInputNumber,required:true,toPercent:true,precision:4},
        {label:'保证金金额',field:'deposit_cash',com:FormInputNumber,required:true,toThousands:true,precision:2},
    ]

    mainForm3 = [
        {label:'手续费收取方式',field:'srvfee_method_in',com:Select,required:true,data:[{key:'每满一年收取',value:'0'},{key:'每年年初收取',value:'1'},{key:'初期收取',value:'2'}]},
        {label:'手续费比例',field:'srvfee_ratio_in',com:TableFormRef,required:true,toPercent:true,precision:4},
        {label:'首期手续费金额(元)',field:'srvfee_cash_in_ft',com:FormInputNumber,required:true,toThousands:true,precision:2},
        {label:'手续费总金额(元)',field:'srvfee_cash_in',com:Select,required:true,toThousands:true,precision:2},
        {label:'手续费收入税率(增值税)',field:'srvfee_taxrate_in',com:FormControl,required:true},
        {label:'中间费用支出方式',field:'lease_cal_method',com:Select,required:true,data:[{key:'指定支付',value:'0'},{key:'每满一年支付',value:'1'},{key:'每年年初支付',value:'2'}]},
        {label:'首期中间费用支出时间',field:'srvfee_date_out_ft',com:DatePicker,required:true,format:'YYYY-MM-DD'},
        {label:'首期中间费用支出金额(元)',field:'srvfee_cash_out_ft',com:FormInputNumber,required:true,toThousands:true,precision:2},
        {label:'中间费用支出总金额(元)',field:'fact_cash_loan',com:FormInputNumber,required:true,toThousands:true,precision:2},
        {label:'中间费用支出税率(增值税)',field:'srvfee_taxrate_out',com:Select,required:true,data:[{key:'3%',value:'3'},{key:'6%',value:'6'},{key:'17%',value:'17'}
        ,{key:'0%',value:'0'},{key:'11%',value:'11'},{key:'16%',value:'16'},{key:'10%',value:'10'}
        ,{key:'13%',value:'13'},{key:'9%',value:'9'}
        ]},
        
    ]

    mainForm4 = [
        {label:'租赁期限(月)',field:'lease_times',com:FormControl,required:true},
        {label:'先付后付标志',field:'prepay_or_not',com:Select,required:true,data:[{key:'先付',value:'0'},{key:'后付',value:'1'}]},
        {label:'支付频率',field:'lease_freq',com:Select,required:true,data:[{key:'月',value:'0'},{key:'双月',value:'1'},{key:'季',value:'2'}
        ,{key:'四月',value:'1'},{key:'半年',value:'1'},{key:'年',value:'1'}]},
        {label:'计算方式',field:'lease_cal_method',com:Select,required:true,data:[{key:'等额租金',value:'0'},{key:'等额本金',value:'1'},{key:'平息法',value:'2'}]},
        {label:'总投放金额的计息方式',field:'interest_method_total_loan',com:Select,required:true,data:[{key:'约定计息(第一笔投放)',value:'0'},{key:'按投放时间点计息',value:'1'}]},
        {label:'现金流日期计算方式',field:'pk_currtype',com:Select,required:true,data:[{key:'360',value:'0'},{key:'365',value:'1'}]},
       
    ]

    mainForm5 = [
        {label:'报价利率',field:'final_rate',com:FormInputNumber,required:true,toThousands:true,precision:2},
        {label:'基准利率',field:'interrate',com:FormInputNumber,required:true,toPercent:true,precision:6},
        {label:'支付频率',field:'cal_digit',com:Select,required:true,data:[{key:'分',value:'0'},{key:'元',value:'1'}]},
        {label:'年化天数',field:'year_days',com:Select,required:true,data:[{key:'360',value:'0'},{key:'365',value:'1'}]},
        {label:'利率类型',field:'interrate_type',com:Select,required:true,data:[{key:'0%',value:'0'},{key:'3%',value:'3'},{key:'6%',value:'6'},{key:'10%',value:'10'}]},
        {label:'币种',field:'pk_currtype',com:Select,required:true,data:[{key:'人民币',value:'0'},{key:'多币种',value:'1'},{key:'欧元',value:'1'}
        ,{key:'港元',value:'1'},{key:'日元',value:'1'},{key:'澳门元',value:'1'},{key:'美元',value:'1'}]},
        {label:'利率浮动方式',field:'float_method',com:Select,required:true,data:[{key:'百分比',value:'0'},{key:'绝对值',value:'1'}]},
        {label:'利率生效日期',field:'pk_interrate',com:TableFormRef,required:true},
        {label:'利率档次',field:'interrate_level',com:FormControl,required:true},
        {label:'利率浮动值(%)',field:'project_mfloat_valueanager',com:FormInputNumber,required:true,toPercent:true,precision:6},
    ]

    mainForm6 = [
        {label:'会计IRR按最新算法',field:'finace_irr_method',com:FormControl,required:true},
        {label:'会计IRR算法启用年份',field:'finace_irr_year',com:FormControl,required:true},
        {label:'市场IRR',field:'project_irr',com:FormControl,required:true},
        {label:'市场去税IRR',field:'project_notax_irr',com:FormControl,required:true},
        {label:'会计IRR',field:'finance_irr',com:FormControl,required:true},
        {label:'会计去税IRR',field:'finance_notax_irr',com:FormControl,required:true},
    ]

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let _formObject = this.props.formObject;
        let formObject = deepClone(_formObject);
        let _props = this.props;
        if(_props.showForm){
            return (
                <div className='commom-form'>
                    
                
                    <div className='calculatorNormalztForm'>
                    <div>
                        <span onClick={() => this.setState({ open: !this.state.open })} >
                        <FormSplitHeader title={'投放信息'} />
                        </span>
                    </div>
                    <Collapse in={this.state.open}>
                            <Form>
                           
                                        <div>
                                            {
                                                this.mainForm1.map((value,key) => {
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
                                                                format = {value.format}
                                                                iconStyle = {value.iconStyle}
                                                                toThousands = {value.toThousands}
                                                                precision = {value.precision}
                                                                toPercent = {value.toPercent}
                                                                disabled={!_props.isEdit}
                                                                data = {value.data}
                                                                {
                                                                    ...getFieldProps(value.field, {
                                                                        initialValue: formObject[value.field],
                                                                        rules: [{
                                                                            required: true, 
                                                                        }],
                                                                    })
                                                                }>
                                                            </value.com>
                                                        </FormItem>    
                                                    </Col>)
                                                })
                                            }
                                            
                                           </div>
    
                            </Form>
    
                    </Collapse>
                    
                    
                    <div>
                        <span onClick={() => this.setState({ open2: !this.state.open2 })} >
                        <FormSplitHeader title={'留购价款及保证金设置'} />
                        </span>
                    </div>
                        <Collapse in={this.state.open2}>
                        <Form>
                           
                        <div>
                                            {
                                                this.mainForm2.map((value,key) => {
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
                                                                format = {value.format}
                                                                iconStyle = {value.iconStyle}
                                                                toThousands = {value.toThousands}
                                                                precision = {value.precision}
                                                                toPercent = {value.toPercent}
                                                                disabled={!_props.isEdit}
                                                                data = {value.data}
                                                                {
                                                                    ...getFieldProps(value.field, {
                                                                        initialValue: formObject[value.field],
                                                                        rules: [{
                                                                            required: true, 
                                                                        }],
                                                                    })
                                                                }>
                                                            </value.com>
                                                        </FormItem>    
                                                    </Col>)
                                                })
                                            }
                                            
                                           </div>

                        </Form>
                        </Collapse>
                    
    
                    <div>
                        <span onClick={() => this.setState({ open3: !this.state.open3 })} >
                        <FormSplitHeader title={'手续费及中间费用支出设置'} />
                        </span>
                    </div>
                        <Collapse in={this.state.open3}>
    
                        <Form>

                        <div>
                                            {
                                                this.mainForm3.map((value,key) => {
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
                                                                format = {value.format}
                                                                iconStyle = {value.iconStyle}
                                                                toThousands = {value.toThousands}
                                                                precision = {value.precision}
                                                                toPercent = {value.toPercent}
                                                                disabled={!_props.isEdit}
                                                                data = {value.data}
                                                                {
                                                                    ...getFieldProps(value.field, {
                                                                        initialValue: formObject[value.field],
                                                                        rules: [{
                                                                            required: true, 
                                                                        }],
                                                                    })
                                                                }>
                                                            </value.com>
                                                        </FormItem>    
                                                    </Col>)
                                                })
                                            }
                                            
                                           </div>
                        
                        </Form>

                        </Collapse>
                    

                    <div>
                        <span onClick={() => this.setState({ open4: !this.state.open4 })} >
                        <FormSplitHeader title={'收租设置'} />
                    </span>
                    </div>
                        <Collapse in={this.state.open4}>
    
                        <Form>
                        <div>
                                            {
                                                this.mainForm4.map((value,key) => {
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
                                                                format = {value.format}
                                                                iconStyle = {value.iconStyle}
                                                                toThousands = {value.toThousands}
                                                                precision = {value.precision}
                                                                toPercent = {value.toPercent}
                                                                disabled={!_props.isEdit}
                                                                data = {value.data}
                                                                {
                                                                    ...getFieldProps(value.field, {
                                                                        initialValue: formObject[value.field],
                                                                        rules: [{
                                                                            required: true, 
                                                                        }],
                                                                    })
                                                                }>
                                                            </value.com>
                                                        </FormItem>    
                                                    </Col>)
                                                })
                                            }
                                            
                                           </div>
                        </Form>
    
                        </Collapse>
                    

                    <div>
                        <span onClick={() => this.setState({ open5: !this.state.open5 })} >
                        <FormSplitHeader title={'租息率设置'} />
                    </span>
                    </div>
                        <Collapse in={this.state.open5}>
    
                        <Form>
                        <div>
                                            {
                                                this.mainForm5.map((value,key) => {
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
                                                                format = {value.format}
                                                                iconStyle = {value.iconStyle}
                                                                toThousands = {value.toThousands}
                                                                precision = {value.precision}
                                                                toPercent = {value.toPercent}
                                                                disabled={!_props.isEdit}
                                                                data = {value.data}
                                                                {
                                                                    ...getFieldProps(value.field, {
                                                                        initialValue: formObject[value.field],
                                                                        rules: [{
                                                                            required: true, 
                                                                        }],
                                                                    })
                                                                }>
                                                            </value.com>
                                                        </FormItem>    
                                                    </Col>)
                                                })
                                            }
                                            
                                           </div>
                        </Form>
    
                        </Collapse>
                    

                    <div>
                        <span onClick={() => this.setState({ open6: !this.state.open6 })} >
                        <FormSplitHeader title={'IRR信息'} />
                        </span>
                    </div>
                        <Collapse in={this.state.open6}>
    
                        <Form>
                        <div>
                                            {
                                                this.mainForm6.map((value,key) => {
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
                                                                format = {value.format}
                                                                iconStyle = {value.iconStyle}
                                                                toThousands = {value.toThousands}
                                                                precision = {value.precision}
                                                                toPercent = {value.toPercent}
                                                                disabled={!_props.isEdit}
                                                                data = {value.data}
                                                                {
                                                                    ...getFieldProps(value.field, {
                                                                        initialValue: formObject[value.field],
                                                                        rules: [{
                                                                            required: true, 
                                                                        }],
                                                                    })
                                                                }>
                                                            </value.com>
                                                        </FormItem>    
                                                    </Col>)
                                                })
                                            }
                                            
                                           </div>
                        </Form>
    
                        </Collapse>
                    
                        </div>

                   
    
                    <div className="childListView">
                    <Tabs
                        defaultActiveKey="1"
                        onChange={this.onChange}
                        className="list-tabs"
                        extraContent={
                            <div className="addAndDelChildList demoPadding" style={{display:_props.isEdit?'':'none'}} >
                                 <ButtonGroup style={{ margin: 1 }}>
                                    <Button shape='border' onClick={this.add.bind(this)}><Icon type='uf-add-c-o' /></Button>
                                    <Button shape='border' onClick={this.del.bind(this)}><Icon type='uf-reduce-c-o' /></Button>
                                  </ButtonGroup>
                            </div>
                            }
                    >
                        <TabPane tab='投放计划' key="1"> <ChildListView1 { ...this } ref="onTheLoan" onRef={this.onRef1}/></TabPane>
                        <TabPane tab='保证金计划' key="2"> <ChildListView2 { ...this } ref="marginLoan" onRef={this.onRef2}/></TabPane>
                        <TabPane tab='手续费计划' key="3"> <ChildListView3 { ...this } ref="commissionLoan" onRef={this.onRef3}/></TabPane>
                        <TabPane tab='中间费用支出计划' key="4"> <ChildListView4 { ...this } ref="middleCostLoan" onRef={this.onRef4}/></TabPane>
                        <TabPane tab='其他收支计划' key="5"> <ChildListView5 { ...this } ref="otherLoan" onRef={this.onRef5}/></TabPane>
                        <TabPane tab='租金计划' key="6"> <ChildListView6 { ...this } ref="rentLoan" onRef={this.onRef6}/></TabPane>
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