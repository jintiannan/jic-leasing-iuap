import {actions} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要

import {processData, structureObj, initStateObj, deepClone} from "utils";


export default {
    // 确定 Store 中的数据模型作用域
    name: "customerCorp",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        showLoading: false,
        pageParams: {},
        queryParam: {
            pageIndex: 1,
            pageSize: 50,
        },
        //查询结果参数
        queryObj: {},
        //页面数据集
        list: [],
        total: 0,
        //form表单绑定数据
        formObject: {},
        //当前页选中的数据
        selectedList: [],
        //按钮权限集
        powerButton: [],
        //是否过滤按钮权限
        ifPowerBtn: true,
        //是否可编辑
        isEdit: false,
        //是否列表界面
        isGrid: true,
        // 树节点
        treeData: [],
        //子页面
        subForm: 'baseInfo',
        //
        customer: {}


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
            actions.customerCorp.updateState({showLoading: true});
            let data = processData(await api.getList(param));  // 调用 getList 请求数据
            let updateData = {showLoading: false};

            updateData.queryObj = {
                pageIndex: param.pageIndex,
                pageSize: param.pageSize,
                totalPages: data.totalPages
            };
            updateData.queryParam = param;
            updateData.list = data.rows;
            updateData.total = data.total;

            actions.customerCorp.updateState(updateData); // 更新数据和查询条件
        },

        async getTreeNode() {
            let data = processData(await api.getTreeNodes());  // 调用 getList 请求数据
            actions.customerCorp.updateState({treeData: data});
        }
    }
};
