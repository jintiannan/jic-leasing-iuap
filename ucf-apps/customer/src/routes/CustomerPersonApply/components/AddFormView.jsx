/**
 *
 * @title 结合切换事件的 Step
 * @description 点击next，Step的流程跟进
 *
 */
import React, {Component} from 'react';
import {Step, Button, Message, Modal, Form, Icon, Label, Col, Row, FormControl, Select} from 'tinper-bee';
import {actions} from 'mirrorx';

const FormItem = Form.FormItem;

import './index.less';
import {deepClone} from "../../../../../../ucf-common/src/utils";
import {enumConstant} from "../../../../../../ucf-common/src/utils/enums";
import DatePicker from "tinper-bee/lib/Datepicker";
import moment from "moment";
import {Collapse} from "./FormView";

const Steps = Step.Steps;
const addTitle = "新增单位客户申请基本信息表";
const setpsName = "show";
const steps = [
    {title: '客户基本信息'},
    {title: '客户职业信息'},
    {title: '配偶信息'},
    {title: '担保人信息'},
    {title: '联系人信息'},
    {title: '客户银行卡信息'}];

const format = "YYYY-MM-DD";
const format_time = "YYYY-MM-DD HH:mm:ss";

const dateInputPlaceholder = "选择日期";

class AddFormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            modalDropup: true,
            modalSize: '',
            show0: '',
            show1: 'none',
            show2: 'none',
            show3: 'none',
            show4: 'none',
            show5: 'none',
            show6: 'none',
            show7: 'none',
        };
        this.close = this.close.bind(this);
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

    onSubSave = () => {
        // Message.create({content: '完成', color: 'successlight'});
        let newRole = deepClone(this.props.list);
        newRole.push(this.props.form.getFieldsValue());
        actions.customerPersonApply.updateState({list: newRole, showModal: false, isEdit: false});
    };

    close = () => {
        actions.customerPersonApply.updateState({showModal: false, isEdit: false});
    };
    changeDropup = (state) => {
        this.setState({
            modalDropup: state
        });
    };

    changeSize = (size) => {
        this.setState({
            modalSize: size
        });
    };
    //将新增数据存入缓存
    saveCache = () => {
        let objectForm = this.props.form.getFieldsValue();
        localStorage.setItem("addKey", JSON.stringify(objectForm));  //置入缓存
    };

    next() {
        const current = this.state.current + 1;
        this.setState({current});
        let objectForm = this.props.form.getFieldsValue();
        this.nextController();
        this.saveCache();
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
        this.prevController();
    }

    prevController = () => {
        let oldCurrent = this.state.current - 1;
        let lastShow = setpsName + oldCurrent;
        let nextShow = setpsName + this.state.current;
        let map = {};
        map[nextShow] = 'none';
        map[lastShow] = '';
        this.setState(map);
    };


    //控制下一步 显示那个div
    nextController = () => {
        let oldCurrent = this.state.current;
        let lastShow = setpsName + oldCurrent;
        let nextShow = setpsName + (this.state.current + 1);
        let map = {};
        map[lastShow] = 'none';
        map[nextShow] = '';
        this.setState(map);
    };

    render() {
        const {current} = this.state;
        const {getFieldProps, getFieldError} = this.props.form;
        let _formObject = this.props.formObject;
        return (
            <div>

                <Modal
                    className="jic-model"
                    show={this.props.showModal}
                    backdrop="static" //关闭遮罩事件
                    size="xlg" //大号模态框
                    onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title> {addTitle} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Steps current={current}>
                            {steps.map(item => <Step key={item.title} title={item.title}/>)}
                        </Steps>
                        <div className="steps-content jic-form">
                            <Form >
                                <div style={{display: this.state.show0}}>
                                    <Row>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    客户名称
                                                </Label>
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                </div>

                                <div style={{display: this.state.show1}}>

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
                                                    <FormControl
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
                                                    <FormControl
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
                                                    <FormControl
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
                                </div>

                                <div style={{display: this.state.show2}}>
                                    <Row>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    配偶姓名
                                                </Label>
                                                <FormControl
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
                                                    <FormControl
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
                                                    <FormControl
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
                                                    <FormControl
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
                                                    <FormControl
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
                                                    <FormControl
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
                                                    <FormControl
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
                                                    <FormControl
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
                                </div>
                                <div style={{display: this.state.show3}}>
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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

                                                    showSearch={true}
                                                    allowClear={true}>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{display: this.state.show4}}>
                                    <Row>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    姓名
                                                </Label>
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                </div>
                                <div style={{display: this.state.show5}}>
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                                <FormControl
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
                                </div>
                            </Form>
                        </div>
                        <div className="steps-action">
                            {
                                this.state.current > 0
                                &&
                                <Button bordered style={{marginRight: 8}} onClick={() => this.prev()}>
                                    上一步
                                </Button>
                            }
                            {
                                this.state.current < steps.length - 1
                                &&
                                <Button colors="primary" style={{marginRight: 8}}
                                        onClick={() => this.next()}>下一步</Button>
                            }
                            {
                                this.state.current === steps.length - 1
                                &&
                                <Button colors="primary" style={{marginRight: 8}}
                                        onClick={() => this.onSubSave()}>完成</Button>
                            }{
                            <Button colors="secondary" onClick={() => this.close()}> 关闭 </Button>
                        }
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
export default Form.createForm()(AddFormView);
