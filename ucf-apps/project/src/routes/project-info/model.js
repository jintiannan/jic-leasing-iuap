import {actions} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要

import {processData, structureObj, initStateObj,deepClone} from "utils";


export default {
    // 确定 Store 中的数据模型作用域
    name: "projectInfo",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        showLoading: false,
        queryParam: {
            pageParams: {
                pageIndex: 0,
                pageSize: 25,
            },
            sortMap: [],
            whereParams: [],
        },
        queryObj: {
            list: [],
            pageIndex: 0,
            pageSize: 25,
            totalPages: 10,
            total: 0,
        },
        formObject:{},
        selectedList:[],
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
        }
    },
    effects: {

        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async loadList(param = {}, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.projectInfo.updateState({showLoading: true});
            let data = processData(await api.getList(param));  // 调用 getList 请求数据
            let updateData = {showLoading: false};
            let {pageParams} = param;
            let queryObj = {list:data};
            updateData.queryObj = queryObj;
            updateData.queryParam = param;
            actions.projectInfo.updateState(updateData); // 更新数据和查询条件
        },

        /**
         * 绑定Form表单对象
         * @param {} param 
         * @param {*} getState 
         */
        async bindFromObj(param = {}, getState){
            updateData.formObject = {};
            updateData.formObject.push(param);
            actions.projectInfo.updateState(updateData); 
        },



        
        

    }
};
