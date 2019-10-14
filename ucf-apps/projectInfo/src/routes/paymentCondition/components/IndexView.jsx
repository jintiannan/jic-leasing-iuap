/**
 * App模块
 */

import React, { Component } from 'react';
import {Tooltip, Menu, Icon, Loading,Form,Label,FormControl,Col, Row} from 'tinper-bee';
import {actions} from 'mirrorx';
import {singleRecordOper} from "utils/service";
import { deepClone,Info } from "utils";
import {enumConstant} from "../../../../../../ucf-common/src/utils/enums";
import ButtonGroup from './ButtonGroup';
import ListView from './ListView';
import FormView from './FormView';
import AddFormView from './AddFormView';
import moment from 'moment';
import './index.less';
const FormItem = Form.FormItem;

class IndexView extends Component {
    constructor(props) {
        super(props);
        //在路由时带出此节点权限按钮
        /**临时测试数据 */
        props.powerButton = ['Query','Export','Save','Return','ViewFlow','Check','Submit','Edit','Add','View','Switch'];
        props.ifPowerBtn = true;

        //在路由时带出此节点字段权限
        /**临时测试数据 */
        // props.gridColumn = ['plan_cash_loan','fact_cash_loan','deposit_cash','srvfee_cash_in','finace_irr_method','finace_irr_year'
        //     ,'project_irr','finance_irr'];
        props.ifGridColumn = true;
        /**临时测试数据 */

        this.state = {
            showLoading : false, //加载状态
            showListView : '', //显示列表界面
            showListViewLead : 'none', //显示领导列表界面
            showFormView : 'none',//显示Form表单
            showFormViewLead : 'none',//显示Form表单
            isEdit : false,//是否可编辑(卡片界面)
            showForm:false, //是否加载 详情修改页
            isGrid : true,//是否列表界面
            formObject: {},//当前卡片界面对象
            listObj: [],//列表对象
            ifPowerBtn:props.ifPowerBtn,//是否控制按钮权限
            powerButton: props.powerButton,//按钮权限列表
            // ifGridColumn:props.ifGridColumn,//是否自定义显示字段
            // gridColumn: props.gridColumn,//显示字段
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        actions.paymentCondition.updateState({powerButton:this.props.powerButton});
        actions.paymentCondition.updateState({ifPowerBtn:this.props.ifPowerBtn});

        // actions.paymentCondition.updateState({gridColumn:this.props.gridColumn});
        // actions.paymentCondition.updateState({ifGridColumn:this.props.ifGridColumn});

    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {

    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {

    }


    //绑定子组件
    onRef = (ref) => {
        this.child = ref;
    }

    /**
     * 切换为列表界面
     */
    switchToListView = () =>{
        this.setState({
            showListView:'',
            showFormView:'none',
            formObject:{},
        })
        actions.paymentCondition.updateState({ formObject : {},isGrid : true,isEdit : false, showForm : false});
    }

    /**
     * 切换为卡片界面
     */
    switchToCardView = (obj) =>{
        let _formObj = deepClone(obj);
        this.setState({
            showListView:'none',
            showFormView:'',
            formObject:_formObj,
        })

        actions.paymentCondition.updateState({ formObject : _formObj,isGrid : false,isEdit : false, showForm : true});
    }

    /**
     * Form表单更改编辑状态
     */
    switchEdit = () =>{
        this.setState({
            isEdit:!this.state.isEdit,
        });
        this.state.formObject['_edit'] = this.state.formObject['_edit'] ? false : true;
        actions.paymentCondition.updateState({isEdit : !this.state.isEdit});
    };

    /**
     * 查询方法
     */
    onQuery = (queryParam) =>{
        console.log(this.props.list);
    };

    /**
     * 新增按钮
     */
    onAdd = () =>{
        console.log("点击新增");
        let objectForm = localStorage.getItem("addKey");
        if(objectForm){
            let _formObject = deepClone(JSON.parse(objectForm));
            actions.paymentCondition.updateState({formObject:_formObject});
        }else{

            //新增完成初始化form表单
            actions.paymentCondition.updateState({formObject:{
                    //租赁方式
                    lease_method:'0',
                    //本金是否开票
                    if_corpus_tickets:'0',
                    //投放日期
                    plan_date_loan: moment(), //系统当前时间
                    //基准利率
                    interrate:'0.0435',
                    //报价利率
                    final_rate:'0.0435',
                    //手续费收取方式
                    srvfee_method_in:'0',
                    //租赁期限(月)
                    lease_times:'12',
                    //先付后付标志
                    prepay_or_not:'1',
                    //支付频率
                    lease_freq:'0',
                    //计算方式
                    lease_cal_method:'0',
                    //总投放金额的计息方式
                    interest_method_total_loan:'0',
                    //现金流日期计算方式
                    year_days_flow:'0',
                    //计算精度
                    cal_digit:'1',
                    //年化天数
                    year_days:'0',
                    //利率类型
                    interrate_type:'0',
                    //币种
                    pk_currtype:'0',
                    //利率浮动方式
                    float_method:'0',
                    //利率档次
                    interrate_level:'0',
                    //会计IRR按最新算法
                    finace_irr_method:'0',
                    //会计IRR算法启用年份
                    finace_irr_year:'1',


                }});
        }
        //填出新增窗口
        actions.paymentCondition.updateState({showModal : true,isEdit:true});

        // singleRecordOper(param => {
        //     this.switchToCardView(param);
        // });        
    }


    /**
     * 修改按钮
     */
    onEdit = () =>{
        singleRecordOper(this.props.selectedList,(param) => {
            this.switchToCardView(param);
            this.switchEdit();
        });
    }

    /**
     * 查看按钮
     */
    onView = () =>{
        singleRecordOper(this.props.selectedList,(param) => {
            this.switchToCardView(param);
            actions.paymentCondition.updateState({bt:false});
        });
    }

    /**
     * 导出数据按钮
     *
     */
    onClickExport = () => {
        this.grid.exportExcel();
    }

    /**
     * 返回按钮
     */
    onReturn = () =>{
        if(this.state.isEdit){
            this.switchEdit();
        }
        this.switchToListView();
    }

    onSave = () => {
        if(!this.props.error){
            Info('子表数据填写不正确');
        }else{
            console.log('save save')
            let obj = this.child.submit();
            let _formObj = deepClone(this.props.formObject);
            Object.assign(_formObj,obj);
            console.log('save form');
            console.log(_formObj);
            actions.paymentCondition.updateRowData({'record':_formObj});
            this.switchEdit();
        }
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;

        let ButtonPower = {
            PowerButton : this.state.powerButton,
            ifPowerBtn : this.state.ifPowerBtn,
            isGrid : this.state.isGrid,
            isEdit : this.state.isEdit,
        }



        return (

            <div className='project-info'>
                <Loading showBackDrop={true} show={this.state.showLoading} fullScreen={true}/>
                <div>
                    <ButtonGroup
                        BtnPower= {ButtonPower}
                        Query= {this.onQuery}
                        Edit= {this.onEdit}
                        Add= {this.onAdd.bind(this)}
                        View={this.onView}
                        Return={this.onReturn}
                        Save={this.onSave}
                        {...this.props}
                    />
                </div>
                <div className={"project-name"}>
                    项目名称：{this.props.project.name}
                </div>
                <div style={{display:this.state.showListView}}>
                    <ListView {...this.props}/>
                </div>
                <div style={{display:this.state.showFormView}}>
                    <FormView {...this.props} onRef={this.onRef}/>
                </div>
                <div>
                    <AddFormView { ...this.props } />
                </div>
            </div>

        );
    }
}

export default Form.createForm()(IndexView);
