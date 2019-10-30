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
        this.gridColumnOnTheLoan = [...genGridColumn(this.gridOnTheLoan)];
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        actions.contProvider.loadList(this.props.queryParam);
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
        actions.contProvider.loadList(queryParam);
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
        actions.contProvider.loadList(queryParam);
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
    //     actions.contProvider.updateRowData(param,index);
    //     actions.contProvider.updateState({ selectedList : _selectedList });



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
            actions.contProvider.updateState({ list2 : []});
        }


        actions.contProvider.updateState({ list : _list,selectedList : _selectedList,formObject : _formObj});

    }

    childList = (obj) => {
        console.log("进入" + obj);
        //加载子组件列表
        actions.contProvider.loadChildList(this.props.queryParam);
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
        {title:'项目名称',key:'pkProject.name',type:'0'},
        {title:'合同名称',key:'contractName',type:'0'},
        {title:'合同编号',key:'contractCode',type:'0'},
        {title:'合同金额',key:'contractAmount',type:'0'},
        {title:'租赁物折让价',key:'lesseeAssignment',type:'0'},
        {title:'设备金额',key:'facilityAmount',type:'0'},
        {title:'承租人',key:'pkLinkman.name',type:'0'},
        {title:'卖方名称',key:'pkCustomerSales.name',type:'0'},
        {title:'供应商开票方式',key:'invoiceWay',type:'0'},
        {title:'供应商纳税主体',key:'taxesMain',type:'0'},
        {title:'发票性质',key:'invoiceNature',type:'0'},
        {title:'税率',key:'taxRate',type:'0'},
        {title:'合同类型',key:'contType',type:'0'},
        {title:'合同状态',key:'contStatus',type:'0'},
        {title:'备注',key:'memo',type:'0'}

    ]
    //主表 列属性定义=>通过前端service工具类自动生成
    gridColumn = [];

    // 投放计划 列属性定义
    gridOnTheLoan = [
        {title:'联络人',key:'pkLinkman.name',type:'0'},
        {title:'部门',key:'pkLinkman.department',type:'0'},
        {title:'职务',key:'pkLinkman.duty',type:'0'},
        {title:'手机',key:'pkLinkman.mobile',type:'0'},
        {title:'邮箱',key:'pkLinkman.email',type:'0'},
        {title:'办公电话',key:'pkLinkman.officePhone',type:'0'},
        {title:'传真',key:'pkLinkman.fax',type:'0'},
        {title:'是否合同授权人',key:'isContGrantor',type:'0'},
        {title:'是否合同联系人',key:'isContLink',type:'0'}
    ]
    // 投放计划 列属性定义=>通过前端service工具类自动生成
    gridColumnOnTheLoan = [];

    onChange = (activeKey) => {
        console.log(`onChange ${activeKey} o-^-o`);
        this.setState({
            activeKey,
        });
    }

    // afterFilter = (optData,columns)=>{
    //     columns.map((item,index)=>{
    //         item.ifshow=false;
    //     });
    //     this.gridColumn = columns;
    // }

    render() {
        let { tableHeight,  tableHeight2} = this.state;
        return (
            this.props.subForm === 'contInfo'?
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

                        <TabPane tab='投放计划' key="1">
                            <div>
                                <GridMain
                                    ref={(el) => this.gridOnTheLoan = el} //存模版
                                    columns={this.gridColumnOnTheLoan} //字段定义
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
