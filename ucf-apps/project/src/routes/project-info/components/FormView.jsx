import React, { Component } from 'react';
import { Form, Icon, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl, Collapse } from 'tinper-bee';
import { deepClone } from "utils";
import { SelectField } from 'components/RowField/SelectField'
import FormSplitHeader from 'components/FormSplitHeader'
import InputNumber from 'bee-input-number';

import './index.less';

const FormItem = Form.FormItem;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formObj: {},
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

    mainForm = [
        {}
    ]

    handleChange = (value) =>{
        console.log('value');
        console.log(value);
        if(value == '暂存'){
            this.props.form.setFieldsValue({'meetingnper':555});
        }   
    }

    submit = () => {
        console.log(this.props.form.getFieldsValue());
        return this.props.form.getFieldsValue();
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let formObj = this.props.formObject;
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
                                    会议期数
                                </Label>
                                <InputNumber
                                    {
                                    ...getFieldProps('meetingnper', {
                                        initialValue: formObj.meetingnper,
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
                                    单据状态
                                </Label>
                                
                                <Select 
                                    disabled={!_props.isEdit}
                                    onChange={this.handleChange}
                                    data={[{key:'通过',value:'9'},{key:'暂存',value:'20'}]}
                                    {...getFieldProps('billstatus', {
                                        initialValue: '通过',                                        
                                        rules: [{
                                            required: true, message: '请选择单据状态!',
                                        }],
                                    })}  
                                >
                                </Select>                                
                            </FormItem>
                        </Col>                                
                    </Row>                                
                    </Form>
                </div>
              
        );
    }
}

export default Form.createForm()(FormView);