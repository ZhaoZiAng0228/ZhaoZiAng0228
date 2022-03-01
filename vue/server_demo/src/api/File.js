import { deleteHttp, getHttp,postHttp } from '../utils/request'

/**
 * @description: 上传文件
 * @param { url } 
 * @return {*}
 */
export const setFile = async (url, params) => {
    return await getHttp(url, params)
}

/**
 * @description: 上传文件
 * @param { url } 
 * @return {*}
 */
export const fileSearch = async (url, params) => {
    return await postHttp(url, params)
}


/**
 * @description: 获取侧边栏信息
 * @param { url } 
 * @return {*}
 */
 export const detailFiles = async (url, params) => {
    return await postHttp(url, params)
}


/**
 * @description: 文件管理删除
 * @param { url } 
 * @return {*}
 */
 export const deleteFiles = async (url, params) => {
    return await deleteHttp(url, params)
}
