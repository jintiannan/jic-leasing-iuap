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
            <div className='common-form'>
                <div>
                    <div> <span onClick={() => this.setState({open: !this.state.open})}>
                                        <FormSplitHeader title={'客户基本信息'}/>
                                      </span>
                    </div>
                    <Collapse in={this.state.open} clssName="form-item">
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
                                            证件类型
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
                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            出生年月
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
                                            性别
                                        </Label>
                                        <Select
                                            {
                                                ...getFieldProps('sex', {
                                                    initialValue: _formObject.sex,
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
                                            年龄
                                        </Label>
                                        <FormControl disabled={!this.props.isEdit}
                                                     {
                                                         ...getFieldProps('customer_age', {
                                                             initialValue: _formObject.customer_short,

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
                                            通讯地址邮政编码
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
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            文化程度
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
                                            最高学历
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
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            手机号码
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
                                            住宅电话
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
                                            婚姻状况
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
                                            详细地址
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

                            </Row>
                            <Row>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            户籍地址(省)
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
                                            户籍地址(市)
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
                                            户籍地址(区/县)
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
                                            详细地址
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

                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            客户来源
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
                                            微信号
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
                                            居住状态
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
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            电子邮箱
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
                                            本人平均月收入
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
                            </Row>
                        </Form>
                    </Collapse>
                    <div> <span onClick={() => this.setState({open1: !this.state.open1})}>
    <FormSplitHeader title={'客户职业信息'}/>
        </span>
                    </div>
                    <Collapse in={this.state.open1} clssName="form-item">
                        <Form>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            行业类型
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
                                            职称
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
                                            单位名称
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
                            </Row>
                            <Row>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            单位地址(省)
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
                                            单位地址(市)
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
                                            单位地址(区/县)
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
                                            单位详细地址
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

                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            单位电话
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
                                            职业
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
                                            职务
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
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>

                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">本单位工作起始日</Label>
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
                            </Row>
                        </Form>
                    </Collapse>
                    <div> <span onClick={() => this.setState({open2: !this.state.open2})}>
    <FormSplitHeader title={'配偶信息'}/>
        </span>
                    </div>
                    <Collapse in={this.state.open2} clssName="form-item">
                        <Form>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            配偶姓名
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
                                            配偶性别
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
                                <Row>
                                    <Col md={4} xs={4} sm={4}>

                                        <FormItem className='time flex'>
                                            <Label className="line-height-32">出生日期</Label>
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
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                民族
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
                                                身份证号码
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
                                </Row>
                                <Row>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                手机
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
                                                户籍所在地
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
                                                工作单位
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
                                </Row>
                                <Row>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                工作性质
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
                                                职务
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
                                                文化程度
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
                                </Row>
                                <Row>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                单位电话
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
                                                配偶证件类型
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
                                </Row>
                                <Row>

                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                单位地址(省)
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
                                                单位地址(市)
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
                                                单位地址(区/县)
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
                                                单位详细地址
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

                                </Row>
                            </Row>
                        </Form>
                    </Collapse>
                    <div> <span onClick={() => this.setState({open3: !this.state.open3})}>
    <FormSplitHeader title={'担保人信息'}/>
        </span>
                    </div>
                    <Collapse in={this.state.open3} clssName="form-item">
                        <Form>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            担保人类型
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
                                            担保人姓名
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
                                            证件类型
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

                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">出生年月</Label>
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
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            性别
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
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            年龄
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
                                            手机号码
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
                                            婚姻状况
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
                            </Row>
                            <Row>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            居住地址(省)
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
                                            居住地址(市)
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
                                            居住地址(区/县)
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
                                            居住详细地址
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

                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            与承租人关系
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
                                            单位名称
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
                                            单位电话
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
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            平均月收入
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
                                            工作单位性质
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
                                            行业类型
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
                            </Row>
                            <Row>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            单位地址(省)
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
                                            单位地址(市)
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
                                            单位地址(区/县)
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
                                            单位详细地址
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

                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            职务
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

                                    <FormItem className='time flex'>
                                        <Label className="line-height-32">本单位工作起始日期</Label>
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
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            房产类型
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
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            担保能力说明
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
                            </Row>
                        </Form>
                    </Collapse>
                    <div> <span onClick={() => this.setState({open4: !this.state.open4})}>
    <FormSplitHeader title={'联系人信息'}/>
        </span>
                    </div>
                    <Collapse in={this.state.open4} clssName="form-item">
                        <Form>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            姓名
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
                                            手机号码
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
                                            与申请人关系
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
                            </Row>
                            <Row>

                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            现居住地址(省)
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
                                            现居住地址(市)
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
                                            现居住地址(区/县)
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
                                            现居住详细地址
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

                            </Row>
                        </Form>
                    </Collapse>
                    <div>
    <span onClick={() => this.setState({open5: !this.state.open5})}>
    <FormSplitHeader title={'客户银行卡信息'}/>
        </span>
                    </div>
                    <Collapse in={this.state.open5} clssName="form-item">
                        <Form>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            账号类型
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
                                            持卡人
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
                                            持卡人身份证号
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

                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            预留手机号
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
                                            银行帐号
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
                                            所属总行
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
                            </Row>
                            <Row>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            开户行全称
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
                            </Row>

                        </Form>
                    </Collapse>

                </div>
            </div>
        )
    }
}
export default Form.createForm()(BaseInfo);
