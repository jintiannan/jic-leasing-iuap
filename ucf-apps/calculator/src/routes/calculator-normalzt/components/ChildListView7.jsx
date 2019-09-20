/**
 *
 * @title 行内编辑
 * @parent 编辑 Editor
 * @description 可以对行进行编辑的表格
 */
import React, { Component } from "react";
import { Table, Form, Button} from 'tinper-bee';
import SelectEditCell from 'components/ChildFormRef/SelectEditCell';
import StringEditCell from 'components/ChildFormRef/StringEditCell';
import RefEditCell from 'components/ChildFormRef/RefEditCell';

class ChildListView7 extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      dataSource: 
      [
        {
          index:'1',
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
          key: "1"
        },
        {
          index:'2',
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
          key: "2"
        },
        {
          index:'3',
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
          key: "3"
        }
      ],
      editingRowsMap: {},
      currentIndex: null,
      errorEditFlag: false,
      //不可编辑
      isEditArray: [
        []
      ],
    };

    this.columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 50
      },
      {
        title: "员工编号",
        dataIndex: "a",
        key: "a"
      },
      {
        title: "名字",
        dataIndex: "b",
        key: "b",
        render: (text, record, index) => (
          <StringEditCell
            colName={"名字"}
            editable={this.state.editingRowsMap[index] || false}
            required
            value={text}
            onChange={this.onCellChange(index, "b")}
            throwError={this.throwError}
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
            editable={this.state.editingRowsMap[index] || false}
            value={text}
            onChange={this.onCellChange(index, "c")}
          />
        )
      },
      {
        title: "部门",
        dataIndex: "d",
        key: "d",
        width: 215,
        render: (text, record, index) => (
          <RefEditCell
            colName={"部门"}
            editable={this.state.editingRowsMap[index] || false}
            required
            value={record.d}
            onChange={this.onCellChange(index, "d")}
            throwError={this.throwError}
          />
        )
      },
      // 只是用来占位占宽度的
      {
        key: "placeholder"
      }
    ];


    this.dataBuffer = {};
  }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
      this.props.onRef(this); //绑定子组件
      //修改时 限定某个字段不可编辑
      
    }

  edit = index => () => {
    if (index === null) return;
    let editingRowsMap = { ...this.state.editingRowsMap };
    editingRowsMap[index] = index.toString();
    // 最好使用深复制
    this.dataBuffer[index] = { ...this.state.dataSource[index] };
    this.setState({ editingRowsMap });
  };

  abortEdit = index => () => {
    let editingRowsMap = { ...this.state.editingRowsMap };
    delete editingRowsMap[index];
    delete this.dataBuffer[index];
    this.setState({ editingRowsMap });
  };

  delete = index => () => {
    if (index === null) return;
    let { dataSource } = this.state;
    dataSource.splice(index,1);
    this.setState({
      dataSource:dataSource
    });
  }

  commitChange = index => () => {
    if (this.state.errorEditFlag) return;
    let editingRowsMap = { ...this.state.editingRowsMap };
    delete editingRowsMap[index];
    let dataSource = [...this.state.dataSource];
    dataSource[index] = { ...this.dataBuffer[index] };
    this.setState({ editingRowsMap,  dataSource });
  };

  onCellChange = (index, key) => value => {
    this.dataBuffer[index][key] = value;
  };

  throwError = isError => {
    if (isError !== this.state.errorEditFlag)
      this.setState({ errorEditFlag: isError });
  };

  handleRowHover = (index, record) => {
    this.currentRecord = record;
    this.setState({ currentIndex: index });
  };

  renderRowHover = () => {
    const { currentIndex } = this.state;
    return this.state.editingRowsMap[currentIndex] ? (
      <div className="cancel-btns">
        <Button
          size="sm"
          bordered
          onClick={this.abortEdit(currentIndex)}
        >
          取消
        </Button>
        <Button size="sm" colors="primary" onClick={this.commitChange(currentIndex)}>
          确认
        </Button>
      </div>
    ) : (
      <div className="opt-btns">
        <Button size="sm" onClick={this.edit(currentIndex)}>
          编辑
        </Button>
        <Button size="sm" onClick={this.delete(currentIndex)}>
          删除
        </Button>
      </div>
    );
  };

  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div className="demo0501 u-editable-table">
        <Table
          data={dataSource}
          columns={columns}
          height={40}
          onRowHover={this.handleRowHover}
          hoverContent={this.renderRowHover}
        />
      </div>
    );
  }
}
export default Form.createForm()(ChildListView7);