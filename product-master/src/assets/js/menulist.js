const menulist = [
    // 车辆基础信息管理
    {
        menuName: 'CRM管理-客户',
        path: 'crm',
        children: [
            {
                path: 'custominfo',
                menuName: '客户信息',
                children: [
                    {
                        path: 'basicinfo',
                        menuName: '客户基础信息',
                    },
                    {
                        path: 'blacklist',
                        menuName: '黑名单客户信息',
                    },
                    {
                        path: 'maintain',
                        menuName: '客户维护与关怀',
                    },
                    {
                        path: 'powerstationinfo',
                        menuName: '客户电站信息',
                    }
                ]
            },
            {
                path: 'powerinsurance',
                menuName: '电站保险与理赔',
                icon: 'Cellphone',
                children: [
                    {
                        path: 'insurancelist',
                        menuName: '电站保单列表',
                    },
                    {
                        path: 'policyremind',
                        menuName: '保单提醒',
                    },
                    {
                        path: 'claimsprocess',
                        menuName: '电站理赔流程',
                    },
                ]
            },
            {
                path: 'businessexpansion',
                menuName: '电商拓展',
            },
            {
                path: 'barbasic',
                menuName: '电站运维服务承揽',
            },
        ]
    },
    {
        path: 'wokeorder',
        menuName: '客服工单',
        children: [
            {
                path: 'unaudited',
                menuName: '未审核工单',
            },
            {
                path: 'approved',
                menuName: '已审核工单',
            },
            {
                path: 'completed',
                menuName: '已完成工单',
            },
        ]
    }

]
export default menulist;