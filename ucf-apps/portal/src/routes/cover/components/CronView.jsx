import React, { Component } from 'react';
import {Table,Icon,Modal,Button,Form,FormControl,Row,Col,Label } from 'tinper-bee';
import StringModel from 'components/GridCompnent/StringModel';
import TimeModel from 'components/GridCompnent/TimeModel';
const FormItem = Form.FormItem;

const dataSource = [
      {
        taskname: "OA推送提醒",
        source_type:"后台任务",
        start_time:"2019-02-05 19:05:00",
        end_time:"2019-02-05 19:05:59",
        result:"成功",
        describtion:"推送了1条消息",
        key:1
      },
      {
        taskname: "OA推送提醒",
        source_type:"后台任务",
        start_time:"2019-02-06 20:05:00",
        end_time:"2019-02-06 20:05:59",
        result:"失败",
        describtion:"后台出现异常",
        key:2
      },
      {
        taskname: "发送业务待办邮件",
        source_type:"后台任务",
        start_time:"2019-02-06 20:05:00",
        end_time:"2019-02-06 20:05:59",
        result:"成功",
        describtion:"发送了0封邮件",
        key:3
      },
      {
        taskname: "发送业务待办邮件",
        source_type:"后台任务",
        start_time:"2019-02-07 20:05:00",
        end_time:"2019-02-07 20:05:59",
        result:"成功",
        describtion:"发送了0封邮件",
        key:4
      },
      {
        taskname: "计提折旧",
        source_type:"临时任务",
        start_time:"2019-02-03 20:05:00",
        end_time:"2019-02-03 20:05:59",
        result:"成功",
        describtion:"计提折旧执行成功",
        key:5
      },
      {
        taskname: "计提折旧",
        source_type:"临时任务",
        start_time:"2019-02-02 20:05:00",
        end_time:"2019-02-02 20:05:59",
        result:"失败",
        describtion:"计提折旧执行失败",
        key:6
      },
      {
        taskname: "数据稽核方案",
        source_type:"后台任务",
        start_time:"2019-02-01 20:05:00",
        end_time:"2019-02-01 20:05:59",
        result:"失败",
        describtion:"违反唯一性约束",
        key:7
      },
      {
        taskname: "数据稽核方案",
        source_type:"后台任务",
        start_time:"2019-01-31 20:05:00",
        end_time:"2019-01-31 20:05:59",
        result:"成功",
        describtion:"执行完成",
        key:7
      },
      {
        taskname: "数据校验",
        source_type:"后台任务",
        start_time:"2019-01-31 20:05:00",
        end_time:"2019-01-31 20:05:59",
        result:"成功",
        describtion:"执行了20条sql语句",
        key:8
      },
      {
        taskname: "数据校验",
        source_type:"后台任务",
        start_time:"2019-01-30 20:05:00",
        end_time:"2019-01-30 20:05:59",
        result:"成功",
        describtion:"执行了10条sql语句",
        key:9
      },
      {
        taskname: "业务绩效数据同步",
        source_type:"业务预警",
        start_time:"2019-01-29 20:05:00",
        end_time:"2019-01-29 20:05:59",
        result:"成功",
        describtion:"",
        key:10
      },
      {
        taskname: "业务绩效数据同步",
        source_type:"业务预警",
        start_time:"2019-01-28 20:05:00",
        end_time:"2019-01-28 20:05:59",
        result:"成功",
        describtion:"",
        key:11
      },
      {
        taskname: "员工合同到期预警",
        source_type:"业务预警",
        start_time:"2019-01-27 20:05:00",
        end_time:"2019-01-27 20:05:59",
        result:"成功",
        describtion:"",
        key:12
      },
      {
        taskname: "中控考勤数据采集23点",
        source_type:"后台任务",
        start_time:"2019-01-27 20:05:00",
        end_time:"2019-01-27 20:05:59",
        result:"成功",
        describtion:"IOE Exception",
        key:13
      },
      {
        taskname: "中控考勤数据采集23点",
        source_type:"后台任务",
        start_time:"2019-01-26 20:05:00",
        end_time:"2019-01-26 20:05:59",
        result:"成功",
        describtion:"IOE Exception",
        key:14
      },
];

class CronView extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "任务名称",dataIndex: "taskname",key: "taskname",width: 150, textAlign:'center',
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "类型",dataIndex: "source_type",key: "source_type",width: 100, textAlign:'center',
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            // {
            //     title: "开始时间",dataIndex: "start_time",key: "start_time",width: 150, textAlign:'center',
            //     render: (text, record, index) => {
            //         return <TimeModel text={text} record={record} index={index} dateFormatTime={"YYYY-MM-DD HH:mm:ss"}/>
            //     }
            // },
            {
                title: "完成时间",dataIndex: "end_time",key: "end_time",width:150, textAlign:'center',
                render: (text, record, index) => {
                    return <TimeModel text={text} record={record} index={index} dateFormatTime={"YYYY-MM-DD HH:mm:ss"}/>
                }
            },
            {
                title: "结果",dataIndex: "result",key: "result",width: 80,textAlign:'center', 
                render: (text, record, index) => {
                  if(text!=undefined){
                    if(text=="成功"){
                        return <div style={{color:'green'}}><Icon type="uf-correct"></Icon></div>
                    }else if(text=="失败"){
                        return <div style={{color:'red'}}><Icon type="uf-close"></Icon></div>
                    }
                  }else{
                    return <div></div>
                  }
                }
          },
          //   {
          //     title: "说明",dataIndex: "describtion",key: "describtion",width: 150,textAlign:'center', 
          //     render: (text, record, index) => {
          //         return <StringModel text={text} record={record} index={index}/>
          //   }
          // },
];
          this.state = {
            dataSource: dataSource,
            columns:this.columns,
            IfShow:false,
          };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
      //this.props.oncronRef(this);
    }


    //双击事件触发弹窗
    onRowDoubleClick =(record,index,event)=>{
      this.setState({formObj:record,IfShow:true});
    }

    //关闭小模态框
    oncloseModal = ()=>{
      this.setState({formObj:undefined,IfShow:false});
    }



    //表格标题
    bodyttitle =()=>{
        return "定时任务处理结果";
    }
    render() {
        const {IfShow,formObj} = this.state;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
        <div>
            <Table
            title={this.bodyttitle}
            data={this.state.dataSource}  //传递数据
            columns={this.state.columns}  //表格表头
            height={30}       //行定高
            onRowDoubleClick={this.onRowDoubleClick}
            /> 
            {formObj==undefined?<div></div>:<div>
                <Modal
                show={IfShow}
                onHide={this.oncloseModal}
                size="sm"
                backdrop="static"
                centered="true"
                width="500"
                dialogClassName="cron_modal_form"
            > 
            <div className="modal_header">
                <Modal.Header closeModal>
                    <Modal.Title>
                        定时任务详情
                    </Modal.Title>
                </Modal.Header>
            </div>

                <Modal.Body>
                    <div>
                        <Form>
                          <Row>
                            <Col md={6} xs={6} sm={6}>
                                <FormItem>
                                      <Label>
                                      <Icon type="uf-mi" className='mast'></Icon>
                                      任务名称:
                                  </Label>
                                  <FormControl disabled={true}
                                      {
                                      ...getFieldProps('taskname', {
                                          initialValue: formObj.taskname,
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
                                      类型:
                                  </Label>
                                  <FormControl disabled={true}
                                      {
                                      ...getFieldProps('source_type', {
                                          initialValue: formObj.source_type,
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
                                      开始时间:
                                  </Label>
                                  <FormControl disabled={true}
                                      {
                                      ...getFieldProps('start_time', {
                                          initialValue: formObj.start_time,
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
                                      结束时间:
                                  </Label>
                                  <FormControl disabled={true}
                                      {
                                      ...getFieldProps('end_time', {
                                          initialValue: formObj.end_time,
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
                                      处理结果:
                                  </Label>
                                  <FormControl disabled={true}
                                      {
                                      ...getFieldProps('result', {
                                          initialValue: formObj.result,
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
                              <Col md={12} xs={12} sm={12}>
                              <FormItem>
                                    <Label>
                                    <Icon type="uf-mi" className='mast'></Icon>
                                    结果描述:
                                </Label>
                                <input className="modal_input" disabled={true} type="text" placeholder={formObj.describtion}
                                />
                              </FormItem>
                              </Col>
                          </Row>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  <div style={{'text-align':"center",height:40,'margin-bottom':5}}>
                    <Button colors="primary" onClick={this.oncloseModal}>
                        确定
                    </Button>
                </div>
                </Modal.Footer>
                </Modal>
            
        </div>}
        </div>
        
        );
    }
}

export default Form.createForm()(CronView);
