import React, { Component } from 'react';
import {Icon,Dropdown, Menu} from 'tinper-bee';
import Button from 'components/Button';
import './index.less';
import 'styles/yl-public.less';
const { Item,Divider } = Menu;

class ButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         };
    }

    /**
     * 列表 && 权限
     */
    gridAndPowerView = (param,name) =>{
        let power = false;
        if(param.PowerButton && param.PowerButton.length > 0){
            power = param.PowerButton.includes(name);
        }
        let isGrid = param.isGrid ? true : false;
        return power && isGrid;
    }

    /**
     * 卡片 && 权限
     */
    formAndPowerView = (param,name) =>{
        let power = false;
        if(param.PowerButton && param.PowerButton.length > 0){
            power = param.PowerButton.includes(name);
        }
        let isGrid = param.isGrid ? false : true;
        return power && isGrid;
    }

    /**
     * 权限
     */
    powerView = (param,name) => {
        //获取用户有权限的按钮,暂时写True,构建后台后再改。
        let power = false;
        if(param.PowerButton && param.PowerButton.length > 0){
            power = param.PowerButton.includes(name);
        }
        return power;
    }    

    render() {
        const tableMenu = (
            <Menu className='tab-menu' onSelect={this.handleSelect} itemIcon={<Icon type='uf-setting-c-o'/>}>
                <Divider />
                <Item key="1">导出选中数据</Item>
                <Divider />
                <Item key="2">导出全部数据</Item>
                <Divider />
                <Item key="3">导出当前页 </Item>
                <Divider />
            </Menu>
        );

        let powerButton = this.props.BtnPower;
        return (
            <div className='table-header'>
                <Button visible={this.gridAndPowerView(powerButton,'ViewFlow')} className="ml8" colors="primary" onClick={this.props.Query}><Icon type='uf-search'/>查询</Button>
                <Dropdown trigger={['click']} overlay={tableMenu} animation="slide-up">
                    <Button visible={this.gridAndPowerView(powerButton,'Export')} className="ml8" colors="primary"><Icon type='uf-symlist'/>导出</Button>
                </Dropdown>
                <Button visible={this.formAndPowerView(powerButton,'Save')} className="ml8" colors="primary" onClick={this.props.Save}><Icon type='uf-search'/>保存</Button>
                <Button visible={!this.props.isGrid} className="ml8" colors="primary" onClick={this.props.Return}><Icon type='uf-search'/>返回</Button>
                <Button visible={this.powerView(powerButton,'ViewFlow')} className="ml8 yl-r-b" colors="primary" onClick={this.props.ViewFlow}><Icon type='uf-setting-c-o'/>查看流程图</Button>
                <Button visible={this.powerView(powerButton,'Check')} className="ml8 yl-r-b" colors="primary" onClick={this.props.Check}><Icon type='uf-seal'/>审核</Button>
                <Button visible={this.powerView(powerButton,'Submit')} disabled className="ml8 yl-r-b" colors="primary" onClick={this.props.Submit}><Icon type='uf-flow-o'/>提交</Button>
                <Button visible={this.powerView(powerButton,'Edit')} className="ml8 yl-r-b" colors="primary" onClick={this.props.Edit}><Icon type='uf-pencil-s'/>修改</Button>
                <Button visible={this.powerView(powerButton,'Add')} className="ml8 yl-r-b" colors="primary" onClick={this.props.Add}><Icon type='uf-add-c-o'/>新增</Button>
                <Button visible={this.props.isGrid} className="ml8 yl-r-b" colors="primary" onClick={this.props.View}><Icon type='uf-files-o'/>查看</Button>
            </div>
            
        );
    }
}

export default ButtonGroup;