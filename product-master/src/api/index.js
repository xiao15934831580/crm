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
// 客户基本信息
/**
 * 用户详情
 * @param {*} params 
 * @returns 
 */
export const getAllUserInfo = (id) => {
    return http({
        url: '/User/getUserInfo?userId='+id,
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

//客户电站信息
/**
 * 获取电站列表信息
 * @param {*} data 
 * @returns 
 */
export const getUserPowers = (data) => {
    return http({
        url: '/User/getUserPowers',
        method: 'POST',
        data
    })
}
/**
 * 
 * 获取电站详情
 */
 export const getUserPowerInfo = (id) => {
    return http({
        url: '/User/getUserPowerInfo?powerId='+id,
        method: 'GET',
    })
}

