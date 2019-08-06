import React, {Component} from 'react';
import {actions} from 'mirrorx';
import {Tooltip, Menu, Icon, Loading} from 'tinper-bee';
import queryString from "query-string";
import moment from 'moment'
import Grid from 'components/Grid';
import Header from 'components/Header';
import Button from 'components/Button';
import {testColumn,enumConstant,deepClone, getHeight, getSortMap} from "utils";
import EnumModel from 'components/EnumModel';

import './index.less';

const {Item} = Menu;
const format = "YYYY-MM-DD HH:mm:ss";
const beginFormat = "YYYY-MM-DD 00:00:00";
const endFormat = "YYYY-MM-DD 23:59:59";
class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeight: 0,
            filterable: false,
            record: {}, // 存储关联数据信息
            isGrid:true,//是否列表界面 true:列表界面 false:卡片界面
            formView:'none',
            listView:''
        }
    }
    

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        //计算表格滚动条高度
        this.resetTableHeight(false);
        testColumn(this.gridColumn);

    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        actions.projectInfo.loadList(this.props.queryParam);
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
        
    }

    /**
     *
     * 关联数据钻取
     * @param {object} record 关联数据行数据
     * @param {string} key menu菜单key值
     */
    onRelevance = (record, key) => {
        
    }

    /**
     *
     *排序属性设置
     * @param {Array} sortParam 排序参数对象数组
     */
    sortFun = (sortParam) => {
        let {queryParam} = this.props;
        queryParam.sortMap = getSortMap(sortParam);
        actions.query.loadList(queryParam);
    }

    /**
     *
     * @param {Number} pageIndex 跳转指定页数
     */
    freshData = (pageIndex) => {
        this.onPageSelect(pageIndex, 0);
    }

    /**
     *
     * @param {Number} index 跳转指定页数
     * @param {Number} value 设置一页数据条数
     */
    onDataNumSelect = (index, value) => {
        this.onPageSelect(value, 1);
    }

    /**
     *
     * @param {Number} value  pageIndex 或者 pageIndex
     * @param {Number} type 为0标识为 pageIndex,为1标识 pageSize
     */
    onPageSelect = (value, type) => {
        let queryParam = deepClone(this.props.queryParam); // 深拷贝查询条件从 action 里
        let {pageIndex, pageSize} = queryParam.pageParams;
        if (type === 0) {
            pageIndex = value - 1;
        } else {
            pageSize = value;
            pageIndex = 0;
        }
        if (value && value.toString().toLowerCase() === "all") { // 对分页 pageSize 为 all 进行处理，前后端约定
            pageSize = 1;
        }
        queryParam['pageParams'] = {pageIndex, pageSize};
        actions.query.loadList(queryParam);
    }


    clearRowFilter = () => {
        this.setState({filterable: false});
    }

    /**
     * 关闭模态框
     */
    close = () => {
        this.setState({showModal: false});
    }

    /**
     * 导出excel
     */
    export = () => {
        this.grid.exportExcel();
    }
    /**
     * 重置表格高度计算回调
     *
     * @param {Boolean} isopen 是否展开
     */
    resetTableHeight = (isopen) => {
        let tableHeight = 0;
        tableHeight = getHeight() - 155;
        console.log('tableheight');
        console.log(tableHeight);
        this.setState({ tableHeight });
    }

    gridColumn = [
          
        {
            title: "会议期数",
            dataIndex: "meetingnper",
            key: "meetingnper",
            width: 120,
            className: 'column-number-right', // 靠右对齐
            render: (text, record, index) => {
                return (<span>{(typeof text)==='number'? text.toFixed(0):""}</span>)
            }

        },
        //枚举
        {
            title: "单据状态",
            dataIndex: "billstatus",
            key: "billstatus",
            width: 120,
            render: (text, record, index) => {
                return (
                <EnumModel type='billstatus'/>)
            }
        },        
        // {
        //     title: "变更类型",
        //     dataIndex: "change_type",
        //     key: "change_type",
        //     width: 120,
        // },
        {
            title: "承租人名称",
            dataIndex: "pk_consumer.name",
            key: "pk_consumer.name",
            width: 120,
        },
        //字符串
        {
            title: "承租人编码",
            dataIndex: "pk_consumer.code",
            key: "pk_consumer.code",
            width: 120,
        },
        {
            title: "项目名称",
            dataIndex: "project_name",
            key: "project_name",
            width: 120,
        },
        {
            title: "项目编号",
            dataIndex: "project_code",
            key: "project_code",
            width: 120,
        },
        {
            title: "项目批次",
            dataIndex: "project_batch",
            key: "project_batch",
            width: 120,
        },
        {
            title: "项目状态",
            dataIndex: "project_filing_batch",
            key: "project_filing_batch",
            width: 120,
        },
        {
            title: "预计投放日期",
            dataIndex: "plan_loan_date",
            key: "plan_loan_date",
            width: 100,
            render: (text, record, index) => {
                return <div>{text ? moment(text).format("YYYY-MM-DD") : ""}</div>
            }
        },
        {
            title: "项目金额",
            dataIndex: "release_amount",
            key: "release_amount",
            width: 120,
            className: 'column-number-right ', // 靠右对齐
            render: (text, record, index) => {
                return (<span>{(typeof text)==='number'? text.toFixed(2):""}</span>)
            }

        },
        {
            title: "租赁类别",
            dataIndex: "lease_categry",
            key: "lease_categry",
            width: 120,
        },
        {
            title: "项目类型",
            dataIndex: "project_type",
            key: "project_type",
            width: 120,
        },
        {
            title: "租赁方式",
            dataIndex: "lease_type",
            key: "lease_type",
            width: 120,
        },
        {
            title: "项目税种",
            dataIndex: "project_tax_type",
            key: "project_tax_type",
            width: 120,
        },
        {
            title: "是否有共同承租人",
            dataIndex: "if_co_lessee",
            key: "if_co_lessee",
            width: 120,
        },
        {
            title: "符合风险政策及准入标准",
            dataIndex: "project_filing_batch",
            key: "project_filing_batch",
            width: 120,
        },
        {
            title: "项目审批审批结果",
            dataIndex: "project_filing_batch",
            key: "project_filing_batch",
            width: 120,
        },
        {
            title: "项目审批日期",
            dataIndex: "operate_date",
            key: "operate_date",
            width: 100,
            render: (text, record, index) => {
                return <div>{text ? moment(text).format("YYYY-MM-DD") : ""}</div>
            }
        },
        {
            title: "项目经理",
            dataIndex: "project_filing_batch",
            key: "project_filing_batch",
            width: 120,
        },
        {
            title: "项目风险",
            dataIndex: "project_sort",
            key: "project_sort",
            width: 120,
        },
        {
            title: "确认业务领域",
            dataIndex: "industry_type",
            key: "industry_type",
            width: 120,
        },
        {
            title: "是否项目合同一一对应",
            dataIndex: "is_onetoone",
            key: "is_onetoone",
            width: 120,
        },
        {
            title: "项目主办人",
            dataIndex: "pk_cust_main",
            key: "pk_cust_main",
            width: 120,
        },
        {
            title: "项目协办人",
            dataIndex: "pk_cust_help",
            key: "pk_cust_help",
            width: 120,
        },
        {
            title: "出租方账户",
            dataIndex: "pk_account.name",
            key: "pk_account.name",
            width: 120,
        },
        {
            title: "授信分类",
            dataIndex: "limit_class",
            key: "limit_class",
            width: 120,
        },
        {
            title: "本次授信额度",
            dataIndex: "limit_amt",
            key: "limit_amt",
            width: 120,
        },
        {
            title: "是否调息",
            dataIndex: "if_adjust",
            key: "if_adjust",
            width: 120,
        },
        {
            title: "调息渠道",
            dataIndex: "adjust_type",
            key: "adjust_type",
            width: 120,
        },
        {
            title: "调息响应方式",
            dataIndex: "adjust_time",
            key: "adjust_time",
            width: 120,
        },
        {
            title: "操作人",
            dataIndex: "pk_operator",
            key: "pk_operator",
            width: 120,
        },
        {
            title: "操作日期",
            dataIndex: "operate_date",
            key: "operate_date",
            width: 100,
            render: (text, record, index) => {
                return <div>{text ? moment(text).format("YYYY-MM-DD") : ""}</div>
            }
        },
        {
            title: "操作时间",
            dataIndex: "operate_time",
            key: "operate_time",
            width: 100,
            render: (text, record, index) => {
                return <div>{text ? moment(text).format("YYYY-MM-DD") : ""}</div>
            }
        },
        {
            title: "审核人",
            dataIndex: "pk_checker",
            key: "pk_checker",
            width: 120,
        },
        {
            title: "审核日期",
            dataIndex: "check_date",
            key: "check_date",
            width: 100,
            render: (text, record, index) => {
                return <div>{text ? moment(text).format("YYYY-MM-DD") : ""}</div>
            }
        },
        {
            title: "审核时间",
            dataIndex: "check_time",
            key: "check_time",
            width: 100,
            render: (text, record, index) => {
                return <div>{text ? moment(text).format("YYYY-MM-DD") : ""}</div>
            }
        },
        {
            title: "机构",
            dataIndex: "pk_org",
            key: "pk_org",
            width: 120,
        },
        {
            title: "立项名称",
            dataIndex: "pk_project_approval.name",
            key: "pk_project_approval.name",
            width: 120,
        },
        {
            title: "立项编码",
            dataIndex: "pk_project_approval.code",
            key: "pk_project_approval.code",
            width: 120,
        },
        {
            title: "项目来源",
            dataIndex: "project_source",
            key: "project_source",
            width: 120,
        },
        {
            title: "回租类别",
            dataIndex: "leaseback_type",
            key: "leaseback_type",
            width: 120,
        },
        {
            title: "是否投保",
            dataIndex: "is_insure",
            key: "is_insure",
            width: 120,
        },
        {
            title: "客户评级",
            dataIndex: "client_rating",
            key: "client_rating",
            width: 120,
        },
        {
            title: "设备金额",
            dataIndex: "purchase_total_amount",
            key: "purchase_total_amount",
            width: 120,
        },
        {
            title: "资金渠道",
            dataIndex: "funding_sources",
            key: "funding_sources",
            width: 120,
        },
        {
            title: "交易框架",
            dataIndex: "trading_schemes",
            key: "trading_schemes",
            width: 120,
        },
        {
            title: "出租方账号",
            dataIndex: "pk_account.code",
            key: "pk_account.code",
            width: 120,
        },
        {
            title: "出租方开户银行",
            dataIndex: "pk_account.name",
            key: "pk_account.name0",
            width: 120,
        },
        {
            title: "出租方开户银行行号",
            dataIndex: "pk_account.bank_no",
            key: "pk_account.bank_no",
            width: 120,
        },
        {
            title: "是否允许提前还款",
            dataIndex: "is_canrefund",
            key: "is_canrefund",
            width: 120,
        },
        {
            title: "提前还款期限(月)",
            dataIndex: "refund_times",
            key: "refund_times",
            width: 120,
        },
        {
            title: "提前还款手续费率(%)",
            dataIndex: "refund_rate",
            key: "refund_rate",
            width: 120,
        },
        {
            title: "地区审批总额",
            dataIndex: "pk_project_approval.area_approve_total",
            key: "pk_project_approval.area_approve_total",
            width: 120,
        },
        {
            title: "地区实际投放总额",
            dataIndex: "pk_project_approval.area_loan_total",
            key: "pk_project_approval.area_loan_total",
            width: 120,
        },
        {
            title: "行业审批总额",
            dataIndex: "pk_project_approval.industry_approve_total",
            key: "pk_project_approval.industry_approve_total",
            width: 120,
        },
        {
            title: "行业实际投放总额",
            dataIndex: "pk_project_approval.industry_loan_total",
            key: "pk_project_approval.industry_loan_total",
            width: 120,
        },
        {
            title: "行业剩余投放总额",
            dataIndex: "pk_project_approval.area_surplus_total",
            key: "pk_project_approval.area_surplus_total",
            width: 120,
        },
        {
            title: "行业可用授信额度",
            dataIndex: "pk_project_approval.industry_usable_total",
            key: "pk_project_approval.industry_usable_total",
            width: 120,
        },
        {
            title: "让利方式",
            dataIndex: "benefit_method",
            key: "benefit_method",
            width: 120,
        },
        {
            title: "宽限天数",
            dataIndex: "grace_days",
            key: "grace_days",
            width: 120,
        },
        {
            title: "建议日扣减金额",
            dataIndex: "suggest_deduct_amt",
            key: "suggest_deduct_amt",
            width: 120,
        },
        {
            title: "约定日扣减金额",
            dataIndex: "appoint_deduct_amt",
            key: "appoint_deduct_amt",
            width: 120,
        },
        {
            title: "所属公司",
            dataIndex: "pk_pro_org",
            key: "pk_pro_org",
            width: 120,
        },
        {
            title: "授信类型",
            dataIndex: "limit_class",
            key: "limit_class",
            width: 120,
        },
        {
            title: "授信起始日期",
            dataIndex: "granting_start_date",
            key: "granting_start_date",
            width: 120,
        },
        {
            title: "授信有效期",
            dataIndex: "granting_times",
            key: "granting_times",
            width: 120,
        },
        {
            title: "授信截至日期",
            dataIndex: "granting_end_date",
            key: "granting_end_date",
            width: 120,
        },
        {
            title: "原授信额度(元)",
            dataIndex: "granting_original_limit",
            key: "granting_original_limit",
            width: 120,
        },
        {
            title: "已用额度(元)",
            dataIndex: "granting_used_limit",
            key: "granting_used_limit",
            width: 120,
        },
        {
            title: "调整额度(元)",
            dataIndex: "granting_add_limit",
            key: "granting_add_limit",
            width: 120,
        },
        {
            title: "可用额度(元)",
            dataIndex: "granting_surplus_limit",
            key: "granting_surplus_limit",
            width: 120,
        },
        {
            title: "授信币种",
            dataIndex: "granting_currency",
            key: "granting_currency",
            width: 120,
        },
        {
            title: "行业门类(大类)",
            dataIndex: "pk_consumer.industry1",
            key: "pk_consumer.industry1",
            width: 120,
        },
        {
            title: "行业门类(中类)",
            dataIndex: "pk_consumer.industry2",
            key: "pk_consumer.industry2",
            width: 120,
        },
        {
            title: "企业规模(内部管理)",
            dataIndex: "pk_consumer.enter_scale_inner",
            key: "pk_consumer.enter_scale_inner",
            width: 120,
        },
        {
            title: "企业规模(四部委)",
            dataIndex: "pk_consumer.enter_scale_6m",
            key: "pk_consumer.enter_scale_6m",
            width: 120,
        },
        {
            title: "法定代表人",
            dataIndex: "pk_consumer.legal_rep",
            key: "pk_consumer.legal_rep",
            width: 120,
        },
        {
            title: "告知地址",
            dataIndex: "pk_consumer.inform_address",
            key: "pk_consumer.inform_address",
            width: 120,
        },
        {
            title: "经济性质",
            dataIndex: "pk_consumer.economic_type",
            key: "pk_consumer.economic_type",
            width: 120,
        },
        {
            title: "注册地址",
            dataIndex: "pk_consumer.reg_address",
            key: "pk_consumer.reg_address",
            width: 120,
        },
        {
            title: "实际控制人",
            dataIndex: "pk_consumer.customer_person",
            key: "pk_consumer.customer_person",
            width: 120,
        },
        {
            title: "注册币种",
            dataIndex: "pk_consumer.capital_cur",
            key: "pk_consumer.capital_cur",
            width: 120,
        },
    ]
    

    
    render() {
        let {queryObj, showLoading, queryParam} = this.props;
        let {pageIndex, total, totalPages} = queryObj;
        let {filterable, record, tableHeight} = this.state;
        let data = this.props.listData;
        let paginationObj = {   // 分页
            activePage: pageIndex,//当前页
            total : 18,//总条数
            items: 15,
            freshData: this.freshData,
            onDataNumSelect: this.onDataNumSelect,
            verticalPosition:'bottom'
        }

        // const
        let sortObj = {  //排序属性设置
            mode: 'multiple',
            backSource: true,
            sortFun: this.sortFun
        }

        return (
            
            
            <div className="grid-parent" style={{display:this.state.listView}}>
                    <Grid
                        ref={(el) => this.grid = el} //存模版
                        columns={this.gridColumn}
                        data={queryObj.list}
                        rowKey={(r, i) => i} //生成行的key
                        paginationObj={paginationObj} //分页
                        multiSelect={true}  //false 单选，默认多选
                        sort={sortObj} //排序属性设置
                        scroll={{y: tableHeight}}
                        height={28}
                        bordered
                        headerDisplayInRow={true}//表头换行用...来表示
                        bodyDisplayInRow={true}//表体换行用...来表示
                        headerHeight={40}
                        bodyStyle={{'height':tableHeight,'background-color':'rgb(241, 242, 245)'}}
                        sheetHeader={{height: 30, ifshow: false}} //设置excel导出的表头的样式、支持height、ifshow
                    />
            </div>            
        );
    }
}

export default ListView;