import React, { Component } from 'react';
import {RefMultipleTableWithInput} from 'ref-multiple-table';
import 'ref-multiple-table/lib/index.css';
import './index.less';
import Radio from 'bee-radio';
import 'bee-radio/build/Radio.css';
import request from 'utils/request.js'
let options = {}
class RefModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      showModal: false,
      matchData: [
      ],
      value:'',
    };
    this.page = {
      pageCount: 0,
      pageSize: 5,
      currPageIndex: 1,
    };
    this.tableData = [];
    this.columnsData = [];

  }

  componentDidMount(){
    this.loadData()
  }

  /**
   * @msg: 请求mock数据，包含表头数据和表体数据
   * @param {type} 
   * @return: 
   */
  loadData = async () => {
    let refModelUrl = {
      tableBodyUrl: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
      refInfo: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/refInfo',//表头请求
    }
    let requestList = [
      request(refModelUrl.refInfo, { method: 'get' }),//表头数据
      request(refModelUrl.tableBodyUrl, { method: 'get' }), //表体数据
    ];
    Promise.all(requestList).then(([columnsData, bodyData]) => {
    //const columnsData = [{"refUIType":"RefTable","refCode":"new_bd_staff","defaultFieldCount":4,"strFieldCode":["code","name","email","mobile"],"strFieldName":["人员编码","人员名称","人员邮箱","人员电话"],"rootName":"人员-平台表","refName":"人员-平台表","refClientPageInfo":{"pageSize":100,"currPageIndex":0,"pageCount":0,"totalElements":0},"refVertion":"NewRef"}];
    //const bodyData =[{"status":1,"data":[{"rownum_":1,"code":"001","mobile":"15011430230","name":"人员1","refcode":"001","refpk":"cc791b77-bd18-49ab-b3ec-ee83cd40012a","id":"cc791b77-bd18-49ab-b3ec-ee83cd40012a","refname":"人员1","email":"11@11.com"},{"rownum_":2,"code":"002","mobile":"15011323234","name":"人员2","refcode":"002","refpk":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","id":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","refname":"人员2","email":"22@11.com"},{"rownum_":3,"code":"003","mobile":"15011430232","name":"人员3","refcode":"003","refpk":"004989bb-a705-45ce-88f3-662f87ee6e52","id":"004989bb-a705-45ce-88f3-662f87ee6e52","refname":"人员3","email":"33@33.com"},{"rownum_":4,"code":"004","mobile":"15011430234","name":"人员4","refcode":"004","refpk":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd","id":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd","refname":"人员4","email":"33@34.com"},{"rownum_":5,"code":"005","mobile":"15011430235","name":"人员5","refcode":"005","refpk":"5e3a85ec-5e14-4734-8b3a-1e6168426c89","id":"5e3a85ec-5e14-4734-8b3a-1e6168426c89","refname":"人员5","email":"55@26.com"},{"rownum_":6,"code":"006","mobile":"15011323232","name":"人员6","refcode":"006","refpk":"112621b9-b7ae-41b9-9428-61779334c5d6","id":"112621b9-b7ae-41b9-9428-61779334c5d6","refname":"人员6","email":"66@516.com"},{"rownum_":7,"code":"007","mobile":"15011234567","name":"人员7","refcode":"007","refpk":"394bba90-ed0f-4794-a44e-fd9ce6e9257d","id":"394bba90-ed0f-4794-a44e-fd9ce6e9257d","refname":"人员7","email":"55@4.com"},{"rownum_":8,"code":"008","mobile":"15011327890","name":"人员8","refcode":"008","refpk":"a9f4c869-ca0b-4d12-847e-00eca08bfef6","id":"a9f4c869-ca0b-4d12-847e-00eca08bfef6","refname":"人员8","email":"55@556.com"},{"rownum_":9,"code":"A11","mobile":"13111111111","name":"A11","refcode":"A11","refpk":"5febff8b-c272-49e7-904e-954c5bda38a7","id":"5febff8b-c272-49e7-904e-954c5bda38a7","refname":"A11","email":"huangyu@qq.com"},{"rownum_":10,"code":"bpm01","mobile":"18777777777","name":"张一","refcode":"bpm01","refpk":"0dc47840-873a-4ed3-8ae7-c2335a76b385","id":"0dc47840-873a-4ed3-8ae7-c2335a76b385","refname":"张一","email":"shixtf@yonyou.com"}],"page":{"pageSize":10,"currPageIndex":0,"pageCount":2,"totalElements":17},"allpks":null}];
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
    let { showLoading, showModal, matchData,value } = this.state;
    let { columnsData, tableData, page } = this;
    let {text,record,index} = this.props;
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
      matchData,
      value,
      miniSearchFunc: this.miniSearchFunc,
      dataNumSelect: this.dataNumSelect,
      handlePagination: this.handlePagination,
      onSave: this.onSave,
      onCancel: this.onCancel,
    });
    return (
      <div>
        {record._edit ?<div className = "ref_model">
        <RefMultipleTableWithInput
          {...childrenProps}
          //filterUrl={'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTreeGrid'}
        /></div> : <div>{text ? text : ""}</div>}
      </div>
    )
  }
}


export default RefModel;
