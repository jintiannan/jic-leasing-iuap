import React, { Component } from 'react';
import { Form, Icon, Button, Label, Switch, Checkbox, Radio, Select, Col, Row, FormControl, Collapse, Tabs, ButtonGroup } from 'tinper-bee';
import { deepClone,Info } from "utils";
import { SelectField } from 'components/RowField/SelectField'
import FormSplitHeader from 'components/FormSplitHeader'
import DatePicker from "tinper-bee/lib/Datepicker";
import FormInputNumber from 'components/FormRef/FormInputNumber';
import ChildListView from './ChildListView';
import ChildListView2 from './ChildListView2';
import TableFormRef from 'components/FormRef/TableFormRef';
import {enumConstant} from "../../../../../../ucf-common/src/utils/enums";
//参照组件职级
import { RefWalsinLevel } from 'components/RefViews';
const { TabPane } = Tabs;

import './index.less';

const FormItem = Form.FormItem;

class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 1,
            open: true, //各个标签

        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {

    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.props.onRef(this); //绑定子组件
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    //保存方法
    submit = () => {
        console.log(this.props.form.getFieldsValue());
        console.log(this.state.dataSource + "子表数据");
        return this.props.form.getFieldsValue();
    }

    //子表切换子标签
    onChange = (activeKey) => {
        //console.log(`onChange ${activeKey} o-^-o`);
        this.setState({
            activeKey,
        });
    }

    //字表添加数据
    add=()=>{
        let key = this.state.activeKey;
        let childs = "child" + key;
        let dataSource = deepClone(this[childs].state.dataSource);
        let index = dataSource.length + 1;
        let newData = {
            index: index,  //序号
        };
        let isEditArray = this[childs].state.isEditArray;
        isEditArray?isEditArray.push([]):isEditArray=[];
        dataSource.push(newData);
        this[childs].setState({
            dataSource:dataSource,
            isEditArray: isEditArray
        });
    }
    //字表删除数据
    del=(index)=>{
        let key = this.state.activeKey;
        let childs = "child" + key;
        let dataSource = deepClone(this[childs].state.dataSource);
        dataSource.splice(dataSource.length-1,1);
        this[childs].setState({
            dataSource:dataSource
        });
    }

    //onChange事件
    handleChange = (value) =>{
        if(value == '01'){

        }
    }

    //绑定子组件
    onRef1 = (ref) => {
        this.child1 = ref;
    }

    //绑定子组件2
    onRef2 = (ref) => {
        this.child2 = ref;
    }

    //绑定子组件3
    onRef3 = (ref) => {
        this.child3 = ref;
    }
    //绑定子组件4
    onRef4 = (ref) => {
        this.child4 = ref;
    }
    //绑定子组件5
    onRef5 = (ref) => {
        this.child5 = ref;
    }

    //绑定子组件6
    onRef6 = (ref) => {
        this.child6 = ref;
    }

    form = [
        {label:'担保客户名称',field:'pkCustomer',com:TableFormRef},
        {label:'担保客户编号',field:'pkCustomer.code',com:FormControl, disabled: true},
        {label:'证件类型',field:'pkCustomer.identityType',com:Select, data: enumConstant(""), disabled: true},
        {label:'证件号码',field:'pkCustomer.identityNo',com:FormControl, disabled: true},
        {label:'贷款卡号',field:'pkCustomer.loanCardNo',com:FormControl, disabled: true},
        {label:'法定代表人',field:'pkCustomer.legalRep',com:FormControl, disabled: true},
        {label:'纳税人识别号',field:'pkCustomer.nationalTax',com:FormControl, disabled: true},
        {label:'地址',field:'pkCustomer.commAddress',com:FormControl, disabled: true},
        {label:'邮编',field:'pkCustomer.commAddressZip',com:FormControl, disabled: true},
        {label:'担保方式',field:'guaranteeMethod',com:Select, data: enumConstant("")},
        {label:'保证担保形式',field:'guaranteeType',com:Select, data: enumConstant("")},
        {label:'合同有效状态',field:'contValidStatus',com:Select, data: enumConstant("")},
        {label:'客户关系',field:'relationRole',com:TableFormRef},
        {label:'债权方',field:'bondBank',com:FormControl, disabled: true},
        {label:'担保金额（元）',field:'planCash',com:FormControl},
        {label:'担保合同是否上报征信',field:'creditInvestigation',com:Select, data: enumConstant("")},
        {label:'提供担保原因',field:'reason',com:FormControl, col: 12, class: 'textarea'},
        {label:'与承租人关系',field:'memo',com:FormControl, col: 12, class: 'textarea'},
    ];










    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let _formObject = this.props.formObject;
        let formObject = deepClone(_formObject);
        let _props = this.props;
        const loop = data => data.map((value, key) => {
            return (
                <Col md={value.col ? value.col : 4} xs={value.col ? value.col : 4} sm={value.col ? value.col : 4}>
                    <FormItem
                        className={(value.col === 12 ? (value.class && value.class === 'textarea' ? "remark flex jic-textArea" : "remark flex ") : '')}>
                        <Label className={value.col === 12 ? "line-height-32" : ''}>
                            {(value.required && value.required === true) ?
                                <Icon type="uf-mi" className='mast'></Icon> : ''}
                            {value.label}
                        </Label>
                        <value.com {...this.props}
                                   title={value.label}
                                   name={value.field}
                                   disabled={value.disabled ? value.disabled : !this.props.isEdit}
                                   data={value.data ? value.data : ''}
                                   toThousands={value.com === FormInputNumber ? (value.toThousands ? value.toThousands : true) : ''}  //是否显示千分位
                                   precision={value.com === FormInputNumber ? (value.precision ? value.precision : 2) : ''} //保留2位小数
                                   componentClass={value.class ? value.class : 'input'}
                                   {
                                       ...getFieldProps(value.field, {
                                           initialValue: formObject[value.field],
                                           rules: [{
                                               required: true,
                                           }],
                                       })
                                   }>
                        </value.com>
                    </FormItem>
                </Col>)
        });

        if(_props.showForm){
            return (
                <div>


                    <div className='jic-form'>
                        <div>
                        <span onClick={() => this.setState({ open: !this.state.open })} >
                        <FormSplitHeader title={'客户人信息'} />
                        </span>
                        </div>
                        <Collapse in={this.state.open}>
                            <Form>
                                {loop(this.form)}

                            </Form>

                        </Collapse>








                    {/*    <div>*/}
                    {/*    <span onClick={() => this.setState({ open4: !this.state.open4 })} >*/}
                    {/*    <FormSplitHeader title={'出租方账户信息'} />*/}
                    {/*</span>*/}
                    {/*    </div>*/}
                    {/*    <Collapse in={this.state.open4}>*/}

                    {/*        <Form>*/}
                    {/*            {loop(this.form3)}*/}
                    {/*        </Form>*/}

                    {/*    </Collapse>*/}


                    </div>



                    <div className="childListView">
                        <Tabs
                            defaultActiveKey="1"
                            onChange={this.onChange}
                            className="list-tabs"
                            extraContent={
                                <div className="addAndDelChildList demoPadding" style={{display:_props.isEdit?'':'none'}} >
                                    <ButtonGroup style={{ margin: 1 }}>
                                        <Button shape='border' onClick={this.add.bind(this)}><Icon type='uf-add-c-o' /></Button>
                                        <Button shape='border' onClick={this.del.bind(this)}><Icon type='uf-reduce-c-o' /></Button>
                                    </ButtonGroup>
                                </div>
                            }
                        >
                            <TabPane tab='联系人信息' key="1"> <ChildListView { ...this } ref="onTheLoan" onRef={this.onRef1}/></TabPane>
                            <TabPane tab='客户账户信息' key="2"> <ChildListView2 { ...this } ref="marginLoan" onRef={this.onRef2}/></TabPane>
                            {/*<TabPane tab='手续费计划' key="3"> <ChildListView3 { ...this } { ...this.props } ref="commissionLoan" onRef={this.onRef3}/></TabPane>*/}
                            {/*<TabPane tab='中间费用支出计划' key="4"> <ChildListView4 { ...this } ref="middleCostLoan" onRef={this.onRef4}/></TabPane>*/}
                            {/*<TabPane tab='其他收支计划' key="5"> <ChildListView5 { ...this } ref="otherLoan" onRef={this.onRef5}/></TabPane>*/}
                            {/*<TabPane tab='租金计划' key="6"> <ChildListView6 { ...this } ref="rentLoan" onRef={this.onRef6}/></TabPane>*/}
                        </Tabs>
                    </div>

                </div>
            );

        }else{
            return <div></div>
        }

    }
}

export default Form.createForm()(FormView);
