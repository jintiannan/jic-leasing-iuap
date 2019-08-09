import React, { Component } from 'react';
import './index.less';
import {FormControl} from "tinper-bee";

class StringModel extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }


    render() {
        let {text,record,index} = this.props;
        return (
            <div>
                {record._edit ?<div className="string_model">
                <FormControl
                    placeholder="请输入..."
                    /></div> : <div>{text ? text : ""}</div>}
            </div>
            
        );
    }
}

export default StringModel;