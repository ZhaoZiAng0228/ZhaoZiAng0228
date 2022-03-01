import { getHttp,deleteHttp,postHttp } from '../utils/request'

/**
 * @description: 获取邮件管理数据
 * @param { url } 
 * @return {*}
 */
export const getEmail= async (url, params) => {
    return await getHttp(url, params)
}


/**
 * @description: 邮件管理数据删除
 * @param { url } 
 * @return {*}
 */
 export const deleteEmail= async (url, params) => {
    return await deleteHttp(url, params)
}



/**
 * @description: 邮件管理数据批量删除
 * @param { url } 
 * @return {*}
 */
 export const allDeleteEmail= async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 邮件管理模糊搜索
 * @param { url } 
 * @return {*}
 */
 export const searchEmail= async (url, params) => {
    return await postHttp(url, params)
}