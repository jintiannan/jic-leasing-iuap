import React, { Component } from 'react';
import {Modal,Panel,Message, Step,PanelGroup ,Form, Icon,Tabs, Button, Label, Switch, Checkbox, DatePicker, Radio, Select, Col, Row, FormControl, Collapse } from 'tinper-bee';
import {deepClone, getHeight, getSortMap} from "utils";
import {actions} from 'mirrorx';
import FormSplitHeader from 'components/FormSplitHeader'
import {genGridColumn,checkListSelect} from "utils/service";
import Grid from 'components/Grid';
import './index.less';
import 'components/GridCompnent/index.less'

const Steps = Step.Steps;
const FormItem = Form.FormItem;
const steps = [{
  title: '基本信息',
}, {
  title: '详细信息',
}, {
  title: '详细信息2',
},{
    title: '详细信息3',
  }];

class ModalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formObj: {},
            current: 0,
            showPay: '',
            showDetail: 'none',
            showDetail1: 'none',
            showDetail2: 'none',
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        this.resetTableHeight(false);
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.onRef(this);
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    //将新增数据存入缓存
    saveCache = () =>{
      let objectForm = this.props.form.getFieldsValue();
      localStorage.setItem("addKey",JSON.stringify(objectForm)) ;  //置入缓存
    }

    next = () => {
      const current = this.state.current + 1;
      this.setState({ current });
      this.nextController();
      this.saveCache();
    }
    prev= () => {
      const current = this.state.current - 1;
      this.setState({ current });
      this.prevController();
    }

    //控制下一步 显示那个div
    nextController = () =>{
      if(0 == this.state.current){
        this.setState({
          showPay: 'none',
          showDetail: '',
          showDetail1: 'none',
          showDetail2: 'none',
        })
      }else if(1 == this.state.current){
        this.setState({
          showPay: 'none',
          showDetail: 'none',
          showDetail1: '',
          showDetail2: 'none',
        })

      }else if(2 == this.state.current){
        this.setState({
          showPay: 'none',
          showDetail: 'none',
          showDetail1: 'none',
          showDetail2: '',
        })

      }else{
        this.setState({
          showPay: '',
          showDetail: 'none',
          showDetail1: 'none',
          showDetail2: 'none',
        })
      }
    }

    //控制上一步 显示那个div
    prevController = () =>{
      if(1 == this.state.current){
        this.setState({
          showPay: '',
          showDetail: 'none',
          showDetail1: 'none',
          showDetail2: 'none',
        })
      }else if(2 == this.state.current){
        this.setState({
          showPay: 'none',
          showDetail: '',
          showDetail1: 'none',
          showDetail2: 'none',
        })

      }else if(3 == this.state.current){
        this.setState({
          showPay: 'none',
          showDetail: 'none',
          showDetail1: '',
          showDetail2: 'none',
        })
      }else{
        this.setState({
          showPay: '',
          showDetail: 'none',
          showDetail1: 'none',
          showDetail2: 'none',
        })
      }
    }

    alertDone() {
      Message.create({content: '完成', color: 'successlight'});
      localStorage.removeItem("addKey");
      actions.loandeal.updateState({showModal : false});
      this.setState({current:0,showPay:'',showDetail2:'none'});
    }
    close() {
      actions.loandeal.updateState({showModal : false});
      this.saveCache();
    }

    submit = () => {
        // console.log(this.props.form.getFieldsValue());
        return this.props.form.getFieldsValue();
    }

    resetTableHeight = (isopen) => {
        let modalHeight = 0;
        modalHeight = getHeight()*2/3;
        this.setState({ modalHeight });
    }

    render() {
        const { current } = this.state;
        const { getFieldProps, getFieldError } = this.props.form;
        let formObjAdd = this.props.formObjAdd;
        return (

                <div className='form'>
                <Modal
                show={this.props.showModal}
                onHide={this.close}
                size="xlg"
                backdrop="static"
                maxHeight={this.state.modalHeight}
                width="1100"
                centered="true"
                dialogClassName="modal_form"
            > 
             <div className="modal_header">
                <Modal.Header closeButton>
                    <Modal.Title>
                        新增付款申请信息
                    </Modal.Title>
                </Modal.Header>
                </div>

                <Modal.Body>
                        <div>
                        <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div className="steps-contents">
                        <Form>
                            <div style={{display:this.state.showPay}}>
                            
                            <Row>
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    付款申请编号
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('loan_code', {
                                        initialValue: formObjAdd.loan_code,
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
                                    付款类别
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('pay_type', {
                                        initialValue: formObjAdd.pay_type,
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
                                    收款方名称
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('gather_name', {
                                        initialValue: formObjAdd.gather_name,
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
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    收款账号
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('gather_account', {
                                        initialValue: formObjAdd.gather_account,
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
                                    收款账户
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('gather_cust', {
                                        initialValue: formObjAdd.gather_cust ,
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
                                    客户名称
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('customer_name', {
                                        initialValue: formObjAdd.customer_name ,
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
                            <div style={{display:this.state.showDetail}}>
                        <Row>
                    <Col md={4} xs={4} sm={4}>
                        <FormItem>
                            <Label>
                                <Icon type="uf-mi" className='mast'></Icon>
                                签约主体
                            </Label>
                            <FormControl
                                {
                                ...getFieldProps('pk_mainorg', {
                                    initialValue: formObjAdd.pk_mainorg,
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
                                签约机构
                            </Label>
                            <FormControl
                                {
                                ...getFieldProps('pk_org', {
                                    initialValue: formObjAdd.pk_org,
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
                                租赁方式
                            </Label>
                            <FormControl
                                {
                                ...getFieldProps('rent_type', {
                                    initialValue: formObjAdd.rent_type,
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
                    <Col md={4} xs={4} sm={4}>
                        <FormItem>
                            <Label>
                                <Icon type="uf-mi" className='mast'></Icon>
                                合同管理人
                            </Label>
                            <FormControl
                                {
                                ...getFieldProps('cont_manager', {
                                    initialValue: formObjAdd.cont_manager,
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
                                币种
                            </Label>
                            <FormControl
                                {
                                ...getFieldProps('currency', {
                                    initialValue: formObjAdd.currency,
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
                            <div style={{display:this.state.showDetail1}}>
                           
                            <Row>    
                            <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    客户规模
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('customer_scale', {
                                        initialValue: formObjAdd.customer_scale,
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
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    租赁物门类
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('renting_type', {
                                        initialValue: formObjAdd.renting_type,
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
                                    保证金金额
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('deposit', {
                                        initialValue: formObjAdd.deposit,
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
                                    手续费金额
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('srvfee', {
                                        initialValue: formObjAdd.srvfee,
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
                            <Col md={4} xs={4} sm={4}>
                                <FormItem>
                                    <Label>
                                        <Icon type="uf-mi" className='mast'></Icon>
                                        付款申请人
                                    </Label>
                                    <FormControl
                                        {
                                        ...getFieldProps('pk_operator', {
                                            initialValue: formObjAdd.pk_operator,
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
                            <div style={{display:this.state.showDetail2}}>
                           
                            <Row>
                            <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    合同编号
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('cont_code', {
                                        initialValue: formObjAdd.cont_code,
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
                                    所在部门
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('pk_dept', {
                                        initialValue: formObjAdd.pk_dept ,
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
                                    实际支付金额
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('fact_pay_amount', {
                                        initialValue: formObjAdd.fact_pay_amount,
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
                            <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    项目类型
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('project_type', {
                                        initialValue: formObjAdd.project_type,
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
                </div>
                </Modal.Body>
                <Modal.Footer>
                <div className="steps-action">
                    {
                        this.state.current > 0
                        &&
                        <Button bordered style={{ marginRight: 8 }} onClick={() => this.prev()}>
                        上一步
                        </Button>
                    }
                    {
                        this.state.current < steps.length - 1
                        &&
                        <Button colors="primary" onClick={() => this.next()}>下一步</Button>
                    }
                    {
                        this.state.current === steps.length - 1
                        &&
                        <Button colors="primary" onClick={() => this.alertDone()}>完成</Button>
                    }
                    </div>
                </Modal.Footer>
            </Modal>
                                
                </div>
                
              
        );
    }
}

export default Form.createForm()(ModalView);