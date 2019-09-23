import React, { Component, PureComponent } from "react";
import {
  Select, Form, FormControl, Button, Icon, Modal, FormGroup, Label, Row, Col
} from "tinper-bee";
import RefEditCell from 'components/ChildFormRef/RefEditCell';
const FormItem = Form.FormItem;

class EditModal extends Component {
    constructor(props, context) {
      super(props);
      this.state = {
        data: this.props.data,
        errorEditFlag: false
      };
    }
  
  
    submitChange = () => {
      if (this.state.errorEditFlag) return;
      const { onSubmit, onHide, currentIndex } = this.props;
      onSubmit && onSubmit(this.state.data, currentIndex);
      onHide && onHide();
    }
  
  
    render() {
      const { show, onHide, columns, currentIndex } = this.props;
      const { getFieldProps, getFieldError } = this.props.form;
      const { data } = this.state;
      return (
        <Modal
          show={show}
          onHide={onHide}
          style={{ width: 800 }}
          className="jic-model"
        >
          <Modal.Header closeButton>
            <Modal.Title>字表编辑</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="steps-content jic-form">
            <Form>
            <Row>
                                <Col md={6} xs={6} sm={6}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            员工编号
                                        </Label>
                                        <FormControl
                                            {
                                            ...getFieldProps('a', {
                                                initialValue: data.a,
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
                                            姓名
                                        </Label>
                                      
                                        <FormControl
                                            {
                                            ...getFieldProps('b', {
                                                initialValue: data.b,
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
                                <Col md={6} xs={6} sm={6}>
                                    <FormItem>
                                        <Label>
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            性别
                                        </Label>
                                        
                                        <Select
                                      data={[{key:'男',value:'0'},{key:'女',value:'1'}]}
                                      {...getFieldProps('if_corpus_tickets', {
                                          initialValue: data.c?data.c.value:"",                                       
                                          rules: [{
                                              required: true, message: '请选择',
                                          }],
                                      })}  
                                  />
                                     
                                        
                                    </FormItem>
        
                                </Col>
                                <Col md={6} xs={6} sm={6}>
                                    <FormItem>
                                        <Label className="line-hight32">
                                            <Icon type="uf-mi" className='mast'></Icon>
                                            部门
                                        </Label>
                                        <RefEditCell
                                        colName={"部门"}
                                        editable={true}
                                        required
                                        value={data.d}
                                        {...getFieldProps('d', {
                                            initialValue: data.d,                                       
                                            rules: [{
                                                required: true, message: '请选择',
                                            }],
                                        })}  
                                    />
                                      
                                    </FormItem>
        
                                </Col>
                                
                                </Row>
            </Form>
            </div>
            <div className="steps-action">
            <Button
              style={{ marginRight: 8 }}
              bordered
              onClick={onHide}
            >
              取消
            </Button>
            <Button colors="primary" onClick={this.submitChange}>
              确认
            </Button>
            </div>
          </Modal.Body>
        </Modal>
      );
    }
  }
  export default Form.createForm()(EditModal);