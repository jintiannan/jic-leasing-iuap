import React, {Component} from 'react';
import {actions} from 'mirrorx';
import Grid from 'components/Grid';
import {deepClone, getHeight} from "utils";
import {genGridColumn,checkListSelect} from "utils/service";

import './index.less';

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeight: 0,
            filterable: false,
            record: {}, // 存储关联数据信息
            isGrid:true,//是否列表界面 true:列表界面 false:卡片界面
            formView:'none',
            listView:'',
            selectList:[],
        }
    }


    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        //计算表格滚动条高度
        this.resetTableHeight(false);
        this.gridColumn = [...genGridColumn(this.grid)];
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        actions.projectInfo.loadList(this.props.queryParam);
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {

    }

    /**
     * 跳转到指定页数据
     * @param {Number} pageIndex 跳转指定页数
     */
    freshData = (pageIndex) => {
        let queryParam = deepClone(this.props.queryParam); // 深拷贝查询条件从 action 里
        queryParam['pageIndex'] = pageIndex;
        actions.projectInfo.loadList(queryParam);
    };

    /**
     * 设置每页显示行数
     * @param {Number} index 跳转指定页数
     * @param {Number} value 设置一页数据条数
     */
    onDataNumSelect = (index, value) => {
        let queryParam = deepClone(this.props.queryParam); // 深拷贝查询条件从 action 里
        queryParam['pageSize'] = value;
        queryParam['pageIndex'] = 0;
        if (value && value.toString().toLowerCase() === "all") { // 对分页 pageSize 为 all 进行处理，前后端约定
            pageSize = 1;
        }
        actions.projectInfo.loadList(queryParam);
    };

    /**
     * 行单击事件,同步行首checkbox
     * 可能会有性能问题,暂时实现功能,待后期再取舍
     * #关闭功能,如果有页面特殊要求再打开#
     */
    onRowSelect = (record, index, event) => {
        // console.log('行点击事件');
        // let _record = deepClone(record);
        // _record._checked = _record._checked ? false : true;
        // let param = {
        //     record:_record,
        //     index:index,
        // }
        // let _selectedList = deepClone(this.props.selectedList);
        // if(_record._checked){
        //     _selectedList.push(_record);
        // } else {
        //     _selectedList.splice(_selectedList.findIndex(item => item.pk === record.pk), 1)
        // }
        // actions.projectInfo.updateRowData(param,index);
        // actions.projectInfo.updateState({ selectedList : _selectedList });



    };

    /**
     * 点击row选择框触发绑定数据对象
     * 绑定选中数据数组到数据模型中
     */
    getSelectedDataFunc = (selectedList,record,index) => {
        let { list } = this.props;
        let _list = deepClone(list);
        let _selectedList = deepClone(selectedList);
        let _formObj = {};
        if (index != undefined) {
            _list[index]['_checked'] = !_list[index]['_checked'];
        } else {
            if(_selectedList && _selectedList.length > 0){
                _list.map(item => {
                    if (!item['_disabled']) {
                        item['_checked'] = true;
                    }
                });
            } else {
                _list.map(item => {
                    if (!item['_disabled']) {
                        item['_checked'] = false;
                    }
                });
            }
        }
        if(_selectedList && _selectedList.length == 1){
            _formObj = deepClone(_selectedList[0]);
        }

        actions.projectInfo.updateState({ list : _list,selectedList : _selectedList,formObject : _formObj});
    };
    /**
     * 重置表格高度计算回调
     *
     * @param {Boolean} isopen 是否展开
     */
    resetTableHeight = (isopen) => {
        let tableHeight = 0;
        tableHeight = getHeight() - 155;
        this.setState({ tableHeight });
    };

    //列属性定义
    grid = [
        {title: '会议期数', key: 'meetingnper', type: '0'},
        {title: '会议总期数', key: 'allnper', type: '0'},
        {title: '单据状态', key: 'billstatus', type: '0'},
        {title: '审批变更类型', key: 'change_type', type: '0'},
        {title: '承租人名称', key: 'pk_consumer.code', type: '0'},
        {title: '承租人编码', key: 'pk_consumer.name', type: '0'},
        {title: '项目名称', key: 'project_name', type: '0'},
        {title: '项目编号', key: 'project_code', type: '0'},
        {title: '项目批次', key: 'project_batch', type: '0'},
        {title: '项目状态', key: 'project_status', type: '0'},
        {title: '预计投放日期', key: 'plan_release_date', type: '0'},
        {title: '项目金额', key: 'release_amount', type: '0'},
        {title: '租赁类别', key: 'lease_categry', type: '0'},
        {title: '项目类型', key: 'project_type', type: '0'},
        {title: '租赁方式', key: 'lease_type', type: '0'},
        {title: '项目税种', key: 'project_tax_type', type: '0'},
        {title: '是否有共同承租人', key: 'if_co_lessee', type: '0'},
        {title: '符合风险政策及准入标准', key: 'is_fit_admittance', type: '0'},
        {title: '项目审批审批结果', key: 'project_approve_result', type: '0'},
        {title: '项目审批日期', key: 'project_approve_date', type: '0'},
        {title: '项目经理', key: 'pk_prj_manager', type: '0'},
        {title: '项目分类', key: 'project_sort', type: '0'},
        {title: '确认业务领域', key: 'industry_type', type: '0'},
        {title: '是否项目合同一一对应', key: 'is_onetoone', type: '0'},
        {title: '项目主办人', key: 'pk_cust_main', type: '0'},
        {title: '项目协办人', key: 'pk_cust_help', type: '0'},
        {title: '出租方账户', key: 'pk_account', type: '0'},
        {title: '授信分类', key: 'limit_class', type: '0'},
        {title: '本次授信额度', key: 'limit_amt', type: '0'},
        {title: '是否调息', key: 'if_adjust', type: '0'},
        {title: '调息渠道', key: 'adjust_type', type: '0'},
        {title: '调息响应方式', key: 'adjust_time', type: '0'},
        {title: '操作人', key: 'pk_operator', type: '0'},
        {title: '操作日期', key: 'operate_date', type: '0'},
        {title: '操作时间', key: 'operate_time', type: '0'},
        {title: '审核人', key: 'pk_checker', type: '0'},
        {title: '审核日期', key: 'check_date', type: '0'},
        {title: '审核时间', key: 'check_time', type: '0'},
        {title: '机构', key: 'pk_org', type: '0'},
        {title: '立项名称', key: 'pk_project_approval', type: '0'},
        {title: '立项编码', key: 'pk_project_approval.code', type: '0'},
        {title: '项目来源', key: 'project_source', type: '0'},
        {title: '回租类别', key: 'leaseback_type', type: '0'},
        {title: '是否投保', key: 'is_insure', type: '0'},
        {title: '客户评级', key: 'client_rating', type: '0'},
        {title: '设备金额', key: 'purchase_total_amount', type: '0'},
        {title: '资金渠道', key: 'funding_sources', type: '0'},
        {title: '交易框架', key: 'trading_schemes', type: '0'},
        {title: '出租方账户', key: 'pk_account', type: '0'},
        {title: '出租方开户银行', key: 'pk_account.account_bank', type: '0'},
        {title: '出租方开户银行行号', key: 'pk_account.bank_no', type: '0'},
        {title: '是否允许提前还款', key: 'is_canrefund', type: '0'},
        {title: '提前还款期限(月) ', key: 'refund_times', type: '0'},
        {title: '提前还款手续费率(%)', key: 'refund_rate', type: '0'},
        {title: '地区审批总额', key: 'pk_project_approval.area_approve_total', type: '0'},
        {title: '地区实际投放总额', key: 'pk_project_approval.area_loan_total', type: '0'},
        {title: '地区剩余投放总额', key: 'pk_project_approval.area_surplus_total', type: '0'},
        {title: '地区可用授信额度', key: 'pk_project_approval.area_usable_total', type: '0'},
        {title: '行业审批总额', key: 'pk_project_approval.industry_approve_total', type: '0'},
        {title: '行业实际投放总额', key: 'pk_project_approval.industry_loan_total', type: '0'},
        {title: '行业剩余投放总额', key: 'pk_project_approval.industry_surplus_total', type: '0'},
        {title: '行业可用授信额度', key: 'pk_project_approval.industry_usable_total', type: '0'},
        {title: '让利方式', key: 'benefit_method', type: '0'},
        {title: '宽限天数', key: 'grace_days', type: '0'},
        {title: '建议日扣减金额', key: 'suggest_deduct_amt', type: '0'},
        {title: '约定日扣减金额', key: 'appoint_deduct_amt', type: '0'},
        {title: '所属公司', key: 'pk_pro_org', type: '0'},
        {title: '授信分类', key: 'limit_class', type: '0'},
        {title: '授信类型', key: 'granting_type', type: '0'},
        {title: '授信起始日期', key: 'granting_start_date', type: '0'},
        {title: '授信期限(月) ', key: 'granting_times', type: '0'},
        {title: '授信截止日期', key: 'granting_end_date', type: '0'},
        {title: '原授信额度(元)', key: 'granting_original_limit', type: '0'},
        {title: '已用额度(元)', key: 'granting_used_limit', type: '0'},
        {title: '调整额度(元)', key: 'granting_add_limit', type: '0'},
        {title: '可用额度(元)', key: 'granting_surplus_limit', type: '0'},
        {title: '授信币种', key: 'granting_currency', type: '0'},
        {title: '行业门类(大类)', key: 'pk_consumer.industry1', type: '0'},
        {title: '行业门类(中类) ', key: 'pk_consumer.industry2', type: '0'},
        {title: '企业规模（内部管理）', key: 'pk_consumer.enter_scale_inner', type: '0'},
        {title: '企业规模（四部委）', key: 'pk_consumer.enter_scale_6m', type: '0'},
        {title: '法定代表人', key: 'pk_consumer.legal_rep', type: '0'},
        {title: '法定代表人', key: 'pk_consumer.legal_representative', type: '0'},
        {title: '实际告知地址', key: 'pk_consumer.inform_address', type: '0'},
        {title: '经济性质', key: 'pk_consumer.economic_type', type: '0'},
        {title: '注册地址', key: 'pk_consumer.reg_address', type: '0'},
        {title: '实际控制人', key: 'pk_consumer.customer_person', type: '0'},
        {title: '注册币种', key: 'pk_consumer.capital_cur', type: '0'},
        {title: '报价名称', key: 'projectCalculatorRefVO', type: '0'},
        {title: '租赁方式', key: 'projectCalculatorRefVO.lease_method', type: '0'},
        {title: '税种', key: 'projectCalculatorRefVO.tax_mode', type: '0'},
        {title: '租赁期限（月）', key: 'projectCalculatorRefVO.lease_times', type: '0'},
        {title: '支付频率', key: 'projectCalculatorRefVO.lease_freq', type: '0'},
        {title: '计算方式', key: 'projectCalculatorRefVO.lease_cal_method', type: '0'},
        {title: '报价利率', key: 'projectCalculatorRefVO.final_rate', type: '0'},
        {title: '合同金额(元)', key: 'projectCalculatorRefVO.total_amount_equipment', type: '0'},
        {title: '净融资额(元) ', key: 'projectCalculatorRefVO.net_finance_cash', type: '0'},
        {title: '商业折扣(元)', key: 'projectCalculatorRefVO.trade_discount', type: '0'},
        {title: '实际投放金额(元)', key: 'projectCalculatorRefVO.fact_cash_loan', type: '0'},
        {title: '首付款金额(元)', key: 'projectCalculatorRefVO.down_payment', type: '0'},
        {title: '保证金金额(元)', key: 'projectCalculatorRefVO.deposit_cash', type: '0'},
        {title: '服务费收入总金额(元) ', key: 'projectCalculatorRefVO.srvfee_cash_in', type: '0'},
        {title: '服务费支出总金额(元)', key: 'projectCalculatorRefVO.srvfee_cash_out', type: '0'},
        {title: '总租金(元)', key: 'projectCalculatorRefVO.lease_cash', type: '0'},
        {title: '总利息(元)', key: 'projectCalculatorRefVO.lease_interest', type: '0'},
        {title: '总本金(元)', key: 'projectCalculatorRefVO.lease_corpus', type: '0'},
        {title: '市场IRR', key: 'projectCalculatorRefVO.project_irr', type: '0'},
        {title: '增值税下IRR', key: 'projectCalculatorRefVO.vat_irr', type: '0'},
        {title: '会计IRR', key: 'projectCalculatorRefVO.finance_irr', type: '0'},
        {title: '租金IRR', key: 'projectCalculatorRefVO.rent_irr', type: '0'},
        {title: '项目去税IRR', key: 'projectCalculatorRefVO.project_notax_irr', type: '0'},
        {title: '手续费分配IRR', key: 'projectCalculatorRefVO.fee_distr_irr', type: '0'},
        {title: '租赁合同IRR', key: 'projectCalculatorRefVO.contract_irr', type: '0'},
        {title: '审计IRR', key: 'projectCalculatorRefVO.audit_irr', type: '0'},
        {title: '承租人IRR', key: 'projectCalculatorRefVO.lessee_irr', type: '0'},
        {title: '会计去税IRR', key: 'projectCalculatorRefVO.finance_notax_irr', type: '0'},
        {title: '担保方式', key: 'projectCalculatorRefVO.guarantee_method', type: '0'},
        {title: '单位客户', key: 'projectPledgeRefVO.corp_cust', type: '0'},
        {title: '自然人客户', key: 'projectPledgeRefVO.pers_cust', type: '0'},
        {title: '担保总金额', key: 'projectPledgeRefVO.plan_cash', type: '0'},
        {title: '抵押金额', key: 'projectPledgeRefVO.pledge_amount', type: '0'},
        {title: '质押金额', key: 'projectPledgeRefVO.prenda_amount', type: '0'},
        {title: '供应商合作协议', key: 'pk_framework_agreem', type: '0'},
        {title: '供应商限额方案', key: 'pk_quota_scheme', type: '0'},
        {title: '供应商限额结果', key: 'quota_result', type: '0'},
        {title: '项目部门(大区) ', key: 'belongs_area', type: '0'},
        {title: '项目部门(片区)', key: 'project_dept', type: '0'},
        {title: '大区经理', key: 'region_manager', type: '0'},
        {title: '片区经理', key: 'area_manager', type: '0'},
        {title: '财务相关', key: 'pk_consumer.finance_related', type: '0'},
        {title: '设备相关', key: 'pk_consumer.equipment_related', type: '0'},
        {title: '其他部门', key: 'pk_consumer.other_dept', type: '0'},
        {title: '政府相关', key: 'pk_consumer.government_related', type: '0'},
        {title: '政府财政相关', key: 'pk_consumer.govern_finance_related', type: '0'},
        {title: '政府其他部门', key: 'pk_consumer.govern_other_sectors', type: '0'},
        {title: '保险费比例', key: 'premium', type: '0'},
        {title: '公证费比例', key: 'notarial_fees_rate', type: '0'},
        {title: '审批文档生成规则', key: 'pk_contract_rule', type: '0'},
        {title: '增信措施类别', key: 'increase_credit_type', type: '0'},
        {title: '租赁物类别', key: 'lease_classification', type: '0'},
        {title: '行业门类(集团口径)', key: 'pk_consumer.industry3', type: '0'},
        {title: '会计IRR按最新算法', key: 'projectCalculatorRefVO.finance_irr_method', type: '0'},
        {title: '会计IRR算法启用年份', key: 'projectCalculatorRefVO.finance_irr_year', type: '0'},
        {title: '会计IRR算法启用年份', key: 'projectCalculatorRefVO.finance_irr_year', type: '0'},



    ];
    //列属性定义=>通过前端service工具类自动生成
    gridColumn = [];

    render() {
        let { tableHeight} = this.state;
        return (
            <div className="grid-parent" style={{display:this.state.listView}}>
                <Grid
                    ref={(el) => this.grid = el} //存模版
                    columns={this.gridColumn} //字段定义
                    data={this.props.list} //数据数组
                    rowKey={(r, i) => {r._index = i; return i}} //生成行的key
                    multiSelect={true}  //false 单选，默认多选
                    scroll={{y: tableHeight}} //滚动轴高度
                    height={28} //行高度
                    bordered //表格有边界
                    headerDisplayInRow={true}//表头换行用...来表示
                    bodyDisplayInRow={true}//表体换行用...来表示
                    headerHeight={40} //表头高度
                    bodyStyle={{'height':tableHeight ,'background-color':'rgb(241, 242, 245)'}} //表体样式
                    sheetHeader={{height: 30, ifshow: false}} //设置excel导出的表头的样式、支持height、ifshow
                    hideHeaderScroll={false} //无数据时是否显示表头
                    //排序属性设置
                    sort={{
                        mode: 'multiple', //多列排序
                        backSource: false, //前端排序
                    }}
                    //分页对象
                    paginationObj = {{
                        activePage : this.props.queryParam.pageIndex,//活动页
                        total : this.props.list.length,//总条数
                        items: this.props.queryObj.totalPages,//总页数
                        freshData: this.freshData, //活动页改变,跳转指定页数据
                        dataNumSelect:['5','25','50','100'],
                        dataNum:2,
                        onDataNumSelect: this.onDataNumSelect, //每页行数改变,跳转首页
                        verticalPosition:'bottom'
                    }}
                    rowClassName={(record,index,indent)=>{
                        if (record._checked) {
                            return 'selected';
                        } else {
                            return '';
                        }
                    }}
                    onRowClick={this.onRowSelect}
                    getSelectedDataFunc={this.getSelectedDataFunc}

                />
            </div>
        );
    }
}

export default ListView;
