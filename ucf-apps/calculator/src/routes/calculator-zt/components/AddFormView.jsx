/**
*
* @title 结合切换事件的 Step
* @description 点击next，Step的流程跟进
*
*/
import React, { Component } from 'react';
import { Step, Button, Message, Modal, Form,Icon,InputNumber, Label, Col, Row, Select, FormControl,Tabs, ButtonGroup  } from 'tinper-bee';
import {actions} from 'mirrorx';
import TableFormRef from 'components/FormRef/TableFormRef';
import RefMdmComp from 'components/RefMdmComp';
import { deepClone } from "utils";
import DatePicker from "tinper-bee/lib/Datepicker";

import ChildListView from './ChildListView';
const { TabPane } = Tabs;
const FormItem = Form.FormItem;

import './index.less';
 
const Steps = Step.Steps;

const addTitle = "精算报价" ;
const steps = [
                {title: '投放信息'}, 
                {title: '保证金设置'}, 
                {title: '手续费及中间费用支出设置'},
                {title: '收租设置'},
                {title: '利率设置'},
                {title: 'IRR信息'},
                {title: '特殊期设置'},
              ] ;

class AddFormView extends Component {
  constructor(props) {
      
    super(props);
    this.state = {
      current: 0,
      modalSize: '',
      showDiv1: '',
      showDiv2: 'none',
      showDiv3: 'none',
      showDiv4: 'none',
      showDiv5: 'none',
      showDiv6: 'none',
      showDiv7: 'none',
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
            showDiv1: '',
            showDiv2: 'none',
            showDiv3: 'none',
            showDiv4: 'none',
            showDiv5: 'none',
            showDiv6: 'none',
            showDiv7: 'none',
          });
    }

    alertDone() {
      Message.create({content: '完成', color: 'successlight'});
      localStorage.removeItem("addKey");
      this.initDiv();
      this.close();
    }
    close() {
      actions.calculatorzt.updateState({showModal : false});
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

 //onChange方法
handleChange = (rule, value, callback) =>{
    
}

//格式化百分数 比例字段
formatDepositRatio = (value) => {
    if(value != undefined){
        let v= Number(value) + 1;
        return v;
    }
}

aformat=(value)=>{
    value =  value + 1;
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
                          className="calculatorNormalztAddmodal"
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
              <div style={{display:this.state.showDiv1}}>
                                  
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

                               
                                             <div> 
                                                
                                                    <Label>
                                                        <Icon type="uf-mi" className='mast'></Icon>
                                                        限额方案
                                                    </Label>
                                                
                                                <div className="tableRefAdd" >
                                                <TableFormRef
                                                {...this.props}
                                                isEdit={true} 
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
                                    
                                      <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'直租',value:'0'},{key:'回租',value:'1'}]}
                                    {...getFieldProps('lease_method', {
                                        initialValue: formObject.lease_method,                                        
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
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
                                      
                                      <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'是',value:'0'},{key:'否',value:'1'}]}
                                    {...getFieldProps('if_corpus_tickets', {
                                        initialValue: formObject.if_corpus_tickets,                                       
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                />
                                   
                                      
                                  </FormItem>
      
                              </Col>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          租金税率
                                      </Label>
                                      
                                      <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'0%',value:'0'},{key:'3%',value:'3'},{key:'6%',value:'6'},{key:'10%',value:'10'}]}
                                    {...getFieldProps('rent_tax_rate', {
                                        initialValue: formObject.rent_tax_rate,                                        
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                />
                                    
                                  </FormItem>
      
                              </Col>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          税种
                                      </Label>
                                      <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'增值税',value:'1'},{key:'营业税',value:'2'},{key:'复合税',value:'3'},{key:'无',value:'0'}]}
                                    {...getFieldProps('pk_currtype', {
                                        initialValue: formObject.pk_currtype,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                />
                                      
                                  </FormItem>
      
                              </Col>
                                  </Row>
                                  <Row>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                  <div>
                                      
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          投放日期
                                      </Label>
                                      <div className="DatePicker">
                                      <DatePicker
                                      {
                                        ...getFieldProps('plan_date_loan', {
                                            initialValue: formObject.plan_date_loan,
                                            rules: [{
                                                required: true, 
                                            }],
                                        })
                                        }
                                        format={'YYYY-MM-DD'}
                                        // onSelect={this.onSelect}
                                        // onChange={this.onChange}
                                        // onClick={this.onClick}
                                        // onDateInputBlur={this.onDateInputBlur}
                                      />
                                </div>
                                </div>  
                                  </FormItem>
      
                              </Col>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          投放金额
                                      </Label>
                                      {/* <FormControl
                                          {
                                          ...getFieldProps('total_amount_equipment', {
                                              validateTrigger: 'onBlur',
                                              initialValue: formObject.total_amount_equipment ,                                            
                                              rules: [{
                                                  required: true, 
                                              }, {
                                                validator: this.handleChange //类似于onChange方法
                                            }],
                                          })
                                          }
                                      /> */}
                                      <div className="InputNumberAdd" >
                                      <InputNumber
                                        iconStyle="one"
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2}
                                        //format = {this.aformat.bind(this)}
                                        // min={0}
                                        // max={999999}
                                        {
                                            ...getFieldProps('total_amount_equipment', {
                                                initialValue: formObject.total_amount_equipment,                                            
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
                                      
                                       <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          租赁本金
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <InputNumber disabled={true}
                                        iconStyle="one"
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2}
                                        // min={0}
                                        // max={999999}
                                        {
                                            ...getFieldProps('fact_cash_loan', {
                                                initialValue: formObject.fact_cash_loan,                                            
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
                                          首付款比例
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('down_payment_ratio', {
                                              initialValue: formObject.down_payment_ratio,
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
                                      
                                       <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          首付款金额
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <InputNumber
                                        iconStyle="one"
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2}
                                        {
                                            ...getFieldProps('down_payment', {
                                                initialValue: formObject.down_payment,                                            
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
                                          净融资比例
                                      </Label>
                                      <FormControl disabled={true}
                                          {
                                          ...getFieldProps('net_finance_ratio', {
                                              initialValue: formObject.net_finance_ratio,
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
                                      
                                      <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          净融资额(元)
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <InputNumber disabled={true}
                                        iconStyle="one"
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2}
                                        // min={0}
                                        // max={999999}
                                        {
                                            ...getFieldProps('net_finance_cash', {
                                                initialValue: formObject.net_finance_cash,                                            
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
                                      留购价款(元)
                                  </Label>
                                  <FormControl disabled={true}
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
                                      
                                       <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          资产余值
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <InputNumber
                                        iconStyle="one"
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2}
                                        {
                                            ...getFieldProps('assets_margin', {
                                                initialValue: formObject.assets_margin,                                            
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
                                  </Row>
                          
                              </div>
                              <div style={{display:this.state.showDiv2}}>
                              <Row>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          保证金收取方式
                                      </Label>
                                      <Select 
                                    data={[{key:'手工维护',value:'1'},{key:'期初收取',value:'2'}]}
                                    {...getFieldProps('deposit_method', {
                                        initialValue: formObject.deposit_method,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                />   
                                  </FormItem>
                              </Col>

                          
                          <Col md={4} xs={4} sm={4}>
                              <FormItem>
                                  
                                  <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          保证金比例
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <InputNumber
                                        iconStyle="one"
                                        toThousands = {true}  //是否显示千分位
                                        precision = {4}
                                        format = {this.formatDepositRatio.bind(this)}
                                        // min={0}
                                        // max={999999}
                                        {
                                            ...getFieldProps('deposit_ratio', {
                                                initialValue: formObject.deposit_ratio,                                            
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
                          <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          保证金退回方式
                                      </Label>
                                      <Select 
                                    data={[{key:'期末退回',value:'1'},{key:'冲抵租金',value:'2'},{key:'冲抵两期租金',value:'3'},{key:'冲抵兼退回',value:'4'}]}
                                    {...getFieldProps('return_method_depos', {
                                        initialValue: formObject.return_method_depos,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                />   
                                  </FormItem>
                              </Col>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          保证金是否计息
                                      </Label>
                                      <Select 
                                    data={[{key:'是',value:'0'},{key:'否',value:'1'}]}
                                    {...getFieldProps('if_interest_depos', {
                                        initialValue: formObject.if_interest_depos,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                />   
                                  </FormItem>
                              </Col>
                              <Col md={4} xs={4} sm={4}>
                              <FormItem>
                                  <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          保证金利率
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <InputNumber disabled={true}
                                        iconStyle="one"
                                        toThousands = {true}  //是否显示千分位
                                        precision = {4}
                                        format = {this.formatDepositRatio.bind(this)}
                                        {
                                            ...getFieldProps('final_rate_depos', {
                                                initialValue: formObject.final_rate_depos,                                            
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
                              </Row>
                                  
                          </div>
                          <div style={{display:this.state.showDiv3}}>
                                 
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
                                          手续费计算基数
                                      </Label>
                                      <Select 
                                    data={[{key:'投放本金',value:'0'},{key:'剩余本金',value:'1'}]}
                                    {...getFieldProps('srvfee_base', {
                                        initialValue: formObject.srvfee_base,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
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
                              </Row>
                                  <Row>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          中间费用支出方式
                                      </Label>
                                      <FormControl
                                          {
                                          ...getFieldProps('srvfee_method_out', {
                                              initialValue: formObject.srvfee_method_out,
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
                                          中间费用支出计算基数
                                      </Label>
                                      <Select 
                                    data={[{key:'投放本金',value:'1'},{key:'剩余本金',value:'2'}]}
                                    {...getFieldProps('srvfee_base_out', {
                                        initialValue: formObject.srvfee_base_out,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
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
                                  
                                  <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          中间费用支出比例
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <InputNumber
                                        iconStyle="one"
                                        toThousands = {true}  //是否显示千分位
                                        precision = {4}
                                        format = {this.formatDepositRatio.bind(this)}
                                        {
                                            ...getFieldProps('srvfee_ratio_out', {
                                                initialValue: formObject.srvfee_ratio_out,                                            
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
                              <div style={{display:this.state.showDiv4}}>
                                 
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
                                          计划收租日
                                      </Label>
                                      <Select 
                                    data={[{key:'随起租日',value:'0'},{key:'1',value:'1'},{key:'2',value:'2'},{key:'3',value:'3'},{key:'4',value:'4'}
                            ,{key:'5',value:'5'},{key:'6',value:'6'},{key:'7',value:'7'},{key:'8',value:'8'},{key:'9',value:'9'},{key:'10',value:'10'}
                            ,{key:'11',value:'11'},{key:'12',value:'12'},{key:'13',value:'13'},{key:'14',value:'14'},{key:'15',value:'15'},{key:'16',value:'16'},
                            {key:'17',value:'17'},{key:'18',value:'18'},{key:'19',value:'19'},{key:'20',value:'20'},{key:'21',value:'21'},{key:'22',value:'22'},
                            {key:'23',value:'23'},{key:'24',value:'24'},{key:'25',value:'25'},{key:'26',value:'26'},{key:'27',value:'27'},{key:'28',value:'28'},
                            {key:'29',value:'29'},{key:'30',value:'30'},{key:'31',value:'31'}]}
                                    {...getFieldProps('srvfee_base_out', {
                                        initialValue: formObject.srvfee_base_out,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
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
                                         报价利息计算方式
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
                                      <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          延迟期(日)
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <InputNumber
                                        iconStyle="one"
                                        min={1}
                                        max={31}
                                        {
                                            ...getFieldProps('delay_period', {
                                                initialValue: formObject.delay_period,                                            
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
                                          是否指定首期收租日
                                      </Label>
                                      <Select 
                                    data={[{key:'是',value:'0'},{key:'否',value:'1'}]}
                                    {...getFieldProps('has_first_lease_date', {
                                        initialValue: formObject.has_first_lease_date,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                />   
                                  </FormItem>
                              </Col>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          首期收租日期
                                      </Label>
                                      <div className="DatePicker">
                                      <DatePicker
                                      {
                                        ...getFieldProps('first_lease_date', {
                                            initialValue: formObject.first_lease_date,
                                            rules: [{
                                                required: true, 
                                            }],
                                        })
                                        }
                                        format={'YYYY-MM-DD'}
                                      />
                                      </div>
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
                             
                                 </Row>
                                
                             </div>
     
                             <div style={{display:this.state.showDiv5}}>
                                
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
                            
     
                            
                              <div style={{display:this.state.showDiv6}}>
                                 
                                  <Row>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          会计IRR按最新算法
                                      </Label>
                                      <FormControl disabled={true}
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
                                      <FormControl disabled={true}
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
                                      <FormControl disabled={true}
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
                                      <FormControl disabled={true}
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
                                      <FormControl disabled={true}
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
                                      <FormControl disabled={true}
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
                              <div style={{display:this.state.showDiv7}}>
                                <Row>
                                    <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            特殊期类别
                                        </Label>
                                        <Select 
                                    data={[{key:'无',value:'0'},{key:'远期支付',value:'1'},{key:'在建期',value:'2'},{key:'租前息',value:'3'}]}
                                    {...getFieldProps('special_type', {
                                        initialValue: formObject.special_type,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                    />   
                                    </FormItem>
                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          远期支付日期
                                      </Label>
                                      <div className="DatePicker">
                                      <DatePicker disabled={true}
                                      {
                                        ...getFieldProps('time_pay_date', {
                                            initialValue: formObject.time_pay_date,
                                            rules: [{
                                                required: true, 
                                            }],
                                        })
                                        }
                                        format={'YYYY-MM-DD'}
                                      />
                                      </div>
                                  </FormItem>
                              </Col>
                              <Col md={4} xs={4} sm={4}>
                                <FormItem>
                                  <Label>
                                      <Icon type="uf-mi" className='mast'></Icon>
                                      特殊期期限(月)
                                  </Label>
                                  <div className="InputNumberAdd" >
                                  <InputNumber
                                    iconStyle="one" disabled={true}
                                    min={1}
                                    max={12}
                                    {
                                        ...getFieldProps('special_limit', {
                                            initialValue: formObject.special_limit,                                            
                                            rules: [{
                                                required: true, 
                                            }],
                                        })
                                        }
                                    />
                                    </div>
                                </FormItem>
                                </Col>
                                <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            特殊期利息支付频率
                                        </Label>
                                        <Select 
                                    data={[{key:'月',value:'0'},{key:'双月',value:'1'},{key:'季',value:'2'},{key:'四月',value:'3'},{key:'半年',value:'4'},{key:'年',value:'5'}]}
                                    {...getFieldProps('repayment_interest_period', {
                                        initialValue: formObject.repayment_interest_period,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                    />   
                                    </FormItem>
                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            特殊期还本频率
                                        </Label>
                                        <Select 
                                    data={[{key:'月',value:'0'},{key:'双月',value:'1'},{key:'季',value:'2'},{key:'四月',value:'3'},{key:'半年',value:'4'},{key:'年',value:'5'}]}
                                    {...getFieldProps('repayment_corpus_period', {
                                        initialValue: formObject.repayment_corpus_period,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                    />   
                                    </FormItem>
                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          特殊期还本金额
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <InputNumber disabled={true}
                                        iconStyle="one"
                                        toThousands = {true}  //是否显示千分位
                                        precision = {3}
                                        {
                                            ...getFieldProps('repayment_corpus_cash', {
                                                initialValue: formObject.repayment_corpus_cash,                                            
                                                rules: [{
                                                    required: true, 
                                                }],
                                            })
                                            }
                                        />
                                        </div>
                                  </FormItem>
                              </Col>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          特殊期利率
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <InputNumber disabled={true}
                                        iconStyle="one"
                                        toThousands = {true}  //是否显示千分位
                                        precision = {4}
                                        {
                                            ...getFieldProps('special_final_rate', {
                                                initialValue: formObject.special_final_rate,                                            
                                                rules: [{
                                                    required: true, 
                                                }],
                                            })
                                            }
                                        />
                                        </div>
                                  </FormItem>
                              </Col>
                              <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            特殊期利率档次
                                        </Label>
                                        <Select
                                    data={[{key:'六个月以内(含一年)',value:'0'},{key:'六个月至一年(含一年)',value:'1'},{key:'一至三年(含三年)',value:'2'},{key:'三至五年(含五年)',value:'3'},{key:'五年以上',value:'4'}]}
                                    {...getFieldProps('special_interrate_level', {
                                        initialValue: formObject.special_interrate_level,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                    />   
                                    </FormItem>
                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          特殊期基准利率
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <InputNumber disabled={true}
                                        iconStyle="one"
                                        toThousands = {true}  //是否显示千分位
                                        precision = {4}
                                        {
                                            ...getFieldProps('special_interrate', {
                                                initialValue: formObject.special_interrate,                                            
                                                rules: [{
                                                    required: true, 
                                                }],
                                            })
                                            }
                                        />
                                        </div>
                                  </FormItem>
                              </Col>
                              <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            特殊期利率类型
                                        </Label>
                                        <Select 
                                    data={[{key:'浮动',value:'0'},{key:'固定',value:'1'},{key:'无利率',value:'2'}]}
                                    {...getFieldProps('special_interrate_type', {
                                        initialValue: formObject.special_interrate_type,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                    />   
                                    </FormItem>
                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            特殊期利率浮动方式
                                        </Label>
                                        <Select
                                    data={[{key:'百分比',value:'0'},{key:'绝对值',value:'1'}]}
                                    {...getFieldProps('special_float_method', {
                                        initialValue: formObject.special_float_method,                                   
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
                                    />   
                                    </FormItem>
                                    </Col>
                                    <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          特殊期利率浮动值
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <InputNumber disabled={true}
                                        iconStyle="one"
                                        toThousands = {true}  //是否显示千分位
                                        precision = {4}
                                        {
                                            ...getFieldProps('special_float_value', {
                                                initialValue: formObject.special_float_value,                                            
                                                rules: [{
                                                    required: true, 
                                                }],
                                            })
                                            }
                                        />
                                        </div>
                                  </FormItem>
                              </Col>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          特殊期利率生效日期
                                      </Label>
                                      <div className="DatePicker">
                                      <DatePicker disabled={true}
                                      {
                                        ...getFieldProps('pk_special_interrate', {
                                            initialValue: formObject.pk_special_interrate,
                                            rules: [{
                                                required: true, 
                                            }],
                                        })
                                        }
                                        format={'YYYY-MM-DD'}
                                      />
                                      </div>
                                  </FormItem>
                              </Col>
                                </Row>
                                <Row>   
                                <Col md={4} xs={4} sm={4}>
                                <FormItem>
                                    <Label>
                                        <Icon type="uf-mi" className='mast'></Icon>
                                        计息金额计算方式
                                    </Label>
                                    <Select 
                                data={[{key:'全额起息',value:'0'},{key:'按已投放本金',value:'1'}]}
                                {...getFieldProps('calinterest_amount_style', {
                                    initialValue: formObject.calinterest_amount_style,                                   
                                    rules: [{
                                        required: true, message: '请选择',
                                    }],
                                })}  
                                />   
                                </FormItem>
                                </Col>  
                                </Row>
                              
                              </div>

                    {/* <div className="childListView">
                    <Tabs
                        defaultActiveKey="1"
                        onChange={this.onChange}
                        className="demo1-tabs"
                        extraContent={
                            <div className="addAndDelChildList demoPadding"  >
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
                    </div> */}
      
                              
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