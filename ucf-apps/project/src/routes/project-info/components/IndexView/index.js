/**
 * App模块
 */

import React, { Component } from 'react';
import {Tooltip, Menu, Icon, Loading} from 'tinper-bee';
import ButtonGroup from '../ButtonGroup/index';
import ListView from '../ListView/index';
import {actions} from 'mirrorx';


import './index.less';

class IndexView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading : false, //加载状态
            showListView : true, //显示列表界面
            isEdit : false,//是否可编辑(卡片界面)
            formObj: {},//当前卡片界面对象
            selectedObj:[],//列表界面被选中对象
            listObj:[],//列表对象
        };
    }

    /**
     * 切换为列表界面
     */
    switchToListView = () =>{
        this.setState({
            showListView:true
        })
    }

    /**
     * 切换为卡片界面
     */
    switchToCardView = (obj) =>{
        if(Object.keys(obj).length > 0){
            this.setState({
                formObj:this.state.selectedObj[0],
            })
        }
        this.setState({
            showListView:false,
        })
    }

    /**
     * Form表单更改编辑状态
     */
    switchEdit = () =>{
        this.setState({
            isEdit:!this.state.isEdit,
        })
    }

    /**
     * 查询方法
     */
    onQuery = (queryParam) =>{
        
        // actions.projectInfo.loadList(queryParam); 
        console.log('开始查询了11111111111');
        
    }
    
    render() {
        let paginationObj = this.props.paginationObj;
        let queryObj = this.props.queryObj;

        return (            

            <div className='project-info'>
                <Loading showBackDrop={true} show={this.state.showLoading} fullScreen={true}/>
                <ButtonGroup 
                Query={this.onQuery}
                />
                <ListView paginationObj={paginationObj} queryObj={queryObj}/>
            </div>
            
        );
    }
}

export default IndexView;
