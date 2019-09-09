/**
 * string
 */
import React, { Component } from "react";
import {  } from 'tinper-bee';
import { Icon, Select, Tooltip, Form } from "tinper-bee";

class StringEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: this.props.editable
    };
    this.editWarp = React.createRef();
  }

  commitChange = () => {
    if (this.state.value === "") return;
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  edit = () => {
    if(this.state.editable){
      this.setState({ editable: true });
    }
  };

  handleKeydown = event => {
    if (event.keyCode == 13) {
      this.commitChange();
    }
  };

  handleChange = e => {
    if (e.target.value === "") this.editWarp.className += " verify-cell";
    this.setState({ value: e.target.value });
  };

  render() {
    const { value } = this.state;
    const { editable } = this.props;
    return (
      
      <div className="editable-cell">
        {editable ? (
          <div ref={el => this.editWarp = el} className="editable-cell-input-wrapper">
            <input
              className={value ? "u-form-control" : "u-form-control error"}
              autoFocus
              defaultValue={this.props.value}
              value={value}
              onKeyDown={this.handleKeydown}
              onChange={this.handleChange}
              onBlur={this.commitChange}
            />
            {value === "" ? (
              <Tooltip
                inverse
                className="u-editable-table-tp"
                placement="bottom"
                overlay={
                  <div className="tp-content">
                    {"请输入" + this.props.colName}
                  </div>
                }
              >
                <Icon className="uf-exc-t require" />
              </Tooltip>
            ) : null}
          </div>
        ) : (
          <div className="editable-cell-text-wrapper" onDoubleClick={this.edit}>
            {this.props.value || " "}
          </div>
        )}
      </div>
    );
  }
}

export default Form.createForm()(StringEditCell);