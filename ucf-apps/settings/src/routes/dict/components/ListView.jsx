import React, {Component} from 'react';
import {actions} from 'mirrorx';
import { Tabs } from 'tinper-bee';
import {deepClone} from "utils";
import {genGridColumn} from "utils/service";
import GridMain from 'components/GridMain';

const { TabPane } = Tabs;
import './index.less';

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        this.gridColumn = [...genGridColumn(this.grid)];
        this.gridColumnOnDictItem = [...genGridColumn(this.gridOnDictItem)];
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        actions.dict.loadList(this.props.queryParam);
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    /**
     * 跳转到指定页数据
     * @param {Number} pageIndex 跳转指定页数
     */
    freshData = (pageIndex) => {
        let queryParam = deepClone(this.props.queryParam); // 深拷贝查询条件从 action 里
        queryParam['pageIndex'] = pageIndex;
        actions.dict.loadList(queryParam);
    }

    /**
     * 设置每页显示行数
     * @param {Number} index 跳转指定页数
     * @param {Number} value 设置一页数据条数
     */
    onDataNumSelect = (index, value) => { 
        let queryParam = deepClone(this.props.queryParam); // 深拷贝查询条件从 action 里
        queryParam['pageSize'] = value;
        queryParam['pageIndex'] = 1;
        if (value && value.toString().toLowerCase() === "all") { // 对分页 pageSize 为 all 进行处理，前后端约定
            pageSize = 1;
        }
        actions.dict.loadList(queryParam);
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
            actions.dict.updateState({ dictIndex : _selectedList[0]['_index'],dictitemlist:_selectedList[0]['dictitemlist']});
            // this.childList(_formObj);
        }else{
            actions.dict.updateState({ dictitemlist : []});
        }
        
        actions.dict.updateState({ list : _list,selectedList : _selectedList,formObject : _formObj});
        
    }

    // childList = (obj) => {
    //     //加载子组件列表
    //     actions.dict.loadChildList(this.props.queryParam);
    // }

    //主表  列属性定义
    grid = [
        {title:'参数编号',key:'paramCode',type:'0'},
        {title:'参数名称',key:'paramName',type:'0'},
        {title:'参数英文名称',key:'paramVarname',type:'0'},
    ]
    //主表 列属性定义=>通过前端service工具类自动生成
    gridColumn = [];

    // 子表 列属性定义
    gridOnDictItem = [
        {title:'参数名称',key:'paramName',type:'0'},
        {title:'参数标识名称',key:'paramCode',type:'0'},
        {title:'参数值',key:'paramValue',type:'0'},
        {title:'是否启用',key:'isEnable',type:'0'},
    ]
    // 子表 列属性定义=>通过前端service工具类自动生成
    gridColumnOnDictItem = [];

    
    render() {
        return (            
            <div className="dict_list">
                <div>
                <GridMain
                        columns={this.gridColumn} //字段定义
                        data={this.props.list} //数据数组                     
                        tableHeight={1} //表格高度 1主表 2字表
                        columnFilterAble={false}
                        //分页对象
                        paginationObj = {{
                            activePage : this.props.queryParam.pageIndex,//活动页
                            total : this.props.queryObj.total,//总条数
                            items: this.props.queryObj.totalPages,//总页数
                            freshData: this.freshData, //活动页改变,跳转指定页数据
                            onDataNumSelect: this.onDataNumSelect, //每页行数改变,跳转首页
                        }}
                        getSelectedDataFunc={this.getSelectedDataFunc}

                    />
                </div>
                <div>
                    <Tabs
                    defaultActiveKey="1"
                    className="son_tabs"
                >
                    <TabPane tab='子表信息' key="1">
                    <div>
                <GridMain
                        ref={(el) => this.grid = el} //存模版
                        columns={this.gridColumnOnDictItem} //字段定义
                        data={this.props.dictitemlist} //数据数组
                        columnFilterAble={false}
                        //分页对象
                        paginationObj = {{
                            verticalPosition:'none'
                        }}
                    />
                </div>
                    </TabPane>
                    </Tabs>
                </div>
            </div>
                     
        );
    }
}

export default ListView;