/**
*
* @title 结合切换事件的 Step
* @description 点击next，Step的流程跟进
*
*/
import React, { Component } from 'react';
import { Step, Button, Message, Modal, Form,Icon, Label, Col, Row, FormControl } from 'tinper-bee';
import {actions} from 'mirrorx';
import TableFormRef from 'components/FormRef/TableFormRef';


const FormItem = Form.FormItem;

import './index.less';
 
const Steps = Step.Steps;

const addTitle = "快速报价" ;
const steps = [
                {title: '投放信息'}, 
                {title: '留购价款及保证金设置'}, 
                {title: '手续费及中间费用支出设置'},
                {title: '收租设置'},
                {title: '租息率设置'},
                {title: 'IRR信息'},
              ] ;

class AddFormView extends Component {
  constructor(props) {
      
    super(props);
    this.state = {
      current: 0,
      // showModal: false,
      modalSize: '',
      showDiv01: '',
      showDiv02: 'none',
      showDiv03: 'none',
      showDiv04: 'none',
      showDiv05: 'none',
      showDiv06: 'none',
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
      if(0 == this.state.current){
        this.setState({
          showDiv01: 'none',
          showDiv02: '',
          showDiv03: 'none',
          showDiv04: 'none',
          showDiv05: 'none',
          showDiv06: 'none',
        })
      }else if(1 == this.state.current){
        this.setState({
          showProject: 'none',
          showDiv02: 'none',
          showDiv03: '',
          showDiv04: 'none',
          showDiv05: 'none',
          showDiv06: 'none',
        })

      }else if(2 == this.state.current){
        this.setState({
          showProject: 'none',
          showDiv02: 'none',
          showDiv03: 'none',
          showDiv04: '',
          showDiv05: 'none',
          showDiv06: 'none',
        })

      }else if(3 == this.state.current){
        this.setState({
          showDiv01: 'none',
          showDiv02: 'none',
          showDiv03: 'none',
          showDiv04: 'none',
          showDiv05: '',
          showDiv06: 'none',
        })

      }else if(4 == this.state.current){
        this.setState({
          showDiv01: 'none',
          showDiv02: 'none',
          showDiv03: 'none',
          showDiv04: 'none',
          showDiv05: 'none',
          showDiv06: '',
        })
      }else{
        this.setState({
          showDiv01: '',
          showDiv02: 'none',
          showDiv03: 'none',
          showDiv04: 'none',
          showDiv05: 'none',
          showDiv06: 'none',
        })
      }
    }

    //控制上一步 显示那个div
    prevController = () =>{
      if(2 == this.state.current){
        this.setState({
          showDiv01: 'none',
          showDiv02: '',
          showDiv03: 'none',
          showDiv04: 'none',
          showDiv05: 'none',
          showDiv06: 'none',
        })
      }else if(3 == this.state.current){
        this.setState({
          showDiv01: 'none',
          showDiv02: 'none',
          showDiv03: '',
          showDiv04: 'none',
          showDiv05: 'none',
          showDiv06: 'none',
        })

      }else if(4 == this.state.current){
        this.setState({
          showDiv01: 'none',
          showDiv02: 'none',
          showDiv03: 'none',
          showDiv04: '',
          showDiv05: 'none',
          showDiv06: 'none',
        })
      }else if(5 == this.state.current){
        this.setState({
          showDiv01: 'none',
          showDiv02: 'none',
          showDiv03: 'none',
          showDiv04: 'none',
          showDiv05: '',
          showDiv06: 'none',
        })
      }else{
        this.setState({
          showDiv01: '',
          showDiv02: 'none',
          showDiv03: 'none',
          showDiv04: 'none',
          showDiv05: 'none',
          showDiv06: 'none',
        })
      }
    }

    initDiv=()=>{
        this.setState({
            current: 0,
            modalDropup: true,
            showDiv01: '',
            showDiv02: 'none',
            showDiv03: 'none',
            showDiv04: 'none',
            showDiv05: 'none',
            showDiv06: 'none',
          });
    }

    alertDone() {
      Message.create({content: '完成', color: 'successlight'});
      localStorage.removeItem("addKey");
      this.initDiv();
      this.close();
    }
    close() {
      actions.calculatorNormalzt.updateState({showModal : false});
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

  render() {
    const { current } = this.state;
    const { getFieldProps, getFieldError } = this.props.form;
    let formObject = this.props.formObject;

    if(this.props.showModal == false){
        return <div></div>;
    }else{
        return (
            <div>
             
              <Modal
                          className="demo4-modal"
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
              
              <div className="steps-content">
              <Form>
              <div style={{display:this.state.showDiv01}}>
                                  
                                  <Row>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          测算方案名称
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('quot_name', {
                                              initialValue: formObject.quot_name,
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
                                      {/* <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          限额方案
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('pk_limit_plan', {
                                              initialValue: formObject.pk_limit_plan,
                                              rules: [{
                                                  required: true, 
                                              }],
                                          })
                                          }
                                      /> */}
                               
                                             <div> 
                                                
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        限额方案
                                                    </Label>
                                                
                                                <div className="tableRefAdd" >
                                                <TableFormRef {...this.props} isEdit={true} 
                                                ref="tableRefAdd" 
                                                title={"限额方案"} 
                                                name = {"pk_limit_plan"} 
                                                {
                                                    ...getFieldProps('pk_limit_plan', {
                                                        initialValue: formObject.pk_limit_plan,
                                                        rules: [{
                                                            required: true, 
                                                        }],
                                                    })
                                                 }
                                                />

                    

                                                </div>
                                                
                                            </div>
                                    
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
                                          ...getFieldProps('lease_method', {
                                              initialValue: formObject.lease_method,
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
                                          本金是否开票
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('if_corpus_tickets', {
                                              initialValue: formObject.project_filing_from,
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
                                          租金税率
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('rent_tax_rate', {
                                              initialValue: formObject.rent_tax_rate ,
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
                                          税种
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('pk_currtype', {
                                              initialValue: formObject.pk_currtype ,
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
                                          投放日期
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('plan_date_loan', {
                                              initialValue: formObject.plan_date_loan,
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
                                          投放金额
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('total_amount_equipment', {
                                              initialValue: formObject.total_amount_equipment ,
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
                                          租赁本金
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('fact_cash_loan', {
                                              initialValue: formObject.fact_cash_loan,
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
                                          净融资比例
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('project_manager', {
                                              initialValue: formObject.project_manager,
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
                                          净融资额(元)
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('net_finance_cash', {
                                              initialValue: formObject.net_finance_cash,
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
                              <div style={{display:this.state.showDiv02}}>
                              <Row>
                          <Col md={4} xs={4} sm={4}>
                              <FormItem>
                                  <Label>
                                      <Icon type="uf-mi" className='mast'></Icon>
                                      留购价款(元)
                                  </Label>
                                  <FormControl
                                      {
                                      ...getFieldProps('nominal_price', {
                                          initialValue: formObject.nominal_price,
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
                                      保证金比例
                                  </Label>
                                  <FormControl
                                      {
                                      ...getFieldProps('deposit_ratio', {
                                          initialValue: formObject.deposit_ratio,
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
                                      ...getFieldProps('deposit_cash', {
                                          initialValue: formObject.deposit_cash,
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
                          <div style={{display:this.state.showDiv03}}>
                                 
                                  <Row>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          手续费收取方式
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('srvfee_method_in', {
                                              initialValue: formObject.srvfee_method_in,
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
                                          手续费比例
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('srvfee_ratio_in', {
                                              initialValue: formObject.srvfee_ratio_in,
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
                                          首期手续费金额(元)
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('srvfee_cash_in_ft', {
                                              initialValue: formObject.srvfee_cash_in_ft,
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
                                          手续费总金额(元)
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('srvfee_cash_in', {
                                              initialValue: formObject.srvfee_cash_in,
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
                                          手续费收入税率(增值税)
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('srvfee_taxrate_in', {
                                              initialValue: formObject.srvfee_taxrate_in,
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
                                          中间费用支出方式
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('srvfee_method_out', {
                                              initialValue: formObject.lease_cal_method,
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
                                          首期中间费用支出时间
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('srvfee_date_out_ft', {
                                              initialValue: formObject.depositP_cash,
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
                                          首期中间费用支出金额(元)
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('srvfee_cash_out_ft', {
                                              initialValue: formObject.srvfee_cash_out_ft,
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
                                          中间费用支出总金额(元)
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('srvfee_cash_out', {
                                              initialValue: formObject.srvfee_cash_out,
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
                                          中间费用支出税率(增值税)
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('srvfee_taxrate_out', {
                                              initialValue: formObject.srvfee_taxrate_out,
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
                              <div style={{display:this.state.showDiv04}}>
                                 
                                 <Row>
                             <Col md={4} xs={4} sm={4}>
                                 <FormItem>
                                     <Label>
                                         <Icon type="uf-mi" className='mast'></Icon>
                                         租赁期限(月)
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('lease_times', {
                                             initialValue: formObject.lease_times,
                                            
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
                                         先付后付标志
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('prepay_or_not', {
                                             initialValue: formObject.prepay_or_not,
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
                                         支付频率
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('lease_freq', {
                                             initialValue: formObject.lease_freq,
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
                                         计算方式
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('lease_cal_method', {
                                             initialValue: formObject.lease_cal_method,
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
                                         总投放金额的计息方式
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('interest_method_total_loan', {
                                             initialValue: formObject.interest_method_total_loan,
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
                                         现金流日期计算方式
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('year_days_flow', {
                                             initialValue: formObject.year_days_flow,
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
     
                             <div style={{display:this.state.showDiv05}}>
                                
                                 <Row>
                             <Col md={4} xs={4} sm={4}>
                                 <FormItem>
                                     <Label>
                                         <Icon type="uf-mi" className='mast'></Icon>
                                         报价利率
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('final_rate', {
                                             initialValue: formObject.final_rate,
                                            
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
                                         基准利率
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('interrate', {
                                             initialValue: formObject.interrate,
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
                                         计算精度
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('cal_digit', {
                                             initialValue: formObject.cal_digit,
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
                                         年化天数
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('year_days', {
                                             initialValue: formObject.year_days,
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
                                         利率类型
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('interrate_type', {
                                             initialValue: formObject.interrate_type,
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
                                         ...getFieldProps('pk_currtype', {
                                             initialValue: formObject.pk_currtype,
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
                                         利率浮动方式
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('float_method', {
                                             initialValue: formObject.float_method,
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
                                         利率生效日期
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('pk_interrate', {
                                             initialValue: formObject.pk_interrate,
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
                                         利率档次
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('interrate_level', {
                                             initialValue: formObject.interrate_level,
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
                                         利率浮动值(%)
                                     </Label>
                                     <FormControl
                                         {
                                         ...getFieldProps('float_value', {
                                             initialValue: formObject.float_value,
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
                            
     
                            
                              <div style={{display:this.state.showDiv06}}>
                                 
                                  <Row>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          会计IRR按最新算法
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('finace_irr_method', {
                                              initialValue: formObject.finace_irr_method,
                                             
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
                                          会计IRR算法启用年份
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('finace_irr_year', {
                                              initialValue: formObject.finace_irr_year,
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
                                          市场IRR
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('project_irr', {
                                              initialValue: formObject.project_irr,
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
                                          市场去税IRR
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('project_notax_irr', {
                                              initialValue: formObject.project_notax_irr,
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
                                          会计IRR
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('finance_irr', {
                                              initialValue: formObject.finance_irr,
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
                                          会计去税IRR
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('finance_notax_irr', {
                                              initialValue: formObject.finance_notax_irr,
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
            </div>
          );
    }
    
  }
}
export default Form.createForm()(AddFormView);