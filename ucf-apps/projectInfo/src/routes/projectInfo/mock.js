export const treeData = [{key: '11', title: "普通项目审批",

    children: [{key: '111', title: "项目基本信息",  ext: {url: 'baseInfo'}},
        {key: '112', title: "报价方案", ext: {url: 'source'}},
        {key: '113', title: "供应商信息", url: ''},
        {key: '114', title: "承租方信息", url: ''},
        {key: '115', title: "出租方信息", url: ''},
        {key: '116', title: "项目来源信息", url: ''},
        {key: '117', title: "担保信息", url: ''},
        {key: '118', title: "保险信息", url: ''},
        {key: '119', title: "收付各方", url: ''},
        {key: '1110', title: "付款条件", url: ''},
        {key: '1111', title: "起租条件", url: ''},
        {key: '1112', title: "罚息规则设置", url: ''},
        {key: '1113', title: "附件信息", url: ''}

    ]
}
];


export const mockData = (data) => {
    return {'status':'200','data' : data};

};
