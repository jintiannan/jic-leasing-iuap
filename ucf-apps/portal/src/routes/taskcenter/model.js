import {actions} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要

import {processData, structureObj, initStateObj,deepClone} from "utils";


export default {
    // 确定 Store 中的数据模型作用域
    name: "taskcenter",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        pageParams: {},
        queryParam: {
            pageIndex: 0,
            pageSize: 50,
        },
        //查询结果参数
        queryObj: {},
        //页面数据集
        list: [],
        //form表单绑定数据
        formObject:{},
        //当前页选中的数据
        selectedList:[],
        //按钮权限集
        powerButton:[],
    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state
         * @param {*} data
         */
        updateState(state, data) { //更新state
            return {
                ...state,
                ...deepClone(data)
            };
        },
    },
    effects: {

        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async loadList(param = {}, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.taskcenter.updateState({showLoading: true});
            let data = processData(await api.getList(param));  // 调用 getList 请求数据
            let updateData = {showLoading: false};
            let queryObj = {
                pageIndex:param.pageIndex,
                pageSize:param.pageSize,
                totalPages:Math.ceil(data.length/param.pageSize)
            };
            updateData.queryObj = queryObj;
            updateData.queryParam = param;
            updateData.list = data;
            actions.taskcenter.updateState(updateData); // 更新数据和查询条件
        },
        /**
         * 更新界面单行数据,使用之前请对需要更新的对象进行深拷贝再传入!!
         * @param {需要更新的记录} record 
         * @param {顺序号} index 
         * @param {*} getState 
         */
        async updateRowData(param={},getState){
            let{index,record} = param;
            let list = getState().taskcenter.list;
            let _list = deepClone(list);
            if(index != undefined){
                _list[index] = record;
            } else if(record._index != undefined){
                _list[record._index] = record;
            } else {
                for(let key of list){
                    if(key['_index'] == record._index){
                        _list[key] = record;
                        break;
                    }
                }                
            }            
            actions.taskcenter.updateState({list:_list});
        },
    }
};
