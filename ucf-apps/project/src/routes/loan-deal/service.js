import request from "utils/request";
import * as mock from "./mock";
//定义接口地址
// const URL = {

//     "GET_LIST": `${GROBAL_HTTP_CTX}/loan_deal/list`, // 获取主表


//     "GET_EMERGENCY": `${GROBAL_HTTP_CTX}/loan_plan/list`, // 获取子表 付款申请单


//     "GET_TRAVELING": `${GROBAL_HTTP_CTX}/pay_account/list`, // 获取子表 付款账户信息

// }

/**
 * 获取主列表
 * @param {*} params
 */
export const getList = (param) => {
    // return request(URL.GET_LIST, {
    //     method: "get",
    //     param
    // });
    let data =  mock.mockData(mock.LoandealList);
    console.log(data);
    return data;
}
/**
 * 获取子列表 付款申请单
 * @param {*} params
 */
export const getLoanPlan = (param) => {
    // return request(URL.GET_EMERGENCY, {
    //     method: "get",
    //     param
    // });
    let data =  mock.mockData(mock.LoandealList);
    let result ={'status':'200','data' : null}
    data.data.map(function (item, index) {
        if(item.id==param.search_dealId){
            result.data=item;
        }
    })
    return result;
}

/**
 * 获取子列表
 * @param {*} params
 */
export const getPayAccount = (param) => {
    // return request(URL.GET_TRAVELING, {
    //     method: "get",
    //     param
    // });
    let data =  mock.mockData(mock.LoandealList);
    let result ={'status':'200','data' : null}
    data.data.map(function (item, index) {
        if(item.id==param.search_dealId){
            result.data=item;
        }
    })
    return result;
}
export const getListByCol = ()=> {

}












