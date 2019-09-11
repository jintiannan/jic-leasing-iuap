/**
 * 金额 千分位
 */
import React, { Component } from "react";
import {  } from 'tinper-bee';
import { Icon, InputNumber, Tooltip, Form } from "tinper-bee";

class NumberEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: parseInt(this.props.value),
      editable: this.props.editable
    };
  }

  // handleSelect = value => {
  //   this.setState({ value });
  // };

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
    const { editable } = this.props;
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            <InputNumber
              defaultValue={this.props.value?parseInt(this.props.value):0}
              value={value}
              //onSelect={this.handleSelect}
              onBlur={this.commitChange}
              autoFocus
              iconStyle="one"
              toThousands = {true}  //是否显示千分位
              precision = {2}
              // min={0}
              // max={999999}
            />
          </div>
        ) : (
          <div className="editable-cell-text-wrapper" onDoubleClick={this.edit.bind(this)}>
            {this.props.value?parseInt(this.props.value):0 || ""}
          </div>
        )}
      </div>
    );
  }
}

export default Form.createForm()(NumberEditCell);