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
                a: "1",
                b: "小红",
                c: "女",
                cIsEdit: true, //专为 c字段可不可编辑提供判断 哪个字段需要不可编辑控制 都需要多定义一个字段作为判断
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
                f: {"refname":"人员1","refpk":"cc791b77-bd18-49ab-b3ec-ee83cd40012a"},
                g: "10000",
                key: "3",
                editable: this.props.props.isEdit,
                
              }
        ],
        //表头
        columns: [
          {
            title: "序号",
            dataIndex: "a",
            key: "a"
          },
          {
            title: "名字",
            dataIndex: "b",
            key: "b",
            width: 215,
            render: (text, record, index) => (
              <StringEditCell
              colName="名字"
              value={text}
              editable = {record.editable}
              onChange={this.onCellChange(index, "b").bind(this)}
            />
            )
          },
          {
            title: "性别",
            dataIndex: "c",
            key: "c",
            width: 100,
            render: (text, record, index) => (
              <SelectEditCell
                value={text}
                editable = {record.editable}
                data = {[{"name":"男","value":"0"}, {"name":"女","value":"1"}]}
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
                value={text}
                editable = {record.editable}
                onChange={this.onCellChange(index, "d")}
              />
            )
          },
          {
            title: "次数",
            dataIndex: "e",
            key: "e",
            width: 215,
            render: (text, record, index) => {
              if(record.cIsEdit){
                return <StringEditCell
                  colName="限额方案"
                  value={text}
                  editable = {record.editable}
                  onChange={this.onCellChange(index, "e")}
                  />
              }else{
                return <StringEditCell
                colName="限额方案"
                value={text}
                editable = {!record.editable}
                onChange={this.onCellChange(index, "e")}
                />
              }
                 
           }
              
          },
          {
            title: "表参照",
            dataIndex: "f",
            key: "f",
            width: 215,
            render: (text, record, index) => (
              <TableFormRef
                value={text}
                editable = {record.editable} //是否可编辑
                title={"表参照"} 
                onChange={this.onCellChange(index, "f")}
              />
            )
          },
          {
            title: "金额",
            dataIndex: "g",
            key: "g",
            width: 215,
            render: (text, record, index) => (
              <NumberEditCell
              value={text}
              editable = {record.editable}
              onChange={this.onCellChange(index, "g").bind(this)}
            />
            )
          },
          {
            title: "日期",
            dataIndex: "h",
            key: "h",
            width: 215,
            render: (text, record, index) => (
              <DatePickerEditCell
              value={text}
              editable = {record.editable}
              onChange={this.onCellChange(index, "h").bind(this)}
            />
            )
          },
          {
            key: "placeholder"
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
        
        if(key = "c" && value == "男"){
          dataSource[index].cIsEdit = false;
          dataSource[index].e = "不可编辑"; //联动
        }else if(key = "c" && value != "男"){
          dataSource[index].cIsEdit = true;
        }
        this.setState({ dataSource }, () => console.dir(this.state.dataSource));
      };
      
    };

    //构造字表
    // childFromList=()=>{ 
    //    if(this.props.props.formObject != undefined && this.props.props.formObject != ""){
    //      //项目批次等于 次期的时候 字表限额方案不可修改
    //     if("次期" == this.props.props.formObject.adjust_time){
    //        let dataSource = this.state.dataSource;
    //        dataSource[0].editable = false; 
    //        this.setState({dataSource});
    //     }
    //   }
     
    // }
  
    render() { 
        return (
          <div className="demo0502 u-editable-table">
            <Table data={this.state.dataSource} columns={this.state.columns} headerHeight={40} height={40}/>
          </div>
        );
      
    }
  }
  export default Form.createForm()(ChildListView);