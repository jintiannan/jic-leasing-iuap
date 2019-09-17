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

import ChildListView from './ChildListView';
const { TabPane } = Tabs;
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
      modalSize: '',
      showDiv1: '',
      showDiv2: 'none',
      showDiv3: 'none',
      showDiv4: 'none',
      showDiv5: 'none',
      showDiv6: 'none',
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

 //onChange方法
handleChange = (rule, value, callback) =>{
    
}

//格式化百分数 比例字段
formatDepositRatio = (value) => {
    if(value != "" && value != "0.0000"){
        let v= value + "%";
        return v;
    }
}

aformat=(value)=>{
    //value =  value + 1;
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
                                                {/* <RefWalsinLevel
                                                disabled={false}
                                                placeholder="请选择限额方案"
                                                {...getFieldProps('pk_limit_plan', {
                                                    initialValue: formObject.pk_limit_plan?
                                                    JSON.stringify(formObject.pk_limit_plan)
                                                    :"",
                                                    rules: [{
                                                        message: '请选择限额方案',
                                                        pattern: /[^({"refname":"","refpk":""}|{"refpk":"","refname":""})]/
                                                    }]
                                                })}
                                            /> */}

                    

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
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber
                                        disabled = {false}
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2} //保留2位小数
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
                                      <FormInputNumber
                                        disabled = {false}
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2} //保留2位小数
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
                                  </Row>
                                  <Row>
                                  <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      
                                      <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          净融资比例
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber
                                        disabled = {false}
                                        toPercent = {true}  //是否显示百分号
                                        precision = {2} //保留2位小数
                                        {
                                            ...getFieldProps('project_manager', {
                                                initialValue: formObject.project_manager,                                            
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
                                          净融资额(元)
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber
                                        disabled = {false}
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2} //保留2位小数
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
                                  </Row>
                          
                              </div>
                              <div style={{display:this.state.showDiv2}}>
                              <Row>
                          <Col md={4} xs={4} sm={4}>
                              <FormItem>
                                        <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          留购价款(元)
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber
                                        disabled = {false}
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2} //保留2位小数
                                        {
                                            ...getFieldProps('nominal_price', {
                                                initialValue: formObject.nominal_price,                                            
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
                                          保证金比例
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber
                                        toPercent = {true}  //是否显示百分号
                                        precision = {4}
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
                                    <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          保证金金额
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2}
                                        // min={0}
                                        // max={999999}
                                        {
                                            ...getFieldProps('deposit_cash', {
                                                initialValue: formObject.deposit_cash,                                            
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
                                      <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'每满一年收取',value:'0'},{key:'每年年初收取',value:'1'},{key:'初期收取',value:'2'}]}
                                    {...getFieldProps('srvfee_method_in', {
                                        initialValue: formObject.srvfee_method_in,                                        
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
                                          手续费比例
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber
                                        precision = {true}
                                        precision = {4}

                                        {
                                            ...getFieldProps('srvfee_ratio_in', {
                                                initialValue: formObject.srvfee_ratio_in,                                            
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
                                          首期手续费金额(元)
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2} //保留2位小数
                                        // min={0}
                                        // max={999999}
                                        {
                                            ...getFieldProps('srvfee_cash_in_ft', {
                                                initialValue: formObject.srvfee_cash_in_ft,                                            
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
                                  <Row>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>    
                                    <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          手续费总金额(元)
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber disabled={true}
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2} //保留2位小数
                                        // min={0}
                                        // max={999999}
                                        {
                                            ...getFieldProps('srvfee_cash_in', {
                                                initialValue: formObject.srvfee_cash_in,                                            
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
                                          手续费收入税率(增值税)
                                      </Label>
                                      <FormControl disabled={true}
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
                                      <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'指定支付',value:'0'},{key:'每满一年支付',value:'1'},{key:'每年年初支付',value:'2'}]}
                                    {...getFieldProps('lease_cal_method', {
                                        initialValue: formObject.lease_cal_method,                                        
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
                                          首期中间费用支出时间
                                      </Label>
                                      <div className="DatePicker">
                                      <DatePicker
                                      {
                                        ...getFieldProps('srvfee_date_out_ft', {
                                            initialValue: formObject.srvfee_date_out_ft,
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
                                          首期中间费用支出金额(元)
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber disabled={true}
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2} //保留2位小数
                                        // min={0}
                                        // max={999999}
                                        {
                                            ...getFieldProps('srvfee_cash_out_ft', {
                                                initialValue: formObject.srvfee_cash_out_ft,                                            
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
                                          中间费用支出总金额(元)
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber disabled={true}
                                        toThousands = {true}  //是否显示千分位
                                        precision = {2} //保留2位小数
                                        // min={0}
                                        // max={999999}
                                        {
                                            ...getFieldProps('srvfee_cash_out', {
                                                initialValue: formObject.srvfee_cash_out,                                            
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
                                  <Row>
                              <Col md={4} xs={4} sm={4}>
                                  <FormItem>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          中间费用支出税率(增值税)
                                      </Label>
                                      
                                      <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'3%',value:'3'},{key:'6%',value:'6'},{key:'17%',value:'17'}
                                    ,{key:'0%',value:'0'},{key:'11%',value:'11'},{key:'16%',value:'16'},{key:'10%',value:'10'}
                                    ,{key:'13%',value:'13'},{key:'9%',value:'9'}
                                    ]}
                                    {...getFieldProps('srvfee_taxrate_out', {
                                        initialValue: formObject.srvfee_taxrate_out,                                        
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}  
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
                                         先付后付标志
                                     </Label>
                                     <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'先付',value:'0'},{key:'后付',value:'1'}]}
                                    {...getFieldProps('prepay_or_not', {
                                        initialValue: formObject.prepay_or_not,                                        
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
                                         支付频率
                                     </Label>
                                     
                                     <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'月',value:'0'},{key:'双月',value:'1'},{key:'季',value:'2'}
                                    ,{key:'四月',value:'1'},{key:'半年',value:'1'},{key:'年',value:'1'}]}
                                    {...getFieldProps('lease_freq', {
                                        initialValue: formObject.lease_freq,                                        
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
                                         计算方式
                                     </Label>
                                     <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'等额租金',value:'0'},{key:'等额本金',value:'1'},{key:'平息法',value:'2'}]}
                                    {...getFieldProps('lease_cal_method', {
                                        initialValue: formObject.lease_cal_method,                                        
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
                                         总投放金额的计息方式
                                     </Label>
                                     <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'约定计息(第一笔投放)',value:'0'},{key:'按投放时间点计息',value:'1'}]}
                                    {...getFieldProps('interest_method_total_loan', {
                                        initialValue: formObject.interest_method_total_loan,                                        
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
                                         现金流日期计算方式
                                     </Label>
                                     <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'360',value:'0'},{key:'365',value:'1'}]}
                                    {...getFieldProps('year_days_flow', {
                                        initialValue: formObject.year_days_flow,                                        
                                        rules: [{
                                            required: true, message: '请选择',
                                        }],
                                    })}
                                    />         
                                 </FormItem>
     
                             </Col>
                                 </Row>
                                
                             </div>
     
                             <div style={{display:this.state.showDiv5}}>
                                
                                 <Row>
                             <Col md={4} xs={4} sm={4}>
                                 <FormItem>
                                     <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          报价利率
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber
                                        toPercent = {true}  
                                        precision = {6}
                                        //format = {this.formatDepositRatio.bind(this)}
                                        // min={0}
                                        // max={999999}
                                        {
                                            ...getFieldProps('final_rate', {
                                                initialValue: formObject.final_rate,                                            
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
                                          基准利率
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber
                                        precision = {6}  
                                        toPercent = {true}  
                                        //format = {this.formatDepositRatio.bind(this)}
                                        // min={0}
                                        // max={999999}
                                        {
                                            ...getFieldProps('interrate', {
                                                initialValue: formObject.interrate,                                            
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
                                          支付频率
                                      </Label>
                                     <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'分',value:'0'},{key:'元',value:'1'}]}
                                    {...getFieldProps('cal_digit', {
                                        initialValue: formObject.cal_digit,                                        
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
                                         年化天数
                                     </Label>
                                     <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'360',value:'0'},{key:'365',value:'1'}]}
                                    {...getFieldProps('year_days', {
                                        initialValue: formObject.year_days,                                        
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
                                         利率类型
                                     </Label>
                                    <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'浮动',value:'0'},{key:'固定',value:'1'}]}
                                    {...getFieldProps('interrate_type', {
                                        initialValue: formObject.interrate_type,                                        
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
                                         币种
                                     </Label>
                                     <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'人民币',value:'0'},{key:'多币种',value:'1'},{key:'欧元',value:'1'}
                                    ,{key:'港元',value:'1'},{key:'日元',value:'1'},{key:'澳门元',value:'1'},{key:'美元',value:'1'}]}
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
                                     <Label>
                                         <Icon type="uf-mi" className='mast'></Icon>
                                         利率浮动方式
                                     </Label>
                                     
                                     <Select 
                                    //onChange={this.handleChange}
                                    data={[{key:'百分比',value:'0'},{key:'绝对值',value:'1'}]}
                                    {...getFieldProps('float_method', {
                                        initialValue: formObject.float_method,                                        
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
                                                    利率生效日期
                                                </Label>
                                            
                                            <div className="tableRefAdd" >
                                            <TableFormRef
                                            {...this.props}
                                            isEdit={true} 
                                            ref="pk_interrate" 
                                            title={"限额方案"} 
                                            name = {"pk_interrate"} 
                                            {
                                                ...getFieldProps('pk_interrate', {
                                                    initialValue: formObject.pk_interrate,
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
                                         利率档次
                                     </Label>
                                     <FormControl disabled={true}
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
                                     <div>
                                      <Label>
                                          <Icon type="uf-mi" className='mast'></Icon>
                                          利率浮动值(%)
                                      </Label>
                                      <div className="InputNumberAdd" >
                                      <FormInputNumber
                                        toPercent = {true}  //是否显示千分位
                                        precision = {6}  //是否显示千分位
                                        //format = {this.formatDepositRatio.bind(this)}
                                        // min={0}
                                        // max={999999}
                                        {
                                            ...getFieldProps('float_value', {
                                                initialValue: formObject.float_value,                                            
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