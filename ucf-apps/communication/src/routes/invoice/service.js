/**
 * 服务请求类  定义请求后台接口地址url ${GROBAL_HTTP_CTX}为全局配置在config中 + 后台controller路径
 */
import {requestBusiness} from "utils/business";
//定义接口地址
const URL = {
    "LIST":  `${GROBAL_HTTP_CTX}/communication/cbInvoiceApply/queryForGrid`,
    "SUB_LIST": `${GROBAL_HTTP_CTX}/communication/cbInvoiceApply/subList`,
    "SUB_NOT_INVOICE_LIST": `${GROBAL_HTTP_CTX}/communication/cbInvoiceApply/subNotInvoice`,
    "SAVE": `${GROBAL_HTTP_CTX}/communication/cbInvoiceApply/save`,
    "UPDATE_STATUS": `${GROBAL_HTTP_CTX}/communication/cbInvoiceApply/updateBillstatus`,
    "UPDATE_STATUS_REJECTED": `${GROBAL_HTTP_CTX}/communication/cbInvoiceApply/updateBillstatusRejected`,
    "LIST_REJECT_INFO": `${GROBAL_HTTP_CTX}/communication/cbInvoiceApply/getListRejectInfo`,
    "SEND_VOUCHER": `${GROBAL_HTTP_CTX}/communication/cbInvoiceApply/sendVoucher`,
}

/**
 * 获取主列表
 * @param {*} params
 */
export const getList = (params) => {
    /**
     * 不对接后台时直接使用mock.js中的假数据 并将结果集封装成为请求返回的形式 data+status的形式
     */
    return requestBusiness(params, URL.LIST);
};
export const getSubList = (params) => {
    return requestBusiness(params,URL.SUB_LIST);
};

export const getSubNotInvoice = (params) => {
    return requestBusiness(params,URL.SUB_NOT_INVOICE_LIST);
};
export const save = (selected) => {
    return requestBusiness(selected, URL.SAVE);
};

export const updateBillstatus = (selected) => {
    return requestBusiness(selected, URL.UPDATE_STATUS);
};

export const updateBillstatusRejected = (selectedList) => {
    return requestBusiness(selectedList, URL.UPDATE_STATUS_REJECTED);
};

export const getListRejectInfo = (params) => {
    return requestBusiness(params, URL.LIST_REJECT_INFO);
};
export const sendVoucher = (params) => {
    return requestBusiness(params, URL.SEND_VOUCHER);
};

