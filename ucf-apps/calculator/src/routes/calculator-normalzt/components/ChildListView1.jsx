/**
 *字表列标配
 */
import React, { Component } from "react";
import {  } from 'tinper-bee';
import { Icon, Select, Tooltip, Form, Table } from "tinper-bee";
import SelectEditCell from 'components/FormRef/SelectEditCell';
import StringEditCell from 'components/FormRef/StringEditCell';
import RefEditCell from 'components/FormRef/RefEditCell';
import TableFormRef from 'components/FormRef/TableFormRefChild';
import NumberEditCell from 'components/FormRef/NumberEditCell';
import DatePickerEditCell from 'components/FormRef/DatePickerEditCell';



import { deepClone } from "utils";
  class ChildListView extends Component {
    constructor(props, context) {
      super(props);
      this.state = {
          //表数据
          dataSource: [
            {
              index: "1",
              editable: this.props.props.isEdit,
                
             }
        ],
        //表头
        columns: [
          {
            title: "序号",
            dataIndex: "index",
            key: "index"
          },
          {
            title: "计划投放日期",
            dataIndex: "plan_date_loan",
            key: "plan_date_loan",
            width: 215,
            render: (text, record, index) => (
              <DatePickerEditCell
              format = {"YYYY-MM-DD"} //默认可自定义
              value={text}
              editable = {record.editable}
              onChange={this.onCellChange(index, "plan_date_loan").bind(this)}
            />
            )
          },
          {
            title: "投放金额(元)",
            dataIndex: "plan_cash_loan",
            key: "plan_cash_loan",
            width: 215,
            render: (text, record, index) => (
              <NumberEditCell
                value={text}
                toThousands = {true}  //是否显示千分位  默认true
                precision = {2} //默认2
                editable = {record.editable}
                onChange={this.onCellChange(index, "plan_cash_loan")}
                />
            )
          },
          {
            title: "不含税投放金额(元)",
            dataIndex: "plan_cash_corpus",
            key: "plan_cash_corpus",
            width: 215,
            render: (text, record, index) => (
              <NumberEditCell
                value={text}
                editable = {record.editable}
                toThousands = {true}  //是否显示千分位  默认true
                precision = {2} //默认2
                onChange={this.onCellChange(index, "plan_cash_corpus")}
              />
            )
          },
          {
            title: "税率",
            dataIndex: "tax_rate",
            key: "tax_rate",
            width: 215,
            render: (text, record, index) => {
              return <SelectEditCell
                  value={text}
                  editable = {record.editable}
                  data = {[{name:'3%',value:'3'},{name:'6%',value:'6'},{name:'17%',value:'17'}
                        ,{name:'0%',value:'0'},{name:'11%',value:'11'},{name:'16%',value:'16'},{name:'10%',value:'10'}
                        ,{name:'13%',value:'13'},{name:'9%',value:'9'}]}
                  onChange={this.onCellChange(index, "tax_rate")}
                  />
              }  
          },
          {
            title: "税额(元)",
            dataIndex: "tax_cash",
            key: "tax_cash",
            width: 215,
            render: (text, record, index) => (
              <NumberEditCell
                value={text}
                toThousands = {true}  //是否显示千分位  默认true
                precision = {2} //默认2
                editable = {record.editable} //是否可编辑
                onChange={this.onCellChange(index, "tax_cash")}
              />
            )
          },
          {
            title: "投放付款方式",
            dataIndex: "pay_method_loan",
            key: "pay_method_loan",
            width: 215,
            render: (text, record, index) => (
              <SelectEditCell
              value={text}
              editable = {record.editable}
              data={[{name:'现金',value:'0'},{name:'银票',value:'1'}]}
              onChange={this.onCellChange(index, "g").bind(this)}
            />
            )
          },
          {
            title: "银票开票日期",
            dataIndex: "make_date_draft",
            key: "make_date_draft",
            width: 215,
            render: (text, record, index) => (
              <DatePickerEditCell
              value={text}
              format = {"YYYY-MM-DD"} //默认可自定义
              editable = {record.editable}
              onChange={this.onCellChange(index, "make_date_draft").bind(this)}
            />
            )
          },
          {
            title: "银票到期日期",
            dataIndex: "end_date_loan",
            key: "end_date_loan",
            width: 215,
            render: (text, record, index) => (
              <DatePickerEditCell
              format = {"YYYY-MM-DD"} //默认可自定义
              value={text}
              editable = {record.editable}
              onChange={this.onCellChange(index, "end_date_loan").bind(this)}
            />
            )
          },
          {
            title: "银票保证金比例",
            dataIndex: "deposit_ratio4draft",
            key: "deposit_ratio4draft",
            width: 215,
            render: (text, record, index) => (
              <SelectEditCell
              value={text}
              editable = {record.editable}
              data = {[]}
              onChange={this.onCellChange(index, "deposit_ratio4draft").bind(this)}
            />
            )
          },
          {
            title: "银票保证金利率",
            dataIndex: "interrate_ratio4draft",
            key: "interrate_ratio4draft",
            width: 215,
            render: (text, record, index) => (
              <SelectEditCell
              value={text}
              editable = {record.editable}
              data={[{name:'3%',value:'3'},{name:'6%',value:'6'},{name:'17%',value:'17'}
                        ,{name:'0%',value:'0'},{name:'11%',value:'11'},{name:'16%',value:'16'},{name:'10%',value:'10'}
                        ,{name:'13%',value:'13'},{name:'9%',value:'9'}]}
              onChange={this.onCellChange(index, "interrate_ratio4draft").bind(this)}
            />
            )
          },
          {
            title: "计息金额计算方式",
            dataIndex: "calinter_amount_style",
            key: "calinter_amount_style",
            width: 215,
            render: (text, record, index) => (
              <SelectEditCell
              value={text}
              editable = {record.editable}
              data={[{name:'全额起息',value:'0'}]}
              onChange={this.onCellChange(index, "calinter_amount_style").bind(this)}
            />
            )
          }
        ]
      };
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
      this.props.onRef(this); //绑定子组件
      //修改时 限定某个字段不可编辑
      
    }
  
    //输入框变化事件
    onCellChange = (index, key) => {
      return value => {
        let dataSource = this.state.dataSource;
        dataSource[index][key] = value;
        this.setState({ dataSource }, () => console.dir(this.state.dataSource));
      };
      
    };
  
    render() { 
        return (
          <div className="demo0502 u-editable-table">
            <Table data={this.state.dataSource} columns={this.state.columns} headerHeight={40} height={40}/>
          </div>
        );
      
    }
  }
  export default Form.createForm()(ChildListView);