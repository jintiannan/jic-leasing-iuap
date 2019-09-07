import React, { Component } from 'react';
import { Form, Icon, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl, Collapse, Tabs, ButtonGroup } from 'tinper-bee';
import { deepClone } from "utils";
import { SelectField } from 'components/RowField/SelectField'
import FormSplitHeader from 'components/FormSplitHeader'
import InputNumber from 'bee-input-number';
import ChildListView from './ChildListView';
import TableRef from './TableRef';

const { TabPane } = Tabs;

import './index.less';

const FormItem = Form.FormItem;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formObj: {
                func_id:{
                    code:'1234'
                }
            },
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
            this.props.form.setFieldsValue({ 'meetingnper': 555 });
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
        const { getFieldProps, getFieldError } = this.props.form;
        let formObj = this.props.formObject;
        let _formObj = deepClone(formObj);
        let _props = this.props;
        return (
            <div>
            <div className='form'>
                <div>
                    <span onClick={() => this.setState({ open: !this.state.open })} >
                    <FormSplitHeader title={'基本信息'} />
                    </span>

                <Collapse in={this.state.open}>
                        <Form>
                            <Collapse
                                in={this.state.open}>
                                    <div>
                                        
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                            <div className="tableRef">
                                                <div className="lableRef">
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    功能节点
                                                </Label>
                                                </div>
                                                <TableRef {...this.props}></TableRef>
                                            </div>
                                            </FormItem>

                                        </Col>
                                       
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    交易类别编码
                                                </Label>
                                                <FormControl disabled={!_props.isEdit}
                                                    {
                                                        ...getFieldProps('func_id.code', {
                                                            initialValue: formObj.func_id,
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('func_id.code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    业务类别
                                                </Label>
                                                <FormControl disabled={!_props.isEdit}
                                                    {
                                                        ...getFieldProps('pk_tradetype', {
                                                            initialValue: formObj.pk_tradetype,
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('pk_tradetype')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    凭证类别
                                                </Label>
                                                <FormControl disabled={!_props.isEdit}
                                                    {
                                                        ...getFieldProps('subdeal_no', {
                                                            initialValue: formObj.subdeal_no,
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('subdeal_no')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    模板编号
                                                </Label>
                                                <FormControl disabled={!_props.isEdit}
                                                    {
                                                        ...getFieldProps('template_code', {
                                                            initialValue: formObj.template_code,
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('template_code')
                                    }
                                </span>
                                            </FormItem>
                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                          <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    模板名称
                                                </Label>
                                                <FormControl disabled={!_props.isEdit}
                                                    {
                                                        ...getFieldProps('template_name', {
                                                        initialValue: formObj.template_name ? formObj.template_name : "",
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
                                                    规则公式
                                                </Label>
                                                <FormControl disabled={!_props.isEdit}
                                                    {
                                                        ...getFieldProps('match_rule', {
                                                        initialValue: formObj.match_rule ? formObj.match_rule : "",
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
                                                    数据指标
                                                </Label>
                                                <FormControl disabled={!_props.isEdit}
                                                    {
                                                        ...getFieldProps('pk_kpi_set', {
                                                        initialValue: formObj.pk_kpi_set ? formObj.pk_kpi_set : "",
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
                                                    备注
                                                </Label>
                                                <FormControl disabled={!_props.isEdit}
                                                             {
                                                                 ...getFieldProps('memo', {
                                                                     initialValue: formObj.memo ? formObj.memo : "",
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


                {/*<div>*/}
                {/*    <span onClick={() => this.setState({ open2: !this.state.open2 })} >*/}
                {/*    <FormSplitHeader title={'合同信息'} />*/}
                {/*</span>*/}

                {/*    <Collapse in={this.state.open2}>*/}

                {/*    <Form>*/}
                {/*            <Collapse*/}
                {/*                in={this.state.open2}>*/}
                {/*                <div>*/}
                {/*                  */}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*          <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    合同名称*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('pk_consumer', {*/}
                {/*                                        initialValue: formObj.pk_consumer ? formObj.pk_consumer.name : "",*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                            </FormItem>*/}
                {/*                */}
                {/*    */}
                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                        <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    合同编码*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('pk_consumer', {*/}
                {/*                                        initialValue: formObj.pk_consumer ? formObj.pk_consumer.code : "",*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    承租人名称*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('pk_consumer', {*/}
                {/*                                        initialValue: formObj.pk_consumer ? formObj.pk_consumer.name : "",*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    承租人编码*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('pk_consumer', {*/}
                {/*                                        initialValue: formObj.pk_consumer ? formObj.pk_consumer.code : "",*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                                <span className='error'>*/}
                {/*                    {*/}
                {/*                        getFieldError('project_filing_code')*/}
                {/*                    }*/}
                {/*                </span>*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    合同起始日期*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('plan_release_date', {*/}
                {/*                                            initialValue: formObj.plan_release_date,*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                                <span className='error'>*/}
                {/*                    {*/}
                {/*                        getFieldError('plan_release_date')*/}
                {/*                    }*/}
                {/*                </span>*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    合同终止日期*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('adjust_time', {*/}
                {/*                                            initialValue: formObj.adjust_time,*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                                <span className='error'>*/}
                {/*                    {*/}
                {/*                        getFieldError('adjust_time')*/}
                {/*                    }*/}
                {/*                </span>*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    单据状态*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('project_approve_result', {*/}
                {/*                                            initialValue: formObj.project_approve_result,*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                                <span className='error'>*/}
                {/*                    {*/}
                {/*                        getFieldError('project_approve_result')*/}
                {/*                    }*/}
                {/*                </span>*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    合同金额*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('release_amount', {*/}
                {/*                                            initialValue: formObj.release_amount,*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                                <span className='error'>*/}
                {/*                    {*/}
                {/*                        getFieldError('release_amount')*/}
                {/*                    }*/}
                {/*                </span>*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    币种*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('granting_currency', {*/}
                {/*                                            initialValue: formObj.granting_currency,*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                                <span className='error'>*/}
                {/*                    {*/}
                {/*                        getFieldError('granting_currency')*/}
                {/*                    }*/}
                {/*                </span>*/}
                {/*                            </FormItem>*/}
                {/*                        </Col>*/}
                {/*                */}
                {/*                </div>*/}
                {/*            </Collapse>*/}

                {/*        </Form>*/}

                {/*    </Collapse>*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*    <span onClick={() => this.setState({ open3: !this.state.open3 })} >*/}
                {/*    <FormSplitHeader title={'客户信息'} />*/}
                {/*</span>*/}

                {/*    <Collapse in={this.state.open3}>*/}

                {/*    <Form>*/}
                {/*            <Collapse*/}
                {/*                in={this.state.open3}>*/}
                {/*                <div>*/}
                {/*                    */}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*          <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    客户名称*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('pk_consumer', {*/}
                {/*                                        initialValue: formObj.pk_consumer ? formObj.pk_consumer.name : "",*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                            </FormItem>*/}
                {/*                */}
                {/*    */}
                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                        <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    客户编码*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('pk_consumer', {*/}
                {/*                                        initialValue: formObj.pk_consumer ? formObj.pk_consumer.code : "",*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    承租人名称*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('pk_consumer', {*/}
                {/*                                        initialValue: formObj.pk_consumer ? formObj.pk_consumer.name : "",*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    承租人编码*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('pk_consumer', {*/}
                {/*                                        initialValue: formObj.pk_consumer ? formObj.pk_consumer.code : "",*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                                <span className='error'>*/}
                {/*                    {*/}
                {/*                        getFieldError('project_filing_code')*/}
                {/*                    }*/}
                {/*                </span>*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    关联客户客户*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('project_name', {*/}
                {/*                                            initialValue: formObj.project_name,*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                                <span className='error'>*/}
                {/*                    {*/}
                {/*                        getFieldError('project_name')*/}
                {/*                    }*/}
                {/*                </span>*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    组织机构代码*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('project_code', {*/}
                {/*                                            initialValue: formObj.project_code,*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                                <span className='error'>*/}
                {/*                    {*/}
                {/*                        getFieldError('project_code')*/}
                {/*                    }*/}
                {/*                </span>*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    联系人*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('pk_operator', {*/}
                {/*                                            initialValue: formObj.pk_operator,*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                                <span className='error'>*/}
                {/*                    {*/}
                {/*                        getFieldError('pk_operator')*/}
                {/*                    }*/}
                {/*                </span>*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    注册资本*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('release_amount', {*/}
                {/*                                            initialValue: formObj.release_amount,*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                                <span className='error'>*/}
                {/*                    {*/}
                {/*                        getFieldError('release_amount')*/}
                {/*                    }*/}
                {/*                </span>*/}
                {/*                            </FormItem>*/}

                {/*                        </Col>*/}
                {/*                        <Col md={4} xs={4} sm={4}>*/}
                {/*                            <FormItem>*/}
                {/*                                <Label>*/}
                {/*                                    <Icon type="uf-mi" className='mast'></Icon>*/}
                {/*                                    币种*/}
                {/*                                </Label>*/}
                {/*                                <FormControl disabled={!_props.isEdit}*/}
                {/*                                    {*/}
                {/*                                        ...getFieldProps('granting_currency', {*/}
                {/*                                            initialValue: formObj.granting_currency,*/}
                {/*                                            rules: [{*/}
                {/*                                                required: true,*/}
                {/*                                            }],*/}
                {/*                                        })*/}
                {/*                                    }*/}
                {/*                                />*/}
                {/*                                <span className='error'>*/}
                {/*                    {*/}
                {/*                        getFieldError('granting_currency')*/}
                {/*                    }*/}
                {/*                </span>*/}
                {/*                            </FormItem>*/}
                {/*                        </Col>*/}
                {/*                 */}
                {/*                </div>*/}
                {/*            </Collapse>*/}

                {/*        </Form>*/}

                {/*    </Collapse>*/}
                {/*</div>*/}
                </div>

                <div className="childListView">
                <Tabs
                    defaultActiveKey="1"
                    onChange={this.onChange}
                    className="demo1-tabs"
                    extraContent={
                        <div className="addAndDelChildList demoPadding" >
                             <ButtonGroup style={{ margin: 10 }}>
                                <Button shape='border'><Icon type='uf-navmenu' /></Button>
                                <Button shape='border'><Icon type='uf-file' /></Button>
                                <Button shape='border'><Icon type='uf-pencil' /></Button>
                                <Button shape='border'><Icon type='uf-del' /></Button>
                              </ButtonGroup>
                        </div>
                        }
                >
                    <TabPane tab='子表信息' key="1"> <ChildListView /></TabPane>
                    {/*<TabPane tab='账户信息' key="2"> <ChildListView /></TabPane>*/}
                </Tabs>
                </div>
            </div>  
        );
    }
}

export default Form.createForm()(FormView);