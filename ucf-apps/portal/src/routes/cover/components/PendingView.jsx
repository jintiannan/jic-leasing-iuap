import React, { Component } from 'react';
import {Table,Tag,Icon,Tabs,Badge  } from 'tinper-bee';
import StringModel from 'components/GridCompnent/StringModel';
import DateModel from 'components/GridCompnent/DateModel';
import {deepClone,getCookie} from "utils";
import {Router} from 'director/build/director';
import {actions } from 'mirrorx';
window.router = new Router();

const {TabPane} = Tabs;

const wait_dataSource = [
      {
        priority: {type:'danger' ,desc:'紧急'},
        status: "未处理",
        source_type:"立项申请审批",
        theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
        sender:"何媛媛",
        send_date:"2018-12-01",
        key:1     //对应主键  传入数据做处理
      },
      {
        priority:{type:'danger' ,desc:'紧急'},
        status: "未处理",
        source_type:"立项申请审批",
        theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
        sender:"何媛媛",
        send_date:"2018-12-02",
        key:2
      },
      {
        priority: {type:'danger' ,desc:'紧急'},
        status: "未处理",
        source_type:"立项申请审批",
        theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
        sender:"何媛媛",
        send_date:"2018-12-03",
        key:3
      },
      {
        priority: {type:'success' ,desc:'正常'},
        status: "未处理",
        source_type:"立项申请审批",
        theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
        sender:"何媛媛",
        send_date:"2018-12-04",
        key:4
      },
      {
        priority: {type:'success' ,desc:'正常'},
        status: "未处理",
        source_type:"立项申请审批",
        theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
        sender:"何媛媛",
        send_date:"2018-12-05",
        key:5
      },
      {
        priority: {type:'success' ,desc:'正常'},
        status: "未处理",
        source_type:"立项申请审批",
        theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
        sender:"何媛媛",
        send_date:"2019-02-05",
        key:6
      },
      {
        priority: {type:'success' ,desc:'正常'},
        status: "未处理",
        source_type:"立项申请审批",
        theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
        sender:"何媛媛",
        send_date:"2019-03-05",
        key:7,
      },
      {
        priority:{type:'success' ,desc:'正常'},
        status: "未处理",
        source_type:"立项申请审批",
        theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
        sender:"何媛媛",
        send_date:"2019-04-05",
        key:8 
      },
      {
        priority: {type:'success' ,desc:'正常'},
        status: "未处理",
        source_type:"立项申请审批",
        theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
        sender:"何媛媛",
        send_date:"2019-04-06",
        key:9
      },
      {
        priority:{type:'success' ,desc:'正常'},
        status: "未处理",
        source_type:"立项申请审批",
        theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
        sender:"何媛媛",
        send_date:"2019-04-06",
        key:10
      },
];

const already_dataSource = [
  {
    priority: {type:'danger' ,desc:'紧急'},
    status: "已处理",
    source_type:"立项申请审批",
    theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
    sender:"何媛媛",
    send_date:"2017-11-05",
    key:1
  },
  {
    priority:{type:'danger' ,desc:'紧急'},
    status: "已处理",
    source_type:"立项申请审批",
    theme:"何媛媛提交'立项申请LX20190002-1010',待审批",
    sender:"何媛媛",
    send_date:"2017-12-05",
    key:2
  },
  {
    priority:{type:'success' ,desc:'正常'},
    status: "已处理",
    source_type:"合同制作审批",
    theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
    sender:"侯莹莹",
    send_date:"2018-10-05",
    key:2
  },
  {
    priority:{type:'success' ,desc:'正常'},
    status: "已处理",
    source_type:"合同制作审批",
    theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
    sender:"侯莹莹",
    send_date:"2018-10-04",
    key:3
  },
  {
    priority:{type:'success' ,desc:'正常'},
    status: "已处理",
    source_type:"合同制作审批",
    theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
    sender:"侯莹莹",
    send_date:"2018-10-03",
    key:4
  },
  {
    priority:{type:'success' ,desc:'正常'},
    status: "已处理",
    source_type:"合同制作审批",
    theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
    sender:"侯莹莹",
    send_date:"2018-09-05",
    key:5
  },
  {
    priority:{type:'success' ,desc:'正常'},
    status: "已处理",
    source_type:"合同制作审批",
    theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
    sender:"侯莹莹",
    send_date:"2018-08-05",
    key:6
  },
  {
    priority:{type:'success' ,desc:'正常'},
    status: "已处理",
    source_type:"合同制作审批",
    theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
    sender:"侯莹莹",
    send_date:"2018-07-05",
    key:7
  },
  {
    priority:{type:'success' ,desc:'正常'},
    status: "已处理",
    source_type:"合同制作审批",
    theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
    sender:"侯莹莹",
    send_date:"2018-06-05",
    key:9
  },
  {
    priority:{type:'success' ,desc:'正常'},
    status: "已处理",
    source_type:"合同制作审批",
    theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
    sender:"侯莹莹",
    send_date:"2018-05-05",
    key:10
  },
  {
    priority:{type:'success' ,desc:'正常'},
    status: "已处理",
    source_type:"合同制作审批",
    theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
    sender:"侯莹莹",
    send_date:"2018-04-05",
    key:11
  },
  {
    priority:{type:'success' ,desc:'正常'},
    status: "已处理",
    source_type:"合同制作审批",
    theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
    sender:"侯莹莹",
    send_date:"2018-03-05",
    key:12
  },
  {
    priority:{type:'success' ,desc:'正常'},
    status: "已处理",
    source_type:"合同制作审批",
    theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
    sender:"侯莹莹",
    send_date:"2018-02-05",
    key:13
  },
  {
    priority:{type:'success' ,desc:'正常'},
    status: "已处理",
    source_type:"合同制作审批",
    theme:"侯莹莹提交'合同制作LX20190002-1010',待审批",
    sender:"侯莹莹",
    send_date:"2018-01-05",
    key:14
  },
];

const wait_menu ={     //任务中心模拟菜单数据
    areaId: "d2f8a0b7751a453d9e8d7e3cc3fffb62",
    children: null,
    collected: "false",
    icon: " iconfont icon-appicon ",
    id: null,
    isDefault: null,
    location: "portal#/taskcenter",
    menuId: "5355fffb52f44b219eqw084f28fa9dc9",
    menustatus: "Y",
    name: "任务中心",
    name2: "taskcenter",
    name3: "",
    name4: "null",
    name5: "null",
    name6: "null",
    openview: "curnpage",
    pk_func_menu: null,
    target: "jic-leasing",
    urltype: "url"
};

const themeObj ={    //主题模拟数据
  headerBgColor: "#242D48",
  headerBgImg: "static/images/",
  headerCenterImg: "static/images/logo_light.svg",
  headerCenterImg0: "static/images/logo_light.svg",
  headerTheme: "dark",
  leftSideBgColor: "#093E91",
  leftSideBgImg: "",
  leftSideTheme: "dark",
  sideShowPosition: "left",
  tabNum: 10
};

const menus = [
  {
    id: "5d2fe046546dcc0ea9f6473b",
    notCreateIframe: false,
    router: "portal#/cover",
    title: "首页",
    title2: "首页",
    title3: "首页",
    title4: "首页",
    title5: "",
    title6: "",
  }
];

class PendingView extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "优先级",dataIndex: "priority",key: "priority",width: 100, textAlign:'center',
                render: (text, record, index) => {
                    return <Tag style={{"margin-right":0}} colors={text.type}>{text.desc}</Tag>
                }
            },
            {
                title: "状态",dataIndex: "status",key: "status",width: 100, textAlign:'center',
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "单据类型",dataIndex: "source_type",key: "source_type",width: 100, textAlign:'center',
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "主题",dataIndex: "theme",key: "theme",width: 250, textAlign:'center',
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "发送人",dataIndex: "sender",key: "sender",width: 100, textAlign:'center',
                render: (text, record, index) => {
                    return <StringModel text={text} record={record} index={index}/>
                }
            },
            {
                title: "发送日期",dataIndex: "send_date",key: "send_date",width: 100,textAlign:'center', 
                render: (text, record, index) => {
                    return <DateModel text={text} record={record} index={index} dateFormat={'YYYY-MM-DD'}/>
                }
            },
];
          this.state = {
            wait_dataSource: wait_dataSource,
            wait_menu:wait_menu,
            menus:menus,     //模拟已打开的菜单项与主题
            themeObj:themeObj,
            already_dataSource:already_dataSource,
            columns:this.columns,
            tabKey:'pending_wait', 
          };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
      this.props.onpendRef(this);
    }

    /**
     *
     *tab 切换
     * @param {string}
     */
    onChangeTab = (tabKey) => {
      this.setState({
          tabKey
      })
    }

    ontabClick = ()=>{
      debugger
      const item = deepClone(this.state.wait_menu);
      var options = {
        title:item.name,
        title2:item.name2,
        title3:item.name3,
        title4:item.name4,
        title5:item.name5,
        title6:item.name6,
        router:this.formmaterUrl(item),
        id:item.menuId
      };
      this.createTab(options);
    }

    createTab = (options) =>{
      var {menus,themeObj} = this.state;
      debugger
      if(!window.sessionStorage){
          alert('This browser does NOT support sessionStorage');
          return false;
      }
      var menu = menus;
      let data = {
        current: options.id,
      }

      //点击的页签已经存在
      if(JSON.stringify(menu).indexOf('"id":"'+options.id+'"')!=-1&&menu.length!=0){
        let moreFlag = false;
        let obj = {};
          if(menu.length >= themeObj.tabNum) {
            for (var i = themeObj.tabNum; i < menu.length; i++) {
              if(menu[i].id === options.id){
                moreFlag = true;
                obj =menu[i];
                break;
              } else {
                moreFlag = false;
              }
            }
            if(moreFlag) {
              for (var i = 0; i < menu.length; i++) {
                    if(menu[i].id === options.id) {
                      menu.splice(i,1);
                    }
                  }
                  if(menu[1].id === 'sysmgr'){
                    menu.splice(2,0,obj);
                  }else{
                    menu.splice(1,0,obj);
                  }
                  
            }
          } else {
            for (var i = 0; i < menu.length; i++) {
              if(menu[i].id === options.id) {
                menu[i] = options;
                break;
              }
            }
          }
          for (var i = 0; i < menu.length; i++) {
            if(menu[i].id === options.id) {
              menu[i].notCreateIframe = false;
            }
          }
          data.menus = menu;
          return false;
      }
      //点击的页签不存在
      if(JSON.stringify(menu).indexOf('"id":"'+options.id+'"') === -1) {
        if(options.id === 'sysmgr'){
          menu.splice(1,0,options);
        }else{
          if(menu.length >= themeObj.tabNum) {
            if(menu[1].id === 'sysmgr'){
              menu.splice(2,0,options);
            }else{
              menu.splice(1,0,options);
            }
          } else {
            menu[menu.length] = options;
          }
        }
      }
      for (var i = 0; i < menu.length; i++) {
        if(menu[i].id === options.id) {
          menu[i].notCreateIframe = false;
        }
      }
      var menuObj = JSON.parse(JSON.stringify(menu));

      sessionStorage['tabs'] = JSON.stringify(menuObj);

      sessionStorage['current'] = JSON.stringify({
          current:options.id
      });

    //   actions.app.updateState({
    //     menus:menuObj,
    //     reload:0,
    //     current:options.id
    // });
  }

    formmaterUrl = (item)=> {
      var uri = " ";
      if (item.urltype === 'url') {
          var target=item.openview=="newpage"?"_blank":"";
          if(target){
              uri = item.location;
          }else{
              uri = '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
              // uri = '#/ifr/' + item.location;
          }
          return  uri;
      } else if (item.urltype === 'plugin') {
          uri = item.id ? ('#/' + item.id) : "#/index_plugin";

          uri = `${GROBAL_HTTP_CTX}/`+encodeURIComponent(encodeURIComponent('index-view.html'+uri));
          return  uri;
      } else if (item.urltype === 'view') {
          uri = item.location;
          uri= uri.replace("#", "/");

          if(uri[0]=='/'){
              uri = "/sidebar"+uri;
          }else{
              uri = "/sidebar/"+uri;
          }
          // window.addRouter(uri);
          // return  "#"+uri;
          return `${GROBAL_HTTP_CTX}/`+'index-view.html#'+uri;
      }else if(item.urltype == undefined){
          item.location = '404';
          return  '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
      }
      else {
          return item.location;
      }
  }

    render() {
      let locale_serial = getCookie("locale_serial");
      if(locale_serial == 1) {
          locale_serial = "";
      }
        return (
        <div>
        <Tabs
        defaultActiveKey={this.state.tabKey}
        onChange={this.onChangeTab}
        extraContent={
          <div style={{height:37.8,background:'white',display:'flex'}}>
            <a style={{'margin-right':10,'margin-top':5,'color':'blue'}} href="#" onClick={this.ontabClick}><Icon type='uf-files-o'/>更多</a>
          </div>
          }
        >
            <TabPane tab={<Badge dataBadge={this.state.wait_dataSource.length} colors="primary" dataBadgePlacement="top">
            <span style={{color:'black'}}>待办任务</span>
        </Badge>} key="pending_wait">
                  <Table size="lg"
                  data={this.state.wait_dataSource}  //传递数据
                  columns={this.state.columns}  //表格表头
                  />                                     
            </TabPane>
            <TabPane tab={<Badge dataBadge={this.state.already_dataSource.length} colors="primary" dataBadgePlacement="top">
            <span style={{color:'black'}}>已办任务</span>
        </Badge>} key="pending_already">
                <Table size="lg"
                data={this.state.already_dataSource}  //传递数据
                columns={this.state.columns}  //表格表头
                />                                     
            </TabPane>
        </Tabs> 
        </div>
        );
    }
}


export default PendingView
