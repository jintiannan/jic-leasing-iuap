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
          title: "分录编号",
          dataIndex: "detail_no",
          key: "detail_no"
        },
        {
          title: "借贷方向",
          dataIndex: "direction",
          key: "direction",
          render: (text, record, index) => (
            <StringEditCell
            colName="借贷方向"
            value={text}
            onChange={this.onCellChange(index, "direction")}
          />
          )
        },
        {
          title: "科目",
          dataIndex: "accsubj_rule",
          key: "accsubj_rule",
          width: 100,
          render: (text, record, index) => (
            <SelectEditCell
              value={text}
              onChange={this.onCellChange(index, "accsubj_rule")}
            />
          )
        },
        {
          title: "摘要",
          dataIndex: "memo_rule",
          key: "memo_rule",
          width: 215,
          render: (text, record, index) => (
            <RefEditCell
              value={record}
              onChange={this.onCellChange(index, "memo_rule")}
            />
          )
        },
        {
          title: "发生金额",
          dataIndex: "fact_rule",
          key: "fact_rule",
          width: 215,
          render: (text, record, index) => (
            <StringEditCell
            colName="发生金额"
              value={text}
              onChange={this.onCellChange(index, "fact_rule")}
            />
          )
          
        },
        {
          title: "汇率",
          dataIndex: "exchange_rule",
          key: "exchange_rule",
          width: 215,
          render: (text, record, index) => (
            <StringEditCell
            colName="汇率"
              value={text}
              onChange={this.onCellChange(index, "exchange_rule")}
            />
          )
        },
        {
          title: "币种",
          dataIndex: "currtype_rule",
          key: "currtype_rule",
          width: 215,
          render: (text, record, index) => (
              <StringEditCell
                  colName="币种"
                  value={text}
                  onChange={this.onCellChange(index, "currtype_rule")}
              />
          )
        },
        {
          title: "辅助核算",
          dataIndex: "free_value_rule_temp",
          key: "free_value_rule_temp",
          width: 215,
          render: (text, record, index) => (
              <StringEditCell
                  colName="辅助核算"
                  value={text}
                  onChange={this.onCellChange(index, "free_value_rule_temp")}
              />
          )
        },
        {
          title: "结算日期",
          dataIndex: "account_date",
          key: "account_date",
          width: 215,
          render: (text, record, index) => (
              <StringEditCell
                  colName="结算日期"
                  value={text}
                  onChange={this.onCellChange(index, "account_date")}
              />
          )
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