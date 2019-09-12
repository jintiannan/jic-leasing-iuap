/**
 * 下拉框
 */
import React, { Component } from "react";
import {  } from 'tinper-bee';
import { Icon, Select, Tooltip, Form } from "tinper-bee";
import DatePicker from "tinper-bee/lib/Datepicker";


class DatePickerEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: this.props.editable
    };
  }

  handleSelect = value => {
    this.setState({ value });
  };

  commitChange = () => {
    //this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  edit = () => {
    if(this.state.editable){
      this.setState({ editable: true });
    }
  };

  render() {
    const { value } = this.state;
    const { editable, format} = this.props;
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            <DatePicker
              defaultValue={this.props.value}
              value={value}
              format = {format?format:"YYYY-MM-DD"}
              onSelect={this.handleSelect}
              onBlur={this.commitChange}
              autoFocus
            >
            </DatePicker>
          </div>
        ) : (
          <div className="editable-cell-text-wrapper" onDoubleClick={this.edit.bind(this)}>
            {this.props.value || ""}
          </div>
        )}
      </div>
    );
  }
}

export default Form.createForm()(DatePickerEditCell);