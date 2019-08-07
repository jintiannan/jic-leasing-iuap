import PropTypes from 'prop-types';
import EnumModel from 'components/GridCompnent/EnumModel';

const TYPE_STRING = '0';
const TYPE_NUMBER = '1';
const TYPE_PERCENT = '2';
const TYPE_DATE = '3';
const TYPE_TIME = '4';
const TYPE_REF = '5';
const TYPE_ENUM = '6';

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
        let{type,title,key,width,digit,enumType,isEdit} = element;
        if(width == null) width = 120;
        if(digit == null) digit = 0;

        switch(type){
            case TYPE_STRING :
                return {
                    title:title,
                    dataIndex:key,
                    key:key,
                    width: width,
                };
            case TYPE_NUMBER :
                return {
                    title:title,
                    dataIndex:key,
                    key:key,
                    width: width,
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
                    render: (text, record, index) => {
                        return (<EnumModel type={enumType} text={text} record={record} index={index}/>)
                    }
                };

        }
    });
    return gridColumn;
  }
