const menulist = [
    // 车辆基础信息管理
    {
        menuName: 'CRM管理-客户',
        // icon: 'location',
        children: [
            {
                // path: 'bararchives',
                menuName: '客户信息',
                children: [
                    {
                        path: 'basicinfo',
                        menuName: '客户基础信息',
                    },
                    {
                        path: 'maintenance',
                        menuName: '黑名单客户信息',
                    },
                    {
                        path: 'maintenance',
                        menuName: '客户维护与关怀',
                    },
                    {
                        path: 'maintenance',
                        menuName: '客户电站信息',
                    }
                ]
            },
            {
                path: 'maintenance',
                menuName: '电站保险与理赔',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    
                    title: '电站保险与理赔'
                },
                children: [
                    {
                        path: 'barbasic',
                        menuName: '电站保单列表',
                    },
                    {
                        path: 'barbasic',
                        menuName: '保单提醒',
                    },
                    {
                        path: 'barbasic',
                        menuName: '电站理赔流程',
                    },
                ]
            },
            {
                path: 'barbasic',
                menuName: '电商拓展',
            },
            {
                path: 'barbasic',
                menuName: '电站运维服务承揽',
            },
        ]
    },

]
export default menulist;