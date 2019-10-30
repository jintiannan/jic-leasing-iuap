import React, {Component} from 'react';
import {actions} from 'mirrorx';
import Grid from 'components/Grid';
import { Tabs } from 'tinper-bee';
import {deepClone, getHeight} from "utils";
import {genGridColumn,checkListSelect} from "utils/service";
import GridMain from 'components/GridMain';
import {enumConstant} from "../../../../../../ucf-common/src/utils/enums";
const { TabPane } = Tabs;
import './index.less';

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeight: 0,
            tableHeight2: 0, //字表高度
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
        //主表过滤显示字段
        //const gridMain = this.getShowColumn(this.props.gridColumn,this.grid,true);
        //计算表格滚动条高度
        this.resetTableHeight(true);
        this.gridColumn = [...genGridColumn(this.grid)];
        this.gridColumnOnTheItem = [...genGridColumn(this.gridOnTheItem)];
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        actions.receivePaymentOption.loadList(this.props.queryParam);
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
        console.log("11");
    }

    /**
     * 跳转到指定页数据
     * @param {Number} pageIndex 跳转指定页数
     */
    freshData = (pageIndex) => {
        let queryParam = deepClone(this.props.queryParam); // 深拷贝查询条件从 action 里
        queryParam['pageIndex'] = pageIndex;
        actions.receivePaymentOption.loadList(queryParam);
    }

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
            // pageSize = 1;
        }
        actions.receivePaymentOption.loadList(queryParam);
    }

    /**
     * 行单击事件,同步行首checkbox
     * 可能会有性能问题,暂时实现功能,待后期再取舍
     * #关闭功能,如果有页面特殊要求再打开#
     */
    // onRowSelect = (record, index, event) => {
    //     console.log('行点击事件');
    //     let _record = deepClone(record);
    //     _record._checked = _record._checked ? false : true;
    //     let param = {
    //         record:_record,
    //         index:index,
    //     }
    //     let _selectedList = deepClone(this.props.selectedList);
    //     if(_record._checked){
    //         _selectedList.push(_record);
    //     } else {
    //         _selectedList.splice(_selectedList.findIndex(item => item.pk === record.pk), 1)
    //     }
    //     actions.receivePaymentOption.updateRowData(param,index);
    //     actions.receivePaymentOption.updateState({ selectedList : _selectedList });



    // }

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
            this.childList(_formObj);
        }else{
            actions.receivePaymentOption.updateState({ list2 : []});
        }


        actions.receivePaymentOption.updateState({ list : _list,selectedList : _selectedList,formObject : _formObj});

    }

    childList = (obj) => {
        console.log("进入" + obj);
        //加载子组件列表
        actions.receivePaymentOption.loadChildList(this.props.queryParam);
    }

    /**
     * 重置表格高度计算回调
     *
     * @param {Boolean} isopen 是否展开
     */
    resetTableHeight = (isopen) => {
        let tableHeight = 0;
        tableHeight = getHeight() - 430;
        this.setState({ tableHeight });

        let tableHeight2 = 0;
        tableHeight2 = getHeight() - 480;
        this.setState({ tableHeight2 });

    }

    /**
     * 过滤需要处理的字段
     * @param gridColumn 需要处理的字段
     * @param grid 全部的字段
     * @param show show==true gridColumn为需要显示的字段  show==false  gridColumn为隐藏的字段
     */
    getShowColumn = (gridColumn,grid,show) =>{
        // if(show){
        //     grid.map((item,index)=>{
        //         grid[index] = Object.assign(item, {ifshow:true});
        //     })
        // }
        // gridColumn.map((item,index)=>{
        //     grid.map((itemGrid,indexGrid)=>{
        //         if(item == itemGrid.key){
        //             const obj = Object.assign(itemGrid, {ifshow:show?true:false})
        //             grid[indexGrid] = obj;
        //         }
        //     })
        // });
        return grid;
    }

    //gridColumn 需要显示的字段  grid全部的字段
    getColumnByShow = (gridColumn,grid) =>{

    }

    //主表  列属性定义 ifshow:false 不显示该列  默认全显示 true
    grid = [
        {title:'测算方案名称',key:'quotName',type:'0'},
        {title:'投放日期',key:'planDateLoan',type:'0'},
        {title:'汇率',key:'pkExchgRate',type:'0'},
        {title:'起租日',key:'leaseCommencementDate',type:'0'},
        {title:'租赁方式',key:'leaseMethod',type:'0'},
        {title:'税种',key:'taxMode',type:'0'},
        {title:'设备总金额(元)',key:'totalAmountEquipment',type:'0'},
        {title:'首付款比例',key:'downPaymentRatio',type:'0'},
        {title:'首付款金额(元)',key:'downPayment',type:'0'},
        {title:'留购价(元) ',key:'nominalPrice',type:'0'},
        {title:'资产余值(元)',key:'assetsMargin',type:'0'},
        {title:'保证金比例',key:'depositRatio',type:'0'},
        {title:'保证金金额(元)',key:'depositCash',type:'0'},
        {title:'保证金收取方式',key:'depositMethod',type:'0'},
        {title:'手续费收入方式',key:'srvfeeMethodIn',type:'0'},
        {title:'手续费收入基数',key:'srvfeeBase',type:'0'},
        {title:'手续费收入比例',key:'srvfeeRatioIn',type:'0'},
        {title:'首期手续费收入金额(元)',key:'srvfeeCashInFt',type:'0'},
        {title:'中间费支出方式',key:'srvfeeMethodOut',type:'0'},
        {title:'首期中间费支出时间',key:'srvfeeDateOutFt',type:'0'},
        {title:'中间费支出比例',key:'srvfeeTaxrateOut',type:'0'},
        {title:'中间费支出税率',key:'srvfeeRatioIn',type:'0'},
        {title:'净融资额(元)',key:'netFinanceCash',type:'0'},
        {title:'净融资比例',key:'netFinanceRatio',type:'0'},
        {title:'是否作为标准模板',key:'if4basic',type:'0'},
        {title:'备注',key:'memo',type:'0'},
        {title:'计划收租日',key:'planLeaseDate',type:'0'},
        {title:'租赁期限（月）',key:'leaseTimes',type:'0'},
        {title:'计划收租日',key:'planLeaseDate',type:'0'},
        {title:'收租规则周期',key:'leasePeriodRule',type:'0'},
        {title:'特殊算法设置',key:'calMethodSpec',type:'0'},
        {title:'先付后付标志',key:'prepayOrNot',type:'0'},
        {title:'是否指定首期收租日',key:'hasFirstLeaseDate',type:'0'},
        {title:'首期收租日期',key:'firstLeaseDate',type:'0'},
        {title:'项目预计到期日',key:'finalDate',type:'0'},
        {title:'提前间隔（月）',key:'intervalInAdvance',type:'0'},
        {title:'年化天数',key:'yearDays',type:'0'},
        {title:'计算精度',key:'calDigit',type:'0'},
        {title:'利率类型',key:'interrateType',type:'0'},
        {title:'利率浮动方式',key:'floatMethod',type:'0'},
        {title:'利率生效日期',key:'pkInterrate',type:'0'},
        {title:'利率档次',key:'interrateLevel',type:'0'},
        {title:'基准利率',key:'interrate',type:'0'},
        {title:'利率浮动值',key:'floatValue',type:'0'},
        {title:'报价利率',key:'finalRate',type:'0'},
        {title:'保证金退回方式',key:'returnMethodDepos',type:'0'},
        {title:'保证金是否计息',key:'ifInterestDepos',type:'0'},
        {title:'保证金年利率类型',key:'interrateTypeDepos',type:'0'},
        {title:'保证金年利率档次',key:'interrateLevelDepos',type:'0'},
        {title:'保证金浮动方式',key:'floatMethodDepos',type:'0'},
        {title:'利率生效日期',key:'pkInterrateDepos',type:'0'},
        {title:'保证金基准年利率',key:'floatValueDepos',type:'0'},
        {title:'保证金浮动比例',key:'floatValueDepos',type:'0'},
        {title:'保证金利率',key:'finalRateDepos',type:'0'},
        {title:'保证金收取说明',key:'memoDepos',type:'0'},
        {title:'市场irr',key:'commercialIrr',type:'0'},
        {title:'会计irr',key:'financeIrr',type:'0'},
        {title:'单据状态',key:'billstatus',type:'0'},
        {title:'操作员',key:'pkOperator.name',type:'0'},
        {title:'操作日期',key:'operateDate',type:'0'},
        {title:'操作时间',key:'operateTime',type:'0'},
        {title:'机构',key:'pkOrg.name',type:'0'}

    ];
    //主表 列属性定义=>通过前端service工具类自动生成
    gridColumn = [];

    // 投放计划 列属性定义
    gridOnTheItem = [
        {title:'对方客户名称',key:'pkConsumerOpp.name',type:'0'},
        {title:'交易类别',key:'eventType',type:'0'},
        {title:'收支期次',key:'inOutBatch',type:'0'},
        {title:'计划收取日期',key:'planDate',type:'0'},
        {title:'不含税（元）',key:'leaseCashCorpus',type:'0'},
        {title:'税额(元)',key:'leaseCashTax',type:'0'},
        {title:'发生金额（元）',key:'leaseCash',type:'0'},
        {title:'本方账户名称',key:'pkCustBankAccount.name',type:'0'},
        {title:'本方开户银行',key:'pkCustBankAccount.code',type:'0'},
        {title:'本方银行账号',key:'pkCustBankAccount.accountBank',type:'0'},
        {title:'本方银行行号',key:'pkCustBankAccount.bankNo',type:'0'},
        {title:'对方账户名称',key:'pkCustBankAccountOpp.name',type:'0'},
        {title:'对方开户银行',key:'pkCustBankAccountOpp.code',type:'0'},
        {title:'对方账户名称',key:'pkCustBankAccountOpp.name',type:'0'},
        {title:'对方银行账号',key:'pkCustBankAccountOpp.accountBank',type:'0'},
        {title:'对方银行行号',key:'pkCustBankAccountOpp.bankNo',type:'0'},
        {title:'备注',key:'memo',type:'0'}

    ];
    // 投放计划 列属性定义=>通过前端service工具类自动生成
    gridColumnOnTheItem = [];

    onChange = (activeKey) => {
        console.log(`onChange ${activeKey} o-^-o`);
        this.setState({
            activeKey,
        });
    };

    // afterFilter = (optData,columns)=>{
    //     columns.map((item,index)=>{
    //         item.ifshow=false;
    //     });
    //     this.gridColumn = columns;
    // }

    render() {
        let { tableHeight,  tableHeight2} = this.state;
        return (
            this.props.subForm === 'receivePaymentOption'?
            <div className="grid-parent" style={{display:this.state.listView}}>
                <div>
                    <GridMain
                        ref={(el) => this.grid = el} //存模版
                        columns={this.gridColumn} //字段定义
                        data={this.props.list} //数据数组                     
                        tableHeight={1} //表格高度 1主表 2字表

                        //分页对象
                        paginationObj = {{
                            activePage : this.props.queryParam.pageIndex,//活动页
                            total : this.props.list.length,//总条数
                            items: this.props.queryObj.totalPages,//总页数
                            freshData: this.freshData, //活动页改变,跳转指定页数据
                            onDataNumSelect: this.onDataNumSelect, //每页行数改变,跳转首页
                        }}
                        //onRowClick={this.onRowSelect}
                        getSelectedDataFunc={this.getSelectedDataFunc}
                        //afterFilter={this.afterFilter}

                    />
                </div>
                <div>
                    <Tabs
                        defaultActiveKey="1"
                        onChange={this.onChange}
                        className="list-tabs"
                    >

                        <TabPane tab='子表信息' key="1">
                            <div>
                                <GridMain
                                    ref={(el) => this.gridOnTheItem = el} //存模版
                                    columns={this.gridColumnOnTheItem} //字段定义
                                    data={this.props.list2} //数据数组
                                    //分页对象
                                    paginationObj = {{
                                        verticalPosition:'none'
                                    }}
                                    onRowClick={this.onRowSelect}
                                    // getSelectedDataFunc={this.getSelectedDataFunc}

                                />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>:<div></div>

        );
    }
}

export default ListView;
