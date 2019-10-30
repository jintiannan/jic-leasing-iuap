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
        this.gridColumnOnTheLinkMan = [...genGridColumn(this.gridOnTheLinkMan)];
        this.gridColumnOnGuarantee = [...genGridColumn(this.gridGuarantee)];
        this.gridColumnOnMortgageEstate = [...genGridColumn(this.gridMortgageEstate)];
        this.gridColumnOnPledgeWarrant = [...genGridColumn(this.gridPledgeWarrant)];
        this.gridColumnOnMortgageProperty = [...genGridColumn(this.gridMortgageProperty)];
        this.gridColumnOnPledgeProperty = [...genGridColumn(this.gridPledgeProperty)];
        this.gridColumnOnBusinessBack = [...genGridColumn(this.gridBusinessBack)];

    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        actions.projectPledge.loadList(this.props.queryParam);
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
        actions.projectPledge.loadList(queryParam);
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
        actions.projectPledge.loadList(queryParam);
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
    //     actions.projectPledge.updateRowData(param,index);
    //     actions.projectPledge.updateState({ selectedList : _selectedList });



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
            actions.projectPledge.updateState({ list2 : []});
        }


        actions.projectPledge.updateState({ list : _list,selectedList : _selectedList,formObject : _formObj});

    }

    childList = (obj) => {
        console.log("进入" + obj);
        //加载子组件列表
        actions.projectPledge.loadChildList(this.props.queryParam);
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
        {title:'担保客户名称',key:'pkCustomer.name',type:'0'},
        {title:'担保客户编号',key:'pkCustomer.code',type:'0'},
        {title:'债权方',key:'bondBank',type:'0'},
        {title:'关系分类',key:'relationClass',type:'0'},
        {title:'担保方式',key:'guaranteeMethod',type:'0'},
        {title:'客户关系',key:'relationRole',type:'0'},
        {title:'担保金额',key:'planCash',type:'0'},
        {title:'提供担保原因',key:'reason',type:'0'},
        {title:'与承租人关系',key:'memo',type:'0'},
        {title:'查看本客户',key:'memo',type:'0'}

    ];
    //主表 列属性定义=>通过前端service工具类自动生成
    gridColumn = [];

    //担保信息
    gridGuarantee = [
        {title:'保证人名称',key:'owner',type:'0'},
        {title:'保证期限（月）',key:'pledgeDeadline',type:'0'},
        {title:'备注',key:'remark',type:'0'}
    ];

    gridColumnOnGuarantee = [];

    //抵押物（不动产）
    gridMortgageEstate = [

        {title:'抵押物名称',key:'guaranteeName',type:'0'},
        {title:'不动产分类',key:'realEstateClass',type:'0'},
        {title:'其他物件',key:'otherObjects',type:'0'},
        {title:'抵押人',key:'owner',type:'0'},
        {title:'抵押权人',key:'mortgagor',type:'0'},
        {title:'抵押期限（月）',key:'pledgeDeadline',type:'0'},
        {title:'面积',key:'assetsCount',type:'0'},
        {title:'权证号',key:'assetsNo',type:'0'},
        {title:'原值（元）',key:'netValue',type:'0'},
        {title:'净值（元）',key:'owner',type:'0'},
        {title:'地址',key:'assetsName',type:'0'},
        {title:'建造日期',key:'buildDate',type:'0'},
        {title:'评估日期',key:'assessDate',type:'0'},
        {title:'评估机构',key:'assessOrg',type:'0'},
        {title:'评估价值（元）',key:'estimateValue',type:'0'},
        {title:'登记机关',key:'regAuthority',type:'0'},
        {title:'已为其他债权设定抵押金额（元）',key:'mortgageCash',type:'0'},
        {title:'备注',key:'remark',type:'0'}

    ];
    gridColumnOnMortgageEstate = [];


    //抵押物 动产
    gridMortgageProperty = [
        {title:'设备类型',key:'equipmentType',type:'0'},
        {title:'设备名称',key:'guaranteeName',type:'0'},
        {title:'数量',key:'assetsCount',type:'0'},
        {title:'型号',key:'assetsNo',type:'0'},
        {title:'抵押人',key:'owner',type:'0'},
        {title:'抵押权人',key:'mortgagor',type:'0'},
        {title:'原值（元）',key:'netValue',type:'0'},
        {title:'净值（元）',key:'owner',type:'0'},
        {title:'设备采购日期',key:'purchaseDate',type:'0'},
        {title:'设备生产厂商',key:'equipmentManufacturer',type:'0'},
        {title:'设备单价（元）',key:'equipmentUnitPrice',type:'0'},
        {title:'设备总价（元）',key:'equipmentSumPrice',type:'0'},
        {title:'使用寿命（年）',key:'useLife',type:'0'},
        {title:'已使用年限（年）',key:'usedTerm',type:'0'},
        {title:'评估机构',key:'assessOrg',type:'0'},
        {title:'评估价值（元）',key:'estimateValue',type:'0'},
        {title:'登记机关',key:'regAuthority',type:'0'},
        {title:'已为其他债权设定抵押金额（元）',key:'mortgageCash',type:'0'},
        {title:'备注',key:'remark',type:'0'}




    ];
    gridColumnOnMortgageProperty = [];

    //质押物 权利
    gridPledgeWarrant = [
        {title:'权利种类',key:'warrantType',type:'0'},
        {title:'其他物件',key:'otherObjects',type:'0'},
        {title:'质押物名称',key:'guaranteeName',type:'0'},
        {title:'质押人',key:'owner',type:'0'},
        {title:'质押权人',key:'mortgagor',type:'0'},
        {title:'数量',key:'assetsCount',type:'0'},
        {title:'权证号',key:'assetsNo',type:'0'},
        {title:'原值（元）',key:'netValue',type:'0'},
        {title:'净值（元）',key:'owner',type:'0'},
        {title:'市值（元）',key:'netValue',type:'0'},
        {title:'登记机关',key:'regAuthority',type:'0'},
        {title:'评估机构',key:'assessOrg',type:'0'},
        {title:'估值',key:'estimateValue',type:'0'},
        {title:'备注',key:'remark',type:'0'}



    ];

    gridColumnOnPledgeWarrant = [];

    //质押物 动产

    gridPledgeProperty = [
        {title:'设备类型',key:'equipmentType',type:'0'},
        {title:'设备名称',key:'guaranteeName',type:'0'},
        {title:'数量',key:'assetsCount',type:'0'},
        {title:'型号',key:'assetsNo',type:'0'},
        {title:'质押人',key:'owner',type:'0'},
        {title:'质押权人',key:'mortgagor',type:'0'},
        {title:'原值（元）',key:'netValue',type:'0'},
        {title:'净值（元）',key:'owner',type:'0'},
        {title:'设备采购日期',key:'purchaseDate',type:'0'},
        {title:'设备生产厂商',key:'equipmentManufacturer',type:'0'},
        {title:'设备单价（元）',key:'equipmentUnitPrice',type:'0'},
        {title:'设备总价（元）',key:'equipmentSumPrice',type:'0'},
        {title:'使用寿命（年）',key:'useLife',type:'0'},
        {title:'已使用年限（年）',key:'usedTerm',type:'0'},
        {title:'评估机构',key:'assessOrg',type:'0'},
        {title:'评估价值（元）',key:'estimateValue',type:'0'},
        {title:'登记机关',key:'regAuthority',type:'0'},
        {title:'已为其他债权设定抵押金额（元）',key:'mortgageCash',type:'0'},
        {title:'备注',key:'remark',type:'0'}

    ];

    gridColumnOnPledgeProperty  = [];

    //厂商回购

    gridBusinessBack = [
        {title:'设备类型',key:'equipmentType',type:'0'},
        {title:'设备名称',key:'guaranteeName',type:'0'},
        {title:'回购方名称',key:'owner',type:'0'},
        {title:'回购权人',key:'mortgagor',type:'0'},
        {title:'数量',key:'assetsCount',type:'0'},
        {title:'回购期限（月）',key:'pledgeDeadline',type:'0'},
        {title:'型号',key:'assetsNo',type:'0'},
        {title:'原值（元）',key:'netValue',type:'0'},
        {title:'净值（元）',key:'owner',type:'0'},
        {title:'设备单价（元）',key:'equipmentUnitPrice',type:'0'},
        {title:'设备总价（元）',key:'equipmentSumPrice',type:'0'},
        {title:'设备采购日期',key:'purchaseDate',type:'0'},
        {title:'设备生产厂商',key:'equipmentManufacturer',type:'0'},
        {title:'评估机构',key:'assessOrg',type:'0'},
        {title:'评估机构',key:'assessOrg',type:'0'},
        {title:'评估价值（元）',key:'estimateValue',type:'0'},
        {title:'备注',key:'remark',type:'0'},


    ];

    gridColumnOnBusinessBack = [];


    // 联系人信息 列属性定义
    gridOnTheLinkMan = [
        {title:'联络人',key:'pkLinkman.name',type:'0'},
        {title:'部门',key:'pkLinkman.department',type:'0'},
        {title:'职务',key:'pkLinkman.duty',type:'0'},
        {title:'手机',key:'pkLinkman.mobile',type:'0'},
        {title:'邮箱',key:'pkLinkman.email',type:'0'},
        {title:'办公电话',key:'pkLinkman.officePhone',type:'0'},
        {title:'传真',key:'pkLinkman.fax',type:'0'},
        {title:'是否合同授权人',key:'isContGrantor',type:'0'},
        {title:'是否合同联系人',key:'isContLink',type:'0'},
        {title:'是否短信催收',key:'isCollection',type:'0'}
    ];
    // 联系人信息 列属性定义=>通过前端service工具类自动生成
    gridColumnOnTheLinkMan = [];



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
            this.props.subForm === 'projectPledge'?
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

                        <TabPane tab='保证信息' key="1">
                            <div>
                                <GridMain
                                    ref={(el) => this.gridGuarantee = el} //存模版
                                    columns={this.gridColumnOnGuarantee} //字段定义
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

                        <TabPane tab='抵押物件(不动产)' key="2">
                            <div>
                                <GridMain
                                    ref={(el) => this.gridMortgageEstate = el} //存模版
                                    columns={this.gridColumnOnMortgageEstate} //字段定义
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

                        <TabPane tab='抵押物件(动产)' key="3">
                            <div>
                                <GridMain
                                    ref={(el) => this.gridMortgageProperty = el} //存模版
                                    columns={this.gridColumnOnMortgageProperty} //字段定义
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

                        <TabPane tab='质押物件(权利)' key="4">
                            <div>
                                <GridMain
                                    ref={(el) => this.gridPledgeWarrant = el} //存模版
                                    columns={this.gridColumnOnPledgeWarrant} //字段定义
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

                        <TabPane tab='质押物件(动产)' key="5">
                            <div>
                                <GridMain
                                    ref={(el) => this.gridPledgeProperty = el} //存模版
                                    columns={this.gridColumnOnPledgeProperty} //字段定义
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

                        <TabPane tab='厂商回购' key="6">
                            <div>
                                <GridMain
                                    ref={(el) => this.gridBusinessBack = el} //存模版
                                    columns={this.gridColumnOnBusinessBack} //字段定义
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

                        <TabPane tab='联系人信息' key="7">
                            <div>
                                <GridMain
                                    ref={(el) => this.gridOnTheLinkMan = el} //存模版
                                    columns={this.gridColumnOnTheLinkMan} //字段定义
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
