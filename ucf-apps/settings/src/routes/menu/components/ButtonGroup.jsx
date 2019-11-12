import React, { Component } from 'react';
import {Icon,Dropdown, Menu} from 'tinper-bee';
import Button from 'components/Button';
import './index.less';
import 'styles/yl-public.less';
import {checkBillStatus} from "utils/service";


const { Item,Divider } = Menu;

class ButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            power:props.BtnPower,
         };
    }

    /**
     * 按钮权限
     */
    powerView = (param,name) => {
        //获取用户有权限的按钮,暂时写True,构建后台后再改。
        let power = false;
        alert(name);
        if(param.powerButton && param.powerButton.length > 0){
            power = param.powerButton.includes(name);
        }
        console.log(power)
        return power;
    };

    /**
     * 编辑状态下 =>可用
     */
    powerDisabledEdit = (param) =>{
        let isEdit = param.isEdit;
        return !isEdit;
    };

    /**
     * 不可编辑状态 =>可用
     */
    powerDisabledUnEdit = (param) =>{
        let isEdit = param.isEdit;
        return isEdit;
    };

    //菜单删除按钮判断是否可用
    powerdeleteDisabled = (param) =>{
        if(param.SelectformObj!=undefined&&param.SelectformObj.funcCode!=undefined){
            if(param.SelectformObj.funcCode=='0'||param.SelectformObj.ifFirstEnabled){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }

    //菜单修改按钮判断是否可用
    powereditDsiabled =(param)=>{
        if(param.SelectformObj!=undefined&&param.SelectformObj.funcCode!=undefined){
            if(param.SelectformObj.funcCode=='0'){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }

    render() {
        let _props = this.props;
        let _this = this;

        return (
            <div className='table-header'>
                <Button visible={_props.isEdit} disabled={_this.powerDisabledEdit(_props)} className="ml8 yl-r-b" colors="primary" onClick={_props.Save}><Icon type='uf-search'/>保存</Button>
                <Button visible={_props.isEdit} className="ml8 yl-r-b" colors="primary" onClick={_props.Cancel}><Icon type='uf-repeat'/>取消</Button>
                <Button visible={!_props.isEdit } disabled={_this.powerdeleteDisabled(_props)} className="ml8 yl-r-b" colors="primary" onClick={_props.Delete}><Icon type='uf-del'/>删除</Button>
                <Button visible={!_props.isEdit  } disabled={_this.powereditDsiabled(_props)} className="ml8 yl-r-b" colors="primary" onClick={_props.Edit}><Icon type='uf-pencil-s'/>修改</Button>
                <Button visible={true} disabled={_this.powerDisabledUnEdit(_props)} className="ml8 yl-r-b" colors="primary" onClick={_props.Add}><Icon type='uf-add-c-o'/>新增</Button>       
            </div>
        );
    }
}

export default ButtonGroup;
