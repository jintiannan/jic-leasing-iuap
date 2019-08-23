/**
 *
 * @title 结合切换事件的 Step
 * @description 点击next，Step的流程跟进
 *
 */
import React, {Component} from 'react';
import {Step, Button, Message, Modal, Form, Icon, Label, Col, Row, FormControl} from 'tinper-bee';
import {actions} from 'mirrorx';

const FormItem = Form.FormItem;

import './index.less';

const addTitle = "新增角色";


class AddFormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
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
        let newRole = this.props.list;
        newRole.push(this.props.form.getFieldsValue());
        actions.role.updateState({list: newRole, showModal: false});
    };

    close = () => {
        actions.role.updateState({showModal: false});
    };

    render() {
        const {getFieldProps, getFieldError} = this.props.form;
        let formObjAdd = this.props.formObject;
        return (
            <div>

                <Modal
                    className="demo4-modal"
                    show={this.props.showModal}
                    backdrop="static" //关闭遮罩事件
                    size="xlg" //大号模态框
                    onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title> {addTitle} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="steps-content">
                            <Form>
                                <div>

                                    <Row>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    角色编码
                                                </Label>
                                                <FormControl
                                                    {
                                                        ...getFieldProps('role_code', {
                                                            initialValue: formObjAdd.role_code,
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />

                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    角色名称
                                                </Label>
                                                <FormControl
                                                    {
                                                        ...getFieldProps('role_name', {
                                                            initialValue: formObjAdd.role_name,
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                            </FormItem>
                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    角色备注
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
                        <div className="steps-action">
                            {
                                <Button colors="primary" style={{marginRight: 8}}
                                        onClick={this.onSubSave}>保存</Button>
                            }{
                            <Button colors="secondary" onClick={this.close}> 关闭 </Button>
                        }
                        </div>

                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default Form.createForm()(AddFormView);
