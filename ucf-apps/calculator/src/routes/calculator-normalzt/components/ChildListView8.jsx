/**
 *
 * @title 弹框（表单）编辑
 * @parent 编辑 Editor
 * @description 以弹框形式以对行进行编辑的表格
 * demo0503
 */

import React, { Component, PureComponent } from "react";
import { Table } from 'tinper-bee';
import {
  Select, Form, FormControl, Button, Icon, Modal, FormGroup, Label, Row, Col
} from "tinper-bee";
import EditModal from "./EditModal"

class ChildListView8 extends Component {
  constructor(props, context) {
    super(props);
    // 编辑态下每个单元格对应的编辑模式组件写在 EditModal 组件中，以 key 值对应
    this.columns = [
      {
        title: "编号",
        dataIndex: "index",
        key: "index",
        width:50
      },
      {
        title: "员工编号",
        dataIndex: "a",
        key: "a"
      },
      {
        title: "名字",
        dataIndex: "b",
        key: "b"
      },
      {
        title: "性别",
        dataIndex: "c",
        key: "c",
        width: 100,
        render: (text, record, index) => record.c?record.c.key:""
      },
      {
        title: "部门",
        dataIndex: "d",
        key: "d",
        width: 215,
        render: (text, record, index) => record.d?record.d.name:""
      }
    ];

    this.state = {
      dataSource: 
      [
        {
          index:'1',
          a: "ASVAL_201903280005",
          b: "小张",
          c: {key:'男',value:'0'},
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
          key: "1"
        },
        {
          index:'2',
          a: "ASVAL_201903200004",
          b: "小明",
          c: {key:'男',value:'0'},
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
          key: "2"
        },
        {
          index:'3',
          a: "ASVAL_201903120002",
          b: "小红",
          c: {key:'女',value:'1'},
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
          key: "3"
        }
      ],
      isEditing: false,
      currentIndex: null,
      //不可编辑
      isEditArray: [
        []
      ],
    };
  }

  //组件生命周期方法-在第一次渲染后调用，只在客户端
  componentDidMount() {
    this.props.onRef(this); //绑定子组件
  }
  edit = () => {
    if (this.state.currentIndex === null) return;
    this.setState({ isEditing: true });
  };

  abortEdit = () => {
    this.setState({ isEditing: false });
  };

  commitChange = (editedRowData, rowIndex) => {
    console.log(editedRowData)
    console.log(rowIndex)
    let dataSource = [...this.state.dataSource];
    dataSource[rowIndex] = editedRowData;
    this.setState({ dataSource });
  };

  handleRowHover = (index, record) => {
    this.setState({ currentIndex: index });
  };

  hideEditModal = () => {
    this.setState({ isEditing: false });
  }

  renderRowHover = () => {
    return (
      <div className="opt-btns">
        <Button size="sm" onClick={this.edit}>
          编辑
        </Button>
      </div>
    );
  };


  render() {
    const { dataSource, isEditing, currentIndex } = this.state;
    const columns = this.columns;
    return (
      <div className="demo0503 u-editable-table">
        <Table
          data={dataSource}
          columns={columns}
          height={40}
          onRowHover={this.handleRowHover}
          hoverContent={this.renderRowHover}
        />
        {
          isEditing ? (
            <EditModal
              show={isEditing}
              onHide={this.hideEditModal}
              //columns={columns}
              data={dataSource[currentIndex]}
              onSubmit={this.commitChange}
              currentIndex={currentIndex}
            />
          ) : null
        }
      </div>
    );
  }
}
export default Form.createForm()(ChildListView8);