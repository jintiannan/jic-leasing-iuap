/**
 * 服务请求类
 */
import request from 'ucf-request';
import * as mock from "./mock";
//定义接口地址
const URL = {
    "LIST":  `${GROBAL_HTTP_CTX}/customer/customerCorp/list`,
};

/**
 * 获取主列表
 * @param {*} params
 */
export const getList = (params) => {
    return request(URL.LIST, {
        method : "post",
        params : {query: JSON.stringify(params)}
    });
};

/**
 * 获取树列表
 * @param {*} params
 */
export const getTreeNodes = (params) => {
    return mock.mockData(mock.treeData);
};


