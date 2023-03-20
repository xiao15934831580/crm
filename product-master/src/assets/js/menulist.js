const menulist = [
    // 车辆基础信息管理
    {
        menuName: '车辆基础信息管理',
        icon: 'location',
        meta: {
            title: '车辆基础信息管理'
        },
        children: [
            {
                path: 'bararchives',
                menuName: '车辆档案',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    
                    title: '车辆档案'
                }
            },
            {
                path: 'maintenance',
                menuName: '车辆保养明细',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    
                    title: '车辆保养明细'
                },
            },
            {
                path: 'barbasic',
                menuName: '车辆保养基础信息',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    
                    title: '车辆保养基础信息'
                },
            },
        ]
    },

    // 车辆维修管理
    {
        path: 'barrepair',
        menuName: '车辆维修管理',
        icon: 'location',
        meta: {
            title: '车辆维修管理'
        },
        children: [
            {
                path: 'report',
                menuName: '车辆报修记录',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    title: '车辆报修记录'
                }
            },
            {
                path: 'dispatch',
                menuName: '车辆派修记录',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    title: '车辆派修记录'
                },
            },
            {
                path: 'carrepair',
                menuName: '车辆维修记录',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    title: '车辆维修记录'
                }
            },
            {
                path: 'workhour',
                menuName: '维修人员工时记录',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    title: '维修人员工时记录'
                }
            },
            {
                path: 'statistics',
               menuName: '工时统计表',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    title: '工时统计表'
                }
            },
            {
                path: 'access',
               menuName: '车辆进出场明细',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    
                    title: '车辆进出场明细'
                }
            },
            

        ]
    },

    //安全管理
    {
        path: '/security',
       menuName: '安全管理',
        icon: 'location',
        meta: {
            title: '安全管理'
        },
        children: [
            {
                path: 'outperson',
               menuName: '外来人员登记记录',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    title: '外来人员登记记录'
                }
            },
            {
                path: 'violation',
               menuName: '违规记录',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    title: '违规记录'
                },
            },

        ]
    },
    
    // 系统管理
    {
        path: '/system',
       menuName: '系统管理',
        icon: 'location',
        meta: {
            title: '系统管理'
        },
        children: [
            {
                path: 'user',
               menuName: '用户管理',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    
                    title: '用户管理'
                }
            },
            {
                path: 'journal',
               menuName: '系统日志',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    
                    title: '系统日志'
                },
            },
            {
                path: 'role',
               menuName: '角色管理',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    
                    title: '角色管理'
                },
            },
        ]
    },
    //报表分析
    {
        path: '/report',
       menuName: '报表分析',
        icon: 'location',
        meta: {
            title: '报表分析'
        },
        children: [
            {
                path: 'failure',
               menuName: '车辆故障原因率图表',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    
                    title: '车辆故障原因率图表'
                }
            },
            {
                path: 'frequency',
               menuName: '车辆维修次数排名',
                icon: 'Cellphone',
                meta: {
                    isShow: true,
                    
                    title: '车辆维修次数排名'
                },
            }
        ]
    },
    // 维修管理
    {
        path: 'repair',
        menuName: '维修人员档案',
        icon: 'location',
        meta: {
            title: '维修人员档案'
        },
    },
    {
        path: 'repairpage',
        menuName: '维修人员信息',
        icon: 'location',
        meta: {
            title: '维修人员信息'
        },
    }
]
export default menulist;