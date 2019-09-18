/**
 *
 * @title 结合切换事件的 Step
 * @description 点击next，Step的流程跟进
 *
 */
import React, {Component} from 'react';
import {Button, Message, Modal, Form, Icon, Label, Col, Row, FormControl, Select} from 'tinper-bee';
import {actions} from 'mirrorx';

const FormItem = Form.FormItem;

import './index.less';
import {deepClone} from "../../../../../../ucf-common/src/utils";

const addTitle = "新增客户来源";


class AddFormView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        actions.customerSource.updateState({list: newRole, showModal: false});
    };

    close = () => {
        actions.customerSource.updateState({showModal: false});
    };

    render() {
        const {getFieldProps, getFieldError} = this.props.form;
        let formObjAdd = this.props.formObject;
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
                        <div>
                            <Form>
                                <div>
                                    <Row>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    客户名称
                                                </Label>
                                                <FormControl disabled={true}
                                                    {
                                                        ...getFieldProps('customer_name', {
                                                            initialValue: formObjAdd.customer_name,
                                                            rules: [{
                                                                required: true,
                                                            }],
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
                                                <FormControl disabled={true}
                                                    {
                                                        ...getFieldProps('customer_code', {
                                                            initialValue: formObjAdd.customer_code,
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                            </FormItem>
                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    来源方式
                                                </Label>
                                                <Select
                                                    style={{width: 195}}

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
                                                    中介类别
                                                </Label>
                                                <Select
                                                    style={{width: 195}}

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
                                                    关联中介名称
                                                </Label>
                                                <Select
                                                    style={{width: 195}}

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
                                                    关联中介编号
                                                </Label>
                                                <Select
                                                    style={{width: 195}}

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
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    备注
                                                </Label>
                                                <FormControl
                                                    {
                                                        ...getFieldProps('memo', {
                                                            initialValue: formObjAdd.memo,
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
                    </Modal.Body>
                    <Modal.Footer className="text-center">
                        <Button colors="primary" style={{marginRight: 8}} onClick={this.onSubSave.bind(this)}>
                            保存
                        </Button>
                        <Button bordered onClick={this.close}>
                            取消
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Form.createForm()(AddFormView);
