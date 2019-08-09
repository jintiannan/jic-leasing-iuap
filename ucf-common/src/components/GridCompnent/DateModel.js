import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from "tinper-bee/lib/Datepicker";
import './index.less';
class DateModel extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }


    render() {
        let {text,record,index,dateFormat} = this.props;
        return (
            <div>
                {record._edit ?<div className = "date_model">
                <DatePicker
                    format={dateFormat}
                    defaultValue={moment()}
                    placeholder="选择日期..."
                    /></div> : <div>{text ? moment(text).format(dateFormat) : ""}</div>}
            </div>
            
        );
    }
}

export default DateModel;