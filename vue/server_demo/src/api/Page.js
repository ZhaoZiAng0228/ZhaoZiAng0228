import { getHttp, deleteHttp, postHttp } from '../utils/request'

/**
 * @description: 页面管理数据
 * @param { url } 
 * @return {*}
 */
export const getPage = async (url, params) => {
    return await getHttp(url, params)
}

/**
 * @description: 页面管理修改数据状态
 * @param { url } 
 * @return {*}
 */
export const typePage = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 页面管理数据删除
 * @param { url } 
 * @return {*}
 */
export const deletePage = async (url, params) => {
    return await deleteHttp(url, params)
}



/**
 * @description: 页面管理批量删除
 * @param { url } 
 * @return {*}
 */
export const allDeletePage = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 页面管理批量修改状态
 * @param { url } 
 * @return {*}
 */
export const allOffPage = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 页面管理批量搜索
 * @param { url } 
 * @return {*}
 */
export const searchPage = async (url, params) => {
    return await postHttp(url, params)
}