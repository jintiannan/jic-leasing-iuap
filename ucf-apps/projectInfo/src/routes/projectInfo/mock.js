export const treeData = [{key: '1', title: "普通项目审批",

    children: [{key: '11', title: "项目基本信息",  ext: {url: 'baseInfo'}},
        {key: '12', title: "报价方案", ext: {url: 'source'}},
        {key: '13', title: "供应商信息", ext: {url: 'contInfo'}},
        {key: '14', title: "承租方信息", ext: {url: 'projectBoth'}},
        {key: '15', title: "出租方信息", ext: {url: 'projectLeader'}},
        {key: '16', title: "项目来源信息", ext: {url: 'projectSource'}},
        {key: '17', title: "担保信息", ext: {url: 'projectPledge'}},
        {key: '18', title: "保险信息", ext: {url: 'projectInsure'}},
        {key: '19', title: "收付各方", ext: {url: 'receivePaymentOption'}},
        {key: '110', title: "付款条件", ext: {url: 'paymentCondition'}},
        {key: '111', title: "起租条件", ext: {url: 'rentCondition'}},
        {key: '112', title: "罚息规则设置", ext: {url: 'penaltyRuleDetail'}},
        {key: '113', title: "附件信息", url: ''}

    ]
}
];


export const mockData = (data) => {
    return {'status':'200','data' : data};

};
