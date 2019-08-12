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
    let data =  mock.mockData(mock.data);
    return data;
}

/**
 * 获取按钮权限
 * @param {*} params 
 */
export const getPowerButton = (params) => {

    //测试数据,之后替换
    let response = {
        status: '200',
        data : ['Query','Export','Save','Return','ViewFlow','Check','Submit','Edit','Add','View'],
    }
    return response;
}