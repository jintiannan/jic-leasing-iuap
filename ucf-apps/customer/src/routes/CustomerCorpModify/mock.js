export const treeData = [{key: '1', title: "单位客户信息维护",
    children: [{key: '11', title: "客户基本信息",

        children: [{key: '111', title: "基本情况",  ext: {url: 'baseInfo'}},
            {key: '112', title: "客户来源", ext: {url: 'source'}},
            {key: '113', title: "股东情况", url: ''},
            {key: '114', title: "资质认证", url: ''},
            {key: '115', title: "版权投资", url: ''},
            {key: '116', title: "高管信息", url: ''},
            {key: '117', title: "家族企业", url: ''},
            {key: '118', title: "其他关系", url: ''},
            {key: '119', title: "其他联系人", url: ''},
            {key: '1110', title: "银行账户", url: ''},
            {key: '1111', title: "医院资质状况", url: ''}
        ]
    },
        {key: '12', title: "客户资产情况",
            children: [
                {key: '121', title: "不动产", url: ''},
                {key: '122', title: "动产", url: ''},
            ]},
        {key: '13', title: "融资担保情况", children: [
                {key: '131', title: "其他融资", url: ''},
                {key: '132', title: "信贷信息", url: ''},
                {key: '133', title: "债券发行", url: ''},
                {key: '134', title: "保证情况", url: ''},
            ]},
        {key: '14', title: "客户供销关系",children: [
                {key: '141', title: "上游客户", url: ''},
                {key: '142', title: "下游客户", url: ''},
                {key: '143', title: "在手合同", url: ''},
            ]},
        {key: '15', title: "客户财报情况", children: [
                {key: '151', title: "指标分析", url: ''}
            ]},
        {key: '16', title: "客户重大事件",children: [
                {key: '161', title: "涉诉情况", url: ''},
                {key: '162', title: "重大事件", url: ''},
                {key: '163', title: "沟通记录", url: ''},
            ]},
        {key: '17', title: "客户其他情况", children: [
                {key: '171', title: "股票发行", url: ''},
                {key: '172', title: "外部评级", url: ''},
                {key: '171', title: "投行业务", url: ''}
            ]},
        {key: '18', title: "附件清单", children: [
                {key: '181', title: "附件清单", url: ''},
            ]}
    ]}];


export const mockData = (data) => {
    return {'status':'200','data' : data};

};
