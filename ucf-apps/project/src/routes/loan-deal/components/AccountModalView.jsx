import React, { Component } from 'react';
import {Modal,Message, Step ,Form, Icon,Tabs, Button, Label, Col, Row, FormControl } from 'tinper-bee';
import {deepClone, getHeight} from "utils";
import {actions} from 'mirrorx';
import './index.less';

const FormItem = Form.FormItem;
class AccountModalView extends Component {
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
      let _payaccountList = deepClone(this.props.payaccountList);
      const currentIndex  = _payaccountList.length;
      _payaccountList.push({
            index: currentIndex,
            gather_account:obj.gather_account,
            gather_number:obj.gather_number,
            payer_account:obj.payer_account,
            payer_number:obj.payer_number,
      });
      actions.loandeal.updateState({showModalAccount : false,payaccountList:_payaccountList});
    }

    alertDone = ()=>{
      Message.create({content: '修改成功', color: 'successlight'});
      let obj = this.props.form.getFieldsValue();
      let _payaccountList = deepClone(this.props.payaccountList);
      _payaccountList.map(item => {
        if(item.accountid==this.props.selectedPayList[0]['accountid']){
            Object.assign(item,obj);
        }
    });
      actions.loandeal.updateState({showModalAccount : false,accountformObj:{},payaccountList:_payaccountList});
    }


    close= () =>{
      actions.loandeal.updateState({showModalAccount : false});
    }


    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let accountformObj = this.props.accountformObj;
        return (
                <Modal
                    show={this.props.showModalAccount}
                    onHide={this.close}
                    size="lg"
                    backdrop="static"
                    centered="true"
                    dialogClassName="plan_modal_form"
                    > 
                    <div className="modal_header">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                付款账户信息
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
                                        收款方户名
                                    </Label>
                                    <FormControl
                                        {
                                        ...getFieldProps('gather_account', {
                                            initialValue: accountformObj.gather_account,
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
                                        收款方账号
                                    </Label>
                                    <FormControl
                                        {
                                        ...getFieldProps('gather_number', {
                                            initialValue: accountformObj.gather_number,
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
                                        付款方户名
                                    </Label>
                                    <FormControl
                                        {
                                        ...getFieldProps('payer_account', {
                                            initialValue: accountformObj.payer_account,
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
                                        付款方账号
                                    </Label>
                                    <FormControl
                                        {
                                        ...getFieldProps('payer_number', {
                                            initialValue: accountformObj.payer_number,
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
                            this.props.ifaccountAdd==true?<Button bordered style={{ marginRight: 8 }} colors="primary" onClick={this.addDone}>确认</Button>:
                            <Button bordered style={{ marginRight: 8 }} colors="primary" onClick={this.alertDone}>保存</Button>
                        }
                        <Button bordered colors="secondary" onClick={this.close}>取消</Button>
                    </div>
                    </Modal.Footer>
                </Modal> 
        );
    }
}

export default Form.createForm()(AccountModalView);