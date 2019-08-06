import React, {Component} from 'react';
import {actions} from 'mirrorx';
import {Tooltip, Menu, Icon, Loading} from 'tinper-bee';
import queryString from "query-string";
import moment from 'moment'
import Grid from 'components/Grid';
import Header from 'components/Header';
import Button from 'components/Button';
import {deepClone, getHeight, getSortMap} from "utils";
import FormView from '../FormView/index'

import './index.less';

const {Item} = Menu;
const format = "YYYY-MM-DD HH:mm:ss";
const beginFormat = "YYYY-MM-DD 00:00:00";
const endFormat = "YYYY-MM-DD 23:59:59";


class IndexView extends Component {
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

    componentWillMount() {
        //计算表格滚动条高度
        this.resetTableHeight(false);
    }
    componentDidMount() {
        // 查询默认条件
        actions.query.loadList(this.props.queryParam); 
    }

    componentWillReceiveProps(nextProps) {
        //后台获取部门行过滤下拉列表 动态更新 colFilterSelectdept 部门行过滤下拉列表
        if (!this.props.colFilterSelectdept && nextProps.colFilterSelectdept) {
            for (let i = 0, len = this.gridColumn.length; i<len; i++) {
                let item = this.gridColumn[i];
                if (item.key === 'dept') {
                    item.filterDropdownData = nextProps.colFilterSelectdept;
                    break;
                }
            }
        }
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
     *触发过滤输入操作以及下拉条件的回调
     * @param {string} key 过滤字段名称
     * @param {*} value 过滤字段值
     * @param {string} condition 过滤字段条件
     */
    onFilterChange = (key, value, condition) => {
        let isAdd = true; //是否添加标识
        let queryParam = deepClone(this.props.queryParam);
        let {whereParams, pageParams} = queryParam;
        pageParams.pageIndex = 0; // 默认跳转第一页
        for (let [index, element] of whereParams.entries()) {
            if (element.key === key) { // 判断action 中是否有 过滤对象
                whereParams[index] = this.handleFilterData(key, value, condition);
                isAdd = false;
            }
        }
        if (isAdd) {
            let filterData = this.handleFilterData(key, value, condition);
            whereParams.push(filterData);
        }
        actions.query.loadList(queryParam);
    }


    /**
     *
     * 拼接过滤条件对象
     * @param {string} key 过滤字段名称
     * @param {*} value 过滤字段值
     * @param {string} condition 过滤字段条件
     */

    handleFilterData = (key, value, condition) => {
        let filterObj = {key, value, condition};
        if (Array.isArray(value)) { // 判断是否日期
            filterObj.value = this.handleDateFormat(value); // moment 格式转换
            filterObj.condition="RANGE";
        }
        return filterObj;
    }


    /**
     * 清除过滤条件的回调函数，回调参数为清空的字段
     * @param {string} key 清除过滤字段
     */
    onFilterClear = (key) => {
        let queryParam = deepClone(this.props.queryParam);
        let {whereParams, pageParams} = queryParam;
        for (let [index, element] of whereParams.entries()) {
            if (element.key === key) {
                whereParams.splice(index, 1);
                pageParams.pageIndex = 0; // 默认跳转第一页
                break;
            }
        }
        actions.query.loadList(queryParam);
    }


    /**
     *
     *行过滤，日期数组拼接
     * @param {Array} value 日期数组
     * @returns
     */
    handleDateFormat = (value) => {
        let dateArray = value.map((item, index) => {
            let str = '';
            if (index === 0) {
                str = item.format(beginFormat);
            } else {
                str = item.format(endFormat);
            }
            return str;
        });
        return dateArray;
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

    /**
     *
     * @param {Boolean} status 控制栏位的显示/隐藏
     */
    afterRowFilter = (status) => {
        if (!status) { // 清空行过滤数据
            let {queryParam, cacheFilter} = deepClone(this.props);
            queryParam.whereParams = cacheFilter;
            actions.query.updateState({queryParam}); //缓存查询条件
        }
        this.setState({filterable: status});
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
        tableHeight = getHeight() - 200;
        console.log("表格宽度");
        console.log(tableHeight);
        this.setState({ tableHeight });
    }

    onAdd = () =>{
        console.log('onADD');
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

    gridColumn = [
        //枚举
        {
            title: "单据状态",
            dataIndex: "billstatus",
            key: "billstatus",
            width: 120,
            filterType: "dropdown",
            filterDropdown: "hide", //条件的下拉是否显示（string，number）
            filterDropdownAuto: "manual", //是否自动和手动设置 filterDropdownData 属性
            filterDropdownData: [{key: "9", value: "审核通过"}, {key: "20", value: "暂存"}],
            render: (text, record, index) => {
                return (<span>{record.value}</span>)
            }
        },
        {
            title: "客户名称",
            dataIndex: "pk_consumer",
            key: "pk_consumer",
            exportKey: "name",
            width: 150,
            filterType: "dropdown",
            filterDropdown: "hide",
            filterDropdownAuto: "manual",
            filterDropdownData: this.props.colFilterSelectdept,
            filterDropdownFocus: () => { //组件焦点的回调函数
                if (!this.props.colFilterSelectdept) {
                    let param = {
                        distinctParams: ['pk_consumer']
                    }
                    actions.query.getListByCol(param); //获取所有部门
                }

            },
            render: (text, record, index) => {
                return (<span>{record.name}</span>)
            }
        },
        //字符串
        {
            title: "客户编码",
            dataIndex: "pk_consumer.code",
            key: "pk_consumer.code",
            width: 120,
        },
        {
            title: "项目名称",
            dataIndex: "project_filing_name",
            key: "project_filing_name",
            width: 120,
        },
        {
            title: "项目编码",
            dataIndex: "project_filing_code",
            key: "project_filing_code",
            width: 120,
        },
        {
            title: "项目期次",
            dataIndex: "project_filing_batch",
            key: "project_filing_batch",
            width: 120,
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
        }

    ]
    
    render() {

        let {queryObj, showLoading, queryParam} = this.props;
        let {pageIndex, total, totalPages} = queryObj;
        let {filterable, record, tableHeight} = this.state;
        console.log('approval-props');
        console.log(this.props);

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
            <div className='project-approval'>
                <Loading showBackDrop={true} show={showLoading} fullScreen={true}/>
                <div className='table-header'>
                    <Button bordered className="ml8" colors="default"><Icon type='uf-search' onClick={this.onQuery}/>查询</Button>
                    <Button className="ml8" colors="primary" disabled><Icon type='uf-search' onClick={this.onQuery}/>表格操作</Button>
                    <Button className="ml8" style={{float:'right'}} colors="primary" onClick={this.onAdd}><Icon type='uf-search'/>新增</Button>
                    <Button className="ml8" style={{float:'right'}} colors="primary"><Icon type='uf-search' onClick={this.onQuery}/>修改</Button>
                    <Button className="ml8" style={{float:'right'}} colors="primary"><Icon type='uf-search' onClick={this.onQuery}/>提交</Button>
                    <Button className="ml8" style={{float:'right'}} colors="primary"><Icon type='uf-search' onClick={this.onQuery}/>审核</Button>
                    <Button className="ml8" style={{float:'right'}} colors="primary"><Icon type='uf-search' onClick={this.onQuery}/>查看</Button>
                    <Button className="ml8" style={{float:'right'}} colors="primary"><Icon type='uf-search' onClick={this.onQuery}/>查看流程图</Button>
                    <Button className="ml8" style={{float:'right'}} colors="primary"><Icon type='uf-search' onClick={this.onQuery}/>联查凭证</Button>
                    <Button className="ml8" style={{float:'right'}} colors="primary" onClick={this.onExport}>导出</Button>
                </div>
                <div className="grid-parent" style={{display:this.state.listView}}>
                    <Grid
                        ref={(el) => this.grid = el} //存模版
                        columns={this.gridColumn}
                        data={queryObj.list}
                        rowKey={(r, i) => i} //生成行的key
                        paginationObj={paginationObj} //分页
                        multiSelect={true}  //false 单选，默认多选
                        showFilterMenu={true} //是否显示行过滤菜单
                        filterable={filterable}//是否开启过滤数据功能
                        onFilterChange={this.onFilterChange}  // 触发过滤输入操作以及下拉条件的回调
                        onFilterClear={this.onFilterClear} //清除过滤条件的回调函数，回调参数为清空的字段
                        afterRowFilter={this.afterRowFilter} //控制栏位的显示/隐藏
                        sort={sortObj} //排序属性设置
                        scroll={{y: tableHeight}}
                        height={28}//表格单行高度
                        bordered
                        headerHeight={40}
                        sheetHeader={{height: 30, ifshow: false}} //设置excel导出的表头的样式、支持height、ifshow
                    />
                </div>
                <div style={{display:this.state.formView}}>
                    <FormView />
                </div>
            </div>
        )
    }
}

export default IndexView;
