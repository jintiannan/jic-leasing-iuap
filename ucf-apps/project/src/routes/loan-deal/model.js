import {actions} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要

import {processData, structureObj, initStateObj,deepClone} from "utils";


export default {
    // 确定 Store 中的数据模型作用域
    name: "loandeal",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        tabKey: "loanplan", // table 页切换
        loandealIndex: 0,
        showLoading: false,
        showLoanplanLoading: false,
        showPayaccountLoading: false,
        pageParams: {},
        queryParam: {
            pageIndex: 1,
            pageSize: 10,
            planIndex:1,
            planpageSize:5,
            accountIndex:1,
            accountpageSize:5
        },
        loandealObj: {pageIndex:1,
            pageSize:5,
            totalPages:0},
        loanplanObj: {pageIndex:1,
            pageSize:5,
            totalPages:0},
        payaccountObj: {pageIndex:1,
            pageSize:5,
            totalPages:0},
        //页面数据集
        list: [],
        loanplanList : [],
        payaccountList:[],
        //form表单绑定数据
        formObject:{},
        //表单绑定数据list
        selectedPlanList:[],
        selectedPayList:[],
        //当前页选中的数据
        selectedList:[],
        //按钮权限集
        powerButton:[],
        //是否过滤按钮权限
        ifPowerBtn:true,
        //是否可编辑
        isEdit:false,
        //是否列表界面
        isGrid:true,
        //模态框是否显示
        showModal:false,
        //新增页form表单绑定数据
        formObjAdd:{},
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

        async loadList(param, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.loandeal.updateState({showLoading: true});
            // 调用 getList 请求数据
            let data= processData(await api.getList(param));
            let updateData = {showLoading: false,loandealIndex: 0};
            let loandealObj = {
                pageIndex:param.pageIndex,
                pageSize:param.pageSize,
                totalPages:Math.ceil(data.length/param.pageSize)
            };
            updateData.loandealObj = loandealObj;
            updateData.queryParam = param;
            let reallist=[];
            let startindex=(loandealObj.pageIndex-1)*loandealObj.pageSize;
            let endindex =(loandealObj.pageIndex)*loandealObj.pageSize-1;
            if(endindex>=data.length)  endindex=data.length-1;
            for(var i=startindex;i<=endindex;i++){
                reallist.push(data[i]);
            }
            updateData.list = reallist;
            actions.loandeal.updateState(updateData);
        },


        /**
         * @function loadSubList 获取子表数据
         * @description 根据tabKey调用不通的后台接口
         * @param {Object} param 后台接口参数 可不不传默认{}
         * */

        async loadSubList(param = {}, getState) {
            let state = getState().loandeal;
            let { tabKey, list, loandealIndex} = state;
            if (list.length > 0) {
                let deal = list[loandealIndex];
                let _param = {};
                if (deal) {
                    if (tabKey === 'loanplan') {
                    _param = Object.assign({}, {
                        search_dealId: deal.id,
                        pageIndex: param.planIndex,
                        pageSize: param.planpageSize
                    }, param);
                }else if (tabKey === 'payaccount'){
                    _param = Object.assign({}, {
                        search_dealId: deal.id,
                        pageIndex: param.accountIndex,
                        pageSize: param.accountpageSize
                    }, param);
                }
                    let apiService = null;
                    let loadingKey = ''; //子表loading显示key
                    if (tabKey === 'loanplan') {
                        apiService = api.getLoanPlan;
                        loadingKey = 'showPlanLoading';
                    } else if (tabKey === 'payaccount') {
                        apiService = api.getPayAccount;
                        loadingKey = 'showAccountLoading';
                    }
                    actions.loandeal.updateState({[loadingKey]: true});
                    let sondata = processData(await apiService(_param));
                    let newObj = null;
                    let updateData = {[loadingKey]: false};
                    if(tabKey ==='loanplan'){
                        newObj = {
                            pageIndex:param.planIndex,
                            pageSize:param.planpageSize,
                            totalPages:Math.ceil(sondata.loanplan.length/param.planpageSize)
                        };
                        updateData.loanplanObj = newObj;
                        updateData.queryParam = param;
                        let reallist=[];
                        let startindex=(newObj.pageIndex-1)*newObj.pageSize;
                        let endindex =(newObj.pageIndex)*newObj.pageSize-1;
                        if(endindex>=sondata.loanplan.length)  endindex=sondata.loanplan.length-1;
                        for(var i=startindex;i<=endindex;i++){
                            sondata.loanplan[i]['_edit']=param['_edit'];
                            reallist.push(sondata.loanplan[i]);
                        }
                        updateData.loanplanList = reallist;
                    }else if (tabKey === 'payaccount') {
                        newObj = {
                            pageIndex:param.accountIndex,
                            pageSize:param.accountpageSize,
                            totalPages:Math.ceil(sondata.payaccount.length/param.accountpageSize)
                        };
                        updateData.payaccountObj = newObj;
                        updateData.queryParam = param;
                        let reallist=[];
                        let startindex=(newObj.pageIndex-1)*newObj.pageSize;
                        let endindex =(newObj.pageIndex)*newObj.pageSize-1;
                        if(endindex>=sondata.payaccount.length)  endindex=sondata.payaccount.length-1;
                        for(var i=startindex;i<=endindex;i++){
                            sondata.payaccount[i]['_edit']=param['_edit'];
                            reallist.push(sondata.payaccount[i]);
                        }
                        updateData.payaccountList = reallist;  
                    }
                    actions.loandeal.updateState(updateData);
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
            let list = getState().loandeal.list;
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
            actions.loandeal.updateState({list:_list});
        },

        /**
         * 获取行过滤的下拉数据
         * @param {*} param
         */
        async getListByCol(param, getState) {
            let {result} = processData(await api.getListByCol(param));
            let {data=[]} = result;
            let {distinctParams} = param,
                column = distinctParams[0];
            let selectValList = data.map((item) => {
                let {deptName, dept} = item;
                return {key: deptName, value: dept};
            });
            actions.query.updateState({['colFilterSelect' + column]: selectValList});
        },

    }
};
