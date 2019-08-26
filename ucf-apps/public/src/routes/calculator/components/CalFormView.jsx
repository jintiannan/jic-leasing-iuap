import React, { Component } from 'react';
import { Form, Icon, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl, Collapse } from 'tinper-bee';
import { deepClone } from "utils";

import './index.less';

const FormItem = Form.FormItem;

class CalFormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formObj: {},
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

    submit = () => {
        debugger;
        console.log(this.props.form.getFieldsValue());
        return this.props.form.getFieldsValue();
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let formObj = this.props.formObject.pk_cal;
        formObj = formObj !=undefined ? formObj : {};
        let _formObj = deepClone(formObj);
        let _props = this.props;
        return (

                <div className='form'>
                    <Form>
                    <Row>
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    报价方案名称
                                </Label>
                                <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('quote_name', {
                                        initialValue: _formObj.quote_name,
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
                                    报价方案编号
                                </Label>
                                <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('quote_code', {
                                        initialValue: _formObj.quote_code,
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

export default Form.createForm()(CalFormView);