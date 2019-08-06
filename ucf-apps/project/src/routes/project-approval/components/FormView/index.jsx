import React, { Component } from 'react';
import { Form,Icon, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl,Collapse } from 'tinper-bee';
const FormItem = Form.FormItem;
import './index.less';
import FormSplitHeader from 'components/FormSplitHeader'

class FormView extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            open : true,
        };
    }

    setStatus = () =>{

    }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className='form'>
                {/* <div className='titlePanel'>
                    <Label>主表信息</Label>
                    <Button shape="icon" bordered><Icon type='uf-2arrow-down' /></Button>
                </div>                 */}
                <FormSplitHeader title={'主表信息'} />
                <Form>
                <Collapse
					in={this.state.open}>
		          <div>
                    <Row>
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    项目编号
                                </Label>
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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
                                <FormControl
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

            </div>

        );
    }
}
export default Form.createForm()(FormView);