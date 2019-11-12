import request from "axios";

/**
 * 服务请求类
 */
//定义接口地址
const URL = {
    "ALL_MENU":  `${GROBAL_HTTP_CTX}/sys/getMenuList`,
    "ADD": `${GROBAL_HTTP_CTX}/sys/addDFuncMenu`,
    "UPDATE":`${GROBAL_HTTP_CTX}/sys/updateDFuncMenu`,
    "DELETE":`${GROBAL_HTTP_CTX}/sys/deleteDFuncMenu`,
};

/**
 * 获取菜单
 * @param {*} params
 */
export const getList = (params) => {
    return request(URL.ALL_MENU, {
        method : "post",
        data : params
    });
};


/**
 * 新增菜单数据
 * @param {*} vo
 */
export const addData = (params) => {
    return request(URL.ADD, {
        method : "post",
        data : params
    });
};

/**
 * 修改菜单数据
 * @param {*} vo
 */
export const updateData = (params) => {
    return request(URL.UPDATE, {
        method : "post",
        data : params
    });
};

/**
 * 删除菜单数据
 * @param {*} vo
 */
export const deleteData = (params) => {
    return request(URL.DELETE, {
        method : "post",
        data : params
    });
};


