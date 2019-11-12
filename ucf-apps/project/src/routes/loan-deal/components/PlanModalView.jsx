import React, { Component } from 'react';
import {Modal,Message, Step ,Form, Icon,Tabs, Button, Label, Col, Row, FormControl } from 'tinper-bee';
import {deepClone, getHeight} from "utils";
import {actions} from 'mirrorx';
import './index.less';

const FormItem = Form.FormItem;
class PlanModalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        //this.props.onRef(this);
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    addDone = () =>{
      Message.create({content: '添加完成', color: 'successlight'});
      let obj = this.props.form.getFieldsValue();
      let _loanplanList = deepClone(this.props.loanplanList);
      const currentIndex  = _loanplanList.length;
      _loanplanList.push({
            index: currentIndex,
            customer_name:obj.customer_name,
            contract_code:obj.contract_code,
            plan_date:obj.plan_date,
            time:obj.time,
            contract_money:obj.contract_money,
      });
      actions.loandeal.updateState({showModalPlan : false,loanplanList:_loanplanList});
    }

    alertDone = ()=>{
      Message.create({content: '修改成功', color: 'successlight'});
      let obj = this.props.form.getFieldsValue();
      let _loanplanList = deepClone(this.props.loanplanList);
      _loanplanList.map(item => {
        if(item.planid==this.props.selectedPlanList[0]['planid']){
            Object.assign(item,obj);
        }
    });
      actions.loandeal.updateState({showModalPlan : false,planformObj:{},loanplanList:_loanplanList});
    }


    close= () =>{
      actions.loandeal.updateState({showModalPlan : false});
    }


    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let planformObj = this.props.planformObj;
        return (
                <Modal
                    show={this.props.showModalPlan}
                    onHide={this.close}
                    size="lg"
                    backdrop="static"
                    centered="true"
                    dialogClassName="plan_modal_form"
                    > 
                    <div className="modal_header">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                业务资金付款申请单信息
                            </Modal.Title>
                        </Modal.Header>
                    </div>

                    <Modal.Body>
                            <div className="steps-contents">
                            <Form>
                            <Row>
                            <Col md={6} xs={6} sm={6}>
                                <FormItem>
                                    <Label>
                                        <Icon type="uf-mi" className='mast'></Icon>
                                        客户名称
                                    </Label>
                                    <FormControl
                                        {
                                        ...getFieldProps('customer_name', {
                                            initialValue: planformObj.customer_name,
                                            rules: [{
                                                required: true, 
                                            }],
                                        })
                                        }
                                    />
                                    
                                </FormItem>

                            </Col>
                            <Col md={6} xs={6} sm={6}>
                                <FormItem>
                                    <Label>
                                        <Icon type="uf-mi" className='mast'></Icon>
                                        合同编号
                                    </Label>
                                    <FormControl
                                        {
                                        ...getFieldProps('contract_code', {
                                            initialValue: planformObj.contract_code,
                                            rules: [{
                                                required: true, 
                                            }],
                                        })
                                        }
                                    />                               
                                </FormItem>
                            </Col>
                            <Col md={6} xs={6} sm={6}>
                                <FormItem>
                                    <Label>
                                        <Icon type="uf-mi" className='mast'></Icon>
                                        计划日期
                                    </Label>
                                    <FormControl
                                        {
                                        ...getFieldProps('plan_date', {
                                            initialValue: planformObj.plan_date,
                                            rules: [{
                                                required: true, 
                                            }],
                                        })
                                        }
                                    />                               
                                </FormItem>
                            </Col>
                            <Col md={6} xs={6} sm={6}>
                                <FormItem>
                                    <Label>
                                        <Icon type="uf-mi" className='mast'></Icon>
                                        收取期次
                                    </Label>
                                    <FormControl
                                        {
                                        ...getFieldProps('time', {
                                            initialValue: planformObj.time,
                                            rules: [{
                                                required: true, 
                                            }],
                                        })
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col md={6} xs={6} sm={6}>
                                <FormItem>
                                    <Label>
                                        <Icon type="uf-mi" className='mast'></Icon>
                                        合同金额
                                    </Label>
                                    <FormControl
                                        {
                                        ...getFieldProps('contract_money', {
                                            initialValue: planformObj.contract_money,
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
                    </Modal.Body>
                    <Modal.Footer>
                    <div className="steps-action">
                        {
                            this.props.ifplanAdd==true?<Button bordered style={{ marginRight: 8 }} colors="primary" onClick={this.addDone}>确认</Button>:
                            <Button bordered style={{ marginRight: 8 }} colors="primary" onClick={this.alertDone}>保存</Button>
                        }
                        <Button bordered colors="secondary" onClick={this.close}>取消</Button>
                    </div>
                    </Modal.Footer>
                </Modal> 
        );
    }
}

export default Form.createForm()(PlanModalView);