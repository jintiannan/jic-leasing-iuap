import React, {Component} from 'react';
import {actions} from 'mirrorx';
import Grid from 'components/Grid';
import { Tabs } from 'tinper-bee';
import {deepClone, getHeight} from "utils";
import {genGridColumn,checkListSelect} from "utils/service";

const { TabPane } = Tabs;
import './index.less';

class ListViewLead extends Component {
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

        this.gridColumn2 = [...genGridColumn(this.grid2)];
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        actions.vouchTemplate.loadList(this.props.queryParam);
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
        actions.vouchTemplate.loadList(queryParam);
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
            pageSize = 1;
        }
        actions.vouchTemplate.loadList(queryParam);
    }

    /**
     * 行单击事件,同步行首checkbox
     * 可能会有性能问题,暂时实现功能,待后期再取舍
     * #关闭功能,如果有页面特殊要求再打开#
     */
    onRowSelect = (record, index, event) => {
        console.log('行点击事件');
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
        // actions.vouchTemplate.updateRowData(param,index);
        // actions.vouchTemplate.updateState({ selectedList : _selectedList });
        
        
        
    }

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
            actions.vouchTemplate.updateState({ list2 : []});
        }
        console.log('let me list');
        console.log(_list);
        console.log(_formObj);
        console.log(list);
        console.log(_selectedList);
        
        actions.vouchTemplate.updateState({ list : _list,selectedList : _selectedList,formObject : _formObj});
        
    }

    childList = (obj) => {
        console.log("进入" + obj);
        //加载子组件列表
        actions.vouchTemplate.loadChildList(this.props.queryParam);
    }

    /**
     * 重置表格高度计算回调
     *
     * @param {Boolean} isopen 是否展开
     */
    resetTableHeight = (isopen) => {
        let tableHeight = 0;
        tableHeight = getHeight() - 155;
        this.setState({ tableHeight });
    }

    //列属性定义
    grid = [
        {title:'功能节点',key:'func_id',type:'1'},
        {title:'交易类别编码',key:'func_id.code',type:'0'},
        {title:'业务类别',key:'pk_tradetype',type:'0'},
        // {title:'单据状态',key:'billstatus',type:'6',enumType:'billstatus'},
        {title:'凭证类别',key:'subdeal_no',type:'0'},
        {title:'模板编号',key:'template_code',type:'0'},
        {title:'模板名称',key:'template_name',type:'0'},
        {title:'规则公式',key:'match_rule',type:'0'},
        {title:'数据指标',key:'pk_kpi_set',type:'0'},
        {title:'备注',key:'memo',type:'0'},
    ]
    //列属性定义=>通过前端service工具类自动生成
    gridColumn = [];

        //列属性定义
    grid2 = [
        {title:'分录编号',key:'detail_no',type:'0'},
        {title:'借贷方向',key:'direction',type:'0'},
        {title:'科目',key:'accsubj_rule',type:'0'},
        {title:'摘要',key:'memo_rule',type:'0'},
        {title:'发生金额',key:'fact_rule',type:'0'},
        {title:'汇率',key:'exchange_rule',type:'6',enumType:'billstatus'},
        {title:'币种',key:'currtype_rule',type:'0'},
        {title:'辅助核算',key:'free_value_rule_temp',type:'0'},
        {title:'结算日期',key:'account_date',type:'0'}

    ]
        //列属性定义=>通过前端service工具类自动生成
        gridColumn2 = [];

    onChange = (activeKey) => {
        console.log(`onChange ${activeKey} o-^-o`);
        this.setState({
            activeKey,
        });
    }
    
    render() {
        let { tableHeight} = this.state;
        return (            
            <div className="grid-parent" style={{display:this.state.listView}}>
                <div>
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
               
            </div>
                     
        );
    }
}

export default ListViewLead;