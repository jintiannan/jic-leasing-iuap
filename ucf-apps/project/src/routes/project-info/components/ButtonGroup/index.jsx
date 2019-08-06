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
            tableMenuVisible:false,
         };
    }
    handleSelect = (key) => {
        console.log(key);
    }

    showTableMenu = () =>{
        this.setState({
            tableMenuVisible:true
        })
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
        return (
            <div className='table-header'>
                <Button className="ml8" colors="primary" onClick={this.props.Query}><Icon type='uf-search'/>查询</Button>
                <Dropdown trigger={['click']} overlay={tableMenu} animation="slide-up">
                    <Button className="ml8" colors="primary"><Icon type='uf-symlist'/>导出</Button>
                </Dropdown>
                <Button className="ml8 yl-r-b" colors="primary" onClick={this.props.ViewFlow}><Icon type='uf-setting-c-o'/>查看流程图</Button>
                <Button className="ml8 yl-r-b" colors="primary" onClick={this.props.Check}><Icon type='uf-seal'/>审核</Button>
                <Button disabled className="ml8 yl-r-b" colors="primary" onClick={this.props.Submit}><Icon type='uf-flow-o'/>提交</Button>
                <Button className="ml8 yl-r-b" colors="primary" onClick={this.props.Edit}><Icon type='uf-pencil-s'/>修改</Button>
                <Button className="ml8 yl-r-b" colors="primary" onClick={this.props.Add}><Icon type='uf-add-c-o'/>新增</Button>
                <Button className="ml8 yl-r-b" colors="primary" onClick={this.props.View}><Icon type='uf-files-o'/>查看</Button>
            </div>
            
        );
    }
}

export default ButtonGroup;