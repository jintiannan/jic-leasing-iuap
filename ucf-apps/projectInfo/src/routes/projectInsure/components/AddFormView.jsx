/**
 *
 * @title 结合切换事件的 Step
 * @description 点击next，Step的流程跟进
 *
 */
import React, { Component } from 'react';
import { Step, Button, Message, Modal, Form,Icon, Label, Col, Row, Select, FormControl,Tabs, ButtonGroup  } from 'tinper-bee';
import {actions} from 'mirrorx';
import TableFormRef from 'components/FormRef/TableFormRef';
import {RefWalsinLevel, RefIuapDept} from 'components/RefViews'
import { deepClone } from "utils";
import DatePicker from "tinper-bee/lib/Datepicker";
import FormInputNumber from 'components/FormRef/FormInputNumber';
import {enumConstant} from '../../../../../../ucf-common/src/utils/enums';

const { TabPane } = Tabs;
const FormItem = Form.FormItem;

import './index.less';

const Steps = Step.Steps;

const addTitle = "保险信息" ;
const steps = [
    {title: '基本信息'}
] ;

class AddFormView extends Component {
    constructor(props) {

        super(props);
        this.state = {
            current: 0,
            modalSize: '',
            showDiv1: '',
            showDiv2: 'none',
        };
        this.close = this.close.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.changeDropup = this.changeDropup.bind(this);
        console.log("constructor");
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        console.log("componentWillMount");
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        console.log("componentDidMount");
    }
    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
    }

    //将新增数据存入缓存
    saveCache = () =>{
        let objectForm = this.props.form.getFieldsValue();
        //将form表单 和  model参照属性 合并
        //let obj = Object.assign(objectForm,this.props.formObject); 合并对象
        localStorage.setItem("addKey",JSON.stringify(objectForm)) ;  //置入缓存
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
        this.nextController();
        this.saveCache();
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
        this.prevController();
    }

    //控制下一步 显示那个div
    nextController = () =>{
        let key = 'showDiv';
        let num = this.state.current + 2;
        let showDiv = key + num;
        let noneDiv = key + (num -1);
        let map = {};
        map[showDiv] = '';
        map[noneDiv] = 'none';
        this.setState(map)
    }

    //控制上一步 显示那个div
    prevController = () =>{
        let key = 'showDiv';
        let num = this.state.current;
        let showDiv = key + num;
        let noneDiv = key + (num + 1);
        let map = {};
        map[showDiv] = '';
        map[noneDiv] = 'none';
        this.setState(map)
    }

    initDiv=()=>{
        this.setState({
            current: 0,
            modalDropup: true,
            showDiv1: ''
        });
    }

    alertDone() {
        Message.create({content: '完成', color: 'successlight'});
        localStorage.removeItem("addKey");
        this.initDiv();
        this.close();
    }
    close() {
        actions.projectInsure.updateState({showModal : false});
        this.initDiv();
    }

    changeDropup(state) {
        this.setState({
            modalDropup: state
        });
    }
    changeSize(size) {
        this.setState({
            modalSize: size
        });
    }

    //绑定子组件
    onRef = (ref) => {
        this.child = ref;
    }

    //onChange方法 保证金比例
    handleChangeDeposit_ratio = (value) =>{
        let objectForm = this.props.form.getFieldsValue();
        let val = objectForm.total_amount_equipment * value;
        this.props.form.setFieldsValue({'deposit_cash':val});
    }

    //onChange方法 保证金金额
    handleChangeDeposit_cash = (value) =>{
        let objectForm = this.props.form.getFieldsValue();
        let val =  ( objectForm.total_amount_equipment > 0? value/objectForm.total_amount_equipment : 0 )
        this.props.form.setFieldsValue({'deposit_ratio':val});
    }
    //租金税率
    handleChangeRent_tax_rate = (value) =>{
        this.props.form.setFieldsValue({'srvfee_taxrate_in':value});
    }
    //租赁方式
    handleChangeLease_method = (value) =>{
        this.props.form.setFieldsValue({'if_corpus_tickets':value});
    }
    //onChange方法 手续费比例
    handleChangeSrvfee_ratio_in = (value) =>{
        let objectForm = this.props.form.getFieldsValue();
        let val = objectForm.total_amount_equipment * value;
        this.props.form.setFieldsValue({'srvfee_cash_in_ft':val});
    }

    //onChange方法 首期手续费金额
    handleChangeSrvfee_cash_in_ft = (value) =>{
        let objectForm = this.props.form.getFieldsValue();
        let val =  ( objectForm.total_amount_equipment > 0? value/objectForm.total_amount_equipment : 0 )
        this.props.form.setFieldsValue({'srvfee_ratio_in':val});
    }


    //子表切换子标签
    onChange = (activeKey) => {
        console.log(`onChange ${activeKey} o-^-o`);
        this.setState({
            activeKey,
        });
    }

    render() {
        const { current } = this.state;
        const { getFieldProps, getFieldError } = this.props.form;
        let _formObject = this.props.formObject;
        let formObject = deepClone(_formObject);
        if(this.props.showModal == false){
            return <div></div>;
        }else{
            return (
                <div>

                    <Modal
                        className="jic-model"
                        show={ this.props.showModal }
                        backdrop="static" //关闭遮罩事件
                        size={"xlg"} //大号模态框
                        onHide={ this.close }>
                        <Modal.Header closeButton>
                            <Modal.Title > { addTitle } </Modal.Title>
                        </Modal.Header >
                        <Modal.Body >

                            <Steps current={current}>
                                {steps.map(item => <Step key={item.title} title={item.title} />)}
                            </Steps>

                            <div className="steps-content jic-form">
                                <Form>
                                    <div style={{display:this.state.showDiv1}}>

                                        <Row>
                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        保单号
                                                    </Label>

                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('insureCode', {
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
                                                        第一受益人是否变更为我司
                                                    </Label>
                                                    <Select
                                                        data={enumConstant("yesOrNo")}
                                                        showSearch={true}
                                                        allowClear={true}
                                                        disabled={!this.props.isEdit}
                                                        {
                                                            ...getFieldProps('insureBeneficiaryChange', {
                                                                initialvalue: _formObject.insureBeneficiaryChange,
                                                            })
                                                        }
                                                    />
                                                </FormItem>

                                            </Col>

                                            <Col md={4} xs={4} sm={4}>
                                                <FormItem>
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        受益人
                                                    </Label>

                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('pkBeneficiary.name', {
                                                                         initialValue: '',
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
                                                        保险公司
                                                    </Label>

                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('pkInsureUtil', {
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
                                                        险种
                                                    </Label>

                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('insureType', {
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
                                                        保险标金额
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('insureMarkAmount', {
                                                                         initialValue: '',
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
                                                        租赁物原值合计
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('rentAmout', {
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
                                                        保险费率(%)
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('insureRate', {
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
                                                        保险费（元）
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('insureAmount', {
                                                                         initialValue: '',
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
                                                        保险开始日期
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('startDate', {
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
                                                        期限(月)
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('insureTimes', {
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
                                                        保险到期日
                                                    </Label>
                                                    <FormControl disabled={true}
                                                                 {
                                                                     ...getFieldProps('endDate', {
                                                                         initialValue: '',
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
                                                        备注
                                                    </Label>
                                                    <FormControl disabled={!this.props.isEdit}
                                                                 {
                                                                     ...getFieldProps('memo', {
                                                                         initialValue: '',
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
                                    <Button colors="primary" style={{ marginRight: 8 }} onClick={() => this.next()}>下一步</Button>
                                }
                                {
                                    this.state.current === steps.length - 1
                                    &&
                                    <Button colors="primary" style={{ marginRight: 8 }} onClick={() => this.alertDone()}>完成</Button>
                                }{
                                <Button colors="secondary" onClick={ () => this.close() }> 关闭 </Button>
                            }
                            </div>

                        </Modal.Body>
                        {/* <Modal.Footer>

                          </Modal.Footer> */}
                    </Modal>

                    <div>

                    </div>
                </div>
            );
        }

    }
}
export default Form.createForm()(AddFormView);
