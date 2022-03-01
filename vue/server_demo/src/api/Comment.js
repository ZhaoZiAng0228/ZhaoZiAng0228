import { getHttp, deleteHttp, postHttp } from '../utils/request'

/**
 * @description: 评论管理数据
 * @param { url } 
 * @return {*}
 */
export const getComment = async (url, params) => {
    return await getHttp(url, params)
}

/**
 * @description: 评论管理修改数据状态
 * @param { url } 
 * @return {*}
 */
 export const typeComment = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 评论管理数据删除
 * @param { url } 
 * @return {*}
 */
export const deleteComment = async (url, params) => {
    return await deleteHttp(url, params)
}



/**
 * @description: 评论管理批量删除
 * @param { url } 
 * @return {*}
 */
export const allDeleteComment = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 评论管理批量修改状态
 * @param { url } 
 * @return {*}
 */
export const allOffComment = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 评论管理回复功能
 * @param { url } 
 * @return {*}
 */
export const addComment = async (url, params) => {
   return await postHttp(url, params)
}

/**
 * @description: 评论管理批量搜索
 * @param { url } 
 * @return {*}
 */
export const searchComment = async (url, params) => {
    return await postHttp(url, params)
}