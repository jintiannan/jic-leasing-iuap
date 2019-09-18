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
        };
    }
    form = [
        {label:'客户名称',field:'customer_name',com:FormControl,required:true},
        {label:'客户编号',field:'customer_code',com:FormControl,required:true},
        {label:'客户英文名',field:'customer_eng_name',com:FormControl,required:true},
        {label:'是否授权征信客户',field:'if_warrant_cust',com:Select, data: enumConstant("yesOrNo"), required:true},
        {label:'客户性质',field:'customer_property',com:Select,required:true},
        {label:'客户性质(内部)',field:'customer_property_in',com:Select,required:true},
        {label:'客户类型',field:'cusotmer_class_temp',com:Select,required:true},
        {label:'经济性质',field:'economic_type',com:Select,required:true},
        {label:'注册地址',field:'reg_address',com:FormControl,required:true},
    ];

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {

    }

    render () {
        const {getFieldProps, getFieldError} = this.props.form;
        // let _formObject = deepClone(this.props.formObject);
        let _formObject = this.props.formObject;
        let formObject = deepClone(_formObject);
        return (
            <div className="jic-form">

                <div>
                    <div> <span onClick={() => this.setState({open: !this.state.open})}>
                                        <FormSplitHeader open={this.state.open} title={'客户基本信息'}/>
                                      </span>
                    </div>
                    <Collapse in={this.state.open} clssName="form-item">
                        {/*<Form>*/}
                            {/*{*/}
                                {/*this.form.map((value,key) => {*/}
                                    {/*return (*/}
                                        {/*<Col md={4} xs={4} sm={4}>*/}
                                            {/*<FormItem>*/}
                                                {/*<Label>*/}
                                                    {/*<Icon type="uf-mi" className='mast'></Icon>*/}
                                                    {/*{value.label}*/}
                                                {/*</Label>*/}
                                                {/*<value.com {...this.props}*/}
                                                           {/*title={value.label}*/}
                                                           {/*name = {value.field}*/}
                                                           {/*disabled={!this.props.isEdit}*/}
                                                           {/*data={value.data ? value.data: ''}*/}
                                                           {/*{*/}
                                                               {/*...getFieldProps(value.field, {*/}
                                                                   {/*initialValue: formObject[value.field],*/}
                                                                   {/*rules: [{*/}
                                                                       {/*required: true,*/}
                                                                   {/*}],*/}
                                                               {/*})*/}
                                                           {/*}>*/}
                                                {/*</value.com>*/}
                                            {/*</FormItem>*/}
                                        {/*</Col>)*/}
                                {/*})*/}
                            {/*}*/}

                        {/*</Form>*/}
                        <Form>
                                <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            客户名称
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('customer_name', {
                                                             initialValue: _formObject.customer_name,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />
                                    </FormItem>
                                </Col>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            客户编号
                                        </Label>
                                        <FormControl disabled={true}
                                                     {
                                                         ...getFieldProps('customer_code', {
                                                             initialValue: _formObject.customer_code,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            客户英文名
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('customer_eng_name', {
                                                             initialValue: _formObject.customer_eng_name,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                            </Row>
                            <Row>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            客户简称
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('customer_short', {
                                                             initialValue: _formObject.customer_short,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            是否授权征信客户
                                        </Label>
                                        <Select
                                            {
                                                ...getFieldProps('customer_short', {
                                                    initialValue: _formObject.customer_short,
                                                })
                                            }
                                            data={enumConstant("yesOrNo")}
                                            disabled={!this.props.isEdit}
                                            showSearch={true}
                                            allowClear={true}>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            客户性质
                                        </Label>
                                        <FormTreeRef
                                            {
                                                ...getFieldProps('customer_property', {
                                                    initialValue: _formObject.customer_property,
                                                })
                                            }
                                        >
                                        </FormTreeRef>
                                    </FormItem>
                                </Col>


                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            客户性质(内部)
                                        </Label>
                                        <FormTreeRef
                                            {
                                                ...getFieldProps('customer_property_in', {
                                                    initialValue: _formObject.customer_property_in,
                                                })
                                            }
                                        >
                                        </FormTreeRef>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            客户类型
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            经济性质
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>

                                <Col md={12} xs={12} sm={12}>
                                    <FormItem className="remark flex">
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            注册地址
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('reg_address', {
                                                             initialValue: _formObject.reg_address,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                            </Row>
                            {/*<Row>*/}
                                {/*<Col md={12} xs={12}>*/}
                                    {/*<FormItem className="remark flex">*/}
                                        {/*<Label>*/}
                                            {/*<Icon type="uf-mi" className='mast'></Icon>*/}
                                            {/*注册地址*/}
                                        {/*</Label>*/}
                                        {/*<FormControl disabled={!this.props.isEdit} componentClass='textarea'*/}
                                                     {/*{*/}
                                                         {/*...getFieldProps('mark', {}*/}
                                                         {/*) }*/}
                                        {/*/>*/}
                                    {/*</FormItem>*/}
                                {/*</Col>*/}
                            {/*</Row>*/}
                        </Form>
                    </Collapse>

                    <div>
                                        <span onClick={() => this.setState({open1: !this.state.open1})}>
                                            <FormSplitHeader  open={this.state.open1} title={'客户规模信息'}/>
                                        </span>
                    </div>
                    <Collapse in={this.state.open1}>
                        <Form>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            行业门类
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            行业门类(大类)
                                        </Label>
                                        <Select


                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            行业门类(中类)
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            行业门类(小类)
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            从业人数
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('employee_num', {
                                                             initialValue: _formObject.employee_num,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            资产总额(万元)
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('assets_total', {
                                                             initialValue: _formObject.assets_total,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            营业收入(万元)
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('operating_income', {
                                                             initialValue: _formObject.operating_income,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            学校等级
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            医院等级
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            企业规模(人行)
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            企业规模(内部管理)
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            企业规模(四部委)
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Collapse>
                    <div>
                    <span onClick={() => this.setState({open2: !this.state.open2})}>
                        <FormSplitHeader open={this.state.open2} title={'客户证件信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open2}>
                        <Form>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            注册登记号类型
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            注册登记号
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('reg_number', {
                                                             initialValue: _formObject.reg_number,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }/>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            证件类型
                                        </Label>
                                        <Select
                                            showSearch={true}
                                            allowClear={true}>
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            组织机构代码证
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('identity_no', {
                                                             initialValue: _formObject.identity_no,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>

                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    证件有效期(开始)
                                                </Label>

                                                <DatePicker
                                                    format={format}
                                                    defaultValue={moment()}
                                                    placeholder={dateInputPlaceholder}
                                                />

                                        </FormItem>

                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            证件有效期(截止)
                                        </Label>
                                        <DatePicker
                                            format={format}
                                            defaultValue={moment()}
                                            placeholder={dateInputPlaceholder}
                                        />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            最新年检日期
                                        </Label>
                                        <DatePicker
                                            format={format}
                                            defaultValue={moment()}
                                            placeholder={dateInputPlaceholder}
                                        />
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            贷款卡号
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('loan_card_no', {
                                                             initialValue: _formObject.loan_card_no,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            贷款卡最新年审时间
                                        </Label>
                                        <DatePicker
                                            format={format_time}
                                            defaultValue={moment()}
                                            placeholder={dateInputPlaceholder}
                                        />
                                    </FormItem>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            贷款卡是否有效
                                        </Label>
                                        <Select
                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            贷款卡最新年审结果
                                        </Label>
                                        <Select
                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            机构信用代码
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('org_credit_code', {
                                                             initialValue: _formObject.org_credit_code,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            营业执照号码
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('license_no', {
                                                             initialValue: _formObject.license_no,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            成立日期
                                        </Label>
                                        <DatePicker
                                            format={format}
                                            defaultValue={moment()}
                                            placeholder={dateInputPlaceholder}
                                        />
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            营业执照登记日
                                        </Label>
                                        <DatePicker
                                            format={format}
                                            defaultValue={moment()}
                                            placeholder={dateInputPlaceholder}
                                        />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            营业执照到期日
                                        </Label>
                                        <DatePicker
                                            format={format}
                                            defaultValue={moment()}
                                            placeholder={dateInputPlaceholder}
                                        />
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            营业执照最新年审日
                                        </Label>
                                        <DatePicker
                                            format={format}
                                            defaultValue={moment()}
                                            placeholder={dateInputPlaceholder}
                                        />
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            法定代表人(文本类型)
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('legal_representative', {
                                                             initialValue: _formObject.legal_representative,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>

                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            法定代表人
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            证件类型
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            证件号码
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('pk_customer_person.identity_no', {
                                                             initialValue: _formObject.pk_customer_person ? _formObject.pk_customer_person.identity_no : '',

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>

                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            实际控制人(文本类型)
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('actual_controller', {
                                                             initialValue: _formObject.actual_controller,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            实际控制人
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            证件类型
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            证件号码
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('actual_control.identity_no', {
                                                             initialValue: _formObject.actual_control ? _formObject.actual_control.identity_no : '',

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                            </Row>
                            <Row>


                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            注册资本币种
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            注册资本
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('capital', {
                                                             initialValue: _formObject.capital,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>

                            </Row>

                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            实收资本币种
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            实收资本
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('capital_paidin', {
                                                             initialValue: _formObject.capital_paidin,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>


                            </Row>
                            <Row className={"jic-textArea"}>
                                <Col md={12} xs={12} sm={12}>
                                    <FormItem className="remark flex">
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            经营范围(限200个汉字)
                                        </Label>

                                        <FormControl disabled={!this.props.isEdit} componentClass='textarea'
                                                     {
                                                         ...getFieldProps('bussiness_scope', {
                                                             initialValue: _formObject.bussiness_scope,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                            </Row>
                            <Row className={"jic-textArea"}>
                                <Col md={12} xs={12} sm={12}>
                                    <FormItem className="remark flex">
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            主营业务(限200个汉字)
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit} componentClass='textarea'
                                                     {
                                                         ...getFieldProps('primary_bussiness', {
                                                             initialValue: _formObject.primary_bussiness,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                            </Row>
                            <Row>


                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            税务登记证号(国税)
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('national_tax', {
                                                             initialValue: _formObject.national_tax,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            税务登记证号(地税)
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('land_tax', {
                                                             initialValue: _formObject.land_tax,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>

                            </Row>
                        </Form>
                    </Collapse>
                    <div>
                    <span onClick={() => this.setState({open3: !this.state.open3})}>
                        <FormSplitHeader open={this.state.open3} title={'客户重要标志'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open3}>
                        <Form>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            是否集团公司(母公司)
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            有无进出口经营
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            是否上市公司
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            是否政府融资背景
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            是否科技型企业
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            科技型企业类型
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            是否环保行业企业
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            是否重点监测客户
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Collapse>

                    <div>
                    <span onClick={() => this.setState({open4: !this.state.open4})}>
                        <FormSplitHeader open={this.state.open4} title={'客户地址信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open4}>
                        <Form>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            所在国家(地区)
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            区域
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            注册地隶属
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            地区(省)
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            地区(市)
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            地区(区/县)
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            实际告知地址
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('inform_address', {
                                                             initialValue: _formObject.inform_address,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            实际告知地址邮编
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('inform_address_zip', {
                                                             initialValue: _formObject.inform_address_zip,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>


                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            通讯地址
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('comm_address', {
                                                             initialValue: _formObject.comm_address,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            通讯地址邮编
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('comm_address_zip', {
                                                             initialValue: _formObject.comm_address_zip,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>


                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            实际办公地址
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('office_address', {
                                                             initialValue: _formObject.office_address,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            实际办公地址邮编
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('office_address_zip', {
                                                             initialValue: _formObject.office_address_zip,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            实际办公地所有权
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>

                            <Row className={"jic-textArea"}>
                                <Col md={12} xs={12} sm={12}>
                                    <FormItem className="remark flex">
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            备注
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit} componentClass='textarea'
                                                     {
                                                         ...getFieldProps('remarks', {
                                                             initialValue: _formObject.remarks,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                            </Row>
                        </Form>
                    </Collapse>

                    <div>
                    <span onClick={() => this.setState({open5: !this.state.open5})}>
                        <FormSplitHeader open={this.state.open5} title={'客户评级信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open5}>
                        <Form>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            客户洗钱风险评级
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>

                        </Form>
                    </Collapse>

                    <div>
                    <span onClick={() => this.setState({open6: !this.state.open6})}>
                        <FormSplitHeader open={this.state.open6} title={'客户其他信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open6}>
                        <Form>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            公司网址
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('company_website', {
                                                             initialValue: _formObject.company_website,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            传真
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('fax', {
                                                             initialValue: _formObject.fax,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            公司邮箱
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('company_mailbox', {
                                                             initialValue: _formObject.company_mailbox,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>

                            </Row>

                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            电话
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('phone', {
                                                             initialValue: _formObject.phone,

                                                             rules: [{
                                                                 required: true,
                                                             }],
                                                         })
                                                     }
                                        />

                                    </FormItem>

                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            开票说明
                                        </Label>
                                        <Select
                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Collapse>
                    <div>
                    <span onClick={() => this.setState({open7: !this.state.open7})}>
                        <FormSplitHeader open={this.state.open7} title={'操作信息'}/>
                    </span>
                    </div>
                    <Collapse in={this.state.open7}>
                        <Form>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            部门名称
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            客户经理
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>

                            </Row>

                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            操作人
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>

                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">操作日期</Label>
                                        <DatePicker
                                            {
                                                ...getFieldProps('time', {
                                                    }
                                                ) }
                                            format={format}
                                            defaultValue={moment()}
                                            placeholder={dateInputPlaceholder}
                                        />
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            操作时间
                                        </Label>
                                            <DatePicker
                                                format={format_time}
                                                defaultValue={moment()}
                                                placeholder={dateInputPlaceholder}
                                            />

                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            最新变更人
                                        </Label>
                                        <Select

                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            最新变更日期
                                        </Label>
                                        <DatePicker
                                            format={format}
                                            defaultValue={moment()}
                                            placeholder={dateInputPlaceholder}
                                        />
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            最新变更时间
                                        </Label>
                                        <DatePicker
                                            format={format_time}
                                            defaultValue={moment()}
                                            placeholder={dateInputPlaceholder}
                                        />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            审核人
                                        </Label>
                                        <Select
                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            审核日期
                                        </Label>
                                        <DatePicker
                                            format={format}
                                            defaultValue={moment()}
                                            placeholder={dateInputPlaceholder}
                                        />
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            审核时间
                                        </Label>
                                        <DatePicker
                                            format={format_time}
                                            defaultValue={moment()}
                                            placeholder={dateInputPlaceholder}
                                        />

                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            机构
                                        </Label>
                                        <Select
                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            二级业务领域
                                        </Label>
                                        <Select
                                            showSearch={true}
                                            allowClear={true}
                                        >
                                            <Option value="all">全部</Option>
                                            <Option value="confirming">待确认</Option>
                                            <Option value="executing">执行中</Option>
                                            <Option value="completed">
                                                已办结
                                            </Option>
                                            <Option value="termination">终止</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Collapse>

                </div>
            </div>
        )
    }
}
export default Form.createForm()(BaseInfo);
