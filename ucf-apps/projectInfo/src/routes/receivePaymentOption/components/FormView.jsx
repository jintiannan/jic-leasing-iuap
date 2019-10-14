import React, { Component } from 'react';
import { Form, Icon, Button, Label, Switch, Checkbox, Radio, Select, Col, Row, FormControl, Collapse, Tabs, ButtonGroup } from 'tinper-bee';
import { deepClone,Info } from "utils";
import { SelectField } from 'components/RowField/SelectField'
import FormSplitHeader from 'components/FormSplitHeader'
import DatePicker from "tinper-bee/lib/Datepicker";
import FormInputNumber from 'components/FormRef/FormInputNumber';
import ChildListView from './ChildListView';
import TableFormRef from 'components/FormRef/TableFormRef';
import {enumConstant} from "../../../../../../ucf-common/src/utils/enums";
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
            open6: true


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
        };
        let isEditArray = this[childs].state.isEditArray;
        isEditArray?isEditArray.push([]):isEditArray=[];
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

    form = [
        {label:'测算方案名称',field:'quot_name',com:FormControl, disabled: true},
        {label:'税种',field:'tax_mode',com:Select, data: enumConstant(""), disabled: true},
        {label:'租赁方式',field:'lease_method',com:Select, data: enumConstant(""), disabled: true},
        {label:'投放日期',field:'plan_date_loan',com:TableFormRef, disabled: true},
        {label:'起租日',field:'lease_commencement_date',com:TableFormRef, disabled: true},
        {label:'首付款比例',field:'down_payment_ratio',com:FormControl, disabled: true},
        {label:'设备总金额(元)',field:'total_amount_equipment',com:FormControl, disabled: true},
        {label:'首付款金额(元)',field:'down_payment',com:FormControl, disabled: true},
        {label:'留购价(元)',field:'nominal_price',com:FormControl, disabled: true},
        {label:'商业折扣(元)',field:'trade_discount',com:FormControl, disabled: true},
        {label:'资产余值(元)',field:'assets_margin',com:FormControl, disabled: true},
        {label:'净融资比例',field:'net_finance_ratio',com:FormControl, disabled: true},
        {label:'净融资额(元)',field:'net_finance_cash',com:FormControl, disabled: true},
        {label:'是否作为标准模板',field:'if4basic',com:Select, data: enumConstant(""), disabled: true},
        {label:'备注',field:'memo',com:FormControl, disabled: true}
    ];

    form2 = [
        {label:'保证金收取方式',field:'deposit_method',com:Select, data: enumConstant(""), disabled: true},
        {label:'保证金退回方式',field:'return_method_depos',com:Select, data: enumConstant(""), disabled: true},
        {label:'保证金比例',field:'deposit_ratio',com:FormControl, disabled: true},
        {label:'保证金金额(元)',field:'deposit_cash',com:FormControl, disabled: true},
        {label:'保证金是否计息',field:'if_interest_depos',com:Select, data: enumConstant(""), disabled: true},
        {label:'保证金年利率类型',field:'interrate_type_depos',com:Select, data: enumConstant(""), disabled: true},
        {label:'保证金年利率档次',field:'interrate_level_depos',com:Select, data: enumConstant(""), disabled: true},
        {label:'保证金浮动方式',field:'float_method_depos',com:Select, data: enumConstant(""), disabled: true},
        {label:'利率生效日期',field:'pk_interrate_depos',com:TableFormRef, disabled: true},
        {label:'保证金基准年利率',field:'interrate_depos',com:FormControl, disabled: true},
        {label:'保证金浮动比例',field:'float_value_depos',com:FormControl, disabled: true},
        {label:'保证金利率',field:'final_rate_depos',com:FormControl, disabled: true},
        {label:'保证金收取说明',field:'memo_depos',com:FormControl, disabled: true}
    ];

    form3 = [
        {label:'手续费收入方式',field:'srvfee_method_in',com:Select, data: enumConstant(""), disabled: true},
        {label:'手续费收入比例',field:'srvfee_ratio_in',com:FormControl, disabled: true},
        {label:'手续费收入基数',field:'srvfee_base',com:Select, data: enumConstant(""), disabled: true},
        {label:'首期手续费收入金额(元)',field:'srvfee_cash_in_ft',com:FormControl, disabled: true},
        {label:'手续费收入总金额(元)',field:'srvfee_cash_in',com:FormControl, disabled: true},
        {label:'中间费用支出方式',field:'srvfee_method_out',com:Select, data: enumConstant(""), disabled: true},
        {label:'首期中间费用支出时间',field:'srvfee_date_out_ft',com:TableFormRef, disabled: true},
        {label:'中间费用支出比例',field:'srvfee_ratio_out',com:FormControl, disabled: true},
        {label:'首期中间费用支出金额(元)',field:'srvfee_cash_out_ft',com:FormControl, disabled: true},
        {label:'中间费用支出总金额(元)',field:'srvfee_cash_out',com:FormControl, disabled: true},
        {label:'中间费用支出税率',field:'srvfee_taxrate_out',com:Select, data: enumConstant(""), disabled: true}
    ];

    form4 = [
        {label:'计划收租日',field:'plan_lease_date',com:Select, data: enumConstant(""), disabled: true},
        {label:'租赁期限（月）',field:'lease_times',com:FormControl, disabled: true},
        {label:'特殊算法设置',field:'cal_method_spec',com:Select, data: enumConstant(""), disabled: true},
        {label:'收租规则周期',field:'lease_period_rule',com:Select, data: enumConstant(""), disabled: true},
        {label:'先付后付标志',field:'prepay_or_not',com:Select, data: enumConstant(""), disabled: true},
        {label:'是否指定首期收租日',field:'has_first_lease_date',com:Select, data: enumConstant(""), disabled: true},
        {label:'首期收租日期',field:'first_lease_date',com:TableFormRef, disabled: true},
        {label:'项目预计到期日',field:'final_date',com:TableFormRef, disabled: true},
        {label:'最后一期提前天数',field:'last_term_days',com:FormControl, disabled: true},
        {label:'租金表调整对象',field:'lease_adjust_type',com:Select, data: enumConstant(""), disabled: true},
        {label:'提前间隔（月）',field:'interval_in_advance',com:FormControl, disabled: true},
        {label:'延迟期(日)',field:'delay_period',com:FormControl, disabled: true}
    ];

    form5 = [
        {label:'年化天数',field:'year_days',com:Select, data: enumConstant(""), disabled: true},
        {label:'计算精度',field:'cal_digit',com:Select, data: enumConstant(""), disabled: true},
        {label:'利率类型',field:'interrate_type',com:Select, data: enumConstant(""), disabled: true},
        {label:'利率浮动方式',field:'float_method',com:Select, data: enumConstant(""), disabled: true},
        {label:'利率生效日期',field:'pk_interrate',com:TableFormRef, disabled: true},
        {label:'利率档次',field:'interrate_level',com:Select, data: enumConstant(""), disabled: true},
        {label:'基准利率',field:'interrate',com:FormControl, disabled: true},
        {label:'利率浮动值',field:'float_value',com:FormControl, disabled: true},
        {label:'报价利率',field:'final_rate',com:FormControl, disabled: true}
    ];

    form6 = [
        {label:'市场IRR',field:'commercial_irr',com:FormControl, disabled: true},
        {label:'增值税下IRR',field:'vat_irr',com:FormControl, disabled: true},
        {label:'会计IRR',field:'finance_irr',com:FormControl, disabled: true},
        {label:'租金IRR',field:'rent_irr',com:FormControl, disabled: true},
        {label:'项目IRR',field:'project_irr',com:FormControl, disabled: true},
        {label:'项目去税IRR',field:'project_notax_irr',com:FormControl, disabled: true},
        {label:'手续费分配IRR',field:'fee_distr_irr',com:FormControl, disabled: true},
        {label:'项目平息率',field:'project_average_interrate',com:FormControl, disabled: true},
        {label:'单据状态',field:'billstatus',com:Select, data: enumConstant(""), disabled: true},
        {label:'操作员',field:'pk_operator',com:TableFormRef, disabled: true},
        {label:'操作日期',field:'operate_date',com:TableFormRef, disabled: true},
        {label:'操作时间',field:'operate_time',com:FormControl, disabled: true},
        {label:'审核员',field:'pk_checker',com:TableFormRef, disabled: true},
        {label:'审核日期',field:'check_date',com:TableFormRef, disabled: true},
        {label:'审核时间',field:'check_time',com:FormControl, disabled: true},
        {label:'机构',field:'pk_org',com:TableFormRef, disabled: true}
    ];






    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let _formObject = this.props.formObject;
        let formObject = deepClone(_formObject);
        let _props = this.props;
        const loop = data => data.map((value, key) => {
            return (
                <Col md={value.col ? value.col : 4} xs={value.col ? value.col : 4} sm={value.col ? value.col : 4}>
                    <FormItem
                        className={(value.col === 12 ? (value.class && value.class === 'textarea' ? "remark flex jic-textArea" : "remark flex ") : '')}>
                        <Label className={value.col === 12 ? "line-height-32" : ''}>
                            {(value.required && value.required === true) ?
                                <Icon type="uf-mi" className='mast'></Icon> : ''}
                            {value.label}
                        </Label>
                        <value.com {...this.props}
                                   title={value.label}
                                   name={value.field}
                                   disabled={value.disabled ? value.disabled : !this.props.isEdit}
                                   data={value.data ? value.data : ''}
                                   toThousands={value.com === FormInputNumber ? (value.toThousands ? value.toThousands : true) : ''}  //是否显示千分位
                                   precision={value.com === FormInputNumber ? (value.precision ? value.precision : 2) : ''} //保留2位小数
                                   componentClass={value.class ? value.class : 'input'}
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
        });

        if(_props.showForm){
            return (
                <div>


                    <div className='jic-form'>
                        <div>
                        <span onClick={() => this.setState({ open: !this.state.open })} >
                        <FormSplitHeader title={'投放信息'} />
                        </span>
                        </div>
                        <Collapse in={this.state.open}>
                            <Form>
                                {loop(this.form)}

                            </Form>

                        </Collapse>

                        <div>
                        <span onClick={() => this.setState({ open: !this.state.open2 })} >
                        <FormSplitHeader title={'保证金设置'} />
                        </span>
                        </div>
                        <Collapse in={this.state.open2}>
                            <Form>
                                {loop(this.form2)}

                            </Form>

                        </Collapse>

                        <div>
                        <span onClick={() => this.setState({ open: !this.state.open3 })} >
                        <FormSplitHeader title={'服务费设置'} />
                        </span>
                        </div>
                        <Collapse in={this.state.open3}>
                            <Form>
                                {loop(this.form3)}

                            </Form>

                        </Collapse>

                        <div>
                        <span onClick={() => this.setState({ open: !this.state.open4 })} >
                        <FormSplitHeader title={'收租设置'} />
                        </span>
                        </div>
                        <Collapse in={this.state.open4}>
                            <Form>
                                {loop(this.form4)}

                            </Form>

                        </Collapse>

                        <div>
                        <span onClick={() => this.setState({ open: !this.state.open5 })} >
                        <FormSplitHeader title={'租息率设置'} />
                        </span>
                        </div>
                        <Collapse in={this.state.open5}>
                            <Form>
                                {loop(this.form5)}

                            </Form>

                        </Collapse>

                        <div>
                        <span onClick={() => this.setState({ open: !this.state.open6 })} >
                        <FormSplitHeader title={'测算结果'} />
                        </span>
                        </div>
                        <Collapse in={this.state.open6}>
                            <Form>
                                {loop(this.form6)}

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
                            <TabPane tab='子表信息' key="1"> <ChildListView { ...this } ref="onTheLoan" onRef={this.onRef1}/></TabPane>
                            {/*<TabPane tab='保证金计划' key="2"> <ChildListView2 { ...this } ref="marginLoan" onRef={this.onRef2}/></TabPane>*/}
                            {/*<TabPane tab='手续费计划' key="3"> <ChildListView3 { ...this } { ...this.props } ref="commissionLoan" onRef={this.onRef3}/></TabPane>*/}
                            {/*<TabPane tab='中间费用支出计划' key="4"> <ChildListView4 { ...this } ref="middleCostLoan" onRef={this.onRef4}/></TabPane>*/}
                            {/*<TabPane tab='其他收支计划' key="5"> <ChildListView5 { ...this } ref="otherLoan" onRef={this.onRef5}/></TabPane>*/}
                            {/*<TabPane tab='租金计划' key="6"> <ChildListView6 { ...this } ref="rentLoan" onRef={this.onRef6}/></TabPane>*/}
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