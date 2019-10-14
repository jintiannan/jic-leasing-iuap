import request from "ucf-request";
import * as mock from "./mock";

/**
 * 服务请求类
 */
//定义接口地址
//请求枚举字典URL  后台暂未修改
const URL = {
    "GET_DICT":  `${GROBAL_HTTP_CTX}/dict/list`,
};

/**
 * 获取枚举字典数据
 * @param {*} params
 */
export const getList = (params) => {
    // return request(URL.GET_DICT, {
    //     method : "post",
    //     params : {data: JSON.stringify(params)}
    // });
    let data =  mock.mockData(mock.data);
    return data;
};

/**
 * 获取子表数据
 * @param {*} params
 */
export const getDictItemList = (param) => {
    // return request(URL.GET_DICT, {
    //     method : "post",
    //     param : {data: JSON.stringify(params)}
    // });
    let data =  mock.mockData(mock.data);
    let result ={'status':'200','data' : null}
    data.data.map(function (item, index) {
        if(item.pkParamType==param.search_dictId){
            result.data=item;
        }
    })
    return result;
}




