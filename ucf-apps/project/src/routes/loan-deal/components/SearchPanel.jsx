import React, { Component } from 'react';
import {Tree,Table,Modal, Icon, Button, Transfer } from 'tinper-bee';
import StringModel from 'components/GridCompnent/StringModel';
import EnumModel from 'components/GridCompnent/EnumModel';
import DateModel from 'components/GridCompnent/DateModel';
import RefModel from 'components/GridCompnent/RefModel'
import {deepClone} from "utils";



const TreeNode = Tree.TreeNode;
const transData = [
      {
        title: "本币汇率",
        key: "currency_rate",
        _edit:true,
        type:'String',
        between:false,
      },
      {
        title: "币种",
        key: "current_type",
        _edit:true,
        type:'String',
        between:false,
      },
      {
        title: "现金流量项目",
        key: "currency_code",
        _edit:true,
        type:'String',
        between:false,
      },
      {
        title: "合同日期",
        key: "cont_date",
        _edit:true,
        type:'Date',
        between:false,
      },
      {
        title: "合同编号",
        key: "cont_code",
        _edit:true,
        fixcon:true,
        type:'String',
        between:false,
      },
      {
        title: "项目编号",
        key: "project_code",
        _edit:true,
        fixcon:true,
        type:'String',
        between:false,
      },
      {
        title: "项目名称",
        key: "project_name",
        _edit:true,
        fixcon:true,
        type:'String',
        between:false,
      },
      {
        title: "项目经理",
        key: "project_manager",
        _edit:true,
        type:'Ref',
        between:false,
      },
      {
        title: "借款单号",
        key: "loan_bill_code",
        _edit:true,
        type:'String',
        between:false,
      },
      {
        title: "项目金额",
        key: "old_currency_amount",
        _edit:true,
        type:'String',
        between:false,
      }

];

const dataSource = [];

class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
          {
          title: "",dataIndex: "fixcon",key: "fixcon",width: 30, 
              render: (text, record, index) => {
                  return (
                    <div>
                        {record.fixcon ?<div><a><Icon type="uf-correct"></Icon></a></div>
                        :<div><a href="javascript:void(0)" onClick={()=> this.oncancelTable(index)}><Icon type="uf-close"></Icon></a></div>} 
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
            render: (text, record, index) => {
              //字符串数值不存在介于区间   参照类型只有等于选择     日期类型存在介于区间  此处分类处理
              if(record.type=='String'){
                return <EnumModel text={text} record={record} index={index} type={'compareCon'} dataIndex = {'condition'} onChange={this.onCellChange(index, "key")} />
              }else if(record.type=='Date'){
                return <EnumModel text={text} record={record} index={index} type={'datecompareCon'} dataIndex = {'condition'} onChange={this.onCellChange(index, "key")} />
              }else if(record.type=='Ref'){
                return <EnumModel text={text} record={record} index={index} type={'compareCon'} dataIndex = {'condition'} onChange={this.onCellChange(index, "key")} />
              }
              
            }
          },
          {
            title: "条件内容",
            dataIndex: "content",
            key: "content",
            width: 100,
            render: (text, record, index) => {
              if(record.type=='String'){
                return <StringModel  record={record} index={index} dataIndex={'content'}/>
              }else if(record.type=='Date'&&!record.between){
                return <DateModel  record={record} index={index} dateFormat={"YYYY-MM-DD"} dataIndex={'content'}  />
              }else if(record.type=='Date'&&record.between){
                return <div className = "between_model"><DateModel  record={record} index={index} dateFormat={"YYYY-MM-DD"} dataIndex={'content'}  /><span>-</span>
                  <DateModel  record={record} index={index} dateFormat={"YYYY-MM-DD"} dataIndex={'content1'}  /></div>
              }else if(record.type=='Ref'){
                return <div className = "ref_model"><RefModel  record={record} index={index} dataIndex={'content'}/></div>
              }
            }
          },
];
          this.state = {
            dataSource: dataSource,
            transData:transData,
            columns:this.columns,
          };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
      this.state.transData.map((value,key)=>{
        if(value.fixcon){
          this.state.dataSource.push({
            _edit:true,
            title:value.title,
            key:value.key,
            fixcon:true,
            type:value.type,
            between:value.between,
            condition:0,
            content:'',
          })
          this.setState({ dataSource });
        }
    })
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
      this.props.onRef(this);
      let _dataSource = deepClone(this.state.dataSource);
      let store = JSON.parse(localStorage.getItem('loandealsearch'));
      if(store!=undefined&&store!=null&&store.length>0){
      store.map((item,key)=>{
          if(!item.fixcon){
            _dataSource.push(item);
          }
      });
      this.setState({dataSource:_dataSource});
    }
    }
    
    onCellChange = (index, key) => {
        return value => {
          const _dataSource = deepClone(this.state.dataSource);
          if(key=='key'){
            if(value=='6'){
              _dataSource[index]['between']=true;
              this.setState({ dataSource:_dataSource});
            }else{
              _dataSource[index]['between']=false;
              this.setState({ dataSource:_dataSource});
            } 
          }
        };
      };
    onDoubleClick = (checkedKeys, e)=>{
        const currentIndex = this.state.dataSource.length;
        const _dataSource = deepClone(this.state.dataSource);
        _dataSource.push({
            index:currentIndex,
            _edit:true,
            title:e.node.props.title.props.children,
            key:checkedKeys,
            type:e.node.props.ext.type,
            between:e.node.props.ext.between,
            condition:0,
            content:'',
        })
        this.setState({ dataSource:_dataSource });
    }

    oncancelTable = (index) =>{
        const _dataSource = deepClone(this.state.dataSource);
        _dataSource.splice(index,1);
        this.setState({ dataSource:_dataSource});
    }

    alterSerach = ()=>{
      return this.state.dataSource;
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
                        showLine
                        openIcon={<Icon type="uf-minus" />}
                        closeIcon={<Icon type="uf-plus" />}  
                        getScrollContainer={() => {
                            return document.querySelector('.search_form_left')
                        }}
                        onDoubleClick = {this.onDoubleClick}
	                >
          <TreeNode title="所有条件" key="all_condition" icon={<Icon type="uf-treefolder" />}>
                {
                  this.state.transData.map((value,key)=>{
                    return <TreeNode title={<span>{value.title}</span>} key={value.key} icon={<Icon type="uf-list-s-o" />}  ext={{'type':value.type,'between':value.between}} />
                  })
                }
            </TreeNode>
          </Tree>
          </div>
                    <div className="search_from_right">
                        <Table data={this.state.dataSource} columns={this.state.columns} height={30}/>
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
