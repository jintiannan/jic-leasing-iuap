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
        console.log('value');
        console.log(value);
        if(value == '暂存'){
            this.props.form.setFieldsValue({'meetingnper':555});
        }
    };

    submit = () => {
        console.log(this.props.form.getFieldsValue());
        return this.props.form.getFieldsValue();
    };

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
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
                                    <FormControl
                                        {
                                            ...getFieldProps('role_code', {
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
                                        角色名称
                                    </Label>
                                    <FormControl
                                        {
                                            ...getFieldProps('role_name', {
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
                                        角色备注
                                    </Label>
                                    <FormControl
                                        {
                                            ...getFieldProps('memo', {
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
                    </Form>
                </div>

        );
    }
}

export default Form.createForm()(FormView);
