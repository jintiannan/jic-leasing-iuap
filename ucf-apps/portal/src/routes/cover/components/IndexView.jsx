/**
 * App模块
 */

import React, { Component } from 'react';
import {Loading,Form} from 'tinper-bee';
import {actions} from 'mirrorx';
import {deepClone} from "utils";

import './index.less';
import PendingView from './PendingView';
import CronView from './CronView';
import NoticeView from './NoticeView';
import StaticPicView from './StaticPicView';
import AnnouceView from './AnnouceView';

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
    

    //待办子组件绑定 可能需要做表单处理
    onpendRef = (ref) => {
        this.pending = ref;        
    }


    render() {
        return (            

            <div className='main_cover'>
                <div className = 'cover_high'>
                    <div className = 'cover_high_left'>
                        <StaticPicView {...this.props} />
                    </div>
                    <div className = 'cover_high_right'>
                        {/*<CronView {...this.props} />*/}
                        <AnnouceView {...this.props}  />
                    </div>
                </div>
                <div className = 'cover_low'>
                    <div className = 'cover_low_left'>
                        <PendingView {...this.props} onpendRef={this.onpendRef} />
                    </div>
                    <div className = 'cover_low_right'>
                        <NoticeView {...this.props} />
                    </div>

                </div>
            </div>
            
        );
    }
}

export default Form.createForm()(IndexView);
