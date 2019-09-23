/**
 *字表列标配 投放计划
 */
import React, { Component } from "react";
import {  } from 'tinper-bee';
import { Icon, Select, Tooltip, Form, Table } from "tinper-bee";
import SelectEditCell from 'components/FormRef/SelectEditCell';
import NumberEditCell from 'components/FormRef/NumberEditCell';
import DatePickerEditCell from 'components/FormRef/DatePickerEditCell';


  class ChildListView1 extends Component {
    constructor(props, context) {
      super(props);
      this.state = {
          //表数据
          dataSource: [
            {
              index: 1,
              plan_date_loan:"2019-09-17",
              plan_cash_loan:"10000",
              plan_cash_corpus:"10000",
              tax_rate:{name:'6%',value:'6'},
              tax_cash:"10000"
            
             }
        ],

        //不可编辑
        isEditArray: [
          []
        ],

        //表头
        columns: [
          {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: 50,
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
              editable = {this.props.props.isEdit}
              // onChange={this.onCellChange(index, "plan_date_loan").bind(this)}
              onChange={(value) => this.onCellChange(index, "plan_date_loan", value)}
            />
            )
          },
          {
            title: "投放金额(元)",
            dataIndex: "plan_cash_loan",
            key: "plan_cash_loan",
            width: 215,
            render: (text, record, index) => {
              let {isEditArray} = this.state;
              let isEdit = isEditArray[index].indexOf("all") > -1;
              return <NumberEditCell
                value={text}
                toThousands = {true}  //是否显示千分位  默认true
                precision = {2} //默认2
                editable = {this.props.props.isEdit==true?!isEdit:isEdit}
                //onChange={this.onCellChange(index, "plan_cash_loan")}
                onChange={(value) => this.onCellChange(index, "plan_cash_loan", value)}
                />
              }
          },
          {
            title: "不含税投放金额(元)",
            dataIndex: "plan_cash_corpus",
            key: "plan_cash_corpus",
            width: 215,
            render: (text, record, index) => {
              let {isEditArray} = this.state;
              let isEdit = isEditArray[index].indexOf("all") > -1;
              return <NumberEditCell
                value={text}
                editable = {this.props.props.isEdit==true?!isEdit:isEdit}
                toThousands = {true}  //是否显示千分位  默认true
                precision = {2} //默认2
                //onChange={this.onCellChange(index, "plan_cash_corpus")}
                onChange={(value) => this.onCellChange(index, "plan_cash_corpus", value)}
              />
            }
          },
          {
            title: "税率",
            dataIndex: "tax_rate",
            key: "tax_rate",
            width: 215,
            render: (text, record, index) => {
              let {isEditArray} = this.state;
              let isEdit = isEditArray[index].indexOf("all") > -1;
              return <SelectEditCell
                  value={text}
                  editable = {this.props.props.isEdit==true?!isEdit:isEdit}
                  data = {[{name:'3%',value:'3'},{name:'6%',value:'6'},{name:'17%',value:'17'}
                        ,{name:'0%',value:'0'},{name:'11%',value:'11'},{name:'16%',value:'16'},{name:'10%',value:'10'}
                        ,{name:'13%',value:'13'},{name:'9%',value:'9'}]}
                  //onChange={this.onCellChange(index, "tax_rate")}
                  onChange={(value) => this.onCellChange(index, "tax_rate", value)}
                  />
              }  
          },
          {
            title: "税额(元)",
            dataIndex: "tax_cash",
            key: "tax_cash",
            width: 215,
            render: (text, record, index) => {
              let {isEditArray} = this.state;
              let isEdit = isEditArray[index].indexOf("all") > -1 || isEditArray[index].indexOf("tax_rate") > -1 || isEditArray[index].indexOf("pay_method_loan") > -1;
              return <NumberEditCell
                value={text}
                toThousands = {true}  //是否显示千分位  默认true
                precision = {2} //默认2
                editable = {this.props.props.isEdit==true?!isEdit:isEdit} //不可编辑
                //onChange={this.onCellChange(index, "tax_cash")}
                onChange={(value) => this.onCellChange(index, "tax_cash", value)}
              />
            }
          },
          {
            title: "投放付款方式",
            dataIndex: "pay_method_loan",
            key: "pay_method_loan",
            width: 215,
            render: (text, record, index) => {
              let {isEditArray} = this.state;
              let isEdit = isEditArray[index].indexOf("all") > -1;
              return <SelectEditCell
              value={text}
              editable = {this.props.props.isEdit==true?!isEdit:isEdit}
              data={[{name:'现金',value:'0'},{name:'银票',value:'1'}]}
              //onChange={this.onCellChange(index, "g").bind(this)}
              onChange={(value) => this.onCellChange(index, "pay_method_loan", value)}
            />
            }
          },
          {
            title: "银票开票日期",
            dataIndex: "make_date_draft",
            key: "make_date_draft",
            width: 215,
            render: (text, record, index) => {
              let {isEditArray} = this.state;
              let isEdit = isEditArray[index].indexOf("all") > -1;
              return <DatePickerEditCell
              value={text}
              format = {"YYYY-MM-DD"} //默认可自定义
              editable = {this.props.props.isEdit==true?!isEdit:isEdit}
              //onChange={this.onCellChange(index, "make_date_draft").bind(this)}
              onChange={(value) => this.onCellChange(index, "make_date_draft", value)}
            />
            }
          },
          {
            title: "银票到期日期",
            dataIndex: "end_date_loan",
            key: "end_date_loan",
            width: 215,
            render: (text, record, index) => {
              let {isEditArray} = this.state;
              let isEdit = isEditArray[index].indexOf("all") > -1;
              return <DatePickerEditCell
              format = {"YYYY-MM-DD"} //默认可自定义
              value={text}
              editable = {this.props.props.isEdit==true?!isEdit:isEdit}
              //onChange={this.onCellChange(index, "end_date_loan").bind(this)}
              onChange={(value) => this.onCellChange(index, "end_date_loan", value)}
            />
            }
          },
          {
            title: "银票保证金比例",
            dataIndex: "deposit_ratio4draft",
            key: "deposit_ratio4draft",
            width: 215,
            render: (text, record, index) => {
              let {isEditArray} = this.state;
              let isEdit = isEditArray[index].indexOf("all") > -1;
              return <SelectEditCell
              value={text}
              editable = {this.props.props.isEdit==true?!isEdit:isEdit}
              data = {[{name:'3%',value:'3'},{name:'6%',value:'6'},{name:'17%',value:'17'}
              ,{name:'0%',value:'0'},{name:'11%',value:'11'},{name:'16%',value:'16'},{name:'10%',value:'10'}
              ,{name:'13%',value:'13'},{name:'9%',value:'9'}]}
              //onChange={this.onCellChange(index, "deposit_ratio4draft").bind(this)}
              onChange={(value) => this.onCellChange(index, "deposit_ratio4draft", value)}
            />
            }
          },
          {
            title: "银票保证金利率",
            dataIndex: "interrate_ratio4draft",
            key: "interrate_ratio4draft",
            width: 215,
            render: (text, record, index) => {
              let {isEditArray} = this.state;
              let isEdit = isEditArray[index].indexOf("all") > -1;
              return <SelectEditCell
              value={text}
              editable = {this.props.props.isEdit==true?!isEdit:isEdit}
              data={[{name:'3%',value:'3'},{name:'6%',value:'6'},{name:'17%',value:'17'}
                        ,{name:'0%',value:'0'},{name:'11%',value:'11'},{name:'16%',value:'16'},{name:'10%',value:'10'}
                        ,{name:'13%',value:'13'},{name:'9%',value:'9'}]}
              //onChange={this.onCellChange(index, "interrate_ratio4draft").bind(this)}
              onChange={(value) => this.onCellChange(index, "interrate_ratio4draft", value)}
            />
            }
          },
          {
            title: "计息金额计算方式",
            dataIndex: "calinter_amount_style",
            key: "calinter_amount_style",
            width: 215,
            render: (text, record, index) => {
              let {isEditArray} = this.state;
              let isEdit = isEditArray[index].indexOf("all") > -1;
              return <SelectEditCell
              value={text}
              editable = {this.props.props.isEdit==true?!isEdit:isEdit}
              data={[{name:'全额起息',value:'0'}]}
              //onChange={this.onCellChange(index, "calinter_amount_style").bind(this)}
              onChange={(value) => this.onCellChange(index, "calinter_amount_style", value)}
            />
            }
          }
        ]
      };
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
      this.props.onRef(this); //绑定子组件
      //修改时 限定某个字段不可编辑
      
    }
  
    /**
     *   字表统一 onChange事件
     * @param index 下标
     * @param key 字段名
     * @param value 值
     */
    onCellChange = (index, key, value) => {
      let { isEditArray }  = this.state;
      let dataSource = this.state.dataSource;
      dataSource[index][key] = value;

      let array = isEditArray[index]; //获取当前行 数组

      //投放日期
      if(key == "plan_date_loan"){
        let all_i = isEditArray[index].indexOf("all"); //获取当前属性的下标
        if(value == null || value == undefined || value == ""){
          if(all_i < 0){
            array.push("all"); //数组重添加该属性 整行不可编辑
          }
        }else{
          if(all_i > -1){
            array.splice(all_i,1); //数组重删除该属性 可编辑
           }
        }
      }
      
      //税率
      if(key == "tax_rate"){
        let tax_rate_i = isEditArray[index].indexOf("tax_rate"); //获取当前属性的下标
        if(value == 6){
          if(tax_rate_i < 0){
            array.push("tax_rate"); //数组重添加该属性 不可编辑
           }
        }else{
          if(tax_rate_i > -1){
            array.splice(tax_rate_i,1); //数组重删除该属性 可编辑
           }
        }
      }

      //投放付款方式
      if(key == "pay_method_loan"){
        let pay_method_loan_i = isEditArray[index].indexOf("pay_method_loan"); //获取当前属性的下标
        if(value == '0'){
          if(pay_method_loan_i < 0){
            array.push("pay_method_loan"); //数组重添加该属性 不可编辑
           }
        }else{
          if(pay_method_loan_i > -1){
            array.splice(pay_method_loan_i,1); //数组重删除该属性 可编辑
           }
        }
      }
        

        

      this.setState({ dataSource, isEditArray}, () => console.dir(this.state.dataSource));

      
    };
  
    render() { 
        return (
          <div className="u-editable-table">
            <Table 
            data={this.state.dataSource} 
            columns={this.state.columns} 
            headerHeight={20} 
            height={40}
            emptyText = {()=>{return "";}} //无数据时显示内容
            />
          </div>
        );
      
    }
  }
  export default Form.createForm()(ChildListView1);