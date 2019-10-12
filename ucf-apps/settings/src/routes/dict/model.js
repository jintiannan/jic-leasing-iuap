import {actions} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要

import Message from 'bee-message';
import {processData, structureObj, initStateObj, deepClone} from "utils";


export default {
    // 确定 Store 中的数据模型作用域
    name: "dict",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        showLoading: false,
        showdictItemLoading:false,
        dictIndex:0,
        queryParam: {
            pageIndex: 1,
            pageSize: 10,
        },
        //查询结果参数
        queryObj: {},
        //页面数据集 
        list: [],    //主表数据
        dictitemlist:[],    //子表数据
        // dictObj: {pageIndex:1,
        //     pageSize:5,
        //     totalPages:0
        // },   //存储分页数据
        //form表单绑定数据
        formObject:{},
        //当前页选中的数据
        selectedList:[],
        //表单绑定数据list
        selectedItemList:[],
        //按钮权限集
        powerButton:[],
        //是否过滤按钮权限
        ifPowerBtn:true,
        //是否可编辑
        isEdit:false,
        //是否显示新增页面
        showModal:false,
        //是否列表界面
        isGrid:true,
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

        //获取主表数据接口
        async loadList(param, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.dict.updateState({showLoading: true});
            // 调用 getList 请求数据
            let data= processData(await api.getList(param));
            let updateData = {showLoading: false};
            let queryObj = {
                pageIndex:param.pageIndex,
                pageSize:param.pageSize,
                totalPages:Math.ceil(data.length/param.pageSize),
                total:data.length
            };
            updateData.queryObj = queryObj;
            updateData.queryParam = param;
            let reallist=[];
            let startindex=(queryObj.pageIndex-1)*queryObj.pageSize;
            let endindex =(queryObj.pageIndex)*queryObj.pageSize-1;
            if(endindex>=data.length)  endindex=data.length-1;
            for(var i=startindex;i<=endindex;i++){
                reallist.push(data[i]);
            }
            updateData.list = reallist;
            actions.dict.updateState(updateData);
        },


        /**
         * @function loadChildList 获取子表数据
         * @description 
         * @param {Object} param 后台接口参数 可不不传默认{}
         * */

        async loadChildList(param = {}, getState) {
            let state = getState().dict;
            let { list, dictIndex} = state;
            if (list.length > 0) {
                let dict = list[dictIndex];
                let _param = {};
                if (dict) {
                    _param = Object.assign({}, {
                        search_dictId: dict.pkParamType,
                    }, param);
                    let apiService = api.getDictItemList;
                    // 正在加载数据，显示加载 Loading 图标
                    actions.dict.updateState({showdictItemLoading: true});
                    let sondata = processData(await apiService(_param));
                    let updateData = {showdictItemLoading: false};
                    updateData.dictitemlist = sondata.dictitemlist;
                    actions.dict.updateState(updateData);
                }
            }

        },

        /**
         * 更新界面单行数据,使用之前请对需要更新的对象进行深拷贝再传入!!
         * @param {需要更新的记录} record 
         * @param {顺序号} index 
         * @param {*} getState 
         */
        async updateRowData(param={},getState){
            let{index,record} = param;
            let list = getState().dict.list;
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
            actions.dict.updateState({list:_list});
        },

    }
};

