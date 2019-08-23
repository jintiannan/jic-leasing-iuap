import request from "axios";
//定义接口地址
const URL = {
    "ENUM_CONSTANT": `${GROBAL_HTTP_CTX}/sales/list`
};


export function enumConstant(type) {
    // return request(URL.ENUM_CONSTANT, {
    //     method: "post",
    //     params: type
    // });

    /* ↓使用临时数据↓ */
    switch (type) {
        case "billstatus": //工厂
            return [{key: '审核通过', value: '9'}, {key: '暂存', value: '20'}];
            break;
        case 'yesOrNo':
            return [{value: "0", key: '是'}, {value: '1', key: '否'}];
        default:
            break;
    }
}
