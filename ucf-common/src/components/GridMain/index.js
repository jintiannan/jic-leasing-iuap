import React, {Component} from "react";
import BaseGrid from 'components/Grid';
import {deepClone, getHeight} from "utils";
import './index.less'


const defualtPaginationParam = {
    dataNumSelect:['10','20','50','100'],
    dataNum:2,
    verticalPosition:'bottom'
}

const defaultProps = {
    //   hideBodyScroll: true,
    headerScroll: false,
    bordered: false,
    data: []
};

// 在此自定义无数据时的展示内容
const emptyFunc = () => '';


class GridMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeightMain: 0, //主表高度
            tableHeightChild: 0, //字表高度
            tableHeightSingle: 0, //单表高度
        }
    }

     /**
     * 重置表格高度计算回调
     *
     * @param {Boolean} isopen 是否展开
     */
    resetTableHeight = (isopen) => {
        let tableHeightMain = 0;
        tableHeightMain = getHeight() * 0.4;
        this.setState({ tableHeightMain });

        let tableHeightChild = 0;
        tableHeightChild = getHeight() * 0.27;
        this.setState({ tableHeightChild });

        let tableHeightSingle = 0;
        tableHeightSingle = getHeight() - 155;
        this.setState({ tableHeightSingle });
    }

    /**
     *获取保存的column和table上的属性
     *
     */
    getColumnsAndTablePros = () => {
        return this.grid.getColumnsAndTablePros();
    };
    /**
     *
     * 重置grid的columns
     */
    resetColumns = newColumns => {
        this.grid.resetColumns(newColumns);
    };

    exportExcel = () => {
        this.refs[this.props.exportref].exportExcel();
    };

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        //计算表格滚动条高度
        this.resetTableHeight(false);
    }
    
    render() {
        const {paginationObj, columns, tableHeight,ref,exportFileName,exportData,exportref, data, ...otherProps} = this.props;
        const _paginationObj = {...defualtPaginationParam, ...paginationObj};
        const { tableHeightMain, tableHeightChild, tableHeightSingle } = this.state;
        return (
            <div className='gridMain'>
                <BaseGrid
                    ref={exportref}
                    columns={columns} //字段定义
                    data={data} //数据数组
                    columnFilterAble={tableHeight==1?true:false} //是否显示列过滤功能 默认主表显示 字表不显示
                    rowKey={(r, i) => {r._index = i; return i}} //生成行的key
                    multiSelect= {{ type:"checkbox" }}  //false 单选，默认多选   
                    dragborder={true}               //表头可拖拽
                    autoCheckedByClickRows={false} 
                    exportFileName={exportFileName}  
                    exportData={exportData}                 
                    scroll={{y: tableHeight==1?tableHeightMain:tableHeight==2?tableHeightSingle:tableHeightChild}} //滚动轴高度
                    height={28} //行高度
                    bordered //表格有边界
                    headerDisplayInRow={true}//表头换行用...来表示
                    bodyDisplayInRow={true}//表体换行用...来表示
                    headerHeight={tableHeight==1|| tableHeight==2 ?40:30} //表头高度 主表40 字表30
                    showFilterPopover={false}
                    bodyStyle={{'height':tableHeight==1?tableHeightMain: tableHeight==2?tableHeightSingle:tableHeightChild}} //表体样式
                    sheetHeader={{height: 30, ifshow: false}} //设置excel导出的表头的样式、支持height、ifshow
                    hideHeaderScroll={false} //无数据时是否显示表头   
                    //排序属性设置
                    sort={{
                        mode: 'multiple', //多列排序
                        backSource: false, //前端排序
                    }}
                    //分页对象
                    paginationObj = {_paginationObj}
                    rowClassName={(record,index,indent)=>{
                        if (record._checked) {
                            return 'selected';
                        } else {
                            return '';
                        }
                    }}
                    emptyText={emptyFunc}  //无数据显示函数
                    {...otherProps}
                />
            </div>
        );
    }
}

BaseGrid.GridMain = defaultProps;
export default GridMain;
