/**
 *字表列标配
 */
import React, { Component } from "react";
import {  } from 'tinper-bee';
import { Icon, Select, Tooltip, Form, Table } from "tinper-bee";
import SelectEditCell from 'components/FormRef/SelectEditCell';
import StringEditCell from 'components/FormRef/StringEditCell';
import RefEditCell from 'components/FormRef/RefEditCell';

  
  class ChildListView extends Component {
    constructor(props, context) {
      super(props);
      this.state = {
        //表数据
        dataSource: []
      };
    }
  
    //输入框变化事件
    onCellChange = (index, key) => {
      return value => {
        let dataSource = this.props.state.dataSource;
        dataSource[index][key] = value;
        this.setState({ dataSource }, () => console.dir(this.state.dataSource));
      };
      
    };
  
    render() {

        let columns = [];
        //可编辑
        if(this.props.props.isEdit){
            //表头
            columns = [
            {
              title: "序号",
              dataIndex: "a",
              key: "a"
            },
            {
              title: "限额方案",
              dataIndex: "b",
              key: "b",
              render: (text, record, index) => (
      
                <StringEditCell
                colName="名字"
                value={text}
                onChange={this.onCellChange(index, "b").bind(this)}
              />
              )
            },
            {
              title: "租赁期限",
              dataIndex: "c",
              key: "c",
              width: 100,
              render: (text, record, index) => (
                <SelectEditCell
                  value={text}
                  onChange={this.onCellChange(index, "c")}
                />
              )
            },
            // {
            //   title: "报价类型",
            //   dataIndex: "d",
            //   key: "d",
            //   width: 215,
            //   render: (text, record, index) => (
            //     <RefEditCell
            //       value={record}
            //       onChange={this.onCellChange(index, "d")}
            //     />
            //   )
            // },
            {
              title: "限额方案",
              dataIndex: "e",
              key: "e",
              width: 215,
              render: (text, record, index) => (
                <StringEditCell
                  colName="限额方案"
                  value={text}
                  onChange={this.onCellChange(index, "e")}
                />
              )
              
            },
            {
              title: "计算方式",
              dataIndex: "f",
              key: "f",
              width: 215,
              render: (text, record, index) => (
                <StringEditCell
                  colName="计算方式"
                  value={text}
                  onChange={this.onCellChange(index, "f")}
                />
              )
            },
            {
              key: "placeholder"
            }
          ];
        }else{

            //不可编辑
            columns = [
            {
              title: "序号",
              dataIndex: "a",
              key: "a"
            },
            {
              title: "限额方案",
              dataIndex: "b",
              key: "b",
              
              
            },
            {
              title: "租赁期限",
              dataIndex: "c",
              key: "c",
              width: 100,
              
            },
            // {
            //   title: "报价类型",
            //   dataIndex: "d",
            //   key: "d",
            //   width: 215,
            
            // },
            {
              title: "限额方案",
              dataIndex: "e",
              key: "e",
              width: 215,
              
              
            },
            {
              title: "计算方式",
              dataIndex: "f",
              key: "f",
              width: 215,
            },
            {
              key: "placeholder"
            }
          ];

        }
        
        return (
          <div className="demo0502 u-editable-table">
            <Table data={this.props.state.dataSource} columns={columns} headerHeight={40} height={40}/>
          </div>
        );
      
    }
  }
  export default Form.createForm()(ChildListView);