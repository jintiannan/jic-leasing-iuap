import React, { Component } from 'react';
import { Panel, PanelGroup ,Form, Icon, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl, Collapse } from 'tinper-bee';
import { deepClone } from "utils";

import './index.less';

const FormItem = Form.FormItem;

class CalFormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formObj: {},
            open1:true,
            open2:true,
            open3:true,
            open4:true,
            open5:true,
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
        return this.props.form.getFieldsValue();
    }

    handleSelect = (key)=> {
        if(key =='1')
            this.setState({open1:!this.state.open1});
        else if(key=='2'){
            this.setState({open2:!this.state.open2});
        }else if(key=='3'){
            this.setState({open3:!this.state.open3});
        }else if(key=='4'){
            this.setState({open4:!this.state.open4});
        }else if(key=='5'){
            this.setState({open5:!this.state.open5});
        }
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let formObj = this.props.CalformObject;
        formObj = formObj !=undefined ? formObj : {};
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
                                    报价方案名称
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
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
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    报价方案编号
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
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
                    </Panel>
                    <Panel header="投放信息" eventKey="2" collapsible defaultExpanded="true" expanded={this.state.open2} onSelect={this.handleSelect.bind(this,'2')} >
                    <Form>
                    <Row>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    限额方案
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('pk_limit_plan', {
                                        initialValue: _formObj.pk_limit_plan,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>                        
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    税种
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('tax_mode', {
                                        initialValue: _formObj.tax_mode,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col> 
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    租赁方式
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('lease_method', {
                                        initialValue: _formObj.lease_method,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col> 
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    租金税率
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('rent_tax_rate', {
                                        initialValue: _formObj.rent_tax_rate,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col> 
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    投放日期
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('plan_date_loan', {
                                        initialValue: _formObj.plan_date_loan,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col> 
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    投放金额
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('plan_loan_cash', {
                                        initialValue: _formObj.plan_loan_cash,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col> 
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    首付款金额
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('down_payment', {
                                        initialValue: _formObj.down_payment,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>  
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    首付款比例
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('down_payment_ratio', {
                                        initialValue: _formObj.down_payment_ratio,
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
                    </Panel>
                    <Panel header="保证金设置" eventKey="3" collapsible defaultExpanded="true" expanded={this.state.open3} onSelect={this.handleSelect.bind(this,'3')} >
                    <Form>
                    <Row>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    保证金收取方式
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('deposit_method', {
                                        initialValue: _formObj.deposit_method,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>  
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    保证金比例
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('deposit_ratio', {
                                        initialValue: _formObj.deposit_ratio,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>                       
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    保证金金额(元)
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('deposit_cash', {
                                        initialValue: _formObj.deposit_cash,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col> 
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    保证金退回方式
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('return_method_depos', {
                                        initialValue: _formObj.return_method_depos,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    保证金是否计息
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('if_interest_depos', {
                                        initialValue: _formObj.if_interest_depos,
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
                    </Panel>
                    <Panel header="手续费设置" eventKey="4" collapsible defaultExpanded="true" expanded={this.state.open4} onSelect={this.handleSelect.bind(this,'4')} >
                    <Form>
                    <Row>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    手续费收取方式
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('srvfee_method', {
                                        initialValue: _formObj.srvfee_method,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>                        
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    手续费计算基数
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('srvfee_base', {
                                        initialValue: _formObj.srvfee_base,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>   
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    手续费比例
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('srvfee_ratio_in', {
                                        initialValue: _formObj.srvfee_ratio_in,
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
                    </Panel>
                    <Panel header="收租设置" eventKey="5" collapsible defaultExpanded="true" expanded={this.state.open5} onSelect={this.handleSelect.bind(this,'5')} >
                    <Form>
                    <Row>
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    租赁期限
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('lease_times', {
                                        initialValue: _formObj.lease_times,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>                        
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    计划收租日
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('plan_date_loan', {
                                        initialValue: _formObj.plan_date_loan,
                                        rules: [{
                                            required: true,
                                        }],
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>  
                        <Col md={3} xs={3} sm={3}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    先付后付标志
                                </Label>
                                <FormControl
                                    disabled={!_props.isCalEdit}
                                    {
                                    ...getFieldProps('prepare_or_not', {
                                        initialValue: _formObj.prepare_or_not,
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
                    <Col md={3} xs={3} sm={3}>
                    <FormItem>
                        <Label>
                            <Icon type="uf-mi" className='mast'></Icon>
                            计息金额计算方式
                        </Label>
                        <FormControl
                            disabled={!_props.isCalEdit}
                            {
                            ...getFieldProps('cal_method_spec', {
                                initialValue: _formObj.cal_method_spec,
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
                    </Panel>
                </PanelGroup>
                </div>
              
        );
    }
}

export default Form.createForm()(CalFormView);