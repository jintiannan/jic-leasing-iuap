/**
 * 服务请求类
 */
import request from 'axios';
import * as mock from "./mock";
//定义接口地址
const URL = {
    "LIST":  `${GROBAL_HTTP_CTX}/rentearly/projectInfoController/queryForGrid`,
    "SAVE": `${GROBAL_HTTP_CTX}/rentearly/projectInfoController/saveOrUpdate`,
    "DELETE": `${GROBAL_HTTP_CTX}/rentearly/projectInfoController/delete`,
};

/**
 * 获取主列表
 * @param {*} params
 */
export const getList = (params) => {
    return request(URL.LIST, {
        method : "post",
        params : {page:0,pageSize:50,data: JSON.stringify(params)}
    });
};

/**
 * 保存或修改
 * @param {*} params
 */
export const save = (params) => {
    return request(URL.SAVE, {
        method : "post",
        data : params
    });
};


export const requestDelete = (id) =>  {
    return request(URL.DELETE, {
        method : "post",
        params : {id: id}
    });
};

/**
 * 获取树列表
 * @param {*} params
 */
export const getTreeNodes = (params) => {
    return mock.mockData(mock.treeData);
};

