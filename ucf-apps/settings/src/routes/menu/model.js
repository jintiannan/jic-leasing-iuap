import {actions} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要

import Message from 'bee-message';
import {processData, structureObj, initStateObj, deepClone} from "utils";


export default {
    // 确定 Store 中的数据模型作用域
    name: "menu",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        showLoading: false,
        // 缓存行过滤条件
        cacheFilter: [],
        isEdit: false,
        isDisabled: true,
        formObject: {},
        lastSelectedNode : {},
        treeData: [],
        selectedValue: ''

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
            actions.menu.updateState({showLoading: true});
            let data = processData(await api.getList(param));  // 调用 getList 请求数据
            let updateData = {
                showLoading: false,
                treeData: data
            };
            actions.menu.updateState(updateData); // 更新数据和查询条件
        },

        /**
         * 获取行过滤的下拉数据
         * @param {*} tree 树
         */
        async save(tree) {
            console.log(tree);
            actions.menu.updateState({showLoading: true});

            let data = processData(await api.saveTree({data: '1'}));
            actions.menu.updateState({showLoading: false});

            if (data.success) {
                Message.create({ content: "保存成功", color : 'success'});
            } else {
                Message.create({ content: "保存失败", color : 'danger'});
            }
        },

    }
};

