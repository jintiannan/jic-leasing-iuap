import Rect, {Component} from 'react'
import FormSplitHeader from 'components/FormSplitHeader'
import FormInputNumber from 'components/FormRef/FormInputNumber';
import TableFormRef from 'components/FormRef/TableFormRef';
import {
    Form,
    Icon,
    Button,
    Label,
    Select,
    Col,
    Row,
    FormControl,
    Collapse,

} from 'tinper-bee';
import {deepClone} from "utils";
import moment from "moment";
import DatePicker from "tinper-bee/lib/Datepicker";
import './index.less';
import {enumConstant} from "../../../../../../ucf-common/src/utils/enums";
import FormTreeRef from "../../../../../../ucf-common/src/components/FormTreeRef/FormTreeRef";
const format = "YYYY-MM-DD";
const format_time = "YYYY-MM-DD HH:mm:ss";

const dateInputPlaceholder = "选择日期";

const FormItem = Form.FormItem;

class BaseInfo extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            open1: true,
            open2: true,
            open3: true,
            open4: true,
            open5: true,
            open6: true,
            open7: true,
            open8: true,
            open9: true,
            open10: true,
            open11: true,
            open12: true


        };
    }

    form999 = [
        {label:'客户名称',field:'customer_name',com:FormControl,required:true},
        // , disabled: true
        {label: '是否授权征信客户', field: 'if_warrant_cust', com: Select, data: enumConstant("yesOrNo"), required: true},
        {label: '客户性质', field: 'customer_property', com: FormTreeRef, required: true},
        {label: '经济性质', field: 'economic_type', com: TableFormRef, required: true},
        {label: '营业收入', field: 'operating_income', com: FormInputNumber},
        {label: '最新年检日期', field: 'recent_inspect_date', com: DatePicker},

    ];

    form = [
        {label:'立项名称',field:'pk_project_approval',com:TableFormRef},
        {label:'立项编码',field:'pk_project_approval.code',com:FormControl, disabled: true},
        {label:'承租人名称',field:'pk_consumer',com:TableFormRef},
        {label:'项目名称',field:'project_name',com:FormControl},
        {label:'项目编号',field:'project_code',com:FormControl, disabled: true},
        {label:'项目批次',field:'project_batch',com:FormControl},
        {label:'项目状态',field:'project_status',com:Select, data: enumConstant(""), disabled: true},
        {label:'租赁类别',field:'lease_categry',com:Select, data: enumConstant("")},
        {label:'项目类型',field:'project_type',com:Select, data: enumConstant("")},
        {label:'项目来源',field:'project_source',com:Select, data: enumConstant("")},
        {label:'租赁方式',field:'lease_type',com:Select, data: enumConstant("")},
        {label:'回租类别',field:'leaseback_type',com:Select, data: enumConstant(""), disabled: true},
        {label:'项目税种',field:'project_tax_type',com:Select, data: enumConstant(""), disabled: true},
        {label:'是否投保',field:'is_insure',com:Select, data: enumConstant("")},
        {label:'是否有共同承租人',field:'if_co_lessee',com:Select, data: enumConstant("")},
        {label:'客户评级',field:'client_rating',com:TableFormRef, disabled: true},
        {label:'预计投放日期',field:'plan_release_date',com:TableFormRef},
        {label:'项目金额',field:'release_amount',com:FormControl},
        {label:'设备金额',field:'purchase_total_amount',com:FormControl},
        {label:'资金渠道',field:'funding_sources',com:Select, data: enumConstant("")},
        {label:'交易框架',field:'trading_schemes',com:Select, data: enumConstant("")},
        {label:'项目风险',field:'project_sort',com:Select, data: enumConstant("")},
        {label:'项目主办人',field:'pk_cust_main',com:TableFormRef},
        {label:'项目协办人',field:'pk_cust_help',com:TableFormRef},
        {label:'确认业务领域',field:'industry_type',com:TableFormRef, disabled: true},
        {label:'资金用途',field:'capital_use',com:FormControl, disabled: true},
        {label:'是否项目合同一一对应',field:'is_onetoone',com:Select, data: enumConstant("")},
        {label:'实际融资客户',field:'pk_cust_finance',com:TableFormRef},
        {label:'是否预约资金',field:'is_precapital',com:Select, data: enumConstant("")},
        {label:'出租方账户',field:'pk_account',com:TableFormRef},
        {label:'出租方账号',field:'pk_account.code',com:FormControl, disabled: true},
        {label:'出租方开户银行',field:'pk_account.account_bank',com:FormControl, disabled: true},
        {label:'是否允许提前还款',field:'is_canrefund',com:Select, data: enumConstant("")},
        {label:'出租方开户银行行号',field:'pk_account.bank_no',com:FormControl, disabled: true},
        {label:'提前还款期限(月)',field:'refund_times',com:FormControl},
        {label:'提前还款手续费率(%)',field:'refund_rate',com:FormControl},
        {label:'地区审批总额',field:'pk_project_approval.area_approve_total',com:FormControl, disabled: true},
        {label:'地区实际投放总额',field:'pk_project_approval.area_loan_total',com:FormControl, disabled: true},
        {label:'地区剩余投放总额',field:'pk_project_approval.area_surplus_total',com:FormControl, disabled: true},
        {label:'地区可用授信额度',field:'pk_project_approval.area_usable_total',com:FormControl, disabled: true},
        {label:'行业审批总额',field:'pk_project_approval.industry_approve_total',com:FormControl, disabled: true},
        {label:'行业实际投放总额',field:'pk_project_approval.industry_loan_total',com:FormControl, disabled: true},
        {label:'行业剩余投放总额',field:'pk_project_approval.industry_surplus_total',com:FormControl, disabled: true},
        {label:'行业可用授信额度',field:'pk_project_approval.industry_usable_total',com:FormControl, disabled: true},
        {label:'让利方式',field:'benefit_method',com:Select, data: enumConstant("")},
        {label:'宽限天数',field:'grace_days',com:FormControl},
        {label:'建议日扣减金额',field:'suggest_deduct_amt',com:FormControl},
        {label:'约定日扣减金额',field:'appoint_deduct_amt',com:FormControl},
    ];

    form1 = [
        {label:'授信分类',field:'limit_class',com:Select, data: enumConstant(""), disabled: true},
        {label:'授信类型',field:'granting_type',com:Select, data: enumConstant("")},
        {label:'本次授信额度',field:'limit_amt',com:FormControl},
        {label:'授信起始日期',field:'granting_start_date',com:TableFormRef},
        {label:'授信有效期',field:'granting_times',com:FormControl},
        {label:'授信截止日期',field:'granting_end_date',com:TableFormRef, disabled: true},
        {label:'原授信额度(元)',field:'granting_original_limit',com:FormControl, disabled: true},
        {label:'已用额度(元)',field:'granting_used_limit',com:FormControl, disabled: true},
        {label:'调整额度(元)',field:'granting_add_limit',com:FormControl, disabled: true},
        {label:'可用额度(元)',field:'granting_surplus_limit',com:FormControl, disabled: true},
        {label:'授信币种',field:'granting_currency',com:TableFormRef},
        {label:'租赁最大期限',field:'max_deadline',com:FormControl, disabled: true},
    ];

    form2 = [
        {label:'是否调息',field:'if_adjust',com:Select, data: enumConstant("")},
        {label:'调息渠道',field:'adjust_type',com:Select, data: enumConstant(""), disabled: true},
        {label:'调息响应方式',field:'adjust_time',com:Select, data: enumConstant(""), disabled: true},
        {label:'调息方法 ',field:'adjust_method',com:Select, data: enumConstant(""), disabled: true},
        {label:'调息起始日',field:'adjust_start_date',com:TableFormRef, disabled: true},    ];

    form3 = [
        {label:'承租人编码',field:'pk_consumer.code',com:FormControl, disabled: true},
        {label:'客户号',field:'pk_consumer.customer_no',com:FormControl, disabled: true},
        {label:'地区（省）',field:'pk_consumer.province',com:TableFormRef, disabled: true},
        {label:'地区（市）',field:'pk_consumer.city',com:TableFormRef, disabled: true},
        {label:'地区（县/区）',field:'pk_consumer.district',com:TableFormRef, disabled: true},
        {label:'行业门类',field:'pk_consumer.industry',com:TableFormRef, disabled: true},
        {label:'行业门类(大类)',field:'pk_consumer.industry1',com:FormControl, disabled: true},
        {label:'行业门类(中类)',field:'pk_consumer.industry2',com:FormControl, disabled: true},
        {label:'企业规模（内部管理）',field:'pk_consumer.enter_scale_inner',com:Select, data: enumConstant(""), disabled: true},
        {label:'企业规模（四部委）',field:'pk_consumer.enter_scale_6m',com:Select, data: enumConstant(""), disabled: true},
        {label:'法定代表人',field:'pk_consumer.legal_rep',com:FormControl, disabled: true},
        {label:'告知地址',field:'pk_consumer.inform_address',com:FormControl, disabled: true},
        {label:'经济性质',field:'pk_consumer.economic_type',com:FormControl, disabled: true},
        {label:'注册地址',field:'pk_consumer.reg_address',com:FormControl, disabled: true},
        {label:'实际控制人',field:'pk_consumer.customer_person',com:FormControl, disabled: true},
        {label:'注册币种',field:'pk_consumer.capital_cur',com:TableFormRef, disabled: true},    ];

    form4 = [
        {label:'报价名称',field:'projectCalculatorRefVO',com:TableFormRef, disabled: true},
        {label:'报价编号',field:'projectCalculatorRefVO.code',com:FormControl, disabled: true},
        {label:'租赁方式',field:'projectCalculatorRefVO.lease_method',com:Select, data: enumConstant(""), disabled: true},
        {label:'税种',field:'projectCalculatorRefVO.tax_mode',com:Select, data: enumConstant(""), disabled: true},
        {label:'租赁期限（月）',field:'projectCalculatorRefVO.lease_times',com:FormControl, disabled: true},
        {label:'支付频率',field:'projectCalculatorRefVO.lease_freq',com:Select, data: enumConstant(""), disabled: true},
        {label:'计算方式',field:'projectCalculatorRefVO.lease_cal_method',com:Select, data: enumConstant(""), disabled: true},
        {label:'报价利率',field:'projectCalculatorRefVO.final_rate',com:FormControl, disabled: true},
        {label:'净融资额(元)',field:'projectCalculatorRefVO.net_finance_cash',com:FormControl, disabled: true},
        {label:'商业折扣(元)',field:'projectCalculatorRefVO.trade_discount',com:FormControl, disabled: true},
        {label:'实际投放金额(元)',field:'projectCalculatorRefVO.fact_cash_loan',com:FormControl, disabled: true},
        {label:'首付款金额(元)',field:'projectCalculatorRefVO.down_payment',com:FormControl, disabled: true},
        {label:'保证金金额(元)',field:'projectCalculatorRefVO.deposit_cash',com:FormControl, disabled: true},
        {label:'服务费收入总金额(元)',field:'projectCalculatorRefVO.srvfee_cash_in',com:FormControl, disabled: true},
        {label:'服务费支出总金额(元)',field:'projectCalculatorRefVO.srvfee_cash_out',com:FormControl, disabled: true},
        {label:'总租金(元)',field:'projectCalculatorRefVO.lease_cash',com:FormControl, disabled: true},
        {label:'总利息(元)',field:'projectCalculatorRefVO.lease_interest',com:FormControl, disabled: true},
        {label:'总本金(元)',field:'projectCalculatorRefVO.lease_corpus',com:FormControl, disabled: true},
        {label:'市场IRR',field:'projectCalculatorRefVO.commercial_irr',com:FormControl, disabled: true},
        {label:'增值税下IRR',field:'projectCalculatorRefVO.vat_irr',com:FormControl, disabled: true},
        {label:'会计IRR',field:'projectCalculatorRefVO.finance_irr',com:FormControl, disabled: true},
        {label:'租金IRR',field:'projectCalculatorRefVO.rent_irr',com:FormControl, disabled: true},
        {label:'市场IRR',field:'projectCalculatorRefVO.project_irr',com:FormControl, disabled: true},
        {label:'项目去税IRR',field:'projectCalculatorRefVO.project_notax_irr',com:FormControl, disabled: true},
        {label:'手续费分配IRR',field:'projectCalculatorRefVO.fee_distr_irr',com:FormControl, disabled: true},
        {label:'租赁合同IRR',field:'projectCalculatorRefVO.contract_irr',com:FormControl, disabled: true},
        {label:'审计IRR',field:'projectCalculatorRefVO.audit_irr',com:FormControl, disabled: true},
        {label:'承租人IRR',field:'projectCalculatorRefVO.lessee_irr',com:FormControl, disabled: true},
        {label:'会计去税IRR',field:'projectCalculatorRefVO.finance_notax_irr',com:FormControl, disabled: true},    ];

    form5 = [
        {label:'租赁物名称',field:'projectRentThingRefVO.name',com:FormControl, disabled: true},
        {label:'租赁物编号',field:'projectRentThingRefVO.code',com:FormControl, disabled: true},
        {label:'型号',field:'projectRentThingRefVO.model',com:FormControl, disabled: true},
        {label:'租赁物分类',field:'projectRentThingRefVO.param_name',com:FormControl, disabled: true},
        {label:'设备总价',field:'projectRentThingRefVO.total_cost',com:FormControl, disabled: true},
        {label:'净值',field:'projectRentThingRefVO.net_worth',com:FormControl, disabled: true},
        {label:'估值',field:'projectRentThingRefVO.valuation',com:FormControl, disabled: true},
        {label:'交货日期',field:'projectRentThingRefVO.delivery_date',com:TableFormRef, disabled: true},
        {label:'交货地点',field:'projectRentThingRefVO.delivery_address',com:FormControl, disabled: true},
        {label:'使用地址',field:'projectRentThingRefVO.use_address',com:FormControl, disabled: true},    ];

    form6 = [
        {label:'担保方式',field:'projectPledgeRefVO.guarantee_method',com:FormControl, disabled: true},
        {label:'单位客户',field:'projectPledgeRefVO.corp_cust',com:FormControl, disabled: true},
        {label:'自然人客户',field:'projectPledgeRefVO.pers_cust',com:FormControl, disabled: true},
        {label:'担保总金额',field:'projectPledgeRefVO.plan_cash',com:FormControl, disabled: true},
        {label:'抵押金额',field:'projectPledgeRefVO.pledge_amount',com:FormControl, disabled: true},
        {label:'质押金额',field:'projectPledgeRefVO.prenda_amount',com:FormControl, disabled: true},
    ];

    form7 = [
        {label:'供应商合作协议',field:'pk_framework_agreem',com:TableFormRef},
        {label:'供应商限额方案',field:'pk_quota_scheme',com:TableFormRef, disabled: true},
        {label:'供应商限额结果',field:'quota_result',com:FormControl, disabled: true},    ];

    form8 = [
        {label:'项目部门(大区)',field:'belongs_area',com:TableFormRef},
        {label:'项目部门(片区)',field:'project_dept',com:TableFormRef},
        {label:'项目经理',field:'pk_prj_manager',com:TableFormRef},
        {label:'大区经理',field:'region_manager',com:TableFormRef},
        {label:'片区经理',field:'area_manager',com:TableFormRef},    ];

    form9 = [
        {label:'财务相关',field:'pk_consumer.finance_related',com:FormControl, disabled: true},
        {label:'设备相关',field:'pk_consumer.equipment_related',com:FormControl, disabled: true},
        {label:'其他部门',field:'pk_consumer.other_dept',com:FormControl, disabled: true},
        {label:'政府相关',field:'pk_consumer.government_related',com:FormControl, disabled: true},
        {label:'政府财政相关',field:'pk_consumer.govern_finance_related',com:FormControl, disabled: true},
        {label:'政府其他部门',field:'pk_consumer.govern_other_sectors',com:FormControl, disabled: true},    ];

    form10 = [
        {label:'保险费比例',field:'premium',com:FormControl},
        {label:'公证费比例',field:'notarial_fees_rate',com:FormControl},
        {label:'符合风险政策及准入标准',field:'is_fit_admittance',com:Select, data: enumConstant("")},
        {label:'审批文档生成规则',field:'pk_contract_rule',com:TableFormRef},    ];

    form11 = [
        {label:'项目审批审批结果',field:'project_approve_result',com:Select, data: enumConstant(""), disabled: true},
        {label:'项目审批日期',field:'project_approve_date',com:TableFormRef, disabled: true},    ];

    form12 = [
        {label:'单据状态',field:'billstatus',com:Select, data: enumConstant(""), disabled: true},
        {label:'操作人',field:'pk_operator',com:TableFormRef, disabled: true},
        {label:'操作日期',field:'operate_date',com:TableFormRef, disabled: true},
        {label:'操作时间',field:'operate_time',com:FormControl, disabled: true},
        {label:'审核人',field:'pk_checker',com:TableFormRef, disabled: true},
        {label:'审核日期',field:'check_date',com:TableFormRef, disabled: true},
        {label:'审核时间',field:'check_time',com:FormControl, disabled: true},
        {label:'机构',field:'pk_org',com:TableFormRef, disabled: true},
        {label:'所属公司',field:'pk_pro_org',com:TableFormRef},
        {label:'法定代表人',field:'pk_consumer.legal_representative',com:FormControl, disabled: true},
        {label:'合同金额(元)',field:'projectCalculatorRefVO.total_amount_equipment',com:FormControl, disabled: true},
        {label:'审批结果',field:'project_approve_note',com:FormControl, col: 12, class: 'textarea', disabled: true},
        {label:'租赁物类别',field:'lease_classification',com:Select, data: enumConstant("")},
        {label:'增信措施类别',field:'increase_credit_type',com:Select, data: enumConstant("")},
        {label:'行业门类(集团口径)',field:'pk_consumer.industry3',com:FormControl, disabled: true},
        {label:'会计IRR按最新算法',field:'projectCalculatorRefVO.finance_irr_method',com:Select, data: enumConstant(""), disabled: true},
        {label:'会计IRR算法启用年份',field:'projectCalculatorRefVO.finance_irr_year',com:Select, data: enumConstant(""), disabled: true},
        {label:'业务领域',field:'business_domain',com:TableFormRef, disabled: true},
        {label:'是否跨境业务',field:'ifCrossborder',com:Select, data: enumConstant("")},
        {label:'是否孵化及创新业务',field:'ifInnovate',com:Select, data: enumConstant("")},
        {label:'是否关联交易方',field:'ifRelation',com:Select, data: enumConstant("")},    ];
    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {

    }

    render () {
        const {getFieldProps, getFieldError} = this.props.form;
        // let _formObject = deepClone(this.props.formObject);
        let _formObject = this.props.formObject;
        let formObject = deepClone(_formObject);
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


        return (
            <div className="jic-form">

                <div>
                    <div> <span onClick={() => this.setState({open: !this.state.open})}>
                                        <FormSplitHeader open={this.state.open} title={'项目基本信息'}/>
                                      </span>
                    </div>
                    <Collapse in={this.state.open} clssName="form-item">

                        <Form>
                            {loop(this.form)}
                        </Form>
                    </Collapse>

                    <div>
                                        <span onClick={() => this.setState({open1: !this.state.open1})}>
                                            <FormSplitHeader  open={this.state.open1} title={'授信额度信息'}/>
                                        </span>
                    </div>
                    <Collapse in={this.state.open1}>
                        <Form>
                            {loop(this.form1)}
                        </Form>
                    </Collapse>
                    <div>
                    <span onClick={() => this.setState({open2: !this.state.open2})}>
                        <FormSplitHeader open={this.state.open2} title={'调息设置'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open2}>
                        <Form>
                            {loop(this.form2)}
                        </Form>
                    </Collapse>
                    <div>
                    <span onClick={() => this.setState({open3: !this.state.open3})}>
                        <FormSplitHeader open={this.state.open3} title={'客户基本信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open3}>
                        <Form>
                            {loop(this.form3)}
                        </Form>
                    </Collapse>

                    <div>
                    <span onClick={() => this.setState({open4: !this.state.open4})}>
                        <FormSplitHeader open={this.state.open4} title={'报价信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open4}>
                        <Form>
                            {loop(this.form4)}
                        </Form>
                    </Collapse>

                    <div>
                    <span onClick={() => this.setState({open5: !this.state.open5})}>
                        <FormSplitHeader open={this.state.open5} title={'租赁物信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open5}>
                        <Form>
                            {loop(this.form5)}
                        </Form>
                    </Collapse>

                    <div>
                    <span onClick={() => this.setState({open6: !this.state.open6})}>
                        <FormSplitHeader open={this.state.open6} title={'担保信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open6}>
                        <Form>
                            {loop(this.form6)}
                        </Form>
                    </Collapse>
                    <div>
                    <span onClick={() => this.setState({open7: !this.state.open7})}>
                        <FormSplitHeader open={this.state.open7} title={'限额信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open7}>
                        <Form>
                            {loop(this.form7)}
                        </Form>
                    </Collapse>

                    {/*项目相关信息*/}
                    <div>
                    <span onClick={() => this.setState({open8: !this.state.open8})}>
                        <FormSplitHeader open={this.state.open} title={'项目相关人信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open8}>
                        <Form>
                            {loop(this.form8)}
                        </Form>
                    </Collapse>

                    {/*承租人相关部门信息*/}
                    <div>
                    <span onClick={() => this.setState({open9: !this.state.open9})}>
                        <FormSplitHeader open={this.state.open9} title={'承租人相关部门信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open9}>
                        <Form>
                            {loop(this.form9)}
                        </Form>
                    </Collapse>

                    {/*其他信息*/}
                    <div>
                    <span onClick={() => this.setState({open10: !this.state.open10})}>
                        <FormSplitHeader open={this.state.open10} title={'限额信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open10}>
                        <Form>
                            {loop(this.form10)}
                        </Form>
                    </Collapse>

                    {/*审批意见*/}
                    <div>
                    <span onClick={() => this.setState({open11: !this.state.open11})}>
                        <FormSplitHeader open={this.state.open11} title={'审批意见'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open11}>
                        <Form>
                            {loop(this.form11)}
                        </Form>
                    </Collapse>

                    {/*操作信息*/}
                    <div>
                    <span onClick={() => this.setState({open12: !this.state.open12})}>
                        <FormSplitHeader open={this.state.open12} title={'操作信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open12}>
                        <Form>
                            {loop(this.form12)}
                        </Form>
                    </Collapse>
                </div>
            </div>
        )
    }
}
export default Form.createForm()(BaseInfo);
