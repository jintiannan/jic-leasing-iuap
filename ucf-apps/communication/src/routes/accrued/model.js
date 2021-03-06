import {actions} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要

/**
 * processData : 调用service.js中的请求数据的承接
 * deepClone : 克隆当前指定对象的数据 通常用于数据更新
 */
import {processData, deepClone, success} from "utils";
import {consoleData} from "utils/service";


export default {
    // 当前节点所通用model名称 使用actions修改状态时必须与此名称一致才可修改
    name: "communicationAccrued",
    /**
     * 整个model.js分为三个作用域
     * initialState ： 整个props内使用的数据集 对应该节点域范围使用this.props访问的数据 通常用来设置全局使用的初始化参数、
     * reducers ：目前仅设定updateState一个函数 通过this.name.updateState调用 以json格式更新当前域范围内部的数据 与指定界面内部的this.setState功能一致
     * effects ：实现与后台进行异步交互的函数 用于与对接后台业务接口进行业务逻辑交互并返回需要的数据
     */
    initialState: {
        showLoading: false,  //主表加载Loading图标
        queryParam: {        //初始化分页查询的参数
            pageIndex: 0,
            pageSize: 15,
            dataNum:0,       //每页显示条数索引
        },
        queryObj: {},        //查询结果参数 用以完成列表内部的分页 参见loadList中使用的形式
        //页面数据集
        list: [],
        list2: [],
        list3: [], //form表单列表数据
        //主表form表单绑定数据
        formObject:{},
        //当前页选中的数据
        selectedList:[],
        //按钮权限集
        powerButton:[],
        //是否过滤按钮权限
        ifPowerBtn:true,
        //显示字段
        gridColumn:[],
        //是否自定义显示字段
        ifGridColumn:true,
        //是否可编辑
        isEdit:false,
        //是否显示新增页面
        showModal:false,
        //子表新增修改Modal页
        showLoanModal:false,
        //标记区别子表添加/修改的标志
        ifplanAdd:false,
        //子表选中list
        selectedPlanList:[],
        //子表选中form
        planformObj:{},
        //是否列表界面
        isGrid:true,
        //是否加载 详情修改页
        showForm:false,
        exportData:[], //导出数据缓存
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
            actions.communicationAccrued.updateState({showLoading: true});
            let data = processData(await api.getList(param));  // 调用 getList 请求数据
            //处理data返回数据 避免出现数据异常错误
            let updateData = consoleData(data, param, "main", null);
            actions.communicationAccrued.updateState(updateData); // 更新数据和查询条件
        },

        /**
         * 加载子列表数据
         * @param {*} param
         * @param {*} getState
         */
        async loadChildList(param) {
            // 正在加载数据，显示加载 Loading 图标
            actions.communicationAccrued.updateState({showLoading: true});
            let data = processData(await api.findChildByPk(param));
            let updateData = consoleData(data, param, "sub", "pkAccruedDetail");
            // let queryObj = {
            //     pageIndex:0,
            //     pageSize:1000,
            //     totalPages:Math.ceil(data.length/1000)
            // };
            // updateData.queryObj = queryObj;
            // let param = {
            //     pageIndex: 0,
            //     pageSize: 50,
            // };
            // updateData.queryParam = param;
            // updateData.list2 = data.data.pkAccruedDetail;
            actions.communicationAccrued.updateState(updateData); // 更新数据和查询条件
        },

                /**
         * 加载子列表数据
         * @param {*} param
         * @param {*} getState
         */
        async loadChildFormList(param) {
            // 正在加载数据，显示加载 Loading 图标
            actions.communicationAccrued.updateState({showLoading: true});
            let updateData = {showLoading: false};
            let data = processData(await api.findChildByPk(param));
            // let queryObj = {
            //     pageIndex:0,
            //     pageSize:1000,
            //     totalPages:Math.ceil(data.length/1000)
            // };
            // updateData.queryObj = queryObj;
            // let param = {
            //     pageIndex: 0,
            //     pageSize: 50,
            // };
            // updateData.queryParam = param;
            updateData.list3 = data.data.pkAccruedDetail;
            actions.communicationAccrued.updateState(updateData); // 更新数据和查询条件
        },


        /**
         * 更新界面单行数据,使用之前请对需要更新的对象进行深拷贝再传入!!
         * @param {需要更新的记录} record
         * @param {顺序号} index
         * @param {*} getState
         */
        async updateRowData(param={},getState){
            let{index,record} = param;
            let list = getState().communicationAccrued.list;
            let _list = deepClone(list);
            if(index != undefined){
                _list[index] = record;
            } else if(record._index != undefined){
                _list[record._index] = record;
            } else {
                for(let key of list){
                    // if(key['pk'] == record['pk']){
                    //     key = record;
                    //     break;
                    // }

                    if(key['_index'] == record._index){
                        _list[key] = record;
                        break;
                    }
                }
            }
            actions.communicationAccrued.updateState({list:_list});
        },

        /**
         * onAdd加载数据
         * @param {*} param
         * @param {*} getState
         */
        // async getObject(param) {
        //     // 正在加载数据，显示加载 Loading 图标
        //     actions.communicationAccrued.updateState({showLoading: true});
        //     let data = processData(await api.onAdd(param));  // 调用 onAdd 请求数据
        //     let updateData = {showLoading: false};
        //     if(data.data.pkAccruedDetail != undefined && data.data.pkAccruedDetail.length > 0){
        //         updateData.isEdit = true;
        //         updateData.formObject = data.data;
        //         updateData.list3 = data.data.pkAccruedDetail;
        //     }else{
        //         updateData.isEdit = false;
        //         Info("没有可以计提的数据!")
        //     }
        //     actions.communicationAccrued.updateState(updateData); // 更新数据和查询条件
        // },

        /**
         * 保存
         * @param {*} param
         * @param {*} getState
         */
        async onSave(param) {
            // 正在加载数据，显示加载 Loading 图标
            actions.communicationAccrued.updateState({showLoading: true});
            let data = processData(await api.onSave(param));  // 调用 onSave 请求数据
            if(data.success == true){
                success("操作成功!");
            }
            let updateData = {showLoading: false};
            actions.communicationAccrued.updateState(updateData); // 更新数据和查询条件
        },

        /**
         * 提交
         * @param {*} param
         * @param {*} getState
         */
        async onSubmit(param,getState) {
            let {queryParam} = getState().communicationAccrued;
            let data = processData(await api.onSubmit({pk:param})); 
            if(data.success == true){
                success("操作成功!");
            }
            actions.communicationAccrued.loadList(queryParam);
        },

        /**
         * 复核通过
         * @param {*} param
         * @param {*} getState
         */
        async onCheckPass(param,getState) {
            let {queryParam} = getState().communicationAccrued;
            let data = processData(await api.onCheckPass({pk:param})); 
            if(data.success == true){
                success("操作成功!");
            }
            actions.communicationAccrued.loadList(queryParam);
        },

        /**
         * 复核不通过
         * @param {*} param
         * @param {*} getState
         */
        async onCheckUnPass(param,getState) {
            let {queryParam} = getState().communicationAccrued;
            let data = processData(await api.onCheckUnPass({pk:param})); 
            if(data.success == true){
                success("操作成功!");
            }
            actions.communicationAccrued.loadList(queryParam);
        },

    }
};
