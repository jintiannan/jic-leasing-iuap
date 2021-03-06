import Rect, {Component} from 'react'
import FormSplitHeader from 'components/FormSplitHeader'
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
import DatePicker from "tinper-bee/lib/Datepicker";
import TableFormRef from 'components/FormRef/TableFormRef';
import FormInputNumber from 'components/FormRef/FormInputNumber';
import './index.less';
import {enumConstant} from "../../../../../../ucf-common/src/utils/enums";
import FormTreeRef from "../../../../../../ucf-common/src/components/FormTreeRef/FormTreeRef";

const format = "YYYY-MM-DD";
const format_time = "YYYY-MM-DD HH:mm:ss";

const dateInputPlaceholder = "选择日期";

const FormItem = Form.FormItem;

class BaseInfo extends Component {

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
        };
    }

    form = [
        {label: '客户名称', field: 'customerName', com: FormControl, required: true},
        {label: '客户编号', field: 'customerCode', com: FormControl, required: true, disabled: true},
        {label: '客户英文名', field: 'customerEngName', com: FormControl, required: true},
        {label: '客户简称', field: 'customerShort', com: FormControl, required: true},
        {label: '是否授权征信客户', field: 'ifWarrantCust', com: Select, data: enumConstant("yesOrNo"), required: true},
        {label: '客户性质', field: 'customerProperty', com: FormTreeRef, required: true},
        {label: '客户性质(内部)', field: 'customerPropertyIn', com: FormTreeRef, required: true},
        {label: '客户类型', field: 'cusotmerClassTemp', com: Select, required: true},
        {label: '经济性质', field: 'economicType', com: TableFormRef, required: true},
        {label: '注册地址', field: 'regAddress', com: FormControl, required: true, col: 12},
    ];
    form1 = [
        // {label: '行业门类', field: 'industry', com: FormTreeRef},
        // {label: '行业门类(大类)', field: 'industry1', com: FormTreeRef},
        // {label: '行业门类(中类)', field: 'industry2', com: FormTreeRef},
        // {label: '行业门类(小类)', field: 'industry3', com: FormTreeRef},
        // {label: '资产总额(万元)', field: 'assets_total', com: FormInputNumber},
        {label: '营业收入(万元)', field: 'operatingIncome', com: FormInputNumber},
        {label: '学校等级', field: 'schoolGrade', com: Select, data: enumConstant("yesOrNo")},
        {label: '医院等级', field: 'hospitalGrade', com: Select, data: enumConstant("yesOrNo")},
        {label: '企业规模(人行)', field: 'enterScalePbc', com: Select, data: enumConstant("yesOrNo")},
        {label: '企业规模(内部管理)', field: 'enterScaleInner', com: Select, data: enumConstant("yesOrNo")},
        {label: '企业规模(四部委)', field: 'enterScale6m', com: Select, data: enumConstant("yesOrNo")},
    ];
    form2 = [
        {label: '注册登记号类型', field: 'regNumberType', com: Select, data: enumConstant("yesOrNo")},
        {label: '注册登记号', field: 'regNumber', com: FormControl},
        {label: '证件类型', field: 'identityType', com: Select, data: enumConstant("yesOrNo")},
        {label: '证件有效期(开始)', field: 'startDateIdentity', com: DatePicker},
        {label: '证件有效期(截止)', field: 'endDateIdentity', com: DatePicker},
        {label: '最新年检日期', field: 'recentInspectDate', com: DatePicker},
        {label: '贷款卡号', field: 'loanCardNo', com: FormControl},
        {label: '贷款卡最新年审时间', field: 'recentInspectDateLc', com: DatePicker},
        {label: '贷款卡是否有效', field: 'ifValidLc', com: Select, data: enumConstant("yesOrNo")},
        {label: '贷款卡最新年审结果', field: 'recentInspectResultLc', com: FormControl},
        {label: '机构信用代码', field: 'orgCreditCode', com: FormControl},
        {label: '营业执照号码', field: 'licenseNo', com: FormControl},
        {label: '成立日期', field: 'establishDate', com: DatePicker},
        {label: '营业执照登记日', field: 'startDateLicense', com: DatePicker},
        {label: '营业执照到期日', field: 'endDateLicense', com: DatePicker},
        {label: '营业执照最新年审日', field: 'recentInspectDateLicense', com: DatePicker},
        {label: '法定代表人(文本类型)', field: 'legalRepresentative', com: FormControl},
        // {label: '法定代表人', field: 'pkCustomerPerson', com: TableFormRef},
        // {label: '证件类型', field: 'pk_customerPerson.identityType', com: Select, data: enumConstant("yesOrNo")},
        // {label: '证件号码', field: 'industpkCustomerPerson.identityNory', com: FormControl},
        {label: '实际控制人(文本类型)', field: 'actualController', com: FormControl},
        // {label: '实际控制人', field: 'actualControl', com: TableFormRef},
        // {label: '证件类型', field: 'actualControl.identityType', com: Select, data: enumConstant("yesOrNo")},
        // {label: '证件号码', field: 'actualControl.identityNo', com: FormControl},
        {label: '注册资本币种', field: 'capitalCur', com: TableFormRef},
        {label: '注册资本', field: 'capital', com: FormInputNumber},
        {label: '实收资本币种', field: 'capitalCurPaidin', com: TableFormRef},
        {label: '实收资本', field: 'capitalPaidin', com: FormInputNumber},
        {label: '税务登记证号(国税)', field: 'nationalTax', com: FormControl},
        {label: '税务登记证号(地税)', field: 'landTax', com: FormControl},
        {label: '经营范围(限200个汉字)', field: 'bussinessScope', com: FormControl, col: 12, class: 'textarea'},
        {label: '主营业务(限200个汉字)', field: 'primaryBussiness', com: FormControl, col: 12, class: 'textarea'},
    ];

    form3 = [
        {label: '是否集团公司(母公司)', field: 'if_group_company', com: Select, data: enumConstant("yesOrNo")},
        {label: '有无进出口经营', field: 'if_import_export', com: Select, data: enumConstant("yesOrNo")},
        {label: '是否上市公司', field: 'if_listed_company', com: Select, data: enumConstant("yesOrNo")},
        {label: '是否政府融资背景', field: 'if_gov_platform', com: Select, data: enumConstant("yesOrNo")},
        {label: '是否科技型企业', field: 'if_technical_corp', com: Select, data: enumConstant("yesOrNo")},
        {label: '科技型企业类型', field: 'technicalType', com: Select, data: enumConstant("yesOrNo")},
        {label: '是否环保行业企业', field: 'ifEnvironmentalCorp', com: Select, data: enumConstant("yesOrNo")},
        {label: '是否重点监测客户', field: 'ifImportantCorp', com: Select, data: enumConstant("yesOrNo")},
    ];
    form4 = [
        // {label: '所在国家(地区)', field: 'country', com: Select, data: enumConstant("yesOrNo")},
        // {label: '区域', field: 'region', com: Select, data: enumConstant("yesOrNo")},
        // {label: '注册地隶属', field: 'regAddressMembership', com: Select, data: enumConstant("yesOrNo")},
        // {label: '地区(省)', field: 'province', com: Select, data: enumConstant("yesOrNo")},
        // {label: '地区(市)', field: 'city', com: Select, data: enumConstant("yesOrNo")},
        // {label: '地区(区/县)', field: 'district', com: Select, data: enumConstant("yesOrNo")},
        {label: '实际告知地址', field: 'informAddress', com: FormControl, col: 12},
        {label: '实际告知地址邮编', field: 'informAddressZip', com: FormControl},
        {label: '通讯地址', field: 'commAddress', com: FormControl, col: 12},
        {label: '通讯地址邮编', field: 'commAddressZip', com: FormControl},
        {label: '实际办公地址', field: 'officeAddress', com: FormControl, col: 12},
        {label: '实际办公地址邮编', field: 'officeAddressZip', com: FormControl},
        {label: '实际办公地所有权', field: 'officeOwnership', com: FormControl},
        {label: '备注', field: 'remarks', com: FormControl, col: 12, class: 'textarea'},
    ];
    form5 = [
        {label: '客户洗钱风险评级', field: 'enterRating', com: Select, data: enumConstant("yesOrNo")},
    ];
    form6 = [
        {label: '公司网址', field: 'companyWebsite', com: FormControl},
        {label: '传真', field: 'fax', com: FormControl},
        {label: '公司邮箱', field: 'companyMailbox', com: FormControl},
        {label: '电话', field: 'phone', com: FormControl},
        {label: '开票说明', field: 'invoiceExplain', com: Select, data: enumConstant("yesOrNo")},
    ];
    form7 = [
        {label: '部门名称', field: 'pk_dept', com: TableFormRef, disabled: true},
        {label: '客户经理', field: 'pk_prj_manager', com: TableFormRef, disabled: true},
        {label: '操作人', field: 'pk_operator', com: TableFormRef, disabled: true},
        {label: '操作日期', field: 'pk_operator', com: DatePicker, disabled: true},
        {label: '操作时间', field: 'pk_operator', com: DatePicker, disabled: true},
        {label: '最新变更人', field: 'pk_operator', com: TableFormRef, disabled: true},
        {label: '最新变更日期', field: 'pk_operator', com: DatePicker, disabled: true},
        {label: '最新变更时间', field: 'pk_operator', com: DatePicker, disabled: true},
        {label: '审核人', field: 'pk_operator', com: TableFormRef, disabled: true},
        {label: '审核日期', field: 'pk_operator', com: DatePicker, disabled: true},
        {label: '审核时间', field: 'pk_operator', com: DatePicker, disabled: true},
        {label: '机构', field: 'pk_dept', com: TableFormRef, disabled: true},
        {label: '二级业务领域', field: 'pkDept', com: TableFormRef, disabled: true},
    ];

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {

    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;
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
                                        <FormSplitHeader open={this.state.open} title={'客户基本信息'}/>
                                      </span>
                    </div>
                    <Collapse in={this.state.open}>
                        <Form>
                            {loop(this.form)}
                        </Form>

                    </Collapse>

                    <div>
                                        <span onClick={() => this.setState({open1: !this.state.open1})}>
                                            <FormSplitHeader open={this.state.open1} title={'客户规模信息'}/>
                                        </span>
                    </div>
                    <Collapse in={this.state.open1}>
                        <Form>
                            {loop(this.form1)}
                        </Form>
                    </Collapse>
                    <div>
                    <span onClick={() => this.setState({open2: !this.state.open2})}>
                        <FormSplitHeader open={this.state.open2} title={'客户证件信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open2}>
                        <Form>
                            {loop(this.form2)}
                        </Form>
                    </Collapse>
                    <div>
                    <span onClick={() => this.setState({open3: !this.state.open3})}>
                        <FormSplitHeader open={this.state.open3} title={'客户重要标志'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open3}>
                        <Form>
                            {loop(this.form3)}
                        </Form>
                    </Collapse>

                    <div>
                    <span onClick={() => this.setState({open4: !this.state.open4})}>
                        <FormSplitHeader open={this.state.open4} title={'客户地址信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open4}>
                        <Form>
                            {loop(this.form4)}
                        </Form>
                    </Collapse>

                    <div>
                    <span onClick={() => this.setState({open5: !this.state.open5})}>
                        <FormSplitHeader open={this.state.open5} title={'客户评级信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open5}>
                        <Form>
                            {loop(this.form5)}

                        </Form>
                    </Collapse>

                    <div>
                    <span onClick={() => this.setState({open6: !this.state.open6})}>
                        <FormSplitHeader open={this.state.open6} title={'客户其他信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open6}>
                        <Form>
                            {loop(this.form6)}
                        </Form>
                    </Collapse>
                    <div>
                    <span onClick={() => this.setState({open7: !this.state.open7})}>
                        <FormSplitHeader open={this.state.open7} title={'操作信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open7}>
                        <Form>
                            {loop(this.form7)}
                        </Form>
                    </Collapse>

                </div>
            </div>
        )


    }
}

export default Form.createForm()(BaseInfo);
