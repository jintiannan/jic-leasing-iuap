import React, {Component} from 'react'
import {actions} from 'mirrorx';
import {Tabs} from 'tinper-bee';
import Grid from 'components/Grid';
import Header from 'components/Header';
import {deepClone, Warning,getHeight} from "utils";
import {genGridColumn,checkListSelect} from "utils/service";
import './index.less'

const {TabPane} = Tabs;
const format = "YYYY-MM-DD";

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeight: 0,
            planIndex: 0,   //业务申请单索引
            accountIndex: 0,  //付款账户索引
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
        this.dealgridColumn = [...genGridColumn(this.dealgrid)];
        this.plangridColumn = [...genGridColumn(this.plangrid)];
        this.accountgridColumn = [...genGridColumn(this.accountgrid)];
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        this.resetTableHeight(false);
        actions.loandeal.loadList(this.props.queryParam);//table数据
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
        
    }

    resetTableHeight = (isopen) => {
        let tableHeight = 0;
        tableHeight = getHeight() - 405;
        this.setState({ tableHeight});
        console.log(tableHeight);
    }


     //列属性定义
     dealgrid = [
        {title:'单据状态',key:'billstatus',type:'6',enumType:'billstatus'},
        {title:'付款申请编号',key:'loan_code',type:'0'},
        {title:'付款类别',key:'pay_type',type:'0'},
        {title:'收款方名称',key:'gather_name',type:'0'},
        {title:'收款账号',key:'gather_account',type:'0'},
        {title:'收款账户',key:'gather_cust',type:'0'},
        {title:'客户名称',key:'customer_name',type:'0'},
        {title:'合同编号',key:'cont_code',type:'0'},
        {title:'部门',key:'gather_cust',type:'0'},
        {title:'实际支付金额',key:'fact_pay_amount',type:'0'},
        {title:'项目类型',key:'project_type',type:'0'},
        {title:'签约主体',key:'pk_mainorg',type:'0'},
        {title:'机构',key:'pk_org',type:'0'},
        {title:'租赁方式',key:'rent_type',type:'0'},
        {title:'合同管理人',key:'cont_manager',type:'0'},
        {title:'币种',key:'currency',type:'0'},
        {title:'客户规模',key:'customer_scale',type:'0'},
        {title:'租赁物门类',key:'renting_type',type:'0'},
        {title:'保证金金额',key:'deposit',type:'0'},
        {title:'手续费金额',key:'srvfee',type:'0'},
        {title:'付款申请人',key:'pk_operator',type:'0'}
    ]
    plangrid = [
        {title:'客户名称',key:'customer_name',type:'0'},
        {title:'合同编号',key:'contract_code',type:'0'},
        {title:'计划日期',key:'plan_date',type:'0'},
        {title:'收取期次',key:'time',type:'0'}
    ]
    accountgrid = [
        {title:'收款方户名',key:'gather_account',type:'0'},
        {title:'收款方账号',key:'gather_number',type:'0'},
        {title:'付款方户名',key:'payer_account',type:'0'},
        {title:'付款方账号',key:'payer_number',type:'0'}
    ]
    //列属性定义=>通过前端service工具类自动生成
    dealgridColumn = [];
    plangridColumn = [];
    accountgridColumn = [];

    /**
     *
     *tab 切换
     * @param {string}
     */
    onChangeTab = (tabKey) => {
        actions.loandeal.updateState({tabKey});
        actions.loandeal.loadSubList(this.props.queryParam);
    }

    onClickForm = ()=>{
        if(this.state.formView == ''){
            this.setState({formView:'none'})
        } else {
            this.setState({formView:''})
        }
        if(this.state.listView  == ''){
            this.setState({listView:'none'})
        } else {
            this.setState({listView:''})
        }
    }


    /**
     * 行单击事件,同步行首checkbox
     * 可能会有性能问题,暂时实现功能,待后期再取舍
     * #关闭功能,如果有页面特殊要求再打开#
     */
    onRowSelect = (record, index, event) => {
        console.log('行点击事件');
        actions.loandeal.updateState({loandealIndex: index});
        actions.loandeal.loadSubList(this.props.queryParam);
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
        // actions.loandeal.updateRowData(param,index);
        // actions.loandeal.updateState({ selectedList : _selectedList });  
    }

    /**
     *
     * @param {Number} pageIndex 当前分页值 第几页
     * @param {string} tableObj 分页 table 名称
     */
    freshData = (pageIndex, tableObj) => {
        this.onPageSelect(pageIndex, 0, tableObj);
    }


    /**
     *
     * @param {number} pageIndex 当前分页值 第几条
     * @param {number} value 分页条数
     * @param {string} tableObj 分页table名称
     */
    onDataNumSelect = (pageIndex, value, tableObj) => {
        this.onPageSelect(value, 1, tableObj);
    }

    /**
     *
     *
     * @param {number} value  pageIndex 或者 pageSize值
     * @param {string} type  type为0标识为 pageIndex,为1标识 pageSize,
     * @param {string} tableName 分页table名称
     */
    onPageSelect = (value, type, tableName) => {
        let queryParam = deepClone(this.props.queryParam); // 深拷贝查询条件从 action 里
        if (tableName === "loandealObj") { //主表分页
            if (type === 0) {
                queryParam.pageIndex = value;
            } else {
                queryParam.pageSize = value.toLowerCase() !== 'all' && value || 1;
                queryParam.pageIndex = 1;
            }
            actions.loandeal.loadList(queryParam);
        }else if(tableName ==="loanplanObj"){   //业务申请单分页
            if (type === 0) {
                queryParam.planIndex= value;
            } else {
                queryParam.planpageSize = value.toLowerCase() !== 'all' && value || 1;
                queryParam.planIndex = 1;
            }
            actions.loandeal.loadSubList(queryParam);
        }
        else if(tableName ==="payaccountObj") {   //付款账户分页
            if (type === 0) {
                queryParam.accountIndex= value;
            } else {
                queryParam.accountpageSize= value.toLowerCase() !== 'all' && value || 1;
                queryParam.accountIndex = 1;
            }
            actions.loandeal.loadSubList(queryParam);
        }
    }

    /**
     * 点击row选择框触发绑定数据对象
     * 绑定选中数据数组到数据模型中
     */
    getSelectedDataFunc = (selectedList,record,index) => {
        let { list } = this.props;
        let _list = deepClone(list);
        let _selectedList = deepClone(selectedList);
        let _selectedPlanList=[];
        let _selectedPayList = [];
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
            _selectedPlanList=deepClone(_selectedList[0].loanplan);
            _selectedPayList=deepClone(_selectedList[0].payaccount);
        }
        actions.loandeal.updateState({ list : _list,selectedList : _selectedList,formObject : _formObj,loanplanList:_selectedPlanList,payaccountList:_selectedPayList});
    }

    onRef = (ref) => {
        this.child = ref
    }


    render() {
        let {
            loandealObj, loanplanObj, payaccountObj, showLoading,
            showPlanLoading, showAccountLoading, tabKey, loandealIndex
        } = this.props;
        console.log(loandealObj);
        console.log(this.props);

        let { tableHeight} = this.state;
        return (
            <div className='loan_deal' style={{display:this.state.listView}}>
                <Grid
                  ref={(el) => this.dealgrid = el} //存模版
                  columns={this.dealgridColumn} //字段定义
                  data={this.props.list}
                  rowKey={(r, i) => {r._index = i; return i}} //生成行的key
                  multiSelect={true}  //false 单选，默认多选                        
                  scroll={{y: tableHeight}} //滚动轴高度
                  height={28} //行高度
                  bordered //表格有边界
                  headerDisplayInRow={true}//表头换行用...来表示
                  bodyDisplayInRow={true}//表体换行用...来表示
                  headerHeight={40} //表头高度
                  bodyStyle={{'height':tableHeight,'background-color':'rgb(241, 242, 245)'}} //表体样式
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
                    items: this.props.loandealObj.totalPages,//总页数
                    freshData: (pageSize) => {                     //活动页改变,跳转指定页数据
                        this.freshData(pageSize, "loandealObj");
                    },
                    dataNumSelect:['5','10','20','30'],
                    dataNum:0,
                    onDataNumSelect: (index, value) => {
                        this.onDataNumSelect(index, value, "loandealObj");//每页行数改变,跳转首页
                    },
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
                <div>
                    <Tabs
                        defaultActiveKey={tabKey}
                        onChange={this.onChangeTab}
                    >
                        <TabPane tab='业务资金付款申请单' key="loanplan">
                            <div>
                                <Grid
                                    ref={(el) => this.plangrid = el} //存模版
                                    data={this.props.loanplanList}
                                    rowKey={(r, i) => {r._index = i; return i}} //生成行的key
                                    columns={this.plangridColumn}
                                    showHeaderMenu={true}
                                    multiSelect={true}  //false 单选，默认多选                        
                                    scroll={{y: 100}} //滚动轴高度 //滚动轴高度
                                    height={28} //行高度
                                    bordered //表格有边界
                                    headerDisplayInRow={true}//表头换行用...来表示
                                    bodyDisplayInRow={true}//表体换行用...来表示
                                    headerHeight={40} //表头高度
                                    bodyStyle={{'background-color':'rgb(241, 242, 245)'}} //表体样式
                                    sheetHeader={{height: 30, ifshow: false}} //设置excel导出的表头的样式、支持height、ifshow
                                    hideHeaderScroll={false} //无数据时是否显示表头
                                    // 分页
                                    paginationObj={{
                                        activePage : this.props.queryParam.planIndex,//活动页
                                        total : this.props.loanplanList.length,//总条数
                                        items: this.props.loanplanObj.totalPages,//总页数
                                        freshData: (pageSize) => {
                                            this.freshData(pageSize, "loanplanObj");
                                        },
                                        onDataNumSelect: (index, value) => {
                                            this.onDataNumSelect(index, value, "loanplanObj");
                                        },
                                        dataNumSelect:['5','10','20','30'],
                                        dataNum:0

                                    }}
                                    onRowClick={(record, index) => {
                                        this.setState({planIndex: index});
                                    }}
                                    rowClassName={(record, index, indent) => {
                                        if (this.state.planIndex === index) {
                                            return 'selected';
                                        } else {
                                            return '';
                                        }
                                    }}
                                    loading={{
                                        show: (showPlanLoading && showLoading === false),
                                    }}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab='付款账户信息' key="payaccount">
                            <div style={{marginBottom: 24}}>
                                <Grid
                                    ref={(el) => this.accountgrid = el} //存模版
                                    data={this.props.payaccountList}
                                    rowKey={(r, i) => {r._index = i; return i}} //生成行的key
                                    columns={this.accountgridColumn}
                                    showHeaderMenu={true}
                                    multiSelect={true}  //false 单选，默认多选                        
                                    scroll={{y: 100}} //滚动轴高度
                                    height={28} //行高度
                                    bordered //表格有边界
                                    headerDisplayInRow={true}//表头换行用...来表示
                                    bodyDisplayInRow={true}//表体换行用...来表示
                                    headerHeight={40} //表头高度
                                    bodyStyle={{'background-color':'rgb(241, 242, 245)'}} //表体样式
                                    sheetHeader={{height: 30, ifshow: false}} //设置excel导出的表头的样式、支持height、ifshow
                                    hideHeaderScroll={false} //无数据时是否显示表头
                                    // 分页
                                    paginationObj={{
                                        activePage : this.props.queryParam.accountIndex,//活动页
                                        total : this.props.payaccountList.length,//总条数
                                        items: this.props.payaccountObj.totalPages,//总页数
                                        freshData: (pageSize) => {
                                            this.freshData(pageSize, "payaccountObj");
                                        },
                                        onDataNumSelect: (index, value) => {
                                            this.onDataNumSelect(index, value, "payaccountObj");
                                        },
                                        dataNumSelect:['5','10','20','30'],
                                    }}
                                    onRowClick={(record, index) => {
                                        this.setState({accountIndex: index});
                                    }}
                                    rowClassName={(record, index, indent) => {
                                        if (this.state.accountIndex === index) {
                                            return 'selected';
                                        } else {
                                            return '';
                                        }
                                    }}
                                    loading={{
                                        show: (showAccountLoading && showLoading === false),
                                    }}

                                />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>

        )

    }
}

export default ListView; 