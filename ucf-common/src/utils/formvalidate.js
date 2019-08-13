 const FIRSPACE = 0; //删除空格
 const NUMBER = 1;   //全数字
 const CHARACTER =2; //全汉字
 const PHONE = 3;    //手机号
 const IDCARD = 4;   //身份证号
 const EMAIL = 5;    //邮箱@
 const MONEY = 6;    //金额(钱)
 //上述通用 下述自增
 const CONTACTNAME =7 //联系人姓名   //系统所带  目前以上部为准使用
 const CONTRACTTEL = 8 //联系人电话
 const PASSENGER =9 //与乘客关系
 const DEPART = 10 //选择部门
 const WORKAGE = 11 //工龄  
 /**
 * 正则表达式的引用校验,具体到表单组件封装使用
 * @param {正则表达式代表参数} param
 * 0.首位空白字符清除,1:空白格清除,2:全数字,3:全中文,4:手机号,5:身份证号,6:邮箱,7:金额(钱)
 */
 export function validateType (param){
    let vatype = null;
    if(param==null) return null;
    else if(param==0) vatype = FIRSPACE
    else if(param==1) vatype = NUMBER
    else if(param==2) vatype = CHARACTER
    else if(param==3) vatype = PHONE
    else if(param==4) vatype = IDCARD
    else if(param==5) vatype = EMAIL
    else if(param==6) vatype = MONEY
    else if(param==7) vatype = CONTACTNAME
    else if(param==8) vatype = CONTRACTTEL
    else if(praam==9) vatype = PASSENGER
    else if(param==10) vatype = DEPART
    else if(param==11) vatype = WORKAGE
   
        if(vatype==null) return null;

        switch(vatype){
            case FIRSPACE : return '/^\s+|\s+$/g';
            case NUMBER : return '^[0-9]*$'; 
            case CHARACTER : return '^[\u4e00-\u9fa5]{0,}$';
            case PHONE : return '^((13[0-9])|(15[^4,\\D])|(18[0,0-9]))\\d{8}$';
            case IDCARD : return '^((\d{18})|([0-9x]{18})|([0-9X]{18}))$';
            case EMAIL : return '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$';
            case MONEY : return '^[1-9][0-9]*$';   //^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$ 注解的正则为识别金钱格式 类似'100,00这种' 
            //下方自增
            case CONTACTNAME : return '/\S+/ig';
            case CONTRACTTEL : return '/^[1][3,4,5,7,8][0-9]{9}$/';
            case PASSENGER : return '/\S+/ig';
            case DEPART : return ' /[^({"refname":"","refpk":""}|{"refpk":"","refname":""})]/';
            case WORKAGE : return '/^[0-9]+$/';
        }
 }