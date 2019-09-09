import React, { Component } from 'react';
import {Tree,Table,Modal, Icon, Button, Transfer } from 'tinper-bee';
import StringModel from 'components/GridCompnent/StringModel'
import EnumModel from 'components/GridCompnent/EnumModel'
import {deepClone} from "utils";



const TreeNode = Tree.TreeNode;
const dataSource = [
    {
      title: "合同日期",
      key: "cont_date",
      _edit:true,
      fixcon:true,
    },
    {
      title: "合同编号",
      key: "cont_code",
      _edit:true,
      fixcon:true,
    },
    {
      title: "项目编号",
      key: "project_code",
      _edit:true,
      fixcon:true,
    }
  ];

class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {   title: "",dataIndex: "fixcon",key: "fixcon",width: 30, 
                render: (text, record, index) => {
                    return (
                            <div>
                                {record.fixcon ?<div><a><Icon type="uf-correct"></Icon></a></div>
                                :<div><a href="javascript:void(0)" onClick={()=> this.oncancelTable(record,index)}><Icon type="uf-close"></Icon></a></div>} 
                            </div>
                    )
                }
            },
            {
              title: "条件名称",
              dataIndex: "title",
              key: "title",
              width:100,
            },
            {
              title: "比较条件",
              dataIndex: "key",
              key: "key",
              width:100,
              render: (text, record, index) => (
                <EnumModel text={text} record={record} index={index} type={'compareCon'} />
              )
            },
            {
              title: "条件内容",
              dataIndex: "content",
              key: "content",
              width: 100,
              render: (text, record, index) => (
                <StringModel text={text} record={record} index={index} />
              )
            },
          ];
          this.state = {
            dataSource: dataSource
          };
    }
    
    // onCellChange = (index, key) => {
    //     debugger
    //     return value => {
    //       const { dataSource } = this.state;
    //       dataSource[index][key] = value;
    //       this.setState({ dataSource }, () => console.dir(this.state.dataSource));
    //     };
    //   };
    onDoubleClick = (checkedKeys, e)=>{
        const currentIndex = this.state.dataSource.length;
        this.state.dataSource.push({
            index:currentIndex,
            _edit:true,
            title:e.node.props.title.props.children,
            key:checkedKeys,
        })
        this.setState({ dataSource }, () => console.dir(this.state.dataSource));
    }

    oncancelTable = (record,index) =>{
        this.state.dataSource.splice(index,1);
        this.setState({ dataSource }, () => console.dir(this.state.dataSource));
    }
    

    render() {
        const IfShow = this.props.IfShow;
        return (
        <div>
                <Modal
                show={IfShow}
                onHide={this.props.closeSearch}
                size="lg"
                backdrop="static"
                centered="true"
                width="600"
                dialogClassName="search_form"
            > 
            <div className="modal_header">
                <Modal.Header closeButton>
                    <Modal.Title>
                        查询信息
                    </Modal.Title>
                </Modal.Header>
                </div>

                <Modal.Body>
                    <div className="search_form_left">
                    <Tree
                        defaultExpandAll ={true}
                        showIcon 
                        openIcon={<Icon type="uf-minus" />}
                        closeIcon={<Icon type="uf-plus" />}  
                        getScrollContainer={() => {
                            return document.querySelector('.search_form_left')
                        }}
                        onDoubleClick = {this.onDoubleClick}
	                >
	        <TreeNode title="所有条件" key="0-0" icon={<Icon type="uf-treefolder" />}>
                <TreeNode title={<span>本币汇率</span>} key="currency_rate" icon={<Icon type="uf-list-s-o" />} />
                <TreeNode title={<span>币种</span>} key="current_type" icon={<Icon type="uf-list-s-o" />} />
                <TreeNode title={<span>现金流量项目</span>} key="currency_code" icon={<Icon type="uf-list-s-o" />} />
                <TreeNode title={<span>合同日期</span>} key="cont_date" icon={<Icon type="uf-list-s-o" />} />
                <TreeNode title={<span>合同编号</span>} key="cont_code" icon={<Icon type="uf-list-s-o" />} />
                <TreeNode title={<span>项目编号</span>} key="project_code" icon={<Icon type="uf-list-s-o" />} />
                <TreeNode title={<span>项目名称</span>} key="project_name" icon={<Icon type="uf-list-s-o" />} />
                <TreeNode title={<span>合同名称</span>} key="cont_name" icon={<Icon type="uf-list-s-o" />} />
                <TreeNode title={<span>项目经理</span>} key="project_manager" icon={<Icon type="uf-list-s-o" />} />
                <TreeNode title={<span>借款单号</span>} key="loan_bill_code" icon={<Icon type="uf-list-s-o" />} />
                <TreeNode title={<span>原币金额</span>} key="old_currency_amount" icon={<Icon type="uf-list-s-o" />} />
            </TreeNode>
          </Tree>
          </div>
                    <div className="search_from_right">
                        <Table data={this.state.dataSource} columns={this.columns} height={30}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <div>
                    <Button colors="primary" style={{ marginRight: 8 }} onClick={this.props.alterSerach}>
                        确认
                    </Button>
                    <Button colors="primary" onClick={this.props.closeSearch}>取消</Button>
                </div>
                </Modal.Footer>
                </Modal>
            
        </div>
        );
    }
}


export default SearchPanel
