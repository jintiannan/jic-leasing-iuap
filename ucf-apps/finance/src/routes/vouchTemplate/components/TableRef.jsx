/**
 *
 * @title 基础示例4
 * @description 清空功能：不使用form表单
 *
 */
import React, { Component } from 'react';
import { RefMultipleTableWithInput } from 'ref-multiple-table';
import 'ref-multiple-table/lib/index.css';
import { Button } from 'tinper-bee';
import Radio from 'bee-radio';
import 'bee-radio/build/Radio.css';
import request from 'utils/request.js'

let options = {}
class TableRef extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      showModal: false,
      matchData: [
        
      ],
      value:"",
    };
    this.page = {
      pageCount: 0,
      pageSize: 10,
      currPageIndex: 1,
    };
    this.tableData = [];
    this.columnsData = [];

  }

  componentDidMount(){
    this.loadData();
    
  }

  componentWillUpdata(nextProps, nextState){
    
  }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
        let obj = {"refpk":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","refname":"人员2"};
        this.setState({
            matchData: [
                obj
              ],
            value:JSON.stringify(obj),
          })
    }


  /**
   * @msg: 请求mock数据，包含表头数据和表体数据
   * @param {type} 
   * @return: 
   */
  loadData = async () => {
    let refModelUrl = {
      refInfo: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/refInfo',//表头请求
      tableBodyUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
    }
    let requestList = [
      request(refModelUrl.refInfo, { method: 'get' }),//表头数据
      request(refModelUrl.tableBodyUrl, { method: 'get' }), //表体数据
    ];
    Promise.all(requestList).then(([columnsData, bodyData]) => {
      this.launchTableHeader(columnsData.data);
      this.launchTableData(bodyData.data);
      this.setState({
        showLoading: false
      });
    }).catch((e) => {
      this.launchTableHeader({});
      this.launchTableData({});
      this.setState({
        showLoading: false
      });
      console.log(e)
    });;
  }
  /**
 * 根据 refinfo 返回结果拆解并渲染表格表头
 * @param {object} data 
   * 注意：单选时候自己添加radio
 */
  launchTableHeader = (data) => {
    if (!data) return;
    let { multiple, valueField } = options;
    let keyList = data.strFieldCode || [];
    let titleList = data.strFieldName || [];
    let colunmsList = keyList.map((item, index) => {
      return {
        key: item,
        dataIndex: item,
        title: titleList[index]
      }
    });
    if (colunmsList.length === 0) {
      colunmsList = [{ title: "未传递表头数据", dataIndex: "nodata", key: "nodata" }];
    } else if (!multiple) {
      colunmsList.unshift({
        title: " ",
        dataIndex: "a",
        key: "a",
        width: 45,
        render(text, record, index) {
          return (
            <Radio.RadioGroup
              name={record[valueField]}
              selectedValue={record._checked ? record[valueField] : null}
            >
              <Radio value={record[valueField]}></Radio>
            </Radio.RadioGroup>
          )
        }
      })
    }
    this.columnsData = colunmsList

  }
	/**
	 * 处理并渲染表格数据
	 */
  launchTableData = (response) => {
    if (!response) return;
    let { valueField } = options;
    let { data = [], page = {} } = response;
    data.map((record, k) => {
      record.key = record[valueField];
      return record;
    });
    this.tableData = data;
    this.page = {
      pageCount: page.pageCount || 0,
      currPageIndex: page.currPageIndex + 1 || 0,
      totalElements: page.totalElements || 0
    }
  }
  /**
   * @msg: 简单搜索的回调，与复杂搜索的回调不是同一个
   * @param {type} 
   * @return: 
   */
  miniSearchFunc = (value) => {
    alert('搜索' + value)
  }

  /**
   * 跳转到制定页数的操作
   * @param {number} index 跳转页数
   */
  handlePagination = (index) => {
    this.page.currPageIndex = index;
    this.setState({ number: Math.random() })
  }
	/**
	 * 选择每页数据个数
	 */
  dataNumSelect = (index, pageSize) => {
    console.log(index, pageSize)
  }
  /**
   * @msg: modal框确认按钮
   * @param {type} 
   * @return: 
   */
  onSave = (item) => {
    this.checkedArray = item;
    this.setState({
      showModal: false,
      matchData: item,
    })

  }
  /**
   * @msg: modal框右上X和右下角取消
   * @param {type} 
   * @return: 
   */
  onCancel = () => {
    this.setState({ showModal: false })
  }

  /**
   * @msg: 清空操作
   * @param {type} 此时value不可以直接传'',因为''下只能清除一次，第二次清除时前后value都是''，不会触发更新操作，
   * 因此通过refpk不一致来触发更新操作
   * @return: 
   */
  clearFunc = () => {
    this.setState({
      matchData: [],
      value: `{"refname":"","refpk":"${Math.random()}"}`,
    })
  }
  render() {
    let { showLoading, showModal, matchData, value } = this.state;
    let { columnsData, tableData, page } = this;
    options = {
      miniSearch: true,
      multiple: false,
      valueField: "refpk",
      displayField: "{refname}",
    }
    let childrenProps = Object.assign({}, options, {
      showModal: showModal,
      showLoading: showLoading,
      columnsData: columnsData,
      tableData: tableData,
      ...page,
      matchData:this.state.matchData,
      value ,
      miniSearchFunc: this.miniSearchFunc,
      dataNumSelect: this.dataNumSelect,
      handlePagination: this.handlePagination,
      onSave: this.onSave,
      onCancel: this.onCancel,
    });
    return (
      <div>
        <RefMultipleTableWithInput
          title = {"项目名称"}
          {...childrenProps}
          filterUrl={'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid'}
        />
      </div>
    )
  }
}

export default TableRef;