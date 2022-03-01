import { getHttp, deleteHttp, postHttp } from '../utils/request'

/**
 * @description: 获取所有文章数据
 * @param { url } 
 * @return {*}
 */
export const getAll = async (url, params) => {
    return await getHttp(url, params)
}

/**
 * @description: 首焦推荐文章
 * @param { url } 
 * @return {*}
 */
export const setRecomment = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 删除点击的文章
 * @param { url } 
 * @return {*}
 */
export const deleteEditor = async (url, params) => {
    return await deleteHttp(url, params)
}


/**
 * @description: 所有文章的模糊搜索功能
 * @param { url } 
 * @return {*}
 */
export const searchEditor = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 所有文章的批量删除
 * @param { url } 
 * @return {*}
 */
export const allDeleteAll = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 所有文章批量发布
 * @param {url}
 * @return {*}
 */

export const allTion = async (url, params) => {
    return await postHttp(url, params)
}


/**
 * @description: 所有文章批量首焦
 * @param {url}
 * @return {*}
 */

export const allRecommend = async (url, params) => {
    return await postHttp(url, params)
}
