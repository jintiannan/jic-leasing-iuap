import React, { Component } from 'react';
import {Button, Message, Modal, Form,Icon, Label, Col, Row, Select, FormControl,Radio,Checkbox } from 'tinper-bee';
import {actions} from 'mirrorx';
import { deepClone } from "utils";

const FormItem = Form.FormItem;

import './index.less';

class AddModalView extends Component {
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
        this.props.onaddmodalRef(this);
    }
    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    //将新增数据存入缓存
    saveCache = () =>{
      let objectForm = this.props.form.getFieldsValue();
      //将form表单 和  model参照属性 合并
      //let obj = Object.assign(objectForm,this.props.formObject); 合并对象
      localStorage.setItem("function_regitster",JSON.stringify(objectForm)) ;  //置入缓存
    }


    alertDone=()=> {
      Message.create({content: '完成', color: 'successlight'});
      localStorage.removeItem("addKey");
      //关闭之前更新 树表数据
      let nodeItem = this.props.form.getFieldsValue();  //当前选中节点数据（包含新增的插入数据）
      let obj ={};
      if(this.props.SelectformObj!=undefined&&this.props.SelectformObj.key=='function_register'){  //如是功能注册父节点 置空父节点属性
           obj.pkParent=null;
      }else{
           obj.pkParent = this.props.SelectformObj;
      } 
      
      obj.funcCode = nodeItem.funcCode1;
      obj.funcName = nodeItem.funcName1;
      obj.menuProperty = nodeItem.menuProperty1;
      if(nodeItem.ifPower){
        obj.ifPower=0;
      }else{
        obj.ifPower=1;
      }
      obj.ifEnabled=1;
      obj.pkSystem = this.props.SelectformObj.pkSystem;
      obj.children = [];
      //调用后台接口插入数据
      actions.menu.addData({vo:obj})
      //更新树节点数据
      this.doInsert(this.props.treeData,obj);
      this.close();
    }

    /**
     * 增加节点
     * @param data 树节点数据
     * @param obj 新增数据
     */
    doInsert = (data,obj) => {
        if(obj.pkParent==null){   //父节点为空  证明新增的为1级菜单节点
            data.push(obj);
        }else{
            data.map((item)=>{
                if(item.pkFuncmenu == obj.pkParent.pkFuncmenu){
                    if(item.children&&item.children.length>0){
                        item.children.push(obj);
                    }else{
                        item.children=[];
                        item.children.push(obj);
                    }
                }else if(item.children && item.children.length > 0){
                    this.doInsert(item.children,obj);
                }
            })
        }
        actions.menu.updateState({treeData:data});
    };

    close=() =>{
      actions.menu.updateState({showaddModal : false});
    }

    changeCheckBox = (value)=>{
        this.props.form.setFieldsValue({ifPower:value});
    }
  


  render() {
    const { getFieldProps} = this.props.form;
    if(this.props.showModal == false){
        return <div></div>;
    }else{
        return (
            <div>
                <Modal
                show={this.props.showaddModal}
                onHide={this.close}
                backdrop="static"
                centered="true"
                className="jic-model"
            > 
            <div className="modal_header">
                <Modal.Header closeButton>
                    <Modal.Title>
                        新增功能菜单
                    </Modal.Title>
                </Modal.Header>
                </div>

            <Modal.Body>
                <div className="steps-content jic-form">
                            <Form>
                                    <FormItem>
                                    <Label><Icon type="uf-mi" className='mast'></Icon>节点编码:</Label>
                                        <FormControl  disabled={true}
                                            {...getFieldProps('funcCode1', {
                                                rules: [{
                                                    required: true,
                                                }],
                                            })}
                                        />
                                    </FormItem>
                                    <FormItem>
                                    <Label><Icon type="uf-mi" className='mast'></Icon>节点名称:</Label>
                                        <FormControl
                                            {...getFieldProps('funcName1', {
                                                rules: [{
                                                    required: true,
                                                }],
                                            })}
                                        />
                                    </FormItem>
                                    <FormItem>
                                        <Label><Icon type="uf-mi" className='mast'></Icon>节点路径:</Label>
                                            <FormControl
                                                {...getFieldProps('menuPath1', {
                                                    rules: [{
                                                        required: true,
                                                    }],
                                                })}
                                            />
                                    </FormItem>
                                    <FormItem>
                                    <Label><Icon type="uf-mi" className='mast'></Icon>菜单性质:</Label>
                                        <Radio.RadioGroup
                                                    selectedValue={this.props.form.getFieldsValue()['menuProperty1']}
                                                    {
                                                    ...getFieldProps('menuProperty1', {
                                                        }
                                                    )}
                                                >
                                                    <Radio value="first_menu" disabled>一级菜单</Radio>
                                                    <Radio value="second_menu" disabled>菜单标题</Radio>
                                                    <Radio value="third_menu" disabled>可执行功能节点</Radio>
                                                </Radio.RadioGroup>
                                    </FormItem>
                                    <FormItem>
                                        <Label><Icon type="uf-mi" className='mast'></Icon>是否过滤数据权限:</Label>
                                            <Checkbox 
                                            checked={this.props.form.getFieldsValue()['ifPower']} 
                                            onChange={this.changeCheckBox}
                                            {
                                                ...getFieldProps('ifPower', {
                                                        
                                                    }
                                                )}
                                            >
                                            </Checkbox>
                                    </FormItem>
                            </Form>
                            
                        </div>
                        <div className="register_body_btn">

                            <Button colors="primary" style={{ marginRight: 8 }} onClick={() => this.alertDone()}>确认</Button>

                            <Button colors="secondary" onClick={ () => this.close() }> 取消 </Button>

                        </div>
                        </Modal.Body>
                      </Modal>

                      <div>
                    
                </div> 
            </div>
          );
    }
    
  }
}
export default Form.createForm()(AddModalView);