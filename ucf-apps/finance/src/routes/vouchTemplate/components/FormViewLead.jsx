import React, {Component} from 'react';
import {
    Form,
    Icon,
    Button,
    Label,
    Switch,
    Checkbox,
    DatePicker,
    Radio,
    Select,
    Col,
    Row,
    FormControl,
    Collapse,
    Tabs
} from 'tinper-bee';
import {deepClone} from "utils";
import {SelectField} from 'components/RowField/SelectField'
import FormSplitHeader from 'components/FormSplitHeader'
import InputNumber from 'bee-input-number';
import ChildListView from './ChildListView';

const {TabPane} = Tabs;

import './index.less';

const FormItem = Form.FormItem;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formObj: {},
            open: true,
            open2: true,
            open3: true,
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {

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

    handleChange = (value) => {
        console.log('value');
        console.log(value);
        if (value == '暂存') {
            this.props.form.setFieldsValue({'meetingnper': 555});
        }
    }

    submit = () => {
        console.log(this.props.form.getFieldsValue());
        return this.props.form.getFieldsValue();
    }

    onChange = (activeKey) => {
        console.log(`onChange ${activeKey} o-^-o`);
        this.setState({
            activeKey,
        });
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;
        let formObj = this.props.formObject;
        let _formObj = deepClone(formObj);
        let _props = this.props;
        return (
            <div className='form'>
                <div>
                    <span onClick={() => this.setState({open: !this.state.open})}>
                    <FormSplitHeader title={'项目信息'}/>
                </span>

                    <Collapse in={this.state.open}>
                        <Form>
                            <Collapse
                                in={this.state.open}>
                                <div>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                项目名称
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('project_name', {
                                                                 initialValue: formObj.project_name,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('project_name')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                项目编码
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('project_code', {
                                                                 initialValue: formObj.project_code,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('project_code')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                单据状态
                                            </Label>

                                            <Select
                                                disabled={!_props.isEdit}

                                                data={[{key: '通过', value: '9'}, {key: '暂存', value: '20'}]}
                                                {...getFieldProps('project_approve_result', {
                                                    initialValue: formObj.project_approve_result,
                                                    rules: [{
                                                        required: true, message: '请选择单据状态!',
                                                    }],
                                                })}
                                            >
                                            </Select>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                项目金额
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('release_amount', {
                                                                 initialValue: formObj.release_amount,
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
                                                币种
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('granting_currency', {
                                                                 initialValue: formObj.granting_currency,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('granting_currency')
                                    }
                                </span>
                                        </FormItem>
                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                项目来源
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('project_source', {
                                                                 initialValue: formObj.project_source ? formObj.project_source : "",
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
                                                项目类别
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('leaseback_type', {
                                                                 initialValue: formObj.leaseback_type ? formObj.leaseback_type : "",
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
                                                项目批次
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('adjust_time', {
                                                                 initialValue: formObj.adjust_time ? formObj.adjust_time : "",
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                        </FormItem>

                                    </Col>

                                </div>
                            </Collapse>

                        </Form>

                    </Collapse>
                </div>


                <div>
                    <span onClick={() => this.setState({open2: !this.state.open2})}>
                    <FormSplitHeader title={'合同信息'}/>
                </span>

                    <Collapse in={this.state.open2}>

                        <Form>
                            <Collapse
                                in={this.state.open}>
                                <div>

                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                合同名称
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.name : "",
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
                                                合同编码
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.code : "",
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
                                                承租人名称
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.name : "",
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
                                                承租人编码
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.code : "",
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                合同起始日期
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('plan_release_date', {
                                                                 initialValue: formObj.plan_release_date,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('plan_release_date')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                合同终止日期
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('adjust_time', {
                                                                 initialValue: formObj.adjust_time,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('adjust_time')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                单据状态
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('project_approve_result', {
                                                                 initialValue: formObj.project_approve_result,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('project_approve_result')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                合同金额
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('release_amount', {
                                                                 initialValue: formObj.release_amount,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('release_amount')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                币种
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('granting_currency', {
                                                                 initialValue: formObj.granting_currency,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('granting_currency')
                                    }
                                </span>
                                        </FormItem>
                                    </Col>

                                </div>
                            </Collapse>

                        </Form>

                    </Collapse>
                </div>

                <div>
                    <span onClick={() => this.setState({open3: !this.state.open3})}>
                    <FormSplitHeader title={'客户信息'}/>
                </span>

                    <Collapse in={this.state.open3}>

                        <Form>
                            <Collapse
                                in={this.state.open}>
                                <div>

                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                客户名称
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.name : "",
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
                                                客户编码
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.code : "",
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
                                                承租人名称
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.name : "",
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
                                                承租人编码
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.code : "",
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                关联客户客户
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('project_name', {
                                                                 initialValue: formObj.project_name,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('project_name')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                组织机构代码
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('project_code', {
                                                                 initialValue: formObj.project_code,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('project_code')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                联系人
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_operator', {
                                                                 initialValue: formObj.pk_operator,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('pk_operator')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                注册资本
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('release_amount', {
                                                                 initialValue: formObj.release_amount,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('release_amount')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                币种
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('granting_currency', {
                                                                 initialValue: formObj.granting_currency,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('granting_currency')
                                    }
                                </span>
                                        </FormItem>
                                    </Col>

                                </div>
                            </Collapse>

                        </Form>

                    </Collapse>
                </div>

                <div>
                    <span onClick={() => this.setState({open3: !this.state.open3})}>
                    <FormSplitHeader title={'报价信息'}/>
                </span>

                    <Collapse in={this.state.open3}>

                        <Form>
                            <Collapse
                                in={this.state.open}>
                                <div>

                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                报价名称
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.name : "",
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
                                                报价编码
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.code : "",
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
                                                限额方案
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.name : "",
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
                                                租赁期限(月)
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('billstatus', {
                                                                 initialValue: formObj.billstatus ? formObj.billstatus : "",
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('billstatus')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                报价类型
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('client_rating', {
                                                                 initialValue: formObj.client_rating,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('client_rating')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                年化天数
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('project_batch', {
                                                                 initialValue: formObj.project_batch,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('project_batch')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                投放金额
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('purchase_total_amount', {
                                                                 initialValue: formObj.purchase_total_amount,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('purchase_total_amount')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                首付款总额
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('release_amount', {
                                                                 initialValue: formObj.release_amount,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('release_amount')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                本金总结记
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('purchase_total_amount', {
                                                                 initialValue: formObj.purchase_total_amount,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('purchase_total_amount')
                                    }
                                </span>
                                        </FormItem>
                                    </Col>

                                </div>
                            </Collapse>

                        </Form>

                    </Collapse>
                </div>

                <div>
                    <span onClick={() => this.setState({open3: !this.state.open3})}>
                    <FormSplitHeader title={'账户信息'}/>
                </span>

                    <Collapse in={this.state.open3}>

                        <Form>
                            <Collapse
                                in={this.state.open}>
                                <div>

                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                出租方账户
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.name : "",
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
                                                税务登记号
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.code : "",
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
                                                纳税人名称
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.name : "",
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
                                                税种
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_consumer', {
                                                                 initialValue: formObj.pk_consumer ? formObj.pk_consumer.code : "",
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                承租方账户
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('project_name', {
                                                                 initialValue: formObj.project_name,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('project_name')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                承租方账号
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('project_code', {
                                                                 initialValue: formObj.project_code,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('project_code')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                联系人
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_cust_help', {
                                                                 initialValue: formObj.pk_cust_help,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('pk_cust_help')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                法人代表
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_cust_main', {
                                                                 initialValue: formObj.pk_cust_main,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('pk_cust_main')
                                    }
                                </span>
                                        </FormItem>

                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                            <Label>
                                                <Icon type="uf-mi" className='mast'></Icon>
                                                法定代表人
                                            </Label>
                                            <FormControl disabled={!_props.isEdit}
                                                         {
                                                             ...getFieldProps('pk_cust_main', {
                                                                 initialValue: formObj.pk_cust_main,
                                                                 rules: [{
                                                                     required: true,
                                                                 }],
                                                             })
                                                         }
                                            />
                                            <span className='error'>
                                    {
                                        getFieldError('pk_cust_main')
                                    }
                                </span>
                                        </FormItem>
                                    </Col>

                                </div>
                            </Collapse>

                        </Form>

                    </Collapse>
                </div>

            </div>


        );
    }
}

export default Form.createForm()(FormView);