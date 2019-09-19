/**
 * App模块
 */

import React, { Component } from 'react';
import {Form} from 'tinper-bee';
import ListView from './ListView';
import {actions} from 'mirrorx';
import {deepClone} from "utils";

import './index.less';


class IndexView extends Component {
    constructor(props) {
        super(props);
        this.state = {        
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
        
    }
    

    render() {
        return (            

            <div className='task_center'>
                <div>
                    <ListView {...this.props} />
                </div>
            </div>
            
        );
    }
}

export default Form.createForm()(IndexView);
