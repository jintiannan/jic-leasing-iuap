import React, { Component } from 'react';
import { Form, Icon, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl, Collapse, Tabs } from 'tinper-bee';
import { deepClone } from "utils";
import { SelectField } from 'components/RowField/SelectField'
import FormSplitHeader from 'components/FormSplitHeader'
import InputNumber from 'bee-input-number';
import ChildListView from './ChildListView';

const {TabPane} = Tabs;

import './index.less';

const FormItem = Form.FormItem;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formObj: {},
            open: true,
            open2: true,
            open3: true,
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

    onChange = (activeKey) => {
        console.log(`onChange ${activeKey} o-^-o`);
        this.setState({
            activeKey,
        });
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let formObj = this.props.formObject;
        let _formObj = deepClone(formObj);
        let _props = this.props;
        return (
            <div className='form'>
                <div>
                <span onClick={ ()=> this.setState({ open: !this.state.open })} >
                    <FormSplitHeader title={'主表信息'} />
                </span>

                <Collapse in={this.state.open}>
                        <Form>
                            <Collapse
                                in={this.state.open}>
                                <div>
                                    <Row>
                                        <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    单据状态
                                </Label>
                                
                                <Select 
                                 
                                    disabled={!_props.isEdit}
                                    onChange={this.handCleChange}
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
                                        <Col md={4} xs={4} sm={4}>
                                        <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    会议期数
                                </Label>
                                <InputNumber
                                    disabled={!_props.isEdit}
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
                                                    承租人名称
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('pk_consumer', {
                                                            initialValue: formObj.pk_consumer?formObj.pk_consumer.name:"",
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
                                                    承租人编码
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('pk_consumer', {
                                                            initialValue: formObj.pk_consumer?formObj.pk_consumer.code:"",
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目名称
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_name', {
                                                            initialValue: formObj.project_name,
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_name')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目编码
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_code', {
                                                            initialValue: formObj.project_code,
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目名称
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_name', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                            </Collapse>

                        </Form>

                </Collapse>
                </div>


                <div>
                <span onClick={ ()=> this.setState({ open2: !this.state.open2 })} >
                    <FormSplitHeader title={'项目信息'} />
                </span>

                    <Collapse in={this.state.open2}>

                        <Form>
                            <Collapse
                                in={this.state.open2}>
                                <div>
                                    <Row>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
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
                                                    项目名称
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_name', {
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
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
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
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目名称
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_name', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目名称
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_name', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                            </Collapse>

                        </Form>

                    </Collapse>
                </div>

                <div>
                <span onClick={ ()=> this.setState({ open3: !this.state.open3 })} >
                    <FormSplitHeader title={'操作信息'} />
                </span>

                    <Collapse in={this.state.open3}>

                        <Form>
                            <Collapse
                                in={this.state.open3}>
                                <div>
                                    <Row>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
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
                                                    项目名称
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_name', {
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
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
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
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目名称
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_name', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目名称
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_name', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>

                                        </Col>
                                        <Col md={4} xs={4} sm={4}>
                                            <FormItem>
                                                <Label>
                                                    <Icon type="uf-mi" className='mast'></Icon>
                                                    项目编号
                                                </Label>
                                                <FormControl disabled = {!_props.isEdit}
                                                    {
                                                        ...getFieldProps('project_filing_code', {
                                                            initialValue: '',
                                                            rules: [{
                                                                required: true,
                                                            }],
                                                        })
                                                    }
                                                />
                                                <span className='error'>
                                    {
                                        getFieldError('project_filing_code')
                                    }
                                </span>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                            </Collapse>

                        </Form>

                    </Collapse>
                </div>
                <div>
                <br/>
                <Tabs
                    defaultActiveKey="1"
                    onChange={this.onChange}
                    className="demo1-tabs"
                >
                    <TabPane tab='客户信息' key="1"> <ChildListView /></TabPane>
                    <TabPane tab='项目信息' key="2"> <ChildListView /></TabPane>
                    <TabPane tab='合同信息' key="3"> <ChildListView /></TabPane>
                </Tabs>
                </div>
            </div>

                
              
        );
    }
}

export default Form.createForm()(FormView);