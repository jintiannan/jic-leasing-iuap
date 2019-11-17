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
        this.getValue = this.getValue.bind(this);

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
        {label:'立项名称',field:'pkProjectApproval.projectFilingName',com:TableFormRef},
        {label:'立项编码',field:'pkProjectApproval.projectFilingCode',com:FormControl, disabled: true},
        {label:'承租人名称',field:'pkConsumer.customerName',com:TableFormRef},
        {label:'项目名称',field:'projectName',com:FormControl},
        {label:'项目编号',field:'projectCode',com:FormControl, disabled: true},
        {label:'项目批次',field:'projectBatch',com:FormControl},
        {label:'项目状态',field:'projectStatus',com:Select, data: enumConstant(""), disabled: true},
        {label:'租赁类别',field:'leaseCategry',com:Select, data: enumConstant("")},
        {label:'项目类型',field:'projectType',com:Select, data: enumConstant("")},
        {label:'项目来源',field:'projectSource',com:Select, data: enumConstant("")},
        {label:'租赁方式',field:'leaseType',com:Select, data: enumConstant("")},
        {label:'回租类别',field:'leasebackType',com:Select, data: enumConstant(""), disabled: true},
        {label:'项目税种',field:'projectTaxType',com:Select, data: enumConstant(""), disabled: true},
        {label:'是否投保',field:'isInsure',com:Select, data: enumConstant("")},
        {label:'是否有共同承租人',field:'ifCoLessee',com:Select, data: enumConstant("")},
        {label:'客户评级',field:'clientRating.serialNumber',com:TableFormRef, disabled: true},
        {label:'预计投放日期',field:'planReleaseDate',com:TableFormRef},
        {label:'项目金额',field:'releaseAmount',com:FormControl},
        {label:'设备金额',field:'purchaseTotalAmount',com:FormControl},
        {label:'资金渠道',field:'fundingSources',com:Select, data: enumConstant("")},
        {label:'交易框架',field:'tradingSchemes',com:Select, data: enumConstant("")},
        {label:'项目风险',field:'projectSort',com:Select, data: enumConstant("")},
        {label:'项目主办人',field:'pkCustMain.userName',com:TableFormRef},
        {label:'项目协办人',field:'pkCustHelp.userName',com:TableFormRef},
        {label:'确认业务领域',field:'industryType.paramName',com:TableFormRef, disabled: true},
        {label:'资金用途',field:'capitalUse',com:FormControl, disabled: true},
        {label:'是否项目合同一一对应',field:'isOnetoone',com:Select, data: enumConstant("")},
        {label:'实际融资客户',field:'pkCustFinance.customerName',com:TableFormRef},
        {label:'是否预约资金',field:'isPrecapital',com:Select, data: enumConstant("")},
        {label:'出租方账户',field:'pkAccount.accountName',com:TableFormRef},
        {label:'出租方账号',field:'pkAccount.accountNo',com:FormControl, disabled: true},
        {label:'出租方开户银行',field:'pkAccount.accountBank',com:FormControl, disabled: true},
        {label:'是否允许提前还款',field:'isCanrefund',com:Select, data: enumConstant("")},
        {label:'出租方开户银行行号',field:'pkAccount.bankNo',com:FormControl, disabled: true},
        {label:'提前还款期限(月)',field:'refundTimes',com:FormControl},
        {label:'提前还款手续费率(%)',field:'refundRate',com:FormControl},
        {label:'地区审批总额',field:'pkProjectApproval.areaApproveTotal',com:FormControl, disabled: true},
        {label:'地区实际投放总额',field:'pkProjectApproval.areaLoanTotal',com:FormControl, disabled: true},
        {label:'地区剩余投放总额',field:'pkProjectApproval.areaSurplusTotal',com:FormControl, disabled: true},
        {label:'地区可用授信额度',field:'pkProjectApproval.areaUsableTotal',com:FormControl, disabled: true},
        {label:'行业审批总额',field:'pkProjectApproval.industryApproveTotal',com:FormControl, disabled: true},
        {label:'行业实际投放总额',field:'pkProjectApproval.industryLoanTotal',com:FormControl, disabled: true},
        {label:'行业剩余投放总额',field:'pkProjectApproval.industrySurplusTotal',com:FormControl, disabled: true},
        {label:'行业可用授信额度',field:'pkProjectApproval.industryUsableTotal',com:FormControl, disabled: true},
        {label:'让利方式',field:'benefitMethod',com:Select, data: enumConstant("")},
        {label:'宽限天数',field:'graceDays',com:FormControl},
        {label:'建议日扣减金额',field:'suggestDeductAmt',com:FormControl},
        {label:'约定日扣减金额',field:'appointDeductAmt',com:FormControl},
    ];

    form1 = [
        {label:'授信分类',field:'limitClass',com:Select, data: enumConstant(""), disabled: true},
        {label:'授信类型',field:'grantingType',com:Select, data: enumConstant("")},
        {label:'本次授信额度',field:'limitAmt',com:FormControl},
        {label:'授信起始日期',field:'grantingStartDate',com:TableFormRef},
        {label:'授信有效期',field:'grantingTimes',com:FormControl},
        {label:'授信截止日期',field:'grantingEndDate',com:TableFormRef, disabled: true},
        {label:'原授信额度(元)',field:'grantingOriginalLimit',com:FormControl, disabled: true},
        {label:'已用额度(元)',field:'grantingUsedLimit',com:FormControl, disabled: true},
        {label:'调整额度(元)',field:'grantingAddLimit',com:FormControl, disabled: true},
        {label:'可用额度(元)',field:'grantingSurplusLimit',com:FormControl, disabled: true},
        {label:'授信币种',field:'grantingCurrency.currtypename',com:TableFormRef},
        {label:'租赁最大期限',field:'maxDeadline',com:FormControl, disabled: true},
    ];

    form2 = [
        {label:'是否调息',field:'ifAdjust',com:Select, data: enumConstant("")},
        {label:'调息渠道',field:'adjustType',com:Select, data: enumConstant(""), disabled: true},
        {label:'调息响应方式',field:'adjustTime',com:Select, data: enumConstant(""), disabled: true},
        {label:'调息方法 ',field:'adjustMethod',com:Select, data: enumConstant(""), disabled: true},
        {label:'调息起始日',field:'adjustStartDate',com:TableFormRef, disabled: true},    ];

    form3 = [
        {label:'承租人编码',field:'pkConsumer.customerName',com:FormControl, disabled: true},
        {label:'客户号',field:'pkConsumer.customerCode',com:FormControl, disabled: true},
        {label:'地区（省）',field:'pkConsumer.province',com:TableFormRef, disabled: true},
        {label:'地区（市）',field:'pkConsumer.city',com:TableFormRef, disabled: true},
        {label:'地区（县/区）',field:'pkConsumer.district',com:TableFormRef, disabled: true},
        {label:'行业门类',field:'pkConsumer.industry',com:TableFormRef, disabled: true},
        {label:'行业门类(大类)',field:'pkConsumer.industry1',com:FormControl, disabled: true},
        {label:'行业门类(中类)',field:'pkConsumer.industry2',com:FormControl, disabled: true},
        {label:'企业规模（内部管理）',field:'pkConsumer.enterScaleInner',com:Select, data: enumConstant(""), disabled: true},
        {label:'企业规模（四部委）',field:'pkConsumer.enterScale6m',com:Select, data: enumConstant(""), disabled: true},
        {label:'法定代表人',field:'pkConsumer.legalRep',com:FormControl, disabled: true},
        {label:'告知地址',field:'pkConsumer.informAddress',com:FormControl, disabled: true},
        {label:'经济性质',field:'pkConsumer.economicType',com:FormControl, disabled: true},
        {label:'注册地址',field:'pkConsumer.regAddress',com:FormControl, disabled: true},
        {label:'实际控制人',field:'pkConsumer.customerPerson',com:FormControl, disabled: true},
        {label:'注册币种',field:'pkConsumer.capitalCur.currtypename',com:TableFormRef, disabled: true},    ];

    form4 = [
        {label:'报价名称',field:'projectcalculatorrefvo.quotName',com:TableFormRef, disabled: true},
        {label:'报价编号',field:'projectcalculatorrefvo.quotCode',com:FormControl, disabled: true},
        {label:'租赁方式',field:'projectcalculatorrefvo.leaseMethod',com:Select, data: enumConstant(""), disabled: true},
        {label:'税种',field:'projectcalculatorrefvo.taxMode',com:Select, data: enumConstant(""), disabled: true},
        {label:'租赁期限（月）',field:'projectcalculatorrefvo.leaseTimes',com:FormControl, disabled: true},
        {label:'支付频率',field:'projectcalculatorrefvo.leaseFreq',com:Select, data: enumConstant(""), disabled: true},
        {label:'计算方式',field:'projectcalculatorrefvo.leaseCalMethod',com:Select, data: enumConstant(""), disabled: true},
        {label:'报价利率',field:'projectcalculatorrefvo.finalRate',com:FormControl, disabled: true},
        {label:'净融资额(元)',field:'projectcalculatorrefvo.netFinanceCash',com:FormControl, disabled: true},
        {label:'商业折扣(元)',field:'projectcalculatorrefvo.tradeDiscount',com:FormControl, disabled: true},
        {label:'实际投放金额(元)',field:'projectcalculatorrefvo.factCashLoan',com:FormControl, disabled: true},
        {label:'首付款金额(元)',field:'projectcalculatorrefvo.downPayment',com:FormControl, disabled: true},
        {label:'保证金金额(元)',field:'projectcalculatorrefvo.depositCash',com:FormControl, disabled: true},
        {label:'服务费收入总金额(元)',field:'projectcalculatorrefvo.srvfeeCashIn',com:FormControl, disabled: true},
        {label:'服务费支出总金额(元)',field:'projectcalculatorrefvo.srvfeeCashOut',com:FormControl, disabled: true},
        {label:'总租金(元)',field:'projectcalculatorrefvo.leaseCash',com:FormControl, disabled: true},
        {label:'总利息(元)',field:'projectcalculatorrefvo.leaseInterest',com:FormControl, disabled: true},
        {label:'总本金(元)',field:'projectcalculatorrefvo.leaseCorpus',com:FormControl, disabled: true},
        {label:'市场irr',field:'projectcalculatorrefvo.commercialIrr',com:FormControl, disabled: true},
        {label:'增值税下irr',field:'projectcalculatorrefvo.vatIrr',com:FormControl, disabled: true},
        {label:'会计irr',field:'projectcalculatorrefvo.financeIrr',com:FormControl, disabled: true},
        {label:'租金irr',field:'projectcalculatorrefvo.rentIrr',com:FormControl, disabled: true},
        {label:'市场irr',field:'projectcalculatorrefvo.projectIrr',com:FormControl, disabled: true},
        {label:'项目去税irr',field:'projectcalculatorrefvo.projectNotaxIrr',com:FormControl, disabled: true},
        {label:'手续费分配irr',field:'projectcalculatorrefvo.feeDistrIrr',com:FormControl, disabled: true},
        {label:'租赁合同irr',field:'projectcalculatorrefvo.contractIrr',com:FormControl, disabled: true},
        {label:'审计irr',field:'projectcalculatorrefvo.auditIrr',com:FormControl, disabled: true},
        {label:'承租人irr',field:'projectcalculatorrefvo.lesseeIrr',com:FormControl, disabled: true},
        {label:'会计去税irr',field:'projectcalculatorrefvo.financeNotaxIrr',com:FormControl, disabled: true},    ];

    form5 = [
        {label:'租赁物名称',field:'projectrentthingrefvo.name',com:FormControl, disabled: true},
        {label:'租赁物编号',field:'projectrentthingrefvo.code',com:FormControl, disabled: true},
        {label:'型号',field:'projectrentthingrefvo.model',com:FormControl, disabled: true},
        {label:'租赁物分类',field:'projectrentthingrefvo.paramName',com:FormControl, disabled: true},
        {label:'设备总价',field:'projectrentthingrefvo.totalCost',com:FormControl, disabled: true},
        {label:'净值',field:'projectrentthingrefvo.netWorth',com:FormControl, disabled: true},
        {label:'估值',field:'projectrentthingrefvo.valuation',com:FormControl, disabled: true},
        {label:'交货日期',field:'projectrentthingrefvo.deliveryDate',com:TableFormRef, disabled: true},
        {label:'交货地点',field:'projectrentthingrefvo.deliveryAddress',com:FormControl, disabled: true},
        {label:'使用地址',field:'projectrentthingrefvo.useAddress',com:FormControl, disabled: true},    ];

    form6 = [
        {label:'担保方式',field:'projectpledgerefvo.guaranteeMethod',com:FormControl, disabled: true},
        {label:'单位客户',field:'projectpledgerefvo.corpCust',com:FormControl, disabled: true},
        {label:'自然人客户',field:'projectpledgerefvo.persCust',com:FormControl, disabled: true},
        {label:'担保总金额',field:'projectpledgerefvo.planCash',com:FormControl, disabled: true},
        {label:'抵押金额',field:'projectpledgerefvo.pledgeAmount',com:FormControl, disabled: true},
        {label:'质押金额',field:'projectpledgerefvo.prendaAmount',com:FormControl, disabled: true},
    ];

    form7 = [
        {label:'供应商合作协议',field:'pkFrameworkAgreem.protocolName',com:TableFormRef},
        {label:'供应商限额方案',field:'pkQuotaScheme.limitName',com:TableFormRef, disabled: true},
        {label:'供应商限额结果',field:'quotaResult',com:FormControl, disabled: true},    ];

    form8 = [
        {label:'项目部门(大区)',field:'belongsArea.deptname',com:TableFormRef},
        {label:'项目部门(片区)',field:'projectDept.deptname',com:TableFormRef},
        {label:'项目经理',field:'pkPrjManager.userName',com:TableFormRef},
        {label:'大区经理',field:'regionManager.userName',com:TableFormRef},
        {label:'片区经理',field:'areaManager.userName',com:TableFormRef},    ];

    form9 = [
        {label:'财务相关',field:'pkConsumer.financeRelated',com:FormControl, disabled: true},
        {label:'设备相关',field:'pkConsumer.equipmentRelated',com:FormControl, disabled: true},
        {label:'其他部门',field:'pkConsumer.otherDept',com:FormControl, disabled: true},
        {label:'政府相关',field:'pkConsumer.governmentRelated',com:FormControl, disabled: true},
        {label:'政府财政相关',field:'pkConsumer.governFinanceRelated',com:FormControl, disabled: true},
        {label:'政府其他部门',field:'pkConsumer.governOtherSectors',com:FormControl, disabled: true},    ];

    form10 = [
        {label:'保险费比例',field:'premium',com:FormControl},
        {label:'公证费比例',field:'notarialFeesRate',com:FormControl},
        {label:'符合风险政策及准入标准',field:'isFitAdmittance',com:Select, data: enumConstant("")},
        {label:'审批文档生成规则',field:'pkContractRule.ruleName',com:TableFormRef},    ];

    form11 = [
        {label:'项目审批审批结果',field:'projectApproveResult',com:Select, data: enumConstant(""), disabled: true},
        {label:'项目审批日期',field:'projectApproveDate',com:TableFormRef, disabled: true},    ];

    form12 = [
        {label:'单据状态',field:'billstatus',com:Select, data: enumConstant(""), disabled: true},
        {label:'操作人',field:'pkOperator.userName',com:TableFormRef, disabled: true},
        {label:'操作日期',field:'operateDate',com:TableFormRef, disabled: true},
        {label:'操作时间',field:'operateTime',com:FormControl, disabled: true},
        {label:'审核人',field:'pkChecker.userName',com:TableFormRef, disabled: true},
        {label:'审核日期',field:'checkDate',com:TableFormRef, disabled: true},
        {label:'审核时间',field:'checkTime',com:FormControl, disabled: true},
        {label:'机构',field:'pkOrg.orgName',com:TableFormRef, disabled: true},
        {label:'所属公司',field:'pkProOrg.orgName',com:TableFormRef},
        {label:'法定代表人',field:'pkConsumer.legalRepresentative',com:FormControl, disabled: true},
        {label:'合同金额(元)',field:'projectcalculatorrefvo.totalAmountEquipment',com:FormControl, disabled: true},
        {label:'审批结果',field:'projectApproveNote',com:FormControl, col: 12, class: 'textarea', disabled: true},
        {label:'租赁物类别',field:'leaseClassification',com:Select, data: enumConstant("")},
        {label:'增信措施类别',field:'increaseCreditType',com:Select, data: enumConstant("")},
        {label:'行业门类(集团口径)',field:'pkConsumer.industry3',com:FormControl, disabled: true},
        {label:'会计irr按最新算法',field:'projectcalculatorrefvo.financeIrrMethod',com:Select, data: enumConstant(""), disabled: true},
        {label:'会计irr算法启用年份',field:'projectcalculatorrefvo.financeIrrYear',com:Select, data: enumConstant(""), disabled: true},
        {label:'业务领域',field:'businessDomain.paramName',com:TableFormRef, disabled: true},
        {label:'是否跨境业务',field:'ifCrossborder',com:Select, data: enumConstant("")},
        {label:'是否孵化及创新业务',field:'ifInnovate',com:Select, data: enumConstant("")},
        {label:'是否关联交易方',field:'ifRelation',com:Select, data: enumConstant("")},    ];
    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {

    }

    getValue = (Object,field) =>{

        let _value = field.toString().split(".");
        let _value_1 = Object[_value[0]];
        if(JSON.stringify(_value_1) === "null" || JSON.stringify(_value_1)===undefined){
            return '';
        }else {
            return _value_1[_value[1]];
        }
    }

    render () {
        const {getFieldProps, getFieldError} = this.props.form;
        // let _formObject = deepClone(this.props.formObject);
        let _formObject = this.props.formObject;
        let formObject = deepClone(_formObject);
        if(this.props.isGrid){
            return <div></div>
        }
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
                                           initialValue: value.field &&value.field.indexOf(".")>0 ?this.getValue(formObject,value.field):formObject[value.field],
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
