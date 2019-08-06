/**
 * 服务请求类
 */
import request from "axios";
import * as mock from "./mock";
//定义接口地址
const URL = {
    "GET_LIST":  `${GROBAL_HTTP_CTX}/sales/list`
}

/**
 * 获取主列表
 * @param {*} params
 */
export const getList = (params) => {
    console.log("getList");
    let data =  mock.mockData(mock.data);
    console.log(data);
    return data;
}