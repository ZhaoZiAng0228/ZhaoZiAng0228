import { getHttp, postHttp } from '../utils/request'

/**
 * @description: 新增文章功能
 * @param { url } 
 * @return {*}
 */
export const addEditor = async (url, params) => {
    return await postHttp(url, params)
}


/**
 * @description: 编辑文章回显
 * @param { url } 
 * @return {*}
 */
export const echoEditor = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 编辑文章回显
 * @param { url } 
 * @return {*}
 */
export const getClassTag = async (url, params) => {
    return await postHttp(url, params)
}



/**
 * @description: 编辑文章功能
 * @param { url } 
 * @return {*}
 */
export const changeEditor = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 新增页面功能
 * @param { url } 
 * @return {*}
 */
export const addPageEditor = async (url, params) => {
    return await postHttp(url, params)
}


/**
 * @description: 编辑网页功能
 * @param { url } 
 * @return {*}
 */
export const changePageEditor = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 发送邮件功能
 * @param { url } 
 * @return {*}
 */
export const pushEmail = async (url, params) => {
    return await postHttp(url, params)
}