/**
 *
 * @title 结合切换事件的 Step
 * @description 点击next，Step的流程跟进
 *
 */
import React, {Component} from 'react';
import {Step, Button, Message, Modal, Form, Icon, Label, Col, Row, FormControl, Select} from 'tinper-bee';
import {actions} from 'mirrorx';
import moment from "moment";
import './index.less';
import {deepClone} from "../../../../../../ucf-common/src/utils";
import FormInputNumber from 'components/FormRef/FormInputNumber';
import DatePicker from "tinper-bee/lib/Datepicker";
import {enumConstant} from "../../../../../../ucf-common/src/utils/enums";
const Steps = Step.Steps;
const addTitle = "新增普通项目审批";
const setpsName = "show";
const steps = [{title: '项目基本信息'},
    {title: '授信额度信息'},
    {title: '调息设置'},
    {title: '客户基本信息'},
    {title: '报价信息'},
    {title: '租赁物信息'},
    {title: '担保信息'},
    {title: '限额信息'},
    {title: '项目相关人信息'},
    {title: '承租人相关部门信息'},
    {title: '其他信息'}

];
const FormItem = Form.FormItem;
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
            show8: 'none',
            show9: 'none',
            show10: 'none'


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
        // let newRole = deepClone(this.props.list);
        let newRole = [];
        newRole.push(this.props.form.getFieldsValue());
        actions.projectInfo.updateState({list: newRole, showModal: false, isEdit: false});
    };

    close = () => {
        actions.projectInfo.updateState({showModal: false, isEdit: false});
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
                                    {/*项目基本信息*/}
                                    <div style={{display: this.state.show0}}>
                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        立项名称
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('pk_project_approval.name', {
                                                                         initialValue: '',

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
                                                        立项编码
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_project_approval.code', {
                                                                         initialValue: "",

                                                                         rules: [{
                                                                             required: false
                                                                             ,
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
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.name', {
                                                                         initialValue: '',

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
                                                        项目名称
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('project_name', {
                                                                         initialValue: _formObject.project_name,

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
                                                        项目编号
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('project_code', {
                                                                         initialValue: _formObject.project_code,

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
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('project_batch', {
                                                                         initialValue: _formObject.project_batch,

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
                                                        项目状态
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={true}
                                                        {
                                                            ...getFieldProps('project_status', {
                                                                initialValue: _formObject.project_status,
                                                            })
                                                        }
                                                    />
                                                </FormItem>
                                            </Col>

                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        租赁类别
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('lease_categry', {
                                                                initialValue: _formObject.lease_categry,
                                                            })
                                                        }
                                                    />
                                                </FormItem>
                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        回租类别
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={true}
                                                        {
                                                            ...getFieldProps('leaseback_type', {
                                                                initialValue: _formObject.leaseback_type,
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
                                                        项目税种
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('project_tax_type', {
                                                                initialValue: _formObject.project_tax_type,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>

                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        是否投保
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('is_insure', {
                                                                initialValue: _formObject.is_insure,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>

                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        是否有共同承租人
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('if_co_lessee', {
                                                                initialValue: _formObject.if_co_lessee,
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
                                                        客户评级
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('client_rating', {
                                                                         initialValue: _formObject.client_rating,

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
                                                        预计投放日期
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('plan_release_date', {
                                                                         initialValue: _formObject.plan_release_date,

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
                                                        项目金额
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('release_amount', {
                                                                         initialValue: _formObject.release_amount,

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
                                                        设备金额
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('purchase_total_amount', {
                                                                         initialValue: _formObject.purchase_total_amount,

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
                                                        资金渠道
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('funding_sources', {
                                                                initialValue: _formObject.funding_sources,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        交易框架
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('trading_schemes', {
                                                                initialValue: _formObject.trading_schemes,
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
                                                        项目分类
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('project_sort', {
                                                                initialValue: _formObject.project_sort,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>

                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        项目主办人
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('pk_cust_main.name', {
                                                                         initialValue: '',

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
                                                        项目协办人
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('pk_cust_help.name', {
                                                                         initialValue: '',

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
                                                        租赁物类别
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('lease_classification', {
                                                                initialValue: _formObject.lease_classification,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>

                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        增信措施类别
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('increase_credit_type', {
                                                                initialValue: _formObject.increase_credit_type,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        业务领域
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('business_domain', {
                                                                         initialValue: _formObject.business_domain,

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
                                                        资金用途
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('capital_use', {
                                                                         initialValue: _formObject.capital_use,

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
                                                        是否项目合同一一对应
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('is_onetoone', {
                                                                         initialValue: _formObject.is_onetoone,

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
                                                        实际融资客户
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('pk_cust_finance', {
                                                                         initialValue: _formObject.pk_cust_finance,

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
                                                        是否预约资金
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('is_precapital', {
                                                                initialValue: _formObject.is_precapital,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>

                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        出租方账户
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('pk_account.name', {
                                                                         initialValue: "",

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
                                                        出租方账号
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('pk_account.code', {
                                                                         initialValue: '',

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
                                                        出租方开户银行
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_account.account_bank', {
                                                                         initialValue: '',

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
                                                        出租方开户银行行号
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_account.bank_no', {
                                                                         initialValue: '',

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
                                                        是否允许提前还款
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('is_canrefund', {
                                                                initialValue: _formObject.is_canrefund,
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
                                                        提前还款期限(月)
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('refund_times', {
                                                                         initialValue: _formObject.refund_times,

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
                                                        项目编提前还款手续费率(%)
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('refund_rate', {
                                                                         initialValue: _formObject.refund_rate,

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
                                                        地区审批总额
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_project_approval.area_approve_total', {
                                                                         initialValue: '',

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
                                                        地区实际投放总额
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_project_approval.area_loan_total', {
                                                                         initialValue: '',

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
                                                        地区剩余投放总额
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_project_approval.area_surplus_total', {
                                                                         initialValue: '',

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
                                                        地区可用授信额度
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_project_approval.area_usable_total', {
                                                                         initialValue: '',

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
                                                        行业审批总额
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_project_approval.industry_approve_total', {
                                                                         initialValue: '',

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
                                                        行业实际投放总额
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_project_approval.industry_loan_total', {
                                                                         initialValue: '',

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
                                                        行业剩余投放总额
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_project_approval.industry_surplus_total', {
                                                                         initialValue: '',

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
                                                        行业可用授信额度
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_project_approval.industry_usable_total', {
                                                                         initialValue: '',

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
                                                        让利方式
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('benefit_method', {
                                                                initialValue: _formObject.benefit_method,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        宽限天数
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('grace_days', {
                                                                         initialValue: _formObject.grace_days,

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
                                                        建议日扣减金额
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('suggest_deduct_amt', {
                                                                         initialValue: _formObject.suggest_deduct_amt,

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
                                                        约定日扣减金额
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('appoint_deduct_amt', {
                                                                         initialValue: _formObject.appoint_deduct_amt,

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
                                                        所属公司
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('pk_pro_org', {
                                                                         initialValue: _formObject.pk_pro_org,

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
                                                        是否跨境业务
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('ifCrossborder', {
                                                                initialValue: _formObject.ifCrossborder,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>

                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        是否孵化及创新业务
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('ifInnovate', {
                                                                initialValue: _formObject.ifInnovate,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        是否关联交易方
                                                    </Label>

                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('ifRelation', {
                                                                initialValue: _formObject.ifRelation,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>
                                        </Row>


                                    </div>

                                    {/*授信额度信息*/}
                                    <div style={{display: this.state.show1}}>
                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        授信分类
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={true}
                                                        {
                                                            ...getFieldProps('limit_class', {
                                                                initialValue: _formObject.limit_class,
                                                            })
                                                        }
                                                    />
                                                </FormItem>
                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        授信类型
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={true}
                                                        {
                                                            ...getFieldProps('granting_type', {
                                                                initialValue: _formObject.granting_type,
                                                            })
                                                        }
                                                    />
                                                </FormItem>
                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        本次授信额度
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('limit_amt', {
                                                                         initialValue: _formObject.limit_amt,

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
                                                        授信起始日期
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('granting_start_date', {
                                                                         initialValue: _formObject.granting_start_date,

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
                                                        授信期限
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('granting_times', {
                                                                         initialValue: _formObject.granting_times,

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
                                                        授信截止日期
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('granting_end_date', {
                                                                         initialValue: _formObject.granting_end_date,

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
                                                        原授信额度(元)
                                                    </Label>
                                                    <FormInputNumber
                                                        disabled={true}
                                                        toThousands={true}  //是否显示千分位
                                                        precision={2} //保留2位小数
                                                        {
                                                            ...getFieldProps('granting_original_limit', {
                                                                initialValue: _formObject.granting_original_limit,
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
                                                        已用额度(元)
                                                    </Label>
                                                    <FormInputNumber
                                                        disabled={true}
                                                        toThousands={true}  //是否显示千分位
                                                        precision={2} //保留2位小数
                                                        {
                                                            ...getFieldProps('granting_used_limit', {
                                                                initialValue: _formObject.granting_used_limit,
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
                                                        调整额度(元)
                                                    </Label>
                                                    <FormInputNumber
                                                        disabled={true}
                                                        toThousands={true}  //是否显示千分位
                                                        precision={2} //保留2位小数
                                                        {
                                                            ...getFieldProps('granting_add_limit', {
                                                                initialValue: _formObject.granting_add_limit,
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
                                                        可用额度(元)
                                                    </Label>
                                                    <FormInputNumber
                                                        disabled={true}
                                                        toThousands={true}  //是否显示千分位
                                                        precision={2} //保留2位小数
                                                        {
                                                            ...getFieldProps('granting_surplus_limit', {
                                                                initialValue: _formObject.granting_surplus_limit,
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
                                                        授信币种
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('granting_currency', {
                                                                         initialValue: _formObject.granting_currency,

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
                                                        租赁最大期限
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('max_deadline', {
                                                                         initialValue: _formObject.max_deadline,

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

                                    {/*调息设置*/}
                                    <div style={{display: this.state.show2}}>
                                        <Row>


                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        是否调息
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('if_adjust', {
                                                                initialValue: _formObject.if_adjust,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>

                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        调息渠道
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('adjust_type', {
                                                                initialValue: _formObject.adjust_type,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        调息响应方式
                                                    </Label>

                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('adjust_time', {
                                                                initialValue: _formObject.adjust_time,
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
                                                        调息方法
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('adjust_method', {
                                                                initialValue: _formObject.adjust_method,
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>

                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        调息起始日
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('adjust_start_date', {
                                                                         initialValue: _formObject.adjust_start_date,

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

                                    {/*客户基本信息*/}
                                    <div style={{display: this.state.show3}}>
                                        <Row>


                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        承租人编码
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.code', {
                                                                         initialValue: '',

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
                                                        客户号
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.customer_no', {
                                                                         initialValue: '',

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
                                                        地区（省）
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.province', {
                                                                         initialValue: '',

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
                                                        地区（市）
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.city', {
                                                                         initialValue: '',

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
                                                        地区（县/区）
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.district', {
                                                                         initialValue: '',

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
                                                        行业门类
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.industry', {
                                                                         initialValue: '',

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
                                                        行业门类(大类)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.industry1', {
                                                                         initialValue: '',

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
                                                        行业门类(中类)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.industry2', {
                                                                         initialValue: '',

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
                                                        行业门类(集团口径)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.industry3', {
                                                                         initialValue: '',

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
                                                        企业规模（内部管理）
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.enter_scale_inner', {
                                                                         initialValue: '',

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
                                                        企业规模（四部委）
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.enter_scale_6m', {
                                                                         initialValue: '',

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
                                                        法定代表人
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.legal_rep', {
                                                                         initialValue: '',

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
                                                        实际告知地址
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.inform_address', {
                                                                         initialValue: '',

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
                                                        经济性质
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.economic_type', {
                                                                         initialValue: '',

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
                                                        法定代表人
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.legal_representative', {
                                                                         initialValue: '',

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
                                                        注册地址
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.reg_address', {
                                                                         initialValue: '',

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
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.customer_person', {
                                                                         initialValue: '',

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
                                                        注册币种
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.capital_cur', {
                                                                         initialValue: '',

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

                                    {/*报价信息*/}
                                    <div style={{display: this.state.show4}}>
                                        <Row>


                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        报价名称
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.name', {
                                                                         initialValue: '',

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
                                                        报价编号
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.code', {
                                                                         initialValue: '',

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
                                                        租赁方式
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.lease_method', {
                                                                         initialValue: '',

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
                                                        税种
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.tax_mode', {
                                                                         initialValue: '',

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
                                                        租赁期限（月）
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.lease_times', {
                                                                         initialValue: '',

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
                                                        支付频率
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.lease_freq', {
                                                                         initialValue: '',

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
                                                        计算方式
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.lease_cal_method', {
                                                                         initialValue: '',

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
                                                        报价利率
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.final_rate', {
                                                                         initialValue: '',

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
                                                        合同金额(元)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.total_amount_equipment', {
                                                                         initialValue: '',

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
                                                        净融资额(元)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.net_finance_cash', {
                                                                         initialValue: '',

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
                                                        商业折扣(元)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.trade_discount', {
                                                                         initialValue: '',

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
                                                        实际投放金额(元)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.fact_cash_loan', {
                                                                         initialValue: '',

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
                                                        首付款金额(元)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.down_payment', {
                                                                         initialValue: '',

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
                                                        保证金金额(元)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.deposit_cash', {
                                                                         initialValue: '',

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
                                                        服务费收入总金额(元)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.srvfee_cash_in', {
                                                                         initialValue: '',

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
                                                        服务费支出总金额(元)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.srvfee_cash_out', {
                                                                         initialValue: '',

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
                                                        总租金(元)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.lease_cash', {
                                                                         initialValue: '',

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
                                                        总利息(元)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.lease_interest', {
                                                                         initialValue: '',

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
                                                        总本金(元)
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.lease_corpus', {
                                                                         initialValue: '',

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
                                                        会计IRR算法调整
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.finance_irr_method', {
                                                                         initialValue: '',

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
                                                        会计IRR算法启用年份
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.finance_irr_year', {
                                                                         initialValue: '',

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
                                                        增值税下IRR
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.vat_irr', {
                                                                         initialValue: '',

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
                                                        会计IRR
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.finance_irr', {
                                                                         initialValue: '',

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
                                                        租金IRR
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.rent_irr', {
                                                                         initialValue: '',

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
                                                        项目去税IRR
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.project_notax_irr', {
                                                                         initialValue: '',

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
                                                        手续费分配IRR
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.fee_distr_irr', {
                                                                         initialValue: '',

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
                                                        租赁合同IRR
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.contract_irr', {
                                                                         initialValue: '',

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
                                                        审计IRR
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.audit_irr', {
                                                                         initialValue: '',

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
                                                        承租人IRR
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.lessee_irr', {
                                                                         initialValue: '',

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
                                                        会计去税IRR
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectCalculatorRefVO.finance_notax_irr', {
                                                                         initialValue: '',

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

                                    {/*租赁物信息*/}
                                    <div style={{display: this.state.show5}}>
                                        <Row>


                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        租赁物名称
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectRentThingRefVO.name', {
                                                                         initialValue: '',

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
                                                        租赁物编号
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectRentThingRefVO.code', {
                                                                         initialValue: '',

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
                                                        型号
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectRentThingRefVO.model', {
                                                                         initialValue: '',

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
                                                        租赁物分类
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectRentThingRefVO.param_name', {
                                                                         initialValue: '',

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
                                                        设备总价
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectRentThingRefVO.total_cost', {
                                                                         initialValue: '',

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
                                                        净值
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectRentThingRefVO.net_worth', {
                                                                         initialValue: '',

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
                                                        估值
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectRentThingRefVO.valuation', {
                                                                         initialValue: '',

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
                                                        交货日期
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectRentThingRefVO.delivery_date', {
                                                                         initialValue: '',

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
                                                        交货地点
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectRentThingRefVO.delivery_address', {
                                                                         initialValue: '',

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
                                                        使用地址
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectRentThingRefVO.use_address', {
                                                                         initialValue: '',

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

                                    {/*担保信息*/}
                                    <div style={{display: this.state.show6}}>
                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        担保方式
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={true}
                                                        {
                                                            ...getFieldProps('projectPledgeRefVO.guarantee_method', {
                                                                initialValue: '',
                                                            })
                                                        }
                                                    />

                                                </FormItem>

                                            </Col>

                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        单位客户
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectPledgeRefVO.corp_cust', {
                                                                         initialValue: '',

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
                                                        自然人客户
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectPledgeRefVO.pers_cust', {
                                                                         initialValue: '',

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
                                                        担保总金额
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectPledgeRefVO.plan_cash', {
                                                                         initialValue: '',

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
                                                        抵押金额
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectPledgeRefVO.pledge_amount', {
                                                                         initialValue: '',

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
                                                        质押金额
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('projectPledgeRefVO.prenda_amount', {
                                                                         initialValue: '',

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

                                    {/*限额信息*/}
                                    <div style={{display: this.state.show7}}>
                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        供应商合作协议
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_framework_agreem', {
                                                                         initialValue: _formObject.pk_framework_agreem,

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
                                                        供应商限额方案
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_quota_scheme', {
                                                                         initialValue: _formObject.pk_quota_scheme,

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
                                                        供应商限额结果
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('quota_result', {
                                                                         initialValue: _formObject.quota_result,

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

                                    {/*项目相关信息*/}
                                    <div style={{display: this.state.show8}}>
                                        <Row>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目部门(大区)
                                                </Label>
                                                <FormControl disabled={!this.props.isEdit}
                                                             {
                                                                 ...getFieldProps('belongs_area', {
                                                                     initialValue: _formObject.belongs_area,

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
                                                    项目部门(片区)
                                                </Label>
                                                <FormControl disabled={!this.props.isEdit}
                                                             {
                                                                 ...getFieldProps('project_dept', {
                                                                     initialValue: _formObject.project_dept,

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
                                                    项目经理
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
                                    </Row>
                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        大区经理
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('region_manager', {
                                                                         initialValue: _formObject.region_manager,

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
                                                        片区经理
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('area_manager', {
                                                                         initialValue: _formObject.area_manager,

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

                                    {/*承租人相关部门信息*/}
                                    <div style={{display: this.state.show9}}>
                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        财务相关
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.finance_related', {
                                                                         initialValue: '',

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
                                                        设备相关
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.equipment_related', {
                                                                         initialValue: '',

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
                                                        其他部门
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.other_dept', {
                                                                         initialValue: '',

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
                                                        政府相关
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.government_related', {
                                                                         initialValue: '',

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
                                                        政府财政相关
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.govern_finance_related', {
                                                                         initialValue: '',

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
                                                        政府其他部门
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('pk_consumer.govern_other_sectors', {
                                                                         initialValue: '',

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

                                    {/*其他信息*/}
                                    <div style={{display: this.state.show10}}>
                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        保险费比例
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('premium', {
                                                                         initialValue: _formObject.premium,

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
                                                        公证费比例
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('notarial_fees_rate', {
                                                                         initialValue: _formObject.notarial_fees_rate,

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
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('is_fit_admittance', {
                                                                initialValue: _formObject.is_fit_admittance,
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
                                    <Button bordered style={{marginRight: 11}} onClick={() => this.prev()}>
                                        上一步
                                    </Button>
                                }
                                {
                                    this.state.current < steps.length - 1
                                    &&
                                    <Button colors="primary" style={{marginRight: 11}}
                                            onClick={() => this.next()}>下一步</Button>
                                }
                                {
                                    this.state.current === steps.length - 1
                                    &&
                                    <Button colors="primary" style={{marginRight: 11}}
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
