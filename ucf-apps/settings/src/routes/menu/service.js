import request from "ucf-request";

/**
 * 服务请求类
 */
//定义接口地址
const URL = {
    "ALL_MENU":  `${GROBAL_HTTP_CTX}/funcMenu/list`,
    "SAVE": `${GROBAL_HTTP_CTX}/funcMenu/save`,
};

/**
 * 获取菜单
 * @param {*} params
 */
export const getList = (params) => {
    return request(URL.ALL_MENU, {
        method : "post",
        params : {data: JSON.stringify(params)}
    });
};


/**
 * 保存树
 * @param {*} params
 */
export const saveTree = (params) => {
    return request(URL.SAVE, {
        method : "post",
        params : params
    });
};


