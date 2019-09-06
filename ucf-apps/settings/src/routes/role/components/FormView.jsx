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
                                        角色编号
                                    </Label>
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('role_code', {
                                                initialValue: _formObject.role_code,

                                                rules: [{
                                                    required: true,
                                                }],
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
                                    <FormControl disabled={!this.props.isEdit}
                                        {
                                            ...getFieldProps('role_name', {
                                                initialValue: _formObject.role_name,
                                                rules: [{
                                                    required: true,
                                                }],
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
                    </Form>
                </div>

        );
    }
}

export default Form.createForm()(FormView);
