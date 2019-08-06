
const TYPE_STRING = '0';
const TYPE_NUMBER = '1';
const TYPE_PERCENT = '2';
const TYPE_DATE = '3';
const TYPE_REF = '4';
const TYPE_ENUM = '5';
/**
 * 生成业务单据列表
 * @param {数组参数:界面列表字段描述} param
 * 0:字符串,1:数字,2:百分数,3:日期,4:参照,5:下拉
 *
 */
export function genGridColumn(param){
    let gridColumn = param.map(function(element,index,param){
        let{type,title,key,width} = element;
        if(isEmpty(width)) width = 120;
        switch(type){
            case TYPE_STRING :
                return {
                    title:title,
                    dataIndex:key,
                    key:key,
                    width: 120,
                };
            case TYPE_NUMBER :
                return {
                    
                }
            
        }



        return element+"hahah";
    });


    param.push({
        title: "会议总期数",
        dataIndex: "allnper",
        key: "allnper",
        width: 120,
        className: 'column-number-right',
        render: (text, record, index) => {
            return (<span>{(typeof text)==='number'? text.toFixed(0):""}</span>)
        }
    });
    param.push({
        title: "变更类型",
        dataIndex: "change_type",
        key: "change_type",
        width: 120,
    });
    return param;
  }