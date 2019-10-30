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
                                                                     ...getFieldProps('pkProjectApproval.name', {
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
                                                                     ...getFieldProps('pkProjectApproval.code', {
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
                                                                     ...getFieldProps('pkConsumer.name', {
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
                                                                     ...getFieldProps('projectName', {
                                                                         initialvalue: _formObject.projectName,

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
                                                                     ...getFieldProps('projectCode', {
                                                                         initialvalue: _formObject.projectCode,

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
                                                                     ...getFieldProps('projectBatch', {
                                                                         initialvalue: _formObject.projectBatch,

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
                                                            ...getFieldProps('projectStatus', {
                                                                initialvalue: _formObject.projectStatus,
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
                                                            ...getFieldProps('leaseCategry', {
                                                                initialvalue: _formObject.leaseCategry,
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
                                                            ...getFieldProps('leasebackType', {
                                                                initialvalue: _formObject.leasebackType,
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
                                                            ...getFieldProps('projectTaxType', {
                                                                initialvalue: _formObject.projectTaxType,
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
                                                            ...getFieldProps('isInsure', {
                                                                initialvalue: _formObject.isInsure,
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
                                                            ...getFieldProps('ifCoLessee', {
                                                                initialvalue: _formObject.ifCoLessee,
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
                                                                     ...getFieldProps('clientRating', {
                                                                         initialvalue: _formObject.clientRating,

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
                                                                     ...getFieldProps('planReleaseDate', {
                                                                         initialvalue: _formObject.planReleaseDate,

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
                                                                     ...getFieldProps('releaseAmount', {
                                                                         initialvalue: _formObject.releaseAmount,

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
                                                                     ...getFieldProps('purchaseTotalAmount', {
                                                                         initialvalue: _formObject.purchaseTotalAmount,

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
                                                            ...getFieldProps('fundingSources', {
                                                                initialvalue: _formObject.fundingSources,
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
                                                            ...getFieldProps('tradingSchemes', {
                                                                initialvalue: _formObject.tradingSchemes,
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
                                                            ...getFieldProps('projectSort', {
                                                                initialvalue: _formObject.projectSort,
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
                                                                     ...getFieldProps('pkCustMain.name', {
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
                                                                     ...getFieldProps('pkCustHelp.name', {
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
                                                            ...getFieldProps('leaseClassification', {
                                                                initialvalue: _formObject.leaseClassification,
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
                                                            ...getFieldProps('increaseCreditType', {
                                                                initialvalue: _formObject.increaseCreditType,
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
                                                                     ...getFieldProps('businessDomain', {
                                                                         initialvalue: _formObject.businessDomain,

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
                                                                     ...getFieldProps('capitalUse', {
                                                                         initialvalue: _formObject.capitalUse,

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
                                                                     ...getFieldProps('isOnetoone', {
                                                                         initialvalue: _formObject.isOnetoone,

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
                                                                     ...getFieldProps('pkCustFinance', {
                                                                         initialvalue: _formObject.pkCustFinance,

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
                                                            ...getFieldProps('isPrecapital', {
                                                                initialvalue: _formObject.isPrecapital,
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
                                                                     ...getFieldProps('pkAccount.name', {
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
                                                                     ...getFieldProps('pkAccount.code', {
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
                                                                     ...getFieldProps('pkAccount.accountBank', {
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
                                                                     ...getFieldProps('pkAccount.bankNo', {
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
                                                            ...getFieldProps('isCanrefund', {
                                                                initialvalue: _formObject.isCanrefund,
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
                                                                     ...getFieldProps('refundTimes', {
                                                                         initialvalue: _formObject.refundTimes,

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
                                                                     ...getFieldProps('refundRate', {
                                                                         initialvalue: _formObject.refundRate,

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
                                                                     ...getFieldProps('pkProjectApproval.areaApproveTotal', {
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
                                                                     ...getFieldProps('pkProjectApproval.areaLoanTotal', {
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
                                                                     ...getFieldProps('pkProjectApproval.areaSurplusTotal', {
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
                                                                     ...getFieldProps('pkProjectApproval.areaUsableTotal', {
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
                                                                     ...getFieldProps('pkProjectApproval.industryApproveTotal', {
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
                                                                     ...getFieldProps('pkProjectApproval.industryLoanTotal', {
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
                                                                     ...getFieldProps('pkProjectApproval.industrySurplusTotal', {
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
                                                                     ...getFieldProps('pkProjectApproval.industryUsableTotal', {
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
                                                            ...getFieldProps('benefitMethod', {
                                                                initialvalue: _formObject.benefitMethod,
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
                                                                     ...getFieldProps('graceDays', {
                                                                         initialvalue: _formObject.graceDays,

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
                                                                     ...getFieldProps('suggestDeductAmt', {
                                                                         initialvalue: _formObject.suggestDeductAmt,

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
                                                                     ...getFieldProps('appointDeductAmt', {
                                                                         initialvalue: _formObject.appointDeductAmt,

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
                                                                     ...getFieldProps('pkProOrg', {
                                                                         initialvalue: _formObject.pkProOrg,

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
                                                                initialvalue: _formObject.ifcrossborder,
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
                                                                initialvalue: _formObject.ifinnovate,
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
                                                                initialvalue: _formObject.ifrelation,
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
                                                            ...getFieldProps('limitClass', {
                                                                initialvalue: _formObject.limitClass,
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
                                                            ...getFieldProps('grantingType', {
                                                                initialvalue: _formObject.grantingType,
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
                                                                     ...getFieldProps('limitAmt', {
                                                                         initialvalue: _formObject.limitAmt,

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
                                                                     ...getFieldProps('grantingStartDate', {
                                                                         initialvalue: _formObject.grantingStartDate,

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
                                                                     ...getFieldProps('grantingTimes', {
                                                                         initialvalue: _formObject.grantingTimes,

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
                                                                     ...getFieldProps('grantingEndDate', {
                                                                         initialvalue: _formObject.grantingEndDate,

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
                                                            ...getFieldProps('grantingOriginalLimit', {
                                                                initialvalue: _formObject.grantingOriginalLimit,
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
                                                            ...getFieldProps('grantingUsedLimit', {
                                                                initialvalue: _formObject.grantingUsedLimit,
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
                                                            ...getFieldProps('grantingAddLimit', {
                                                                initialvalue: _formObject.grantingAddLimit,
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
                                                            ...getFieldProps('grantingSurplusLimit', {
                                                                initialvalue: _formObject.grantingSurplusLimit,
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
                                                                     ...getFieldProps('grantingCurrency', {
                                                                         initialvalue: _formObject.grantingCurrency,

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
                                                                     ...getFieldProps('maxDeadline', {
                                                                         initialvalue: _formObject.maxDeadline,

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
                                                            ...getFieldProps('ifAdjust', {
                                                                initialvalue: _formObject.ifAdjust,
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
                                                            ...getFieldProps('adjustType', {
                                                                initialvalue: _formObject.adjustType,
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
                                                            ...getFieldProps('adjustTime', {
                                                                initialvalue: _formObject.adjustTime,
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
                                                            ...getFieldProps('adjustMethod', {
                                                                initialvalue: _formObject.adjustMethod,
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
                                                                     ...getFieldProps('adjustStartDate', {
                                                                         initialvalue: _formObject.adjustStartDate,

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
                                                                     ...getFieldProps('pkConsumer.code', {
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
                                                                     ...getFieldProps('pkConsumer.customerNo', {
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
                                                                     ...getFieldProps('pkConsumer.province', {
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
                                                                     ...getFieldProps('pkConsumer.city', {
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
                                                                     ...getFieldProps('pkConsumer.district', {
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
                                                                     ...getFieldProps('pkConsumer.industry', {
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
                                                                     ...getFieldProps('pkConsumer.industry1', {
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
                                                                     ...getFieldProps('pkConsumer.industry2', {
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
                                                                     ...getFieldProps('pkConsumer.industry3', {
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
                                                                     ...getFieldProps('pkConsumer.enterScaleInner', {
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
                                                                     ...getFieldProps('pkConsumer.enterScale6m', {
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
                                                                     ...getFieldProps('pkConsumer.legalRep', {
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
                                                                     ...getFieldProps('pkConsumer.informAddress', {
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
                                                                     ...getFieldProps('pkConsumer.economicType', {
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
                                                                     ...getFieldProps('pkConsumer.legalRepresentative', {
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
                                                                     ...getFieldProps('pkConsumer.regAddress', {
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
                                                                     ...getFieldProps('pkConsumer.customerPerson', {
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
                                                                     ...getFieldProps('pkConsumer.capitalCur', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.leaseMethod', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.taxMode', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.leaseTimes', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.leaseFreq', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.leaseCalMethod', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.finalRate', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.totalAmountEquipment', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.netFinanceCash', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.tradeDiscount', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.factCashLoan', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.downPayment', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.depositCash', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.srvfeeCashIn', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.srvfeeCashOut', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.leaseCash', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.leaseInterest', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.leaseCorpus', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.financeIrrMethod', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.financeIrrYear', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.vatIrr', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.financeIrr', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.rentIrr', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.projectNotaxIrr', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.feeDistrIrr', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.contractIrr', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.auditIrr', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.lesseeIrr', {
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
                                                                     ...getFieldProps('projectcalculatorrefvo.financeNotaxIrr', {
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
                                                                     ...getFieldProps('projectrentthingrefvo.paramName', {
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
                                                                     ...getFieldProps('projectrentthingrefvo.totalCost', {
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
                                                                     ...getFieldProps('projectrentthingrefvo.netWorth', {
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
                                                                     ...getFieldProps('projectrentthingrefvo.deliveryDate', {
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
                                                                     ...getFieldProps('projectrentthingrefvo.deliveryAddress', {
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
                                                                     ...getFieldProps('projectrentthingrefvo.useAddress', {
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
                                                            ...getFieldProps('projectpledgerefvo.guaranteeMethod', {
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
                                                                     ...getFieldProps('projectpledgerefvo.corpCust', {
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
                                                                     ...getFieldProps('projectpledgerefvo.persCust', {
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
                                                                     ...getFieldProps('projectpledgerefvo.planCash', {
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
                                                                     ...getFieldProps('projectpledgerefvo.pledgeAmount', {
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
                                                                     ...getFieldProps('projectpledgerefvo.prendaAmount', {
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
                                                                     ...getFieldProps('pkFrameworkAgreem', {
                                                                         initialvalue: _formObject.pkFrameworkAgreem,

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
                                                                     ...getFieldProps('pkQuotaScheme', {
                                                                         initialvalue: _formObject.pkQuotaScheme,

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
                                                                     ...getFieldProps('quotaResult', {
                                                                         initialvalue: _formObject.quotaResult,

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
                                                                 ...getFieldProps('belongsArea', {
                                                                     initialvalue: _formObject.belongsArea,

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
                                                                 ...getFieldProps('projectDept', {
                                                                     initialvalue: _formObject.projectDept,

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
                                                                 ...getFieldProps('pkPrjManager', {
                                                                     initialvalue: _formObject.pkPrjManager,

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
                                                                     ...getFieldProps('regionManager', {
                                                                         initialvalue: _formObject.regionManager,

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
                                                                     ...getFieldProps('areaManager', {
                                                                         initialvalue: _formObject.areaManager,

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
                                                                     ...getFieldProps('pkConsumer.financeRelated', {
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
                                                                     ...getFieldProps('pkConsumer.equipmentRelated', {
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
                                                                     ...getFieldProps('pkConsumer.otherDept', {
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
                                                                     ...getFieldProps('pkConsumer.governmentRelated', {
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
                                                                     ...getFieldProps('pkConsumer.governFinanceRelated', {
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
                                                                     ...getFieldProps('pkConsumer.governOtherSectors', {
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
                                                                         initialvalue: _formObject.premium,

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
                                                                     ...getFieldProps('notarialFeesRate', {
                                                                         initialvalue: _formObject.notarialFeesRate,

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
                                                            ...getFieldProps('isFitAdmittance', {
                                                                initialvalue: _formObject.isFitAdmittance,
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
