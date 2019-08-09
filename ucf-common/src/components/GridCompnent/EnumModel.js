import React, { Component } from 'react';
import {Select} from "tinper-bee";
import {enumConstant} from "utils/enums";
import './index.less';

class EnumModel extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }


    render() {
        let {type,text,record,index} = this.props;
        let data = enumConstant(type);
        return (
            <div>
                {record._edit ? <div className="enum_model">
                <Select 
                    showSearch
                    placeholder="请选择..."
                    optionFilterProp="children"
                    data={data}
                    /></div> : <div>{text ? text : ""}</div>}
            </div>
            
        );
    }
}

export default EnumModel;