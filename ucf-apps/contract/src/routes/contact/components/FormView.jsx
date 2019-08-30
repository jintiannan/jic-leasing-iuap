import React, { Component } from 'react';
import {Panel, PanelGroup , Form, Icon, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl, Collapse } from 'tinper-bee';
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
            activeKey: '1',
            open1:true,
            open2:true,
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

    handleSelect = (key)=> {
        if(key =='1')
            this.setState({open1:!this.state.open1});
        else if(key=='2'){
            this.setState({open2:!this.state.open2});
        }
    }

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
                <PanelGroup activeKey={this.state.activeKey} >
                    <Panel header="基本信息" eventKey="1" collapsible defaultExpanded="true" expanded={this.state.open1} onSelect={this.handleSelect.bind(this,'1')} >
                    <Form>
                    <Row>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    会议期数
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('meetingnper', {
                                        initialValue: _formObj.meetingnper,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('meetingnper', {
                                        initialValue: _formObj.meetingnper,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>                        
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    单据状态
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('billstatus', {
                                        initialValue: _formObj.billstatus,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<Select 
                                    disabled={!_props.isEdit}
                                    onChange={this.handleChange}
                                    data={[{key:'通过',value:'9'},{key:'暂存',value:'20'}]}
                                    {...getFieldProps('billstatus', {
                                        initialValue: _formObj.billstatus,                                        
                                        rules: [{
                                            required: true, message: '请选择单据状态!',
                                        }],
                                    })}  
                                />  )}
                                                           
                            </FormItem>
                        </Col>  
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    项目名称
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('project_name', {
                                        initialValue: _formObj.project_name,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('project_name', {
                                        initialValue: _formObj.project_name,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>  
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    调息时间
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('adjust_time', {
                                        initialValue: _formObj.adjust_time,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('adjust_time', {
                                        initialValue: _formObj.adjust_time,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>  
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    调息类型
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('adjust_type', {
                                        initialValue: _formObj.adjust_type,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('adjust_type', {
                                        initialValue: _formObj.adjust_type,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>  
                        </Row>   
                        </Form>
                        </Panel>
                    <Panel header="合同详情" eventKey="2" collapsible defaultExpanded="true" expanded={this.state.open2} onSelect={this.handleSelect.bind(this,'2')} >
                        <Form>
                    <Row>  
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    总期数
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('allnper', {
                                        initialValue: _formObj.allnper,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('allnper', {
                                        initialValue: _formObj.allnper,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    约定扣减金额
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('appoint_deduct_amt', {
                                        initialValue: _formObj.appoint_deduct_amt,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('appoint_deduct_amt', {
                                        initialValue: _formObj.appoint_deduct_amt,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    让利方式
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('benefit_method', {
                                        initialValue: _formObj.benefit_method,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):(<FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('benefit_method', {
                                        initialValue: _formObj.benefit_method,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col> 
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    变更类型
                                </Label>
                                {!_props.isEdit ? ( <FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('change_type', {
                                        initialValue: _formObj.change_type,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('change_type', {
                                        initialValue: _formObj.change_type,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                               
                            </FormItem>
                        </Col>   
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    复核日期
                                </Label>
                                {!_props.isEdit ? ( <FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('check_date', {
                                        initialValue: _formObj.check_date,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('check_date', {
                                        initialValue: _formObj.check_date,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>   
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                                
                            </FormItem>
                        </Col>  
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>   
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>             
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户评级
                                </Label>
                                {!_props.isEdit ? (<FormControl style = {{'background-color':'transparent','border':0}}
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />):( <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('client_rating', {
                                        initialValue: _formObj.client_rating,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />)}
                            </FormItem>
                        </Col>
                    </Row>                                
                    </Form>
                    </Panel>
                </PanelGroup> 
        </div>
              
        );
    }
}

export default Form.createForm()(FormView);