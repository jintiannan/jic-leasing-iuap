/**
 * 下拉框
 */
import React, { Component } from "react";
import {  } from 'tinper-bee';
import { Icon, Select, Tooltip, Form } from "tinper-bee";
const Option = Select.Option;

const SELECT_SOURCE = ["男", "女"];

class SelectEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false
    };
  }

  handleSelect = value => {
    this.setState({ value });
  };

  commitChange = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            <Select
              defaultValue={this.props.value}
              value={value}
              onSelect={this.handleSelect}
              onBlur={this.commitChange}
              autoFocus
            >
              {SELECT_SOURCE.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
        ) : (
          <div className="editable-cell-text-wrapper" onClick={this.edit}>
            {value || " "}
          </div>
        )}
      </div>
    );
  }
}

export default Form.createForm()(SelectEditCell);