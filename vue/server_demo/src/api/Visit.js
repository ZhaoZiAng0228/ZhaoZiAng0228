import { getHttp,deleteHttp,postHttp } from '../utils/request'

/**
 * @description: 获取访问统计数据
 * @param { url } 
 * @return {*}
 */
export const getVisit= async (url, params) => {
    return await getHttp(url, params)
}


/**
 * @description: 访问统计数据删除
 * @param { url } 
 * @return {*}
 */
 export const deleteVisit= async (url, params) => {
    return await deleteHttp(url, params)
}



/**
 * @description: 访问统计批量删除
 * @param { url } 
 * @return {*}
 */
 export const allDeleteVisit= async (url, params) => {
    return await postHttp(url, params)
}


/**
 * @description: 访问统计批量搜索
 * @param { url } 
 * @return {*}
 */
 export const searchVisit= async (url, params) => {
    return await postHttp(url, params)
}