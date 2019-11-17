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
        {title: '审批变更类型', key: 'changeType', type: '0'},
        {title: '承租人名称', key: 'pkConsumer.code', type: '0'},
        {title: '承租人编码', key: 'pkConsumer.name', type: '0'},
        {title: '项目名称', key: 'projectName', type: '0'},
        {title: '项目编号', key: 'projectCode', type: '0'},
        {title: '项目批次', key: 'projectBatch', type: '0'},
        {title: '项目状态', key: 'projectStatus', type: '0'},
        {title: '预计投放日期', key: 'planReleaseDate', type: '0'},
        {title: '项目金额', key: 'releaseAmount', type: '0'},
        {title: '租赁类别', key: 'leaseCategry', type: '0'},
        {title: '项目类型', key: 'projectType', type: '0'},
        {title: '租赁方式', key: 'leaseType', type: '0'},
        {title: '项目税种', key: 'projectTaxType', type: '0'},
        {title: '是否有共同承租人', key: 'ifCoLessee', type: '0'},
        {title: '符合风险政策及准入标准', key: 'isFitAdmittance', type: '0'},
        {title: '项目审批审批结果', key: 'projectApproveResult', type: '0'},
        {title: '项目审批日期', key: 'projectApproveDate', type: '0'},
        {title: '项目经理', key: 'pkPrjManager.userName', type: '0'},
        {title: '项目分类', key: 'projectSort', type: '0'},
        {title: '确认业务领域', key: 'industryType.name', type: '0'},
        {title: '是否项目合同一一对应', key: 'isOnetoone', type: '0'},
        {title: '项目主办人', key: 'pkCustMain.name', type: '0'},
        {title: '项目协办人', key: 'pkCustHelp.name', type: '0'},
        {title: '出租方账户', key: 'pkAccount.code', type: '0'},
        {title: '授信分类', key: 'limitClass', type: '0'},
        {title: '本次授信额度', key: 'limitAmt', type: '0'},
        {title: '是否调息', key: 'ifAdjust', type: '0'},
        {title: '调息渠道', key: 'adjustType', type: '0'},
        {title: '调息响应方式', key: 'adjustTime', type: '0'},
        {title: '操作人', key: 'pkOperator.name', type: '0'},
        {title: '操作日期', key: 'operateDate', type: '0'},
        {title: '操作时间', key: 'operateTime', type: '0'},
        {title: '审核人', key: 'pkChecker.name', type: '0'},
        {title: '审核日期', key: 'checkDate', type: '0'},
        {title: '审核时间', key: 'checkTime', type: '0'},
        {title: '机构', key: 'pkOrg.name', type: '0'},
        {title: '立项名称', key: 'pkProjectApproval.name', type: '0'},
        {title: '立项编码', key: 'pkProjectApproval.code', type: '0'},
        {title: '项目来源', key: 'projectSource', type: '0'},
        {title: '回租类别', key: 'leasebackType', type: '0'},
        {title: '是否投保', key: 'isInsure', type: '0'},
        {title: '客户评级', key: 'clientRating.serialNumber', type: '0'},
        {title: '设备金额', key: 'purchaseTotalAmount', type: '0'},
        {title: '资金渠道', key: 'fundingSources', type: '0'},
        {title: '交易框架', key: 'tradingSchemes', type: '0'},
        {title: '出租方账户', key: 'pkAccount.code', type: '0'},
        {title: '出租方开户银行', key: 'pkAccount.accountBank', type: '0'},
        {title: '出租方开户银行行号', key: 'pkAccount.bankNo', type: '0'},
        {title: '是否允许提前还款', key: 'isCanrefund', type: '0'},
        {title: '提前还款期限(月) ', key: 'refundTimes', type: '0'},
        {title: '提前还款手续费率(%)', key: 'refundRate', type: '0'},
        {title: '地区审批总额', key: 'pkProjectApproval.areaApproveTotal', type: '0'},
        {title: '地区实际投放总额', key: 'pkProjectApproval.areaLoanTotal', type: '0'},
        {title: '地区剩余投放总额', key: 'pkProjectApproval.areaSurplusTotal', type: '0'},
        {title: '地区可用授信额度', key: 'pkProjectApproval.areaUsableTotal', type: '0'},
        {title: '行业审批总额', key: 'pkProjectApproval.industryApproveTotal', type: '0'},
        {title: '行业实际投放总额', key: 'pkProjectApproval.industryLoanTotal', type: '0'},
        {title: '行业剩余投放总额', key: 'pkProjectApproval.industrySurplusTotal', type: '0'},
        {title: '行业可用授信额度', key: 'pkProjectApproval.industryUsableTotal', type: '0'},
        {title: '让利方式', key: 'benefitMethod', type: '0'},
        {title: '宽限天数', key: 'graceDays', type: '0'},
        {title: '建议日扣减金额', key: 'suggestDeductAmt', type: '0'},
        {title: '约定日扣减金额', key: 'appointDeductAmt', type: '0'},
        {title: '所属公司', key: 'pkProOrg.name', type: '0'},
        {title: '授信分类', key: 'limitClass', type: '0'},
        {title: '授信类型', key: 'grantingType', type: '0'},
        {title: '授信起始日期', key: 'grantingStartDate', type: '0'},
        {title: '授信期限(月) ', key: 'grantingTimes', type: '0'},
        {title: '授信截止日期', key: 'grantingEndDate', type: '0'},
        {title: '原授信额度(元)', key: 'grantingOriginalLimit', type: '0'},
        {title: '已用额度(元)', key: 'grantingUsedLimit', type: '0'},
        {title: '调整额度(元)', key: 'grantingAddLimit', type: '0'},
        {title: '可用额度(元)', key: 'grantingSurplusLimit', type: '0'},
        {title: '授信币种', key: 'grantingCurrency.name', type: '0'},
        {title: '行业门类(大类)', key: 'pkConsumer.industry1', type: '0'},
        {title: '行业门类(中类) ', key: 'pkConsumer.industry2', type: '0'},
        {title: '企业规模（内部管理）', key: 'pkConsumer.enterScaleInner', type: '0'},
        {title: '企业规模（四部委）', key: 'pkConsumer.enterScale6m', type: '0'},
        {title: '法定代表人', key: 'pkConsumer.legalRep', type: '0'},
        {title: '法定代表人', key: 'pkConsumer.legalRepresentative', type: '0'},
        {title: '实际告知地址', key: 'pkConsumer.informAddress', type: '0'},
        {title: '经济性质', key: 'pkConsumer.economicType', type: '0'},
        {title: '注册地址', key: 'pkConsumer.regAddress', type: '0'},
        {title: '实际控制人', key: 'pkConsumer.customerPerson', type: '0'},
        {title: '注册币种', key: 'pkConsumer.capitalCur.name', type: '0'},
        {title: '报价名称', key: 'projectcalculatorrefvo.name', type: '0'},
        {title: '租赁方式', key: 'projectcalculatorrefvo.leaseMethod', type: '0'},
        {title: '税种', key: 'projectcalculatorrefvo.taxMode', type: '0'},
        {title: '租赁期限（月）', key: 'projectcalculatorrefvo.leaseTimes', type: '0'},
        {title: '支付频率', key: 'projectcalculatorrefvo.leaseFreq', type: '0'},
        {title: '计算方式', key: 'projectcalculatorrefvo.leaseCalMethod', type: '0'},
        {title: '报价利率', key: 'projectcalculatorrefvo.finalRate', type: '0'},
        {title: '合同金额(元)', key: 'projectcalculatorrefvo.totalAmountEquipment', type: '0'},
        {title: '净融资额(元) ', key: 'projectcalculatorrefvo.netFinanceCash', type: '0'},
        {title: '商业折扣(元)', key: 'projectcalculatorrefvo.tradeDiscount', type: '0'},
        {title: '实际投放金额(元)', key: 'projectcalculatorrefvo.factCashLoan', type: '0'},
        {title: '首付款金额(元)', key: 'projectcalculatorrefvo.downPayment', type: '0'},
        {title: '保证金金额(元)', key: 'projectcalculatorrefvo.depositCash', type: '0'},
        {title: '服务费收入总金额(元) ', key: 'projectcalculatorrefvo.srvfeeCashIn', type: '0'},
        {title: '服务费支出总金额(元)', key: 'projectcalculatorrefvo.srvfeeCashOut', type: '0'},
        {title: '总租金(元)', key: 'projectcalculatorrefvo.leaseCash', type: '0'},
        {title: '总利息(元)', key: 'projectcalculatorrefvo.leaseInterest', type: '0'},
        {title: '总本金(元)', key: 'projectcalculatorrefvo.leaseCorpus', type: '0'},
        {title: '市场irr', key: 'projectcalculatorrefvo.projectIrr', type: '0'},
        {title: '增值税下irr', key: 'projectcalculatorrefvo.vatIrr', type: '0'},
        {title: '会计irr', key: 'projectcalculatorrefvo.financeIrr', type: '0'},
        {title: '租金irr', key: 'projectcalculatorrefvo.rentIrr', type: '0'},
        {title: '项目去税irr', key: 'projectcalculatorrefvo.projectNotaxIrr', type: '0'},
        {title: '手续费分配irr', key: 'projectcalculatorrefvo.feeDistrIrr', type: '0'},
        {title: '租赁合同irr', key: 'projectcalculatorrefvo.contractIrr', type: '0'},
        {title: '审计irr', key: 'projectcalculatorrefvo.auditIrr', type: '0'},
        {title: '承租人irr', key: 'projectcalculatorrefvo.lesseeIrr', type: '0'},
        {title: '会计去税irr', key: 'projectcalculatorrefvo.financeNotaxIrr', type: '0'},
        {title: '担保方式', key: 'projectcalculatorrefvo.guaranteeMethod', type: '0'},
        {title: '单位客户', key: 'projectpledgerefvo.corpCust', type: '0'},
        {title: '自然人客户', key: 'projectpledgerefvo.persCust', type: '0'},
        {title: '担保总金额', key: 'projectpledgerefvo.planCash', type: '0'},
        {title: '抵押金额', key: 'projectpledgerefvo.pledgeAmount', type: '0'},
        {title: '质押金额', key: 'projectpledgerefvo.prendaAmount', type: '0'},
        {title: '供应商合作协议', key: 'pkFrameworkAgreem.name', type: '0'},
        {title: '供应商限额方案', key: 'pkQuotaScheme.name', type: '0'},
        {title: '供应商限额结果', key: 'quotaResult', type: '0'},
        {title: '项目部门(大区) ', key: 'belongsArea.deptname', type: '0'},
        {title: '项目部门(片区)', key: 'projectDept.deptname', type: '0'},
        {title: '大区经理', key: 'regionManager.userName', type: '0'},
        {title: '片区经理', key: 'areaManager.userName', type: '0'},
        {title: '财务相关', key: 'pkConsumer.financeRelated', type: '0'},
        {title: '设备相关', key: 'pkConsumer.equipmentRelated', type: '0'},
        {title: '其他部门', key: 'pkConsumer.otherDept', type: '0'},
        {title: '政府相关', key: 'pkConsumer.governmentRelated', type: '0'},
        {title: '政府财政相关', key: 'pkConsumer.governFinanceRelated', type: '0'},
        {title: '政府其他部门', key: 'pkConsumer.governOtherSectors', type: '0'},
        {title: '保险费比例', key: 'premium', type: '0'},
        {title: '公证费比例', key: 'notarialFeesRate', type: '0'},
        {title: '审批文档生成规则', key: 'pkContractRule.name', type: '0'},
        {title: '增信措施类别', key: 'increaseCreditType', type: '0'},
        {title: '租赁物类别', key: 'leaseClassification', type: '0'},
        {title: '行业门类(集团口径)', key: 'pkConsumer.industry3', type: '0'},
        {title: '会计irr按最新算法', key: 'projectcalculatorrefvo.financeIrrMethod', type: '0'},
        {title: '会计irr算法启用年份', key: 'projectcalculatorrefvo.financeIrrYear', type: '0'},
        {title: '会计irr算法启用年份', key: 'projectcalculatorrefvo.financeIrrYear', type: '0'},



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
