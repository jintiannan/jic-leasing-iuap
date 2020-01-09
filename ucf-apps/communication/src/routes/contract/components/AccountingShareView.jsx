/**
 *
 * @title 结合切换事件的 Step组件完成主页面模态框形式新增数据
 * @description 点击next，Step的流程跟进
 *
 */
import React, { Component } from 'react';
import { Step, Button, Message, Modal, Form, Icon, Label, Col, Row, Select, FormControl, Tabs } from 'tinper-bee';
import { actions } from 'mirrorx';
import TableFormRef from 'components/FormRef/TableFormRef';
import { deepClone } from "utils";
import DatePicker from "tinper-bee/lib/Datepicker";
import FormInputNumber from 'components/FormRef/FormInputNumber';
import { enumConstant } from '../../../../../../ucf-common/src/utils/enums';
import './index.less';
import GridMain from 'components/GridMain';
import { genGridColumn, multiRecordOper } from "utils/service";
const Steps = Step.Steps;         //步骤条组件使用定义 如不定义则只能使用Step.Steps 此处定义全局变量是为了方便使用
const FormItem = Form.FormItem;   //表单组件使用定义   与上述情况相同
const addTitle = "会计分摊表";       //模态框标题
const steps = [                   //步骤条每步使用标题  对应嵌套模态框内部标题
    { title: '基本信息' }
];

class AccountingShareView extends Component {
    constructor(props) {

        super(props);
        this.state = {
            gridColumn: [],
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        const gridColumn = [...genGridColumn(this.grid)];
        this.setState({gridColumn:gridColumn});
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.onListRef(this);
    }
    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }
    getList = (obj) => {
        actions.communicationContract.getListAccountingShare(obj);
    }
    //主表  列属性定义 ifshow:false 不显示该列  默认全显示 true
    grid = [
        { title: '期次', key: 'planLeaseTime', type: '0', width: '60', sorter: 0},
        { title: '应收收取日期', key: 'planDate', type: '0', width: '100', sorter: 0 },
        { title: '交易类别', key: 'pkEventType.eventName', type: '0', width: '100', sorter: 0 },
        { title: '租金', key: 'planAmount', type: '7', digit: 2 , width: '100' },
        { title: '利息', key: 'planInterest', type: '7', digit: 2 , width: '100' },
        { title: '会计本金', key: 'planLeaseCorpus', type: '7', digit: 2 , width: '100' },
        { title: '会计本金余额', key: 'planLeaseCorpus', type: '7', digit: 2 , width: '100' },
        { title: '租赁收入', key: 'leaseCashIn', type: '7', digit: 2 , width: '100' },
        { title: '去税租息', key: 'noTaxInterest', type: '7', digit: 2 , width: '100' },
        { title: '去税手续续费收入', key: 'noTaxSrvfee', type: '7', digit: 2 , width: '100' },
        { title: '去税其它收入', key: 'noTaxOtherin', type: '7', digit: 2 , width: '100' },
        { title: '去税其它支出', key: 'noTaxOtherout', type: '7', digit: 2 , width: '100' },
        { title: '税金', key: 'sumTax', type: '7', digit: 2 , width: '100' },
        { title: '进项税差', key: 'inputTaxDiff', type: '7', digit: 2 , width: '100' },
    ]
    //主表 列属性定义=>通过前端service工具类自动生成
    gridColumn = [];

    //关闭模态框
    close = () => {
        actions.communicationContract.updateState({ showAccountingShareModal: false });
    }


    render() {
        if (this.props.showAccountingShareModal == false) {
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
                        className="jic-model"
                        show={this.props.showAccountingShareModal}
                        backdrop="static" //关闭遮罩事件
                        size={"xlg"} //大号模态框
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

                            <div className="steps-content jic-form">
                                {/**
                                 表单内容组件Form 包含表单的内容放置在组件内部
                                 其中 Row Col 为处理格式的栅格布局 Row控制单行 Col 控制 md xs sm 即 中 大 小三种分辨率的列排序占比 单行12列
                                 FormItem为单个表单域 囊括 标签Label与输入框FormControl 其中输入框同样可以换为下拉框Select等组件
                                 FormControl的 getFieldProps为固定使用形式 内部填写当前单个表单域的属性名称
                                 initiaValue为表单初始默认值
                                 rules表单常用校验规则 内部required 为必输属性控制
                                 */}
                                 <GridMain
                                    columns={this.state.gridColumn} //字段定义
                                    data={this.props.accountingShareList} //数据数组                     
                                    tableHeight={4} //表格高度 1主表 2单表 3子表
                                    multiSelect= {{ type:"false" }}  //false 单选，默认多选 
                                    columnFilterAble = {false}
                                    //分页对象 不分页
                                    paginationObj={{
                                        verticalPosition: 'none'
                                    }}
                                />
                                
                            </div>
                            <div className="steps-action">
                                {
                                    <Button colors="secondary" onClick={() => this.close()}> 关闭 </Button>
                                }
                            </div>

                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
    }
}
export default Form.createForm()(AccountingShareView);