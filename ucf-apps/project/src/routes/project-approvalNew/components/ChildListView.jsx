/**
 *字表列标配
 */
import React, { Component } from "react";
import {  } from 'tinper-bee';
import { Icon, Select, Tooltip, Form, Table } from "tinper-bee";
import SelectEditCell from './SelectEditCell';
import StringEditCell from './StringEditCell';
import RefEditCell from './RefEditCell';

const dataSource = [
    {
      a: "ASVAL_201903280005",
      b: "小张",
      c: "男",
      d: {
        code: "dept1_2",
        entityType: "subEntity",
        organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
        name: "财务二科",
        pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
        refcode: "dept1_2",
        refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
        id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
        isLeaf: "true",
        refname: "财务二科"
      },
      e: "10次",
      f: "等额本金",
      key: "1"
    },
    {
      a: "ASVAL_201903200004",
      b: "小明",
      c: "男",
      d: {
        code: "dept1_2",
        entityType: "subEntity",
        organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
        name: "财务二科",
        pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
        refcode: "dept1_2",
        refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
        id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
        isLeaf: "true",
        refname: "财务二科"
      },
      e: "10次",
      f: "等额本金",
      key: "2"
    },
    {
      a: "ASVAL_201903120002",
      b: "小红",
      c: "女",
      d: {
        code: "dept1_1",
        entityType: "subEntity",
        organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
        name: "财务一科",
        pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
        refcode: "dept1_1",
        refpk: "9711d912-3184-4063-90c5-1facc727813c",
        id: "9711d912-3184-4063-90c5-1facc727813c",
        isLeaf: "true",
        refname: "财务一科"
      },
      e: "10次",
      f: "等额本金",
      key: "3"
    }
  ];
  
  class ChildListView extends Component {
    constructor(props, context) {
      super(props);
      this.columns = [
        {
          title: "报价编号",
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
            onChange={this.onCellChange(index, "b")}
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
        {
          title: "报价类型",
          dataIndex: "d",
          key: "d",
          width: 215,
          render: (text, record, index) => (
            <RefEditCell
              value={record}
              onChange={this.onCellChange(index, "d")}
            />
          )
        },
        {
          title: "还款频率",
          dataIndex: "e",
          key: "e",
          width: 215,
          render: (text, record, index) => (
            <RefEditCell
              value={record}
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
            <RefEditCell
              value={record}
              onChange={this.onCellChange(index, "f")}
            />
          )
        },
        {
          key: "placeholder"
        }
      ];
  
      this.state = {
        dataSource: dataSource
      };
    }
  
    onCellChange = (index, key) => {
      return value => {
        const { dataSource } = this.state;
        dataSource[index][key] = value;
        this.setState({ dataSource }, () => console.dir(this.state.dataSource));
      };
      
    };
  
    render() {
      return (
        <div className="demo0502 u-editable-table">
          <Table data={this.state.dataSource} columns={this.columns} headerHeight={40} height={40}/>
        </div>
      );
    }
  }
  export default Form.createForm()(ChildListView);