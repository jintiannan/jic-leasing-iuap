/**
 *
 * @title 结合切换事件的 Step组件完成主页面模态框形式新增数据
 * @description 驳回页面
 *
 */
import React, { Component } from 'react';
import { Step, Button, Message, Modal, Form, Icon, Label, Col, Row, Select, FormControl, Tabs } from 'tinper-bee';
import { actions } from 'mirrorx';
import { deepClone,getHeight } from "utils";
import Grid from 'components/Grid';
import {genGridColumn,checkListSelect} from "utils/service";
import './index.less';
const FormItem = Form.FormItem;   //表单组件使用定义   与上述情况相同

// const Steps = Step.Steps;         //步骤条组件使用定义 如不定义则只能使用Step.Steps 此处定义全局变量是为了方便使用
const addTitle = "驳回意见";       //模态框标题
// const steps = [                   //步骤条每步使用标题  对应嵌套模态框内部标题
//     { title: '基本信息' }
// ];

class RejectInfoView extends Component {
    constructor(props) {

        super(props);
        this.state = {
            current: 0,        //初始模态框进入页签参数
            showDiv1: '',      //控制模态框内部每个页签的显示隐藏 为''时显示 为none时隐藏
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        //计算表格滚动条高度
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
    }
    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    //点击保存存储对应新增数据 移除缓存 并重置模态框
    alertDone = () => {
        this.close();
        let objectForm = this.props.form.getFieldsValue();
        this.props.updateRejectInfo(objectForm);
    };
    //关闭模态框
    close = () => {
        actions.communicationInvoice.updateState({ showRejectedModal: false, list1: [] });
    };


    render() {
        const { getFieldProps } = this.props.form;
        let _formObject = this.props.formObject;
        let formObject = deepClone(_formObject);

        if (this.props.showRejectedModal == false) {
            return <div></div>;
        } else {
            return (
                <div>
                    {/**
                     模态框组件Modal 主组件使用className控制自定义属性  show控制显示隐藏  backdrop static代表固定遮罩层 size控制尺寸 onHide关闭事件
                     拥有三层子组件 分别为 Modal.Header  Modal.Body  Modal.Footer 其中
                     Modal.Header: 模态框的头部 通过Modal.Title 定义模态框的标题
                     Modal.Body:   模态框的内容体 显示主题内容在内部定义
                     Modal.Footer: 模态框的尾部 显示按钮在此处定义 也可定义在Body中不加Footer体
                     */}
                    <Modal
                        show={this.props.showRejectedModal}
                        backdrop="static" //关闭遮罩事件
                        size={"sm"} //大号模态框
                        dialogClassName="accrued_modal_form"
                        width="520"
                        onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title > {addTitle} </Modal.Title>
                        </Modal.Header >
                        <Modal.Body >
                            {
                                /**
                                 * 步骤条组件Steps 展示当前步骤条属性 current
                                 * 单个步骤条子组件Step key为唯一性索引 title为步骤条标题
                                 */
                            }
                            <Form>
                            <div className="reject-info">
                                <FormItem>
                                                    <FormControl componentClass='textarea'
                                                        {
                                                            ...getFieldProps('rejectInfo', {
                                                                initialValue: "请输入字符不要超过250个字",
                                                                rules: [{
                                                                    required: true,
                                                                }],
                                                            })
                                                        }
                                              
                                                    />
                                </FormItem>
                            </div>
                            </Form>
                            <div className="steps-action">
                                <Button colors="primary" style={{marginRight: 8}}
                                        onClick={() => this.alertDone()}>确定</Button>
                                <Button colors="secondary" onClick={() => this.close()}> 关闭 </Button>
                            </div>



                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
    }
}
export default Form.createForm()(RejectInfoView);
