import { getHttp,deleteHttp,postHttp } from '../utils/request'

/**
 * @description: 个人中心数据
 * @param { url } 
 * @return {*}
 */
export const getSpace = async (url, params) => {
    return await getHttp(url, params)
}

/**
 * @description: 个人中心基本设置
 * @param { url } 
 * @return {*}
 */
 export const upDataBasic = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 个人中心更新密码
 * @param { url } 
 * @return {*}
 */
 export const upDataPass = async (url, params) => {
    return await postHttp(url, params)
}