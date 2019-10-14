import React, { Component } from 'react';
import {Panel, PanelGroup ,Form, Icon,Tabs, Button, Label, Checkbox,  Col, Row, FormControl  } from 'tinper-bee';
import { deepClone } from "utils";
import {actions} from 'mirrorx';
import './index.less';
import 'components/GridCompnent/index.less'
import { Empty } from 'antd';
import GridMain from 'components/GridMain';

const {TabPane} = Tabs;
const FormItem = Form.FormItem;

const emptyFunc = () => '';
class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey:'1',    //模板组Panel的展开项
            oldformObj:[]     //存储旧值数据
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        //挂载主表ref  便于父组件使用子组件函数
        this.props.onRef(this);
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    handleChange = (index, key) => {
        return value => {
            let _dictitemlist = deepClone(this.props.dictitemlist);
            _dictitemlist[index][key] = value ;
            actions.dict.updateState({ dictitemlist : _dictitemlist }); 
        };
      };

    //未使用通过service.js生成表头类型  因为是否启用字段不在基本类型中
    gridColumn = [
        {
            title: "参数名称",
            dataIndex: "paramName",
            key: "paramName",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div>
                        {record._edit ?<div className="string_model">
                        <FormControl
                            placeholder="请输入..."
                            defaultValue={text}
                            onChange={this.handleChange(index,"paramName")}
                            /></div> : <div>{text ? text : ""}</div>}
                    </div>
                );
            }
        },
        {
            title: "参数标识名称",
            dataIndex: "paramCode",
            key: "paramCode",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div>
                        {record._edit ?<div className="string_model">
                        <FormControl
                            placeholder="请输入..."
                            defaultValue={text}
                            onChange={this.handleChange(index,"paramCode")}
                            /></div> : <div>{text ? text : ""}</div>}
                    </div>
                );
            }
        },
        {
            title: "参数值",
            dataIndex: "paramValue",
            key: "paramValue",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div>
                        {record._edit ?<div className="string_model">
                        <FormControl
                            placeholder="请输入..."
                            defaultValue={text}
                            onChange={this.handleChange(index,"paramValue")}
                            /></div> : <div>{text ? text : ""}</div>}
                    </div>
                );
            }
        },
        {
            title: "是否启用",
            dataIndex: "isEnable",
            key: "isEnable",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div>
                        <Checkbox 
                        disabled={!this.props.isEdit}
                        checked={text=='Y'} 
                        onChange={this.changeCheckBox(index,"isEnable")}
                        >
                        </Checkbox>
                    </div>
                );
            }
        },
    ];

    //更改是否启用类型的选定
    changeCheckBox=(index,key)=>{
        return value => {
            let _dictitemlist = deepClone(this.props.dictitemlist);
            if(value==false){
                _dictitemlist[index][key] ='N';
            }else{
                _dictitemlist[index][key] ='Y';
            }
            actions.dict.updateState({ dictitemlist : _dictitemlist }); 
        };   
    }

    //提交表单数据用于保存
    submit = () => {
        return this.props.form.getFieldsValue();
    }

    //返回子表内所有数据  更新表单对应子表  完全更新行数据
    itemsubmit = ()=>{
        return this.props.dictitemlist;
    }

    //存储原数据  用于取消修改后还原旧值
    alteroldvalue=(obj)=>{
        this.setState({oldformObj:obj});
    }

    //还原表单及子表原数据 取消修改时使用
    resetvalue = ()=>{
        let obj = deepClone(this.state.oldformObj);
        const _dictitemlist=deepClone(obj.dictitemlist);
        this.props.form.setFieldsValue({'paramName':obj.paramName,'paramVarname':obj.paramVarname});
        this.props.formObject['_edit'] = this.props.formObject['_edit'] ? false : true;
        if(_dictitemlist && _dictitemlist.length > 0){
            _dictitemlist.map(item => {
                item['_edit']=item['_edit']?false:true;
            });
        }
        actions.dict.updateState({formObject:obj,dictitemlist:_dictitemlist})
    }

    //新增时使用  置空表单及子表数据  保留由编码规则生成的编号
    resetformValue = ()=>{
        this.props.form.setFieldsValue({'paramCode':'1001','paramName':'','paramVarname':''});
        //新增清空子表信息
        actions.dict.updateState({dictitemlist:[]});
    }

    
    //增加数据
    onAdd = ()=>{
        const _dictitemlist = deepClone(this.props.dictitemlist);
        const currentIndex  = _dictitemlist.length;
        _dictitemlist.push({
            index: currentIndex,
            _edit:true
        });
        actions.dict.updateState({ dictitemlist : _dictitemlist });  
    }

    //删除数据
    onDelete = ()=>{
        let selectedItemList = deepClone(this.props.selectedItemList);
        let _dictitemlist = deepClone(this.props.dictitemlist);
        selectedItemList.map(item => {
            delete _dictitemlist[item['_index']];
        });
        let newlist = [];
        _dictitemlist.map(item => {
            if(item!=Empty){
                newlist.push(item);
            }
        });
        actions.dict.updateState({ dictitemlist : newlist,selectedItemList:[] });  
    }


    //选定原数据操作
    getSelectedDataFunc = (selectedList,record,index) => {
        let {dictitemlist} = this.props;
        let _dictitemlist = deepClone(dictitemlist);
        let _selectedItemList = deepClone(selectedList);
        if(index!=undefined){
            _dictitemlist[index]['_checked'] = !_dictitemlist[index]['_checked'];
        }else {
            if(_selectedItemList && _selectedItemList.length > 0){
                _dictitemlist.map(item => {
                    if (!item['_disabled']) {
                        item['_checked'] = true;
                    }
                });
            } else {
                _dictitemlist.map(item => {
                    if (!item['_disabled']) {
                        item['_checked'] = false;
                    }
                });
            }            
        }
        actions.dict.updateState({ dictitemlist : _dictitemlist,selectedItemList : _selectedItemList});   
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let formObj = this.props.formObject;
        let _props = this.props;
        return (

                <div className='form'>
                    <div className = 'panelform'>
                    <PanelGroup activeKey={this.state.activeKey} >
                    <Panel header="主表信息" eventKey="1"  defaultExpanded="true">
                    <Form>
                    <Row> 

                        <Col md={4} xs={4} sm={4}>
                            <FormItem>
                                <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    参数编号
                                </Label>
                                <FormControl
                                    disabled={true}
                                    {
                                    ...getFieldProps('paramCode', {
                                        initialValue: formObj.paramCode,
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
                                    参数名称
                                </Label>
                                <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('paramName', {
                                        initialValue: formObj.paramName,
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
                                    参数英文名称
                                </Label>
                                <FormControl
                                    disabled={!_props.isEdit}
                                    {
                                    ...getFieldProps('paramVarname', {
                                        initialValue: formObj.paramVarname,
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
                        </Panel>
                        </PanelGroup>
                    </div>
                    <div>
                    <Tabs
                        defaultActiveKey="dictitem"
                        className="son_tabs"
                        extraContent={
                            <div className="initbtn" >
                                <Button shape="icon" className="initbtn" size="sm" disabled={!_props.isEdit}  colors="secondary" onClick={this.onAdd}><Icon type='uf-add-c-o'/></Button>
                                <Button shape="icon" className="initbtn" size="sm" disabled={!_props.isEdit}  colors="secondary" onClick={this.onDelete}><Icon type='uf-reduce-c-o'/></Button>
                            </div>
                            }
                        >
                        <TabPane tab='子表信息' key="dictitem">
                            <div>
                            <GridMain
                                ref={"dictitem"} //存模版
                                columns={this.gridColumn} //字段定义
                                data={this.props.dictitemlist} //数据数组
                                //分页对象
                                paginationObj = {{
                                    verticalPosition:'none'
                                }}
                                emptyText={emptyFunc}   //空值不显示数据
                                getSelectedDataFunc={this.getSelectedDataFunc}
                            />
                            </div>
                        </TabPane>
                    </Tabs>
                    </div>
                </div>
                
              
        );
    }
}

export default Form.createForm()(FormView);