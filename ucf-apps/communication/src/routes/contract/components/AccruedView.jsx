/**
 *
 * @title 结合切换事件的 Step组件完成主页面模态框形式新增数据
 * @description 点击next，Step的流程跟进
 *
 */
import React, { Component } from 'react';
import { Step, Button, Message, Modal, Form, Icon, Label, Col, Row, Select, FormControl, Tabs } from 'tinper-bee';
import { actions } from 'mirrorx';
import GridMain from 'components/GridMain';
import { genGridColumn, multiRecordOper } from "utils/service";
import './index.less';

const Steps = Step.Steps;         //步骤条组件使用定义 如不定义则只能使用Step.Steps 此处定义全局变量是为了方便使用
const FormItem = Form.FormItem;   //表单组件使用定义   与上述情况相同
const addTitle = "计提表";       //模态框标题

class AccruedView extends Component {
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
        actions.communicationContract.getListAccrued(obj);
    }

    //导出当前界面数据
    export = () => {
        this.accrualviewgrid.exportExcel(2);
    }
    //关闭模态框
    close = () => {
        actions.communicationContract.updateState({ showAccruedModal: false });
    }

    //主表  列属性定义 ifshow:false 不显示该列  默认全显示 true
    grid = [
        { title: '计提月', key: 'month', type: '0', width: '150', sorter: 0},
        { title: '利息', key: 'inter', type: '7', width: '150' , digit: 2, sumCol:true },
        { title: '手续费', key: 'srv', type: '7', width: '150' , digit: 2, sumCol:true },
        { title: '其他收入', key: 'pri', type: '7', digit: 2 , width: '150', sumCol:true },
        { title: '其他支出', key: 'bus', type: '7', digit: 2 , width: '150', sumCol:true },
        { title: '是否已计提', key: 'ifBegin', type: '6', enumType: '1000003' , width: '150' },
    ]
    //主表 列属性定义=>通过前端service工具类自动生成
    gridColumn = [];

    render() {
        if (this.props.showAccruedModal == false) {
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
                        show={this.props.showAccruedModal}
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
                                    ref={(el) => this.accrualviewgrid = el} //存模版
                                    columns={this.state.gridColumn} //字段定义
                                    data={this.props.accruedList} //数据数组                     
                                    tableHeight={4} //表格高度 1主表 2单表 3子表
                                    exportFileName= {this.props.formObject['contName']+'-计提数据表'}　  //导出表格名称
                                    exportData={this.props.accruedList}      //导出表格数据
                                    multiSelect= {{ type:"false" }}  //false 单选，默认多选 
                                    columnFilterAble = {false}
                                    canSum={true} 
                                    //分页对象 不分页
                                    paginationObj={{
                                        verticalPosition: 'none'
                                    }}
                                />
                            </div>
                            <div className="steps-action">
                                <Button className="ml8" style={{ marginRight: 8 }} onClick={() => this.export()} colors="primary"><Icon type='uf-symlist'/>导出</Button>
                                <Button colors="secondary" onClick={() => this.close()}> 关闭 </Button>
                            </div>

                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
    }
}
export default Form.createForm()(AccruedView);