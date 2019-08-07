import React, { Component } from 'react';
import SelectField from 'components/RowField/SelectField'
import {enumConstant} from "utils/enums";

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
                {record._edit ?
                <Select
                    showSearch
                    placeholder="请选择..."
                    optionFilterProp="children"
                    data={data}
                    /> : <div>{text ? text : ""}</div>}
            </div>
            
        );
    }
}

export default EnumModel;