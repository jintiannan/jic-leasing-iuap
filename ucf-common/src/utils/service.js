import PropTypes from 'prop-types';
import moment from 'moment';
import EnumModel from 'components/GridCompnent/EnumModel';
import {deepClone, Info} from "utils";
const TYPE_STRING = '0';
const TYPE_NUMBER = '1';
const TYPE_PERCENT = '2';
const TYPE_DATE = '3';
const TYPE_TIME = '4';
const TYPE_REF = '5';
const TYPE_ENUM = '6';
import StringModel from 'components/GridCompnent/StringModel'

const dateFormat = "YYYY-MM-DD";
const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";
/**
 * 生成业务单据列表
 * @param {数组参数:界面列表字段描述} param
 * 0:字符串,1:数字,2:百分数,3:日期,4:日期时间,5:参照,6:下拉
 *
 */
export function genGridColumn(param){
    let gridColumn = param.map(function(element,index,param){
        let{type,title,key,width,digit,enumType,ifshow} = element;
        if(ifshow == null) ifshow = true; //ifshow:false 不显示该列  默认全显示 true
        if(width == null) width = 120;
        if(digit == null) digit = 0;

        switch(type){
            case TYPE_STRING :
                return {
                    title:title,
                    dataIndex:key,
                    key:key,
                    ifshow:ifshow,
                    width: width,
                    sorter: (pre, after) => {
                        if(pre[key].length > after[key].length){
                            return 1;
                        } else {
                            return pre[key].localeCompare(after[key],'zh-CN')
                        }
                    },
                    render: (text, record, index) => {
                        return <StringModel text={text} record={record} index={index} dataIndex={key}/>
                    }
                };
            case TYPE_NUMBER :
                return {
                    title:title,
                    dataIndex:key,
                    key:key,
                    width: width,
                    sorter: (pre, after) => {return pre[key] - after[key]},
                    className:'column-number-right',
                    render: (text, record, index) => {
                        return (<span>{(typeof text)==='number'? text.toFixed(digit):""}</span>)
                    }
                };
            case TYPE_PERCENT :
                return {
                    title:title,
                    dataIndex:key,
                    key:key,
                    width: width,
                    sorter: (pre, after) => {return pre[key] - after[key]},
                    className:'column-number-right',
                    render: (text, record, index) => {
                        return (<span>{(typeof text)==='number'? (text * 100).toFixed(digit).toString + '%':""}</span>)
                    }
                };
            case TYPE_DATE :
                return {
                    title: title,
                    dataIndex: key,
                    key: key,
                    width: width,
                    sorter: (pre, after) => {return new Date(pre[key]).getTime() - new Date(after[key]).getTime()},
                    render: (text, record, index) => {
                        return <div>{text ? moment(text).format(dateFormat) : ""}</div>

                    }
                };
            case TYPE_TIME :
                return {
                    title: title,
                    dataIndex: key,
                    key: key,
                    width: width,
                    sorter: (pre, after) => {return new Date(pre[key]).getTime() - new Date(after[key]).getTime()},
                    render: (text, record, index) => {
                        return <div>{text ? moment(text).format(dateTimeFormat) : ""}</div>

                    }
                };
            case TYPE_REF :
                return {
                    title: title,
                    dataIndex: key,
                    key: key,
                    width: width,
                    render: (text, record, index) => {
                        return <div>{text ? moment(text).format(dateTimeFormat) : ""}</div>

                    }
                };
            case TYPE_ENUM :
                return {
                    title: title,
                    dataIndex: key,
                    key: key,
                    width: width,
                    sorter: (pre, after) => {
                        if(pre[key].length > after[key].length){
                            return 1;
                        } else {
                            return pre[key].localeCompare(after[key],'zh-CN')
                        }
                    },
                    render: (text, record, index) => {
                        return (<EnumModel type={enumType} text={text} record={record} index={index}/>)
                    }
                };

        }
    });
    return gridColumn;
  }


/*******************************常用业务校验函数************************************/
/**
 * 单条业务数据操作
 * @param {*} param
 * @param {*} fn
 */
export function singleRecordOper(param = [],fn =(obj) => {}){
    if(param && param.length > 0){
        if(param.length > 1){
            let msg = `您当前选中 ${param.length} 条数据,只能选择 1 条数据!`;
            Info(msg);
        } else {
            console.log(param[0]);
            fn(param[0])
        }

    } else {
        Info("您当前选中 0 条数据,请选择 1 条数据后再进行操作!");
    }
}

/**
 *
 * @param {页面对象} param
 * @param {状态权限集合} status
 */
export function checkBillStatus(param={},status=[]){
    if(status && status.length > 0){
        return status.includes(param['billstatus']);
    } else {
        return true;
    }
}
