import React, { Component } from 'react';
import { Form, Icon, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl, Collapse, Tabs, ButtonGroup } from 'tinper-bee';
import { deepClone } from "utils";
import { SelectField } from 'components/RowField/SelectField'
import FormSplitHeader from 'components/FormSplitHeader'
import InputNumber from 'bee-input-number';
import ChildListView from './ChildListView';
import TableFormRef from 'components/FormRef/TableFormRef';

const { TabPane } = Tabs;

import './index.less';

const FormItem = Form.FormItem;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true, //各个标签
            open2: true,
            open3: true,
            dataSource: [
                {
                    a: "1",
                    b: "小红",
                    c: "女",
                    d: {
                      code: "dept1_1",
                      entityType: "subEntity",
                      organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                      name: "财务一科",
                      pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                      refcode: "dept1_1",
                      refpk: "9711d912-3184-4063-90c5-1facc727813c",
                      id: "9711d912-3184-4063-90c5-1facc727813c",
                      isLeaf: "true",
                      refname: "财务一科"
                    },
                    e: "10次",
                    f: "等额本金",
                    key: "3"
                  
                  }
            ] //字表数据
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {

    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.onRef(this); //绑定子组件
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    //保存方法
    submit = () => {
        console.log(this.props.form.getFieldsValue());
        console.log(this.state.dataSource + "子表数据");
        return this.props.form.getFieldsValue();
    }

    //子表切换子标签
    onChange = (activeKey) => {
        console.log(`onChange ${activeKey} o-^-o`);
        this.setState({
            activeKey,
        });
    }

    //字表添加数据
    add=()=>{
        let dataSource = deepClone(this.state.dataSource);
        let index = dataSource.length+1;
        let newData = {
            a: index  
        };
        dataSource.push(newData);
        this.setState({
            dataSource:dataSource
        });
    }
    //字表删除数据
    del=(key)=>{
        let dataSource = deepClone(this.state.dataSource);
        dataSource.splice(dataSource.length-1,1);
        this.setState({
            dataSource:dataSource
        });
    }

    //绑定子组件
    onRef = (ref) => {
        this.child = ref;        
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let _formObject = this.props.formObject;
        let formObject = deepClone(_formObject);
        let _props = this.props;
        if(_props.showForm){
            return (
                <div>
                <div className='form'>
                    <div>
                        <span onClick={() => this.setState({ open: !this.state.open })} >
                        <FormSplitHeader title={'项目信息'} />
                        </span>
    
                    <Collapse in={this.state.open}>
                            <Form>
                                <Collapse
                                    in={this.state.open}>
                                        <div>
                                            
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                <div className="tableRef">
                                                    <div className="lableRef">
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        项目名称
                                                    </Label>
                                                    </div>
                                                    <TableFormRef {...this.props}
                                                     
                                                     title={"项目名称"} 
                                                     name = {"project_name"}
                                                     {
                                                         ...getFieldProps('project_name', {
                                                             initialValue: formObject.project_name,
                                                             rules: [{
                                                                 required: true, 
                                                             }],
                                                         })
                                                      }
                                                    ></TableFormRef>
                                                </div>
                                                </FormItem>
    
                                            </Col>
                                           
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        项目编码
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('project_code', {
                                                                initialValue: formObject.project_code,
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
                                                        单据状态
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('project_approve_result', {
                                                                initialValue: formObject.project_approve_result,
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                                    />
                                                    <span className='error'>
                                        {
                                            getFieldError('project_approve_result')
                                        }
                                    </span>
                                                </FormItem>
    
                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        项目金额
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('release_amount', {
                                                                initialValue: formObject.release_amount,
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                                    />
                                                    <span className='error'>
                                        {
                                            getFieldError('release_amount')
                                        }
                                    </span>
                                                </FormItem>
    
                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        币种
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('granting_currency', {
                                                                initialValue: formObject.granting_currency,
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                                    />
                                                    <span className='error'>
                                        {
                                            getFieldError('granting_currency')
                                        }
                                    </span>
                                                </FormItem>
                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                              <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        项目来源
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('project_source', {
                                                            initialValue: formObject.project_source ? formObject.project_source : "",
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
                                                        项目类别
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('leaseback_type', {
                                                            initialValue: formObject.leaseback_type ? formObject.leaseback_type : "",
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
                                                        项目批次
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('adjust_time', {
                                                            initialValue: formObject.adjust_time ? formObject.adjust_time : "",
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                                    />
                                                </FormItem>
    
                                            </Col>
                                           
                                    </div>
                                </Collapse>
    
                            </Form>
    
                    </Collapse>
                    </div>
    
    
                    <div>
                        <span onClick={() => this.setState({ open2: !this.state.open2 })} >
                        <FormSplitHeader title={'合同信息'} />
                    </span>
    
                        <Collapse in={this.state.open2}>
    
                        <Form>
                                <Collapse
                                    in={this.state.open2}>
                                    <div>
                                      
                                            <Col md={4} xs={4} sm={4}>
                              <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        合同名称
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('pk_consumer', {
                                                            initialValue: formObject.pk_consumer ? formObject.pk_consumer.name : "",
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
                                                        合同编码
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('pk_consumer', {
                                                            initialValue: formObject.pk_consumer ? formObject.pk_consumer.code : "",
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
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('pk_consumer', {
                                                            initialValue: formObject.pk_consumer ? formObject.pk_consumer.name : "",
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
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('pk_consumer', {
                                                            initialValue: formObject.pk_consumer ? formObject.pk_consumer.code : "",
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
                                                        合同起始日期
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('plan_release_date', {
                                                                initialValue: formObject.plan_release_date,
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                                    />
                                                    <span className='error'>
                                        {
                                            getFieldError('plan_release_date')
                                        }
                                    </span>
                                                </FormItem>
    
                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        合同终止日期
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('adjust_time', {
                                                                initialValue: formObject.adjust_time,
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                                    />
                                                    <span className='error'>
                                        {
                                            getFieldError('adjust_time')
                                        }
                                    </span>
                                                </FormItem>
    
                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        单据状态
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('project_approve_result', {
                                                                initialValue: formObject.project_approve_result,
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                                    />
                                                    <span className='error'>
                                        {
                                            getFieldError('project_approve_result')
                                        }
                                    </span>
                                                </FormItem>
    
                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        合同金额
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('release_amount', {
                                                                initialValue: formObject.release_amount,
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                                    />
                                                    <span className='error'>
                                        {
                                            getFieldError('release_amount')
                                        }
                                    </span>
                                                </FormItem>
    
                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        币种
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('granting_currency', {
                                                                initialValue: formObject.granting_currency,
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                                    />
                                                    <span className='error'>
                                        {
                                            getFieldError('granting_currency')
                                        }
                                    </span>
                                                </FormItem>
                                            </Col>
                                    
                                    </div>
                                </Collapse>
    
                            </Form>
    
                        </Collapse>
                    </div>
    
                    <div>
                        <span onClick={() => this.setState({ open3: !this.state.open3 })} >
                        <FormSplitHeader title={'客户信息'} />
                    </span>
    
                        <Collapse in={this.state.open3}>
    
                        <Form>
                                <Collapse
                                    in={this.state.open3}>
                                    <div>
                                        
                                            <Col md={4} xs={4} sm={4}>
                              <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        客户名称
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('pk_consumer', {
                                                            initialValue: formObject.pk_consumer ? formObject.pk_consumer.name : "",
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
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('pk_consumer', {
                                                            initialValue: formObject.pk_consumer ? formObject.pk_consumer.code : "",
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
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('pk_consumer', {
                                                            initialValue: formObject.pk_consumer ? formObject.pk_consumer.name : "",
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
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('pk_consumer', {
                                                            initialValue: formObject.pk_consumer ? formObject.pk_consumer.code : "",
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
                                                        关联客户客户
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('project_name', {
                                                                initialValue: formObject.project_name,
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
                                                        组织机构代码
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('project_code', {
                                                                initialValue: formObject.project_code,
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
                                                        联系人
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('pk_operator', {
                                                                initialValue: formObject.pk_operator,
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                                    />
                                                    <span className='error'>
                                        {
                                            getFieldError('pk_operator')
                                        }
                                    </span>
                                                </FormItem>
    
                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        注册资本
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('release_amount', {
                                                                initialValue: formObject.release_amount,
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                                    />
                                                    <span className='error'>
                                        {
                                            getFieldError('release_amount')
                                        }
                                    </span>
                                                </FormItem>
    
                                            </Col>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        币种
                                                    </Label>
                                                    <FormControl disabled={!_props.isEdit}
                                                        {
                                                            ...getFieldProps('granting_currency', {
                                                                initialValue: formObject.granting_currency,
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                                    />
                                                    <span className='error'>
                                        {
                                            getFieldError('granting_currency')
                                        }
                                    </span>
                                                </FormItem>
                                            </Col>
                                     
                                    </div>
                                </Collapse>
    
                            </Form>
    
                        </Collapse>
                    </div>
                    </div>
    
                    <div className="childListView">
                    <Tabs
                        defaultActiveKey="1"
                        onChange={this.onChange}
                        className="demo1-tabs"
                        extraContent={
                            <div className="addAndDelChildList demoPadding" style={{display:_props.isEdit?'':'none'}} >
                                 <ButtonGroup style={{ margin: 1 }}>
                                    <Button shape='border' onClick={this.add}><Icon type='uf-add-c-o' /></Button>
                                    <Button shape='border' onClick={this.del}><Icon type='uf-reduce-c-o' /></Button>
                                  </ButtonGroup>
                            </div>
                            }
                    >
                        <TabPane tab='投放计划' key="1"> <ChildListView { ...this } ref="onTheLoan" onRef={this.onRef}/></TabPane>
                        <TabPane tab='保证金计划' key="2"> <ChildListView { ...this } ref="marginLoan" onRef={this.onRef}/></TabPane>
                        <TabPane tab='手续费计划' key="3"> <ChildListView { ...this } ref="commissionLoan" onRef={this.onRef}/></TabPane>
                        <TabPane tab='中间费用支出计划' key="4"> <ChildListView { ...this } ref="middleCostLoan" onRef={this.onRef}/></TabPane>
                        <TabPane tab='其他收支计划' key="5"> <ChildListView { ...this } ref="otherLoan" onRef={this.onRef}/></TabPane>
                        <TabPane tab='租金计划' key="6"> <ChildListView { ...this } ref="rentLoan" onRef={this.onRef}/></TabPane>
                    </Tabs>
                    </div>
                </div>  
            );
            
        }else{
            return <div></div>
        }
        
    }
}

export default Form.createForm()(FormView);