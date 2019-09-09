/**
*
* @title 结合切换事件的 Step
* @description 点击next，Step的流程跟进
*
*/
import React, { Component } from 'react';
import { Step, Button, Message, Modal, Form,Icon, Label, Col, Row, FormControl } from 'tinper-bee';
import {actions} from 'mirrorx';
const FormItem = Form.FormItem;

import './index.less';
 
const Steps = Step.Steps;

const addTitle = "会计流水生成规则" ;
const steps = [
                {title: '基本信息'}
              ] ;

class AddFormView extends Component {
  constructor(props) {
      
    super(props);
    this.state = {
      current: 0,
      // showModal: false,
      modalSize: '',
      showProject: '',
      showCont: 'none',
      showCustomer: 'none',
      showQuot: 'none',
      showLessor: 'none',
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
      localStorage.setItem("addKey",JSON.stringify(objectForm)) ;  //置入缓存
    }

    next() {
      const current = this.state.current + 1;
      this.setState({ current });
      let objectForm = this.props.form.getFieldsValue();
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
          showProject: 'none',
          showCont: '',
          showCustomer: 'none',
          showQuot: 'none',
          showLessor: 'none',
        })
      }else if(1 == this.state.current){
        this.setState({
          showProject: 'none',
          showCont: 'none',
          showCustomer: '',
          showQuot: 'none',
          showLessor: 'none',
        })

      }else if(2 == this.state.current){
        this.setState({
          showProject: 'none',
          showCont: 'none',
          showCustomer: 'none',
          showQuot: '',
          showLessor: 'none',
        })

      }else if(3 == this.state.current){
        this.setState({
          showProject: 'none',
          showCont: 'none',
          showCustomer: 'none',
          showQuot: 'none',
          showLessor: '',
        })

      }else{
        this.setState({
          showProject: '',
          showCont: 'none',
          showCustomer: 'none',
          showQuot: 'none',
          showLessor: 'none',
        })
      }
    }

    //控制上一步 显示那个div
    prevController = () =>{
      if(2 == this.state.current){
        this.setState({
          showProject: 'none',
          showCont: '',
          showCustomer: 'none',
          showQuot: 'none',
          showLessor: 'none',
        })
      }else if(3 == this.state.current){
        this.setState({
          showProject: 'none',
          showCont: 'none',
          showCustomer: '',
          showQuot: 'none',
          showLessor: 'none',
        })

      }else if(4 == this.state.current){
        this.setState({
          showProject: 'none',
          showCont: 'none',
          showCustomer: 'none',
          showQuot: '',
          showLessor: 'none',
        })
      }else{
        this.setState({
          showProject: '',
          showCont: 'none',
          showCustomer: 'none',
          showQuot: 'none',
          showLessor: 'none',
        })
      }
    }

    initDiv=()=>{
        this.setState({
            current: 0,
            modalDropup: true,
            showProject: '',
            showCont: 'none',
            showCustomer: 'none',
            showQuot: 'none',
            showLessor: 'none',
          });
    }

    alertDone() {
      Message.create({content: '完成', color: 'successlight'});
      localStorage.removeItem("addKey");
      this.initDiv();
    }
    close() {
      actions.vouchTemplate.updateState({showModal : false});
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

  render() {
    const { current } = this.state;
    const { getFieldProps, getFieldError } = this.props.form;
    let formObjAdd = this.props.formObjAdd;
    return (
      <div>
       
        <Modal
                    className="demo4-modal"
                    show={ this.props.showModal }
                    backdrop="static" //关闭遮罩事件
                    size="xlg" //大号模态框
                    onHide={ this.close }>
                    <Modal.Header closeButton>
                        <Modal.Title > { addTitle } </Modal.Title>
                    </Modal.Header >
                    <Modal.Body >

        {/*<Steps current={current}>*/}
        {/*  {steps.map(item => <Step key={item.title} title={item.title} />)}*/}
        {/*</Steps>*/}
        
        <div className="steps-content">
        <Form>
        <div style={{display:this.state.showProject}}>
                            
                            <Row>
                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    功能节点
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('func_id', {
                                        initialValue: formObjAdd.func_id,
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
                                    交易类别编码
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('func_id.code', {
                                        initialValue: formObjAdd.func_id,
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
                                    业务类别
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('pk_tradetype', {
                                        initialValue: formObjAdd.pk_tradetype,
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
                                    凭证类别
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('subdeal_no', {
                                        initialValue: formObjAdd.subdeal_no,
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
                                    模板编号
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('template_code', {
                                        initialValue: formObjAdd.template_code ,
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
                                    模板名称
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('template_name', {
                                        initialValue: formObjAdd.template_name ,
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
                                    规则公式
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('match_rule', {
                                        initialValue: formObjAdd.match_rule,
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
                                    数据指标
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('pk_kpi_set', {
                                        initialValue: formObjAdd.pk_kpi_set ,
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
                                    备注
                                </Label>
                                <FormControl
                                    {
                                    ...getFieldProps('memo', {
                                        initialValue: formObjAdd.memo,
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
                    {/*    <div style={{display:this.state.showCont}}>*/}
                    {/*    <Row>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            合同编号*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('cont_code', {*/}
                    {/*                initialValue: formObjAdd.cont_code,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*        */}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            合同名称*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('cont_name', {*/}
                    {/*                initialValue: formObjAdd.cont_name,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />                               */}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            合同年份*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('cont_year', {*/}
                    {/*                initialValue: formObjAdd.cont_year,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*    </Row>*/}
                    {/*    <Row>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            计划起租日*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('lease_date_predict', {*/}
                    {/*                initialValue: formObjAdd.lease_date_predict,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*        */}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            合同签订日*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('cont_signed_date', {*/}
                    {/*                initialValue: formObjAdd.cont_signed_date,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />                               */}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            合同起始日期*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('cont_start_date', {*/}
                    {/*                initialValue: formObjAdd.cont_start_date,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*    </Row>*/}
                    {/*    <Row>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            合同截止日期*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('cont_end_date', {*/}
                    {/*                initialValue: formObjAdd.cont_end_date,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*        */}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            币种*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('pk_cust_help', {*/}
                    {/*                initialValue: formObjAdd.pk_cust_help,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />                               */}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            设备金额*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('machine_amount', {*/}
                    {/*                initialValue: formObjAdd.machine_amount,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*    </Row>*/}
                    {/*    <Row>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                合同金额*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('cont_amount', {*/}
                    {/*                    initialValue: formObjAdd.cont_amount,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*            */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                税率*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('tax_type', {*/}
                    {/*                    initialValue: formObjAdd.tax_type,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />                               */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    */}
                    {/*        </Row>*/}
                    {/*</div>*/}
                    {/*<div style={{display:this.state.showCustomer}}>*/}
                    {/*    <Row>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            客户名称*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('customer_name', {*/}
                    {/*                initialValue: formObjAdd.customer_name,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*        */}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            承租人编号*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('pk_customer_code', {*/}
                    {/*                initialValue: formObjAdd.pk_customer_code,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />                               */}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            组织机构代码*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('taxIdentNo', {*/}
                    {/*                initialValue: formObjAdd.taxIdentNo,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*    </Row>*/}
                    {/*    <Row>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            经济性质*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('economicNature', {*/}
                    {/*                initialValue: formObjAdd.economicNature,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*        */}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            客户性质内部*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('custNatureInner', {*/}
                    {/*                initialValue: formObjAdd.custNatureInner,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />                               */}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            业务领域*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('featureField', {*/}
                    {/*                initialValue: formObjAdd.featureField,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*    </Row>*/}
                    {/*    <Row>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            法人代表*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('legal_person', {*/}
                    {/*                initialValue: formObjAdd.legal_person,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*        */}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            实际控制人*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('actual_person', {*/}
                    {/*                initialValue: formObjAdd.actual_person,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />                               */}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*<Col md={4} xs={4} sm={4}>*/}
                    {/*    <FormItem>*/}
                    {/*        <Label>*/}
                    {/*            <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*            成立日期*/}
                    {/*        </Label>*/}
                    {/*        <FormControl*/}
                    {/*            {*/}
                    {/*            ...getFieldProps('up_date', {*/}
                    {/*                initialValue: formObjAdd.up_date,*/}
                    {/*                rules: [{*/}
                    {/*                    required: true, */}
                    {/*                }],*/}
                    {/*            })*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </FormItem>*/}

                    {/*</Col>*/}
                    {/*    </Row>*/}
                    {/*    <Row>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                注册资本*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('capital', {*/}
                    {/*                    initialValue: formObjAdd.capital,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*            */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*   */}
                    {/*    */}
                    {/*        </Row>*/}
                    {/*        */}
                    {/*</div>*/}
                    {/*<div style={{display:this.state.showQuot}}>*/}
                    {/*       */}
                    {/*        <Row>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                报价编号*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('quot_code', {*/}
                    {/*                    initialValue: formObjAdd.quot_code,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*            */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                限额方案*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('pk_limit_plan', {*/}
                    {/*                    initialValue: formObjAdd.pk_limit_plan,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />                               */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                租赁期限*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('lease_times', {*/}
                    {/*                    initialValue: formObjAdd.lease_times,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*        </Row>*/}
                    {/*        <Row>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                报价类型*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('quot_type', {*/}
                    {/*                    initialValue: formObjAdd.quot_type,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*            */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                还款频率*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('repayment_period', {*/}
                    {/*                    initialValue: formObjAdd.repayment_period,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />                               */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                计算方式*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('lease_cal_method', {*/}
                    {/*                    initialValue: formObjAdd.lease_cal_method,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*        </Row>*/}
                    {/*        <Row>*/}
                    {/*        <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                保证金总额*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('depositP_cash', {*/}
                    {/*                    initialValue: formObjAdd.depositP_cash,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                年化天数*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('year_days', {*/}
                    {/*                    initialValue: formObjAdd.year_days,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />                               */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                融资额*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('net_finance_ratio', {*/}
                    {/*                    initialValue: formObjAdd.net_finance_ratio,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*        </Row>*/}
                    {/*        <Row>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                投放金额*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('plan_cash_loan', {*/}
                    {/*                    initialValue: formObjAdd.plan_cash_loan,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*            */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                首付款总额*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('down_payment', {*/}
                    {/*                    initialValue: formObjAdd.down_payment,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />                               */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    */}
                    {/*        </Row>*/}
                    {/*      */}
                    {/*    </div>,*/}
                    {/*    <div style={{display:this.state.showLessor}}>*/}
                    {/*       */}
                    {/*        <Row>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                出租方账户*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('lessor_name', {*/}
                    {/*                    initialValue: formObjAdd.lessor_name,*/}
                    {/*                   */}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*            */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                税种*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('tax', {*/}
                    {/*                    initialValue: formObjAdd.tax,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />                               */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                纳税人主体*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('subject_name', {*/}
                    {/*                    initialValue: formObjAdd.subject_name,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*        </Row>*/}
                    {/*        <Row>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                出租方银行*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('leasing_bank', {*/}
                    {/*                    initialValue: formObjAdd.leasing_bank,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*            */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                出租方账号*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('leasing_account', {*/}
                    {/*                    initialValue: formObjAdd.leasing_account,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />                               */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                税务登记号*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('tax_code', {*/}
                    {/*                    initialValue: formObjAdd.tax_code,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*        </Row>*/}
                    {/*        <Row>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                承租方账户*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('lessee_account_name', {*/}
                    {/*                    initialValue: formObjAdd.lessee_account_name,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*            */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                发票性质*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('nature_invoice', {*/}
                    {/*                    initialValue: formObjAdd.nature_invoice,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />                               */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                承租方账号*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('lessee_account', {*/}
                    {/*                    initialValue: formObjAdd.lessee_account,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*        </Row>*/}
                    {/*        <Row>*/}
                    {/*    <Col md={4} xs={4} sm={4}>*/}
                    {/*        <FormItem>*/}
                    {/*            <Label>*/}
                    {/*                <Icon type="uf-mi" className='mast'></Icon>*/}
                    {/*                联系人*/}
                    {/*            </Label>*/}
                    {/*            <FormControl*/}
                    {/*                {*/}
                    {/*                ...getFieldProps('linkman', {*/}
                    {/*                    initialValue: formObjAdd.linkman,*/}
                    {/*                    rules: [{*/}
                    {/*                        required: true, */}
                    {/*                    }],*/}
                    {/*                })*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*            */}
                    {/*        </FormItem>*/}

                    {/*    </Col>*/}
                    {/*   */}
                    {/*    </Row>*/}
                    {/*    */}
                    {/*    </div>*/}
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
export default Form.createForm()(AddFormView);