/**
 * 服务请求类  定义请求后台接口地址url ${GROBAL_HTTP_CTX}为全局配置在config中 + 后台controller路径
 */
import request from "axios";
//定义接口地址
const URL = {
    "POST_LOGIN":  `${GROBAL_HTTP_CTX}/sys/login`,          //验证登录
    "GET_SYSTEMTLIST" : `${GROBAL_HTTP_CTX}/sys/listSystem` //获取系统列表
}

/**
 * 验证登录用户
 * @param {} loginData 
 */
export const loginAjax = (loginData) => {
    return request(URL.POST_LOGIN, {
        method: "post",
        data: loginData,
    });
}

/**
 * 查询系统列表
 * @param {null}  
 */
export const getSystemList = () => {
    return request(URL.GET_SYSTEMTLIST, {
        method: "get",
    });
}


