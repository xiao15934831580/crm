import http from './request'

export const login = (data) => {
    return http({
        url: '/system/login',
        method: 'POST',
        data
    })
}
export const loginOut = () => {
    return http({
        url: '/system/logout',
        method: 'POST',
    })
}
// 用户管理
/**
 * 获取用户数据
 * @param {*} params 
 * @returns 
 */
export const getAllUserInfo = (params) => {
    return http({
        url: `/getAllUserInfo/${params.pageNum}/${params.limit}`,
        method: 'GET',
    })
}

/**
 * 获取用户基础信息
 * @param {*} params 
 * @returns 
 */
 export const getAllUserList = (data) => {
    return http({
        url: '/User/getUserList',
        method: 'POST',
        data
    })
}

/**
 * 保存用户数据
 * @returns 
 */
export const saveOrUpdateUser = (data) => {
    return http({
        url: '/saveOrUpdateUser',
        method: 'POST',
        data
    })
}
/**
 * 修改用户密码
 * @returns 
 */
 export const resetPassword = (data) => {
    return http({
        url: '/resetPassword',
        method: 'POST',
        data
    })
}
export const updatePassword = (data) => {
    return http({
        url: '/updatePassword',
        method: 'POST',
        data
    })
}

/**
 * 查询用户信息
 * @param {*} pageNum： 当前页数 
 * @param {*} limit 显示条数 
 * @param {*} query 查询条件，支持模糊查询 
 */
 export const queryUser = (params) => {
    return http({
        url: '/queryUser',
        method: 'GET',
        params
    })
}
/**
 * 删除用户
 * @param {*} userId 当前用户
 */
 export const deleteUser = (userId) => {
    return http({
        url: `/deleteUser/${userId}`,
        method: 'POST',
    })
}
/**
 * 获取当前用户信息
 */
 export const getUserInfo = () => {
    return http({
        url: '/getUserInfo',
        method: 'GEt',
    })
}

/***************角色模块********************** */
/**
 * 删除角色
 * @param roleId 角色id
 */
 export const deleteRole = (roleId) => {
    return http({
        url: `/sysRole/delete/${roleId}`,
        method: 'POST',
    })
}

/***
 * 获取所有的角色
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getAllRole = (params) => {
    return http({
        url: `/sysRole/getAllRole/${params.pageNum}/${params.limit}`,
        method: 'POST',
    })
}
/***
 * 保存角色信息
 */
 export const saveOrUpdate = (data) => {
    return http({
        url: '/sysRole/saveOrUpdate',
        method: 'POST',
        data
    })
}
/***************日志模块********************** */
/***
 * 获取所有的日志
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getLog = (params) => {
    return http({
        url: `/sysLog/getLog/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/***
 * 查询日志
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
export const queryLog = (params) => {
    return http({
        url: '/sysLog/query',
        method: 'GET',
        params
    })
}

/***************维修人员模块********************** */
/***
 * 获取所有维修人员
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getRepairman = (params) => {
    return http({
        url: `/repairman/getRepairman/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/**
 * 删除维修人员
 * @param roleId 维修人员id
 */
 export const deleteRepairman = (id) => {
    return http({
        url: `/repairman/delete/${id}`,
        method: 'GET',
    })
}
/***
 * 查询维修人员
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryRepairman = (params) => {
    return http({
        url: '/repairman/query',
        method: 'GET',
        params
    })
}
/***
 * 保存维修人员信息
 */
 export const saveRepairman = (data) => {
    return http({
        url: '/repairman/saveOrUpdate',
        method: 'POST',
        data
    })
}
/***************车辆基础信息模块********************** */
/***
 * 获取所有车辆信息
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getAllCar = (params) => {
    return http({
        url: `/car/getAll/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/**
 * 删除车辆档案信息
 * @param id 车辆档案信息id
 */
 export const deleteCar = (id) => {
    return http({
        url: `/car/delete/${id}`,
        method: 'GET',
    })
}
/***
 * 查询车辆档案信息
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryCar = (params) => {
    return http({
        url: '/car/query',
        method: 'GET',
        params
    })
}
/***
 * 保存车辆档案信息
 */
 export const saveCar = (data) => {
    return http({
        url: '/car/saveOrUpdate',
        method: 'POST',
        data
    })
}

/***************保养单模块********************** */
/***
 * 获取所有车辆信息
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getBillMaintain = (params) => {
    return http({
        url: `/billMaintain/getAll/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/***
 * 查询车辆档案信息
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryBillMaintain = (params) => {
    return http({
        url: '/billMaintain/query',
        method: 'GET',
        params
    })
}
/***************保养基础信息模块********************** */
/***
 * 获取保养基础信息
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getMaintain = (params) => {
    return http({
        url: `/maintain/getAll/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/***
 * 查询保养基础信息
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryMaintain = (params) => {
    return http({
        url: '/maintain/query',
        method: 'GET',
        params
    })
}
/***
 * 保存保养基础信息
 */
 export const saveMaintain = (data) => {
    return http({
        url: '/maintain/saveOrUpdate',
        method: 'POST',
        data
    })
}
/***
 * 编辑保养基础信息
 */
 export const editMaintain = (carBrandType) => {
    return http({
        url: `/maintain/getOne/${carBrandType}`,
        method: 'POST',
    })
}
/**
 * 删除保养基础信息
 * @param  carBrandType 品牌型号 
 * @returns 
 */
export const deletecarBrandType = (carBrandType) => {
    return http({
        url: `/maintain/delete/${carBrandType}`,
        method: 'GET',
    })
}
/***************车辆报修记录模块********************** */
/***
 * 获取车辆报修记录
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getReportRepAll = (params) => {
    return http({
        url: `/repairMgt/getReportRepAll/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/***
 * 查询车辆报修记录
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryReportRep = (params) => {
    return http({
        url: '/repairMgt/queryReportRep',
        method: 'GET',
        params
    })
}
/***
 * 保存车辆报修记录 --退回后保存
 *  @param data: 退回说明
 * @param billMainId: 主表id
 */
 export const saveGoback = (params) => {
    return http({
        url: '/repairMgt/goBack',
        method: 'POST',
        params
    })
}
/***
 * 保存车辆报修记录 --分配指定点检员
 *  @param username: 点检员value
 * @param billMainId: 主表id
 */
 export const saveInspector = (billMainId,username,) => {
    return http({
        url: `/repairMgt/submitInspector/${billMainId}/${username}`,
        method: 'GET',
    })
}
/***
 * 保存车辆报修记录 --保存故障明细区信息
 *  @param data: 退回说明
 * @param billMainId: 主表id
 */
 export const saveRepDatails = (data) => {
    return http({
        url: '/repairMgt/updateRepDetails',
        method: 'POST',
        data
    })
}
/***************车辆派修记录模块********************** */
/***
 * 获取所有车辆信息
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getDispatchAll = (params) => {
    return http({
        url: `/repairMgt/getDispatchAll/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/***
 * 查询车辆档案信息
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryDispatch = (params) => {
    return http({
        url: '/repairMgt/queryDispatch',
        method: 'GET',
        params
    })
}
/***************车辆维修记录模块********************** */
/***
 * 获取所有车辆信息
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getRepAll = (params) => {
    return http({
        url: `/repairMgt/getRepAll/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/***
 * 查询车辆档案信息
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryRep = (params) => {
    return http({
        url: '/repairMgt/queryRep',
        method: 'GET',
        params
    })
}
/***************车辆进出场模块********************** */
/***
 * 获取所有车辆信息
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getCarAccess = (params) => {
    return http({
        url: `/carAccess/getAll/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/***
 * 查询车辆档案信息
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryCarAccess = (params) => {
    return http({
        url: '/carAccess/query',
        method: 'GET',
        params
    })
}
/***************外来人员登记模块********************** */
/***
 * 获取所有车辆信息
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getVisitor = (params) => {
    return http({
        url: `/visitor/getAll/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/***
 * 查询车辆档案信息
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryVisitor = (params) => {
    return http({
        url: '/visitor/query',
        method: 'GET',
        params
    })
}
/***************违规管理模块********************** */
/***
 * 获取所有车辆信息
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getViolation = (params) => {
    return http({
        url: `/violation/getAll/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/***
 * 查询车辆档案信息
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryViolation = (params) => {
    return http({
        url: '/violation/query',
        method: 'GET',
        params
    })
}
/***************维修人员工时模块********************** */
/***
 * 获取所有车辆信息
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getManHourAll = (params) => {
    return http({
        url: `/repManHour/getManHourAll/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/***
 * 查询车辆档案信息
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryRepManHour = (params) => {
    return http({
        url: '/repManHour/queryRepManHour',
        method: 'GET',
        params
    })
}
/***************人员工时统计模块********************** */
/***
 * 获取所有车辆信息
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getManHourCountAll = (params) => {
    return http({
        url: `/repManHour/getManHourCountAll/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/***
 * 查询车辆档案信息
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryRepManHourCount = (params) => {
    return http({
        url: '/repManHour/queryManHourCount',
        method: 'GET',
        params
    })
}
/***************故障原因率图表模块********************** */
/***
 * 获取所有车辆信息
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getRepFaultCountAll = () => {
    return http({
        url: '/analyse/getRepFaultCountAll',
        method: 'POST',
    })
}
/***
 * 查询车辆档案信息
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryRepFaultCount = (params) => {
    return http({
        url: '/analyse/queryRepFaultCount',
        method: 'GET',
        params
    })
}
/***************车辆维修次数模块********************** */
/***
 * 获取所有车辆信息
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getRepTimeCountAll = (params) => {
    return http({
        url: `/analyse/getRepTimeCountAll/${params.limit}/${params.pageNum}`,
        method: 'POST',
    })
}
/***
 * 查询车辆档案信息
 * @param condition 查询条件，支持模糊查询
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const queryRepTimeCount = (params) => {
    return http({
        url: '/analyse/queryRepTimeCount',
        method: 'GET',
        params
    })
}
/***************************首页************************** */
/***
 * 获取所有数据
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getHome = () => {
    return http({
        url: '/analyse/getHome',
        method: 'POST',
    })
}
/***************************维修量历史数据汇总************************** */
/***
 * 获取所有数据
 * @param limit 显示条数
 */
 export const getRepHistoryAll = () => {
    return http({
        url: '/analyse/getRepHistoryAll',
        method: 'POST',
    })
}
/***
 * 查询为流量历史数据汇总
 * @param endDate 结束时间
 * @param startDate 开始时间
 * @param type 日期类型
 */
 export const queryRepHistory = (params) => {
    return http({
        url: '/analyse/queryRepHistory',
        method: 'GET',
        params
    })
}