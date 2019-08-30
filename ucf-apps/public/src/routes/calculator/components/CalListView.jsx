import React, {Component} from 'react';
import {actions} from 'mirrorx';
import Grid from 'components/Grid';
import {deepClone, getHeight} from "utils";
import {genGridColumn,checkListSelect} from "utils/service";

import './index.less';

class CalListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeight: 0,
            listView:'',
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
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
        
    }

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
        // actions.contract.updateRowData(param,index);
        // actions.contract.updateState({ selectedList : _selectedList });  
    }

    /**
     * 点击row选择框触发绑定数据对象
     * 绑定选中数据数组到数据模型中
     */
    getSelectedDataFunc = (selectedList,record,index) => {
        debugger
        let {callist} = this.props;
        let _list = deepClone(callist);
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
        actions.contract.updateState({ callist : _list,selectedCalList : _selectedList,CalformObject : _formObj});
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
        {title:'报价名称',key:'quote_name',type:'0'},
        {title:'报价编号',key:'quote_code',type:'0'},
        {title:'限额方案',key:'pk_limit_plan',type:'0'},
        {title:'税种',key:'tax_mode',type:'0'},
        {title:'租赁方式',key:'lease_method',type:'0'},
        {title:'租金税率',key:'rent_tax_rate',type:'0'},
        {title:'投放日期',key:'plan_date_loan',type:'0'},
        {title:'投放金额',key:'plan_loan_cash',type:'0'},
        {title:'首付款金额',key:'down_payment',type:'0'},
        {title:'首付款比例',key:'down_payment_ratio',type:'0'},
        {title:'保证金收取方式',key:'deposit_method',type:'0'},
        {title:'保证金比例',key:'deposit_ratio',type:'0'},
        {title:'保证金金额(元)',key:'deposit_cash',type:'0'},
        {title:'保证金退回方式',key:'return_method_depos',type:'0'},
        {title:'手续费收取方式',key:'srvfee_method',type:'0'},
        {title:'手续费计算基数',key:'srvfee_base',type:'0'},
        {title:'手续费比例',key:'srvfee_ratio_in',type:'0'},
        {title:'租赁期限',key:'lease_times',type:'0'},
        {title:'计划收租日',key:'plan_date_loan',type:'0'},
        {title:'先付后付标志',key:'prepare_or_not',type:'0'},
        {title:'计息金额计算方式',key:'cal_method_spec',type:'0'},
    ]
    //列属性定义=>通过前端service工具类自动生成
    gridColumn = [];
    
    render() {
        let { tableHeight} = this.state;
        return (            
            <div className="grid-parent" style={{display:this.state.listView}}>
                    <Grid
                        ref="calgrid" //存模版
                        columns={this.gridColumn} //字段定义
                        data={this.props.callist} //数据数组
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
                            verticalPosition:'none'
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

export default CalListView;