import { getHttp, deleteHttp, postHttp } from '../utils/request'

/**
 * @description: 搜索记录数据
 * @param { url } 
 * @return {*}
 */
export const getSearch = async (url, params) => {
    return await getHttp(url, params)
}


/**
 * @description: 搜索记录数据删除
 * @param { url } 
 * @return {*}
 */
export const deleteSearch = async (url, params) => {
    return await deleteHttp(url, params)
}



/**
 * @description: 搜索记录批量删除
 * @param { url } 
 * @return {*}
 */
export const allDeleteSearch = async (url, params) => {
    return await postHttp(url, params)
}


/**
 * @description: 搜索记录批量搜索
 * @param { url } 
 * @return {*}
 */
export const searchHistory = async (url, params) => {
    return await postHttp(url, params)
}