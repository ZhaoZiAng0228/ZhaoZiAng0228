import { getHttp, deleteHttp, postHttp,putHttp } from '../utils/request'


/**
 * @description: 获取标签
 * @param { url } 
 * @return {*}
 */
 export const getLabel = async (url, params) => {
    return await getHttp(url, params)
}


/**
 * @description: 添加标签
 * @param { url } 
 * @return {*}
 */
 export const addLabel = async (url, params) => {
    return await putHttp(url, params)
}

/**
 * @description: 编辑标签
 * @param { url } 
 * @return {*}
 */
 export const editLabel = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 删除标签
 * @param { url } 
 * @return {*}
 */
 export const delLabel = async (url, params) => {
    return await deleteHttp(url, params)
}