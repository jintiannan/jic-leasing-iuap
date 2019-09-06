import React, { Component } from 'react';
import { Form, Icon, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl, Collapse } from 'tinper-bee';
import { deepClone } from "utils";
import { SelectField } from 'components/RowField/SelectField'

import './index.less';

const FormItem = Form.FormItem;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,

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

    handleChange = (value) =>{
        if(value == '暂存'){
            this.props.form.setFieldsValue({'meetingnper':555});
        }
    };

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let _formObject = deepClone(this.props.formObject);
        return (

                <div className='form'>
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
                                        英文名
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

                                <Col md={4} xs={4} sm={4}>
                                <FormItem>
                                    <Label>
                                        <Icon type="uf-mi" className='mast'></Icon>
                                        证件类型
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('identity_type', {
                                                initialValue: _formObject.identity_type,

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
                                        证件号
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
                                <FormItem>
                                    <Label>
                                        <Icon type="uf-mi" className='mast'></Icon>
                                        客户类型
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('cusotmer_class_temp', {
                                                initialValue: _formObject.cusotmer_class_temp,

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
                                        性别
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('sex', {
                                                initialValue: _formObject.sex,

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
                                        职业
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('job', {
                                                initialValue: _formObject.job,

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
                                        职务
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('duty', {
                                                initialValue: _formObject.duty,

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
                                        职称
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('offical_title', {
                                                initialValue: _formObject.offical_title,

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
                                        最新变更日期
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('operate_date_lst', {
                                                initialValue: _formObject.operate_date_lst,

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
                                        最新变更时间
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('operate_time_lst', {
                                                initialValue: _formObject.operate_time_lst,

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
                                        操作人
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('pk_operator', {
                                                initialValue: _formObject.pk_operator,

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
                                <FormItem>
                                    <Label>
                                        <Icon type="uf-mi" className='mast'></Icon>
                                        本单位工作起始日
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('start_date_job', {
                                                initialValue: _formObject.start_date_job,

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
                                        工资账号
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('wages_account_no', {
                                                initialValue: _formObject.wages_account_no,

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
                                        部门名称
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('pk_dept', {
                                                initialValue: _formObject.pk_dept,

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
                                        客户经理
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('pk_prj_manager', {
                                                initialValue: _formObject.pk_prj_manager,

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
                                        最新变更人
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('pk_operator_lst', {
                                                initialValue: _formObject.pk_operator_lst,

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
                                        单位所属行业(大类)
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('employer_industry1', {
                                                initialValue: _formObject.employer_industry1,

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
                                        单位名称
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('employer_name', {
                                                initialValue: _formObject.employer_name,

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
                                        单位地址
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('employer_address', {
                                                initialValue: _formObject.employer_address,

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
                                        居住地址邮编
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('home_postcode', {
                                                initialValue: _formObject.home_postcode,

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
                                        通讯地址
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('comm_addr', {
                                                initialValue: _formObject.comm_addr,

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
                                            ...getFieldProps('comm_postcode', {
                                                initialValue: _formObject.comm_postcode,

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
                                        单位邮箱
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('employer_email', {
                                                initialValue: _formObject.employer_email,

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
                                        单位电话
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('employer_tel', {
                                                initialValue: _formObject.employer_tel,

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
                                        部门
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('department', {
                                                initialValue: _formObject.department,

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
                                        居住状态
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('home_status', {
                                                initialValue: _formObject.home_status,

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
                                        居住地址
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('home_addr', {
                                                initialValue: _formObject.home_addr,

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
                                        家庭月收入(元)
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('family_annual_income', {
                                                initialValue: _formObject.family_annual_income,

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
                                        最高学位
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('max_degree', {
                                                initialValue: _formObject.max_degree,

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
                                        最高学历
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('max_education', {
                                                initialValue: _formObject.max_education,

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
                                        住宅电话
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('home_phone', {
                                                initialValue: _formObject.home_phone,

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
                                            ...getFieldProps('mobile', {
                                                initialValue: _formObject.mobile,

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
                                        电子邮箱
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('email', {
                                                initialValue: _formObject.email,

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
                                        毕业年份(最高学历)
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('graduate_year', {
                                                initialValue: _formObject.graduate_year,

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
                                        毕业学校(最高学历)
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('graduate_school', {
                                                initialValue: _formObject.graduate_school,

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
                                        单位所属行业
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('employer_industry', {
                                                initialValue: _formObject.employer_industry,

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
                                        地区(省)
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('province', {
                                                initialValue: _formObject.province,

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
                                        地区(市)
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('city', {
                                                initialValue: _formObject.city,

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
                                        地区(区/县)
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('district', {
                                                initialValue: _formObject.district,

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
                                        出生日期
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('birthday', {
                                                initialValue: _formObject.birthday,

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
                                        民族
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('nation', {
                                                initialValue: _formObject.nation,

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
                                        政治面貌
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('politics', {
                                                initialValue: _formObject.politics,

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
                                        工资账号开户行
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('wages_account_bank', {
                                                initialValue: _formObject.wages_account_bank,

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
                                        兴趣爱好(限200汉字)
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('interests', {
                                                initialValue: _formObject.interests,

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
                                        备注(限200汉字)
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('memo', {
                                                initialValue: _formObject.memo,

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
                                        户籍地址
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('permanent_address', {
                                                initialValue: _formObject.permanent_address,

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
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('marry_status', {
                                                initialValue: _formObject.marry_status,

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
                                        个人年收入(元)
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('person_annual_income', {
                                                initialValue: _formObject.person_annual_income,

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
                                        生效日期
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('effective_date', {
                                                initialValue: _formObject.effective_date,

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
                                        审核日期
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('check_date', {
                                                initialValue: _formObject.check_date,

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
                                        审核时间
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('check_time', {
                                                initialValue: _formObject.check_time,

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
                                        机构
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('pk_org', {
                                                initialValue: _formObject.pk_org,

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
                                        操作日期
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('operate_date', {
                                                initialValue: _formObject.operate_date,

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
                                        操作时间
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('operate_time', {
                                                initialValue: _formObject.operate_time,

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
                                        审核人
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('pk_checker', {
                                                initialValue: _formObject.pk_checker,

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
                </div>

        );
    }
}

export default Form.createForm()(FormView);
