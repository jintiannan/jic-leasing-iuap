import React, { Component } from 'react';
import './index.less';
import {FormControl} from "tinper-bee";

class StringModel extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    handleChange =(value)=>{
        
        debugger;
    }


    render() {
        let {text,record,index,dataIndex} = this.props;
        return (
            <div>
                {record._edit ?<div className="string_model">
                <FormControl
                    placeholder="请输入..."
                    defaultValue={text}
                    onChange={this.handleChange}
                    /></div> : <div>{text ? text : ""}</div>}
            </div>
            
        );
    }
}

export default StringModel;