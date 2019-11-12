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
        queryParam: {
            pageIndex: 1,
            pageSize: 10,
        },
        // 缓存行过滤条件
        isEdit: false,         //编辑态调整
        SelectformObj: {},     //选中菜单项
        treeData: [],          //整体菜单项
        treeDisabled:true,     //编辑态情况下不能重新选择其他树节点    true可选  false 不可选
        showaddModal:false,    //增加模态框是否展示
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
        async loadList(param, getState) {
            actions.menu.updateState({showLoading: true});
            let res = processData(await api.getList(param));  // 调用 getList 请求数据
            let updateData = {
                showLoading: false,
                treeData:res.data
            };
            actions.menu.updateState(updateData); // 更新数据和查询条件
            return res.data;
        },

        /**
         * 
         * @param {*} param 新增菜单vo数据
         */
        async addData(param={}) {
            let{vo} = param;
            actions.menu.updateState({showLoading: true});

            let data = processData(await api.addData(vo));

            actions.menu.updateState({showLoading: false});

            if (data.success) {
                Message.create({ content: "保存成功", color : 'success'});
            } else {
                Message.create({ content: "保存失败", color : 'danger'});
            }
        },


        /**
         * 
         * @param {*} param 更新菜单vo数据
         */
        async updateData(param={}) {
            let{vo} = param;
            actions.menu.updateState({showLoading: true});

            let data = processData(await api.updateData(vo));

            actions.menu.updateState({showLoading: false});

            if (data.success) {
                Message.create({ content: "修改完成", color : 'success'});
            } else {
                Message.create({ content: "修改失败", color : 'danger'});
            }
        },

        /**
         * 
         * @param {*} param 删除菜单vo
         */
        async deleteData(param={}) {
            let{vo} = param;
            actions.menu.updateState({showLoading: true});

            let data = processData(await api.deleteData(vo));

            actions.menu.updateState({showLoading: false});

            if (data.success) {
                Message.create({ content: "删除成功", color : 'success'});
            } else {
                Message.create({ content: "删除失败", color : 'danger'});
            }
        },
    }
};

