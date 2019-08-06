import React, { Component } from 'react';
import SelectField from 'components/RowField/SelectField'
import {enumConstant} from "utils/enums";

class EnumModel extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }


    render() {
        // let data = enumConstant(this.props.type);
        let data = enumConstant("billstatus");
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        return (            
            // <div>
            //     <SelectField
            //         data={data}
            //     />
            // </div>
            <div>
                <SelectField data={data}/>
            </div>
            
        );
    }
}

export default EnumModel;