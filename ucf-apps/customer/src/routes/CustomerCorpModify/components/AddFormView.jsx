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

const Steps = Step.Steps;
const addTitle = "新增单位客户申请基本信息表";
const setpsName = "show";
const steps = [{title: '客户基本信息'},
    {title: '客户规模信息'},
    {title: '客户证件信息'},
    {title: '客户重要标志'},
    {title: '客户地址信息'},
    {title: '客户评级信息'},
    {title: '客户其他信息'},
    {title: '操作信息'}];


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
        this.changeSize = this.changeSize.bind(this);
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

    changeSize(size) {
        this.setState({
            modalSize: size
        });
    }

    onSubSave = () => {
        // Message.create({content: '完成', color: 'successlight'});
        let newRole = deepClone(this.props.list);
        newRole.push(this.props.form.getFieldsValue());
        actions.customerCorpModify.updateState({list: newRole, showModal: false, isEdit: false});
    };

    close = () => {
        actions.customerCorpModify.updateState({showModal: false, isEdit: false});
    };
    changeDropup = (state) => {
        this.setState({
            modalDropup: state
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
        if (this.props.showModal === false) {
            return <div></div>
        } else {
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
                                <Form>
                                    <div style={{display: this.state.show0}}>
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
                                                        客户性质
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
                                                        客户性质(内部)
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
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
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


                                    </div>

                                    <div style={{display: this.state.show1}}>
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
                                        </Row>

                                    </div>

                                    <div style={{display: this.state.show2}}>
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
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        证件有效期(开始)
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
                                                        证件有效期(截止)
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
                                                        最新年检日期
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
                                        </Row>
                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label md={2} xs={2} sm={2}>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        贷款卡最新年审时间
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
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        成立日期
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
                                                        营业执照登记日
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
                                                        营业执照到期日
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
                                                        营业执照最新年审日
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

                                        </Row>
                                        <Row>
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

                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        经营范围(限200个汉字)
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
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
                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        主营业务(限200个汉字)
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
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

                                    </div>
                                    <div style={{display: this.state.show3}}>
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
                                    </div>
                                    <div style={{display: this.state.show4}}>
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
                                        </Row>
                                        <Row>
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
                                        </Row>
                                        <Row>
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
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        备注
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
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
                                    </div>
                                    <div style={{display: this.state.show5}}>
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
                                    </div>
                                    <div style={{display: this.state.show6}}>
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
                                    </div>
                                    <div style={{display: this.state.show7}}>
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
                                        </Row>
                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        操作日期
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
                                        </Row>


                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        最新变更日期
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
                                        </Row>
                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        审核日期
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
}
export default Form.createForm()(AddFormView);
