import { getHttp, deleteHttp, postHttp,putHttp } from '../utils/request'

/**
 * @description: 获取分类
 * @param { url } 
 * @return {*}
 */
 export const getClassify = async (url, params) => {
    return await getHttp(url, params)
}


/**
 * @description: 添加分类
 * @param { url } 
 * @return {*}
 */
 export const addClassify = async (url, params) => {
    return await putHttp(url, params)
}

/**
 * @description: 编辑分类
 * @param { url } 
 * @return {*}
 */
 export const editClassify = async (url, params) => {
    return await postHttp(url, params)
}

/**
 * @description: 删除分类
 * @param { url } 
 * @return {*}
 */
 export const delClassify = async (url, params) => {
    return await deleteHttp(url, params)
}