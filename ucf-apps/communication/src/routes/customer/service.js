/**
 * 服务请求类  定义请求后台接口地址url ${GROBAL_HTTP_CTX}为全局配置在config中 + 后台controller路径
 */
import request from "axios";
import { requestBusiness } from "utils/business";
//定义接口地址
const URL = {
    "GET_LIST":  `${GROBAL_HTTP_CTX}/communication/customer/ListCustomerDO`,
    "UPDATE_DO":  `${GROBAL_HTTP_CTX}/communication/customer/saveCustomerDO`
}

/**
 * 获取主列表
 * @param {*} params
 */
export const getList = (params) => {
    let qdata = {
        pagination:{
            curPage : params.pageIndex,
            pageSize : params.pageSize
        }
    }
    return requestBusiness(qdata,URL.GET_LIST);
}


/**
 * 修改客户数据
 * @param {*} vo
 */
export const updateData = (dos) => {
    return request(URL.UPDATE_DO, {
        method : "post",
        data : dos
    });
};

