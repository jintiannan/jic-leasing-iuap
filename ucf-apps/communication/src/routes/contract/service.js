/**
 * 服务请求类  定义请求后台接口地址url ${GROBAL_HTTP_CTX}为全局配置在config中 + 后台controller路径
 */
import request from "axios";
import {requestBusiness} from "utils/business";
import * as mock from "./mock";
//定义接口地址
const URL = {
    "GET_LIST":  `${GROBAL_HTTP_CTX}/sales/list`,
    "LIST":  `${GROBAL_HTTP_CTX}/communication/contract/queryForGrid`,
    "LIST_CASH":  `${GROBAL_HTTP_CTX}/communication/contract/getListCash`,
    "LIST_ACCRUED":  `${GROBAL_HTTP_CTX}/communication/accrued/getListAccrued`,
    "LIST_ACCOUNTING_SHARE":  `${GROBAL_HTTP_CTX}/communication/contract/getListAccountingShare`,
}

/**
 * 获取主列表
 * @param {*} params
 */
export const getList = (params) => {
    /**
     * 对接后台时使用此种方式请求 method请求方式为post或为get 当为post请求时采用data作为传输参数 get请求时使用params作为请求参数并转化json串
     */
    // return request(URL.GET_LIST, {
    //     method : "post",
    //     params : {data: JSON.stringify(params)}
    // });
    /**
     * 不对接后台时直接使用mock.js中的假数据 并将结果集封装成为请求返回的形式 data+status的形式
     */
    return requestBusiness(params, URL.LIST);
}

/**
 * 获取租金计划表
 * @param {*} params
 */
export const getListCash = (params) => {
    return requestBusiness(params, URL.LIST_CASH);
}

/**
 * 获取计提表
 * @param {*} params
 */
export const getListAccrued = (params) => {
    return requestBusiness(params, URL.LIST_ACCRUED);
}

