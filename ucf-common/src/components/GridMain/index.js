import React, {Component} from "react";
import BeeGrid from "bee-complex-grid";
import Grid from 'components/Grid';
import Icon from "bee-icon";
import {deepClone, getHeight} from "utils";
import './index.less'


const defualtPaginationParam = {
    dataNumSelect:['5','25','50','100'],
    dataNum:2,
    verticalPosition:'bottom'
}

const defaultProps = {
    //   hideBodyScroll: true,
    headerScroll: false,
    bordered: false,
    data: []
};

class GridMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeightMain: 0, //主表高度
            tableHeightChild: 0, //字表高度
        }
    }

     /**
     * 重置表格高度计算回调
     *
     * @param {Boolean} isopen 是否展开
     */
    resetTableHeight = (isopen) => {
        let tableHeightMain = 0;
        tableHeightMain = getHeight() - 430;
        this.setState({ tableHeightMain });

        let tableHeightChild = 0;
        tableHeightChild = getHeight() - 500;
        this.setState({ tableHeightChild });
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
        this.grid.exportExcel();
    };

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        //计算表格滚动条高度
        this.resetTableHeight(false);
    }
    
    render() {
        const {paginationObj, columns, tableHeight, data, ...otherProps} = this.props;
        const _paginationObj = {...defualtPaginationParam, ...paginationObj};
        const { tableHeightMain,  tableHeightChild} = this.state;
        return (
            <div className='demo-grid-wrapper'>
                <Grid
                    ref={el => this.grid = el}
                    columns={columns} //字段定义
                    data={data} //数据数组
                    rowKey={(r, i) => {r._index = i; return i}} //生成行的key
                    multiSelect={true}  //false 单选，默认多选                        
                    scroll={{y: tableHeight==1?tableHeightMain:tableHeightChild}} //滚动轴高度
                    height={28} //行高度
                    bordered //表格有边界
                    headerDisplayInRow={true}//表头换行用...来表示
                    bodyDisplayInRow={true}//表体换行用...来表示
                    headerHeight={40} //表头高度
                    bodyStyle={{'height':tableHeight==1?tableHeightMain:tableHeightChild,'background-color':'rgb(241, 242, 245)'}} //表体样式
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
                    {...otherProps}
                />
            </div>
        );
    }
}

Grid.GridMain = defaultProps;
export default GridMain;