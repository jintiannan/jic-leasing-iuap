/**
 * 服务请求类
 */
import request from 'ucf-request';
import * as mock from "./mock";
//定义接口地址
const URL = {
    "LIST":  `${GROBAL_HTTP_CTX}/customerCorpApply/list`,
    "SAVE": `${GROBAL_HTTP_CTX}/customerCorpApply/saveOrUpdate`,
    "DELETE": `${GROBAL_HTTP_CTX}/customerCorpApply/delete`,
};

/**
 * 获取主列表
 * @param {*} params
 */
export const getList = (params) => {
    return request(URL.LIST, {
        method : "post",
        params : {data: JSON.stringify(params)}
    });
};

/**
 * 保存或修改
 * @param {*} params
 */
export const save = (params) => {
    return request(URL.SAVE, {
        method : "post",
        params : {data: JSON.stringify(params)}
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

